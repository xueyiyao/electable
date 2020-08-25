from .models import FederalCandidate, FederalOffice, FederalElection, StateElection, StateOffice, StateCandidate
from rest_framework import viewsets, permissions
from .serializers import FederalCandidateSerializer, FederalOfficeSerializer, FederalElectionSerializer
from .serializers import StateElectionSerializer, StateOfficeSerializer, StateCandidateSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

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
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    ordering_fields = ['score']
    filterset_fields = ['office__id']

class StateElectionViewSet(viewsets.ModelViewSet):
    queryset = StateElection.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = StateElectionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['state']

class StateOfficeViewSet(viewsets.ModelViewSet):
    queryset = StateOffice.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = StateOfficeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name', 'state_election__state']

class StateCandidateViewSet(viewsets.ModelViewSet):
    queryset = StateCandidate.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = StateCandidateSerializer
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    ordering_fields = ['score']
    filterset_fields = ['office__id', 'office__state_election__state']