from rest_framework import serializers
from .models import Volunteer, Activity, Availability, Event, EventActivity, VolunteerShift

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'name']

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['day_of_week', 'start_time', 'end_time']

class VolunteerShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerShift
        fields = ['volunteer', 'event_activity', 'start_time', 'end_time']

    def create(self, validated_data):
        return VolunteerShift.objects.create(**validated_data)

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['name', 'date_of_event', 'start_time', 'end_time']
        
class EventActivitySerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(read_only=True)
    activity = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = EventActivity
        fields = ['event', 'activity', 'date_of_event', 'start_time', 'end_time', 'required_volunteers']

    def create(self, validated_data):
        event_id = validated_data.pop('event')
        activity_id = validated_data.pop('activity')
        event = Event.objects.get(id=event_id)
        activity = Activity.objects.get(id=activity_id)
        event_activity = EventActivity.objects.create(event=event, activity=activity, **validated_data)

        # Fetch all volunteers whose desired activities match the activity of the new event activity.
        volunteers = Volunteer.objects.filter(desired_activities=activity)

        # For each volunteer, if their availability overlaps with the event activity's time, create a new volunteer shift.
        for volunteer in volunteers:
            for availability in volunteer.availability_set.all():
                if event_activity.date_of_event.weekday() == availability.day_of_week:
                    if availability.overlaps(event_activity.start_time, event_activity.end_time):
                        start_time = max(event_activity.start_time, availability.start_time)
                        end_time = min(event_activity.end_time, availability.end_time)
                
                        # Check if the volunteer is already assigned to a shift at this time.
                        overlapping_shifts = VolunteerShift.objects.filter(
                            volunteer=volunteer,
                            event_activity__date_of_event=event_activity.date_of_event,
                            start_time__lt=end_time,
                            end_time__gt=start_time
                        )
                        if overlapping_shifts.exists():
                            continue
                        
                        shift_data = {
                            'volunteer': volunteer.id,
                            'event_activity': event_activity.id,
                            'start_time': start_time,
                            'end_time': end_time
                        }
                        shift_serializer = VolunteerShiftSerializer(data=shift_data)
                        if shift_serializer.is_valid(raise_exception=True):
                            shift_serializer.save()

        return event_activity
# Probably need to improve this by def a new update method -- will look into later
class VolunteerSerializer(serializers.ModelSerializer):
    desired_activities = ActivitySerializer(many=True)
    availability_set = AvailabilitySerializer(many=True)

    class Meta:
        model = Volunteer
        fields = ['name', 'email', 'year_in_school', 'duration_in_chicago', 'desired_activities', 'availability_set']

    def create(self, validated_data):
        activity_data = validated_data.pop('desired_activities')
        availability_data = validated_data.pop('availability_set')

        # Here we are checking if the volunteer exists or not
        volunteer, created = Volunteer.objects.update_or_create(
            email=validated_data.get('email'), 
            defaults=validated_data
        )
        
        # If the volunteer exists, we remove all his previous desired_activities and availabilities
        if not created: 
            volunteer.desired_activities.clear()
            Availability.objects.filter(volunteer=volunteer).delete()

        # Create new desired activities and availabilities
        for activity in activity_data:
            desired_activity, _ = Activity.objects.get_or_create(name=activity['name'])
            volunteer.desired_activities.add(desired_activity)

        for availability in availability_data:
            Availability.objects.create(volunteer=volunteer, **availability)

        # Remove shifts that no longer fit within the updated availability or desired activities
        for shift in VolunteerShift.objects.filter(volunteer=volunteer):
            if shift.event_activity.activity not in volunteer.desired_activities.all():
                shift.delete()
                continue

            for availability in volunteer.availability_set.all():
                if shift.event_activity.date_of_event.weekday() != availability.day_of_week:
                    shift.delete()
                    break
                elif not availability.overlaps(shift.start_time, shift.end_time):
                    shift.delete()
                    break
                else:
                    # If the volunteer's availability has been extended, update the shift's end time
                    if availability.end_time > shift.end_time and shift.event_activity.end_time > shift.end_time:
                        new_end_time = min(availability.end_time, shift.event_activity.end_time)
                        shift.end_time = new_end_time
                        shift.save()

                    # If the volunteer's availability has been shortened, update the shift's end time
                    elif availability.end_time < shift.end_time:
                        new_end_time = min(availability.end_time, shift.event_activity.end_time)
                        shift.end_time = new_end_time
                        shift.save()

                    # If the volunteer's availability has been moved earlier, update the shift's start time
                    if availability.start_time < shift.start_time and shift.event_activity.start_time < shift.start_time:
                        new_start_time = max(availability.start_time, shift.event_activity.start_time)
                        shift.start_time = new_start_time
                        shift.save()

                    # If the volunteer's availability has been moved later, update the shift's start time
                    elif availability.start_time > shift.start_time:
                        new_start_time = max(availability.start_time, shift.event_activity.start_time)
                        shift.start_time = new_start_time
                        shift.save()

        # Fetch all event activities that match the volunteer's desired activities.
        event_activities = EventActivity.objects.filter(activity__in=volunteer.desired_activities.all())

        # For each event activity, if the volunteer's availability overlaps with the event activity's time, create a new volunteer shift.
        for event_activity in event_activities:
            for availability in volunteer.availability_set.all():
                if event_activity.date_of_event.weekday() == availability.day_of_week:
                    if availability.overlaps(event_activity.start_time, event_activity.end_time):
                        start_time = max(event_activity.start_time, availability.start_time)
                        end_time = min(event_activity.end_time, availability.end_time)
                
                        # Check if the volunteer is already assigned to a shift at this time.
                        overlapping_shifts = VolunteerShift.objects.filter(
                            volunteer=volunteer,
                            event_activity__date_of_event=event_activity.date_of_event,
                            start_time__lt=end_time,
                            end_time__gt=start_time
                        )
                        if overlapping_shifts.exists():
                            continue
                    
                        shift_data = {
                            'volunteer': volunteer.id,
                            'event_activity': event_activity.id,
                            'start_time': start_time,
                            'end_time': end_time
                        }
                        shift_serializer = VolunteerShiftSerializer(data=shift_data)
                        if shift_serializer.is_valid(raise_exception=True):
                            shift_serializer.save()
        return volunteer