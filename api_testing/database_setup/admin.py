from django.contrib import admin
from .models import Volunteer, VolunteerShift, Activity, Event, Availability, EventActivity
# Register your models here.

admin.site.register(EventActivity)
admin.site.register(Availability)
admin.site.register(Event)
admin.site.register(Activity)
admin.site.register(VolunteerShift)
admin.site.register(Volunteer)