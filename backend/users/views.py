from django.conf import settings
from django.core import signing
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from .models import User
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    ForgotPasswordSerializer,
)

def create_token(user):
    data = {'user_id': user.id}
    return signing.dumps(data, key=settings.SECRET_KEY)

def decode_token(token):
    try:
        data = signing.loads(token, key=settings.SECRET_KEY, max_age=60 * 60 * 24)
        return data['user_id']
    except signing.BadSignature:
        return None

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'User registered successfully'},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user = User.objects.get(email=email, status='active')
        except User.DoesNotExist:
            return Response({'detail': 'Invalid credentials'}, status=401)

        if not check_password(password, user.password_hash):
            return Response({'detail': 'Invalid credentials'}, status=401)

        token = create_token(user)
        return Response({'token': token, 'role': user.role}, status=200)

class MeView(APIView):
    def get(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if not auth_header.startswith('Bearer '):
            return Response({'detail': 'Unauthorized'}, status=401)
        token = auth_header.replace('Bearer ', '')
        user_id = decode_token(token)
        if not user_id:
            return Response({'detail': 'Unauthorized'}, status=401)
        user = User.objects.get(id=user_id)
        return Response(
            {
                'full_name': user.full_name,
                'email': user.email,
                'role': user.role,
            },
            status=200,
        )

class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Do not leak info
            return Response(
                {'detail': 'If that email exists, a reset link was sent.'},
                status=200,
            )
        token = create_token(user)
        # For assignment/demo, just return token in response
        return Response({'reset_token': token}, status=200)
