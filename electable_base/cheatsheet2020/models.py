from django.db import models
from localflavor.us.models import USStateField

# Create your models here.
class Election(models.Model):

    def __str__(self):
        return 'ElectionID: ' + str(self.id)

class FederalElection(Election):

    def __str__(self):
        return 'US Election'

class StateElection(Election):
    federal = models.ForeignKey(FederalElection, on_delete=models.CASCADE)
    state = USStateField(primary_key=True)
    num_districts_in_state = models.IntegerField()
    num_counties_in_state = models.IntegerField()

    def __str__(self):
        return self.state + ' Election'

class LocalElection(Election):
    state = models.ForeignKey(StateElection, on_delete=models.CASCADE)
    local_area = models.CharField(max_length=50, primary_key=True)

    def __str__(self):
        return '(' + self.state.state + ') Local Election: ' + self.local_area.title()

    def get_name(self):
        return self.local_area



class Office(models.Model):
    BRANCH_CHOICES= (
        ('exe', 'Executive'),
        ('leg', 'Legislative'),
        ('jud', 'Judicial'),
        ('oth', 'Other'),
    )

    branch = models.CharField(max_length=3, choices=BRANCH_CHOICES, default='exe')

class FederalOffice(Office):
    """
    For US President, US Senate, and US House of Representatives
    """
    federal_election = models.ForeignKey(FederalElection, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    class Meta:
        unique_together = ('federal_election', 'name',)

    def __str__(self):
        return 'Office: ' + self.name.title()

class StateOffice(Office):
    """
    For State Governors, State Senate, State Assembly, etc.
    """
    state_election = models.ForeignKey(StateElection, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    class Meta:
        unique_together = ('state_election', 'name',)

    def __str__(self):
        return 'Office: ' + self.name.title() + ' of ' + self.state_election.state

class LocalOffice(Office):
    """
    For Municipal Offices, School Board, etc. 
    """
    local_election = models.ForeignKey(LocalElection, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    class Meta:
        unique_together = ('local_election', 'name',)

    def __str__(self):
        return 'Office: ' + self.name.title() + ' of ' + self.local_election.local_area.title()



class Candidate(models.Model):
    name = models.CharField(max_length=200)
    score = models.PositiveIntegerField(default=0)

    def __str__(self):
        return 'Candidate Name: ' + self.name

class FederalCandidate(Candidate):
    office = models.ForeignKey(FederalOffice, on_delete=models.CASCADE)

class StateCandidate(Candidate):
    office = models.ForeignKey(StateOffice, on_delete=models.CASCADE)

class LocalCandidate(Candidate):
    office = models.ForeignKey(LocalOffice, on_delete=models.CASCADE)
