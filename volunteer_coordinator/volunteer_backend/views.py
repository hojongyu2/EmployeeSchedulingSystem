from django.contrib.auth import login, logout, authenticate
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .forms import CustomUserCreationForm
from django.views.decorators.csrf import csrf_protect
from .serializers import CustomUserSerializer
from django.forms.utils import ErrorDict

@csrf_protect
@api_view(['POST'])
def register(request):
    try:
        form = CustomUserCreationForm(request.data)
        if form.is_valid():
            user = form.save()
            login(request, user)
            user_serializer = CustomUserSerializer(user)
            return JsonResponse({"detail": "User registered and logged in successfully.", 'current_user': user_serializer.data}, status=status.HTTP_201_CREATED)
        else:
            raise ValidationError("Form is not valid.")
    except ValidationError as e:
        form_errors = ErrorDict(form.errors).as_json()
        return Response({"detail": str(e), "form_errors": form_errors}, status=status.HTTP_400_BAD_REQUEST)

@csrf_protect
@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, username=email, password=password)
    if user is not None:
        login(request, user)
        return Response({"detail": "User logged in successfully."}, status=status.HTTP_200_OK)
    return Response({"detail": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)

@csrf_protect
@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({"detail": "User logged out successfully."}, status=status.HTTP_200_OK)
