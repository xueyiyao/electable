from rest_framework import serializers
from .models import FederalCandidate, FederalOffice, FederalElection

class FederalElectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FederalElection
        fields = '__all__'

class FederalOfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FederalOffice
        fields = '__all__'

class FederalCandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FederalCandidate
        fields = '__all__'