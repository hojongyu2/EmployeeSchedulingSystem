from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import VolunteerSerializer, EventSerializer, EventActivitySerializer, VolunteerShiftSerializer, GetEventActivitySerializer
from rest_framework import status
from .models import Activity, Event, VolunteerShift, EventActivity, Volunteer
from django.shortcuts import redirect
from django.conf import settings
# Create your views here.

class VolunteerSignUpView(APIView):
    def post(self, request, format=None):
        serializer = VolunteerSerializer(data=request.data)
        if serializer.is_valid():
            volunteer = serializer.save()
            return Response({'id': volunteer.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class EventAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        for event_data, event in zip(serializer.data, events):
            event_data['id'] = event.id
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        data = request.data

        # Create Event instance
        event_data = {k: v for k, v in data.items() if k != 'activities'}
        event_serializer = EventSerializer(data=event_data)
        if event_serializer.is_valid(raise_exception=True):
            event = event_serializer.save()
        else:
            return Response(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Create Activity and EventActivity instances
        activities_data = data.get('activities', [])
        for activity_data in activities_data:
            activity_name = activity_data.get('activity')
            activity, _ = Activity.objects.get_or_create(name=activity_name)
            event_activity_data = {**activity_data, 'event': event.id, 'activity': activity.id}
            event_activity_serializer = EventActivitySerializer(data=event_activity_data)
            if event_activity_serializer.is_valid(raise_exception=True):
                event_activity_serializer.save()
            else:
                return Response(event_activity_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(event_serializer.data, status=status.HTTP_201_CREATED)

class EventActivityAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        event_id = int(request.data['eventID'])
        
        if event_id is None:
            return Response({"error": "eventID parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Get all event activities associated with the given event ID
        event_activities = EventActivity.objects.filter(event__id=event_id)

        serializer = GetEventActivitySerializer(event_activities, many=True)
        for data, event_activity in zip(serializer.data, event_activities):
            activity_id = data['activity']
            data['activity'] = Activity.objects.get(id=activity_id).name
            data['event_activity_id'] = event_activity.id
        return Response(serializer.data, status=status.HTTP_200_OK)


class VolunteerShiftsAPIview(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        event_activity_id = request.data.get('eventActivityID')
        
        if event_activity_id is None:
            return Response({"error": "eventActivityID parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Get all volunteer shifts associated with the event activity ID
        volunteer_shifts = VolunteerShift.objects.filter(event_activity__id=event_activity_id)
        
        serializer = VolunteerShiftSerializer(volunteer_shifts, many=True)

        # Replace the volunteer id with the volunteer's name in the serialized data
        for data in serializer.data:
            volunteer_id = data['volunteer']
            data['volunteer'] = Volunteer.objects.get(id=volunteer_id).name
        
        return Response(serializer.data, status=status.HTTP_200_OK)

class ConfirmShiftView(APIView):
    def get(self, request, shift_id, confirmed_value, format=None):
        try:
            shift = VolunteerShift.objects.get(pk=shift_id)

            if confirmed_value.lower() == 'yes':
                shift.confirmed = True
                shift.save()
                return redirect(f'{settings.FRONTEND_URL}#/confirmation/yes')
            elif confirmed_value.lower() == 'no':
                shift.confirmed = False
                shift.save()
                return redirect(f'{settings.FRONTEND_URL}#/confirmation/no')
            else:
                return Response({'error': 'Invalid confirmed_value'}, status=status.HTTP_400_BAD_REQUEST)

        except VolunteerShift.DoesNotExist:
            return Response({'error': 'Shift not found'}, status=status.HTTP_404_NOT_FOUND)
