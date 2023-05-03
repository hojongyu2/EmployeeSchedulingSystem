from django.urls import path
from .views import register, login_view, logout_view

urlpatterns = [
    path('api/register/', register, name='api_register'),
    path('api/login/', login_view, name='api_login'),
    path('api/logout/', logout_view, name='api_logout'),
]