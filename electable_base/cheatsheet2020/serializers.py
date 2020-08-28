from rest_framework import serializers
from .models import FederalCandidate, FederalOffice, FederalElection, StateElection, StateOffice, StateCandidate
from .models import LocalElection, LocalOffice, LocalCandidate

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

class StateElectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateElection
        fields = '__all__'

class StateOfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateOffice
        fields = '__all__'

class StateCandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateCandidate
        fields = '__all__'

class LocalElectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocalElection
        fields = '__all__'

class LocalOfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocalOffice
        fields = '__all__'

class LocalCandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocalCandidate
        fields = '__all__'