from django.urls import path
from database_setup.views import *
urlpatterns = [
     path('volunteer-signup/', VolunteerSignUpView.as_view(), name='signup'),
     path('event/', EventAPIView.as_view(), name='event'),
]
