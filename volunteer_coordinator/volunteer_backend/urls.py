from django.urls import path
from django.http import HttpResponse
from .views import register, login_view, logout_view

def send_home(request):
    index = open("static/index.html").read()
    return HttpResponse(index)

urlpatterns = [
    path('', send_home),
    path('api/register/', register, name='api_register'),
    path('api/login/', login_view, name='api_login'),
    path('api/logout/', logout_view, name='api_logout'),
]