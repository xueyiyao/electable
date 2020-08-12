from .models import FederalCandidate, FederalOffice, FederalElection
from rest_framework import viewsets, permissions
from .serializers import FederalCandidateSerializer, FederalOfficeSerializer, FederalElectionSerializer

class FederalElectionViewSet(viewsets.ModelViewSet):
    queryset = FederalElection.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FederalElectionSerializer

class FederalOfficeViewSet(viewsets.ModelViewSet):
    queryset = FederalOffice.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FederalOfficeSerializer

class FederalCandidateViewSet(viewsets.ModelViewSet):
    queryset = FederalCandidate.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FederalCandidateSerializer