from django.db import models
from localflavor.us.models import USStateField

# Create your models here.
class Election(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return 'ElectionID: ' + str(self.id)

class StateElection(Election):
    state = USStateField(primary_key=True)
    num_districts_in_state = models.IntegerField()
    num_counties_in_state = models.IntegerField()

    def __str__(self):
        return self.state + ' Election'

class DistrictElection(Election):
    state = models.ForeignKey(StateElection, on_delete=models.CASCADE)
    district = models.IntegerField(primary_key=True)

    def __str__(self):
        return self.state.__str__() + ': District ' + self.district

    def get_name(self):
        return str(self.district)

class CountyElection(Election):
    state = models.ForeignKey(StateElection, on_delete=models.CASCADE)
    county = models.CharField(max_length=50, primary_key=True)

    def __str__(self):
        return self.state.__str__() + ': County of ' + self.county

    def get_name(self):
        return self.county

class Office(models.Model):
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    def __str__(self):
        return 'Office: ' + self.name

class Candidate(models.Model):
    office = models.ForeignKey(Office, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    score = models.PositiveIntegerField(default=0)

    def __str__(self):
        return 'Candidate Name: ' + self.name
