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
    reporting_instructions = models.TextField(default='')
    
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
    
    def __str__(self):
        day = next(item[1] for item in self.DAYS_OF_WEEK if item[0] == self.day_of_week)
        return f'{self.volunteer.name} - {day}'


class Volunteer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254, null=False, default='test@test.com')
    year_in_school = models.CharField(max_length=2, default='M3')
    duration_in_chicago = models.CharField(max_length=15, default='< 1 month')
    desired_activities = models.ManyToManyField(Activity)

    def __str__(self):
        return self.name

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
    confirmed = models.CharField(default='No')
    class Meta:
        unique_together = ('volunteer', 'event_activity', 'start_time', 'end_time', 'confirmed')

    def __str__(self):
        return f'{self.volunteer.name} - {self.event_activity} - {self.start_time} to {self.end_time}'
