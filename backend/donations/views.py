from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Donation
from .serializers import DonationSerializer

class DonationListCreateView(APIView):
    def post(self, request):
        serializer = DonationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=request.user.id)
            return Response({"message": "Donation created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        donations = Donation.objects.filter(user_id=request.user.id)
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data)
