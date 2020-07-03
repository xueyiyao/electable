from django.db import models
from localflavor.us.models import USStateField

# Create your models here.
class Election(models.Model):
    name = models.CharField(max_length=200)

class StateElection(Election):
    state = USStateField(primary_key=True)
    num_districts_in_state = models.IntegerField()
    num_counties_in_state = models.IntegerField()

class DistrictElection(Election):
    state = models.ForeignKey(StateElection, on_delete=models.CASCADE)
    district = models.IntegerField(primary_key=True)

class CountyElection(Election):
    state = models.ForeignKey(StateElection, on_delete=models.CASCADE)
    county = models.CharField(max_length=50, primary_key=True)

class Office(models.Model):
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

class Candidate(models.Model):
    office = models.ForeignKey(Office, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
