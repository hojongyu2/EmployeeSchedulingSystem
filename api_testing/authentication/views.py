from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from .serializers import UserSerializer
from .forms import CustomUserCreationForm

@api_view(['POST'])
def register(request):
    form = CustomUserCreationForm(request.data)
    if form.is_valid():
        user = form.save()
        user_serializer = UserSerializer(user)
        refresh = RefreshToken.for_user(user)
        return Response({
            'detail': 'User registered and logged in successfully.',
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'current_user': user_serializer.data,
        }, status=status.HTTP_201_CREATED)
    else:
        form_errors = form.errors.as_json()
        return Response({
            'detail': "Form is not valid.",
            "form_errors": form_errors
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    print('hello')
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'detail': 'Logged in successfully',
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    else:
        return Response({
            'detail': 'Invalid credentials',
        }, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout_view(request):
    try:
        return Response({
            'detail': 'Logged out successfully'
        })
    except Exception as e:
        return Response({
            'detail': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)
