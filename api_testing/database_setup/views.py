from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import VolunteerSerializer, EventSerializer, EventActivitySerializer
from rest_framework import status
from .models import Activity, Event, VolunteerShift
# Create your views here.

class VolunteerSignUpView(APIView):
    def post(self, request, format=None):
        serializer = VolunteerSerializer(data=request.data)
        if serializer.is_valid():
            volunteer = serializer.save()
            return Response({'id': volunteer.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class EventAPIView(APIView):
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

class EventActivity(APIView):
    def post(self, request):
        event_id = request.data.eventID
        
        if event_id is None:
            return Response({"error": "eventID parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Get all event activities associated with the given event ID
        event_activities = EventActivity.objects.filter(event__id=event_id)

        serializer = EventActivitySerializer(event_activities, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class VolunteerShifts(APIView):
    def post(self, request):
        event_activity_id = request.data.eventActivityID
        
        if event_activity_id is None:
            return Response({"error": "eventActivityID parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Get all volunteer shifts associated with the event activity ID
        volunteer_shifts = VolunteerShift.objects.filter(event_activity__id=event_activity_id)
        
        serializer = VolunteerSerializer(volunteer_shifts, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)