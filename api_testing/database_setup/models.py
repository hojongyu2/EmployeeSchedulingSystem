from django.db import models


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
    desired_activities = models.ManyToManyField(Activity)

    def __str__(self):
        return self.name

    def assign_to_shift(self):
        for availability in self.availability_set.all():
            for activity in self.desired_activities.all():
                for event_activity in activity.eventactivity_set.all():
                    if event_activity.date_of_event.weekday() == availability.day_of_week and availability.overlaps(event_activity.start_time, event_activity.end_time) and event_activity.volunteers_needed_at(availability.start_time, availability.end_time) > 0:
                        VolunteerShift.objects.create(
                            event_activity=event_activity,
                            volunteer=self,
                            start_time=max(availability.start_time, event_activity.start_time),
                            end_time=min(availability.end_time, event_activity.end_time),
                        )


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
        shifts_at_time = self.volunteershift_set.filter(start_time__lte=end_time, end_time__gt=start_time)
        return self.required_volunteers - shifts_at_time.count()


class VolunteerShift(models.Model):
    event_activity = models.ForeignKey(EventActivity, on_delete=models.CASCADE)
    volunteer = models.ForeignKey(Volunteer, on_delete=models.CASCADE)
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f'{self.volunteer.name} - {self.event_activity} - {self.start_time} to {self.end_time}'
