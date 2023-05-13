from django.urls import path
from database_setup.views import *
urlpatterns = [
     path('volunteer-signup/', VolunteerSignUpView.as_view(), name='signup'),
     path('event/', EventAPIView.as_view(), name='event'),
     path('event-activity/', EventActivityAPIView.as_view(), name='event-activity'),
     path('volunteer-shift/', VolunteerShiftsAPIview.as_view(), name='volunteer-shifts'),
     path('confirm-shift/<int:shift_id>/<str:confirmed_value>/', ConfirmShiftView.as_view(), name='confirm-shift')

]
