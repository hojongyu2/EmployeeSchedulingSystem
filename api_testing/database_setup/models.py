from django.db import models
from datetime import timedelta
from datetime import datetime, date
from django.db.models import F, ExpressionWrapper, fields

def time_to_datetime(t, d=date.today()):
    return datetime.combine(d, t)


class Activity(models.Model):
    class Meta:
        verbose_name_plural = 'Activities'
        
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    
        
class Event(models.Model):
    name = models.CharField(max_length=100)
    date_of_event = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    activities = models.ManyToManyField(Activity, through='EventActivity')

    def __str__(self):
        return self.name


class Availability(models.Model):
    class Meta:
        verbose_name_plural = 'Availabilities'
        
    DAYS_OF_WEEK = [
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday'),
    ]

    volunteer = models.ForeignKey('Volunteer', on_delete=models.CASCADE)
    day_of_week = models.IntegerField(choices=DAYS_OF_WEEK)
    start_time = models.TimeField()
    end_time = models.TimeField()

    def overlaps(self, other_start, other_end):
        return self.start_time < other_end and self.end_time > other_start


class Volunteer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254, null=False, default='test@test.com')
    year_in_school = models.CharField(max_length=2, default='M3')
    duration_in_chicago = models.CharField(max_length=15, default='< 1 month')
    desired_activities = models.ManyToManyField(Activity)

    def __str__(self):
        return self.name

    def assign_to_shift(self):
        availabilities = self.availability_set.all()
        possible_assignments = []
        for availability in availabilities:
            event_activities = EventActivity.objects.filter(
                date_of_event__week_day=availability.day_of_week + 1,  # Django week_day starts from 1 (Sunday)
                start_time__lte=availability.end_time,
                end_time__gte=availability.start_time,
                activity__in=self.desired_activities.all()
            ).order_by('start_time')
            for event_activity in event_activities:
                if event_activity.volunteers_needed_at(availability.start_time, availability.end_time).total_seconds() > 0:
                    possible_assignments.append({
                        'availability': availability,
                        'event_activity': event_activity,
                        'start_time': max(event_activity.start_time, availability.start_time),
                        'end_time': min(event_activity.end_time, availability.end_time)
                    })
        
        best_assignments = self.select_best_assignments(possible_assignments)
        for assignment in best_assignments:
            VolunteerShift.objects.create(
                volunteer=self,
                event_activity=assignment['event_activity'],
                start_time=assignment['start_time'],
                end_time=assignment['end_time']
            )
    def select_best_assignments(self, assignments):
            sorted_assignments = sorted(assignments, key=lambda x: x['end_time'])
            best_assignments = []
            current_end_time = None
            for assignment in sorted_assignments:
                if current_end_time is None or assignment['start_time'] >= current_end_time:
                    best_assignments.append(assignment)
                    current_end_time = assignment['end_time']
            return best_assignments    
    def total_assigned_time(self):
        shifts = self.volunteershift_set.all()
        total_time = timedelta()
        for shift in shifts:
            total_time += time_to_datetime(shift.end_time) - time_to_datetime(shift.start_time)
        return total_time
        
    def is_available(self, start_time, end_time):
        availabilities = self.availability_set.filter(
            start_time__lte=end_time,
            end_time__gte=start_time,
        )
        if not availabilities:
            return False
        shifts = self.volunteershift_set.filter(
            start_time__lt=end_time, 
            end_time__gt=start_time
        )
        total_shift_time = timedelta()
        for shift in shifts:
            total_shift_time += min(shift.end_time, end_time) - max(shift.start_time, start_time)
        return total_shift_time < (end_time - start_time)


class EventActivity(models.Model):
    class Meta:
        verbose_name_plural = 'Event Activities'
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    date_of_event = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    required_volunteers = models.IntegerField()
    volunteers = models.ManyToManyField(Volunteer, through='VolunteerShift', blank=True)

    def __str__(self):
        return f'{self.event.name} - {self.activity.name}'

    def volunteers_needed_at(self, start_time, end_time):
        shifts = self.volunteershift_set.filter(
            start_time__lt=end_time, 
            end_time__gt=start_time
        )
        shifts = shifts.annotate(
            duration=ExpressionWrapper(F('end_time') - F('start_time'), output_field=fields.DurationField())
        )
        total_volunteers = shifts.aggregate(
            total=models.Sum('duration')
        )['total'] or timedelta()
        required_time = (time_to_datetime(end_time) - time_to_datetime(start_time)) * self.required_volunteers
        return max(timedelta(), required_time - total_volunteers)



class VolunteerShift(models.Model):
    volunteer = models.ForeignKey(Volunteer, on_delete=models.CASCADE)
    event_activity = models.ForeignKey(EventActivity, on_delete=models.CASCADE)
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        unique_together = ('volunteer', 'event_activity', 'start_time', 'end_time')

    def __str__(self):
        return f'{self.volunteer.name} - {self.event_activity} - {self.start_time} to {self.end_time}'
