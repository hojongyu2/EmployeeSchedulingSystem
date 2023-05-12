from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import VolunteerSerializer, EventSerializer, EventActivitySerializer
from rest_framework import status
from .models import Activity, Event
# Create your views here.

class VolunteerSignUpView(APIView):
    def post(self, request, format=None):
        print(request.data)
        serializer = VolunteerSerializer(data=request.data)
        if serializer.is_valid():
            volunteer = serializer.save()
            return Response({'id': volunteer.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class EventAPIView(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
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

class VolunteerShifts(APIView):
    def get(self, request):
        pass
        # get all volunteer shifts related to event activity (request has event activity)
