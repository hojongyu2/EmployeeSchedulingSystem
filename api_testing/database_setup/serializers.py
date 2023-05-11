from rest_framework import serializers
from .models import Volunteer, Activity, Availability, Event, EventActivity

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'name']


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['day_of_week', 'start_time', 'end_time']


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

        for activity in activity_data:
            desired_activity, _ = Activity.objects.get_or_create(name=activity['name'])
            volunteer.desired_activities.add(desired_activity)

        for availability in availability_data:
            Availability.objects.create(volunteer=volunteer, **availability)

        volunteer.assign_to_shift()
        return volunteer

class EventActivitySerializer(serializers.ModelSerializer):
    event = serializers.IntegerField()
    activity = serializers.IntegerField()
    class Meta:
        model = EventActivity
        fields = ['event', 'activity', 'date_of_event', 'start_time', 'end_time', 'required_volunteers']

    def create(self, validated_data):
        event_id = validated_data.pop('event')
        activity_id = validated_data.pop('activity')
        event = Event.objects.get(id=event_id)
        activity = Activity.objects.get(id=activity_id)
        event_activity = EventActivity.objects.create(event=event, activity=activity, **validated_data)
        return event_activity


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['name', 'date_of_event', 'start_time', 'end_time']