import traceback
from django.test import TestCase
from django.db import IntegrityError

from .models import Election, FederalElection, StateElection, LocalElection
from .models import Office, FederalOffice, StateOffice, LocalOffice
from .models import Candidate, FederalCandidate, StateCandidate, LocalCandidate
# Create your tests here.

class ElectionModelTests(TestCase):
    def setUp(self):
        f_elec = FederalElection.objects.create()
        ca_elec = StateElection.objects.create(federal=f_elec, state='CA', num_districts_in_state=53, num_counties_in_state=58)
        wa_elec = StateElection.objects.create(federal=f_elec, state='WA', num_districts_in_state=10, num_counties_in_state=33)
        sb_elec = LocalElection.objects.create(state=ca_elec, local_area='santa barbara')
        sf_elec = LocalElection.objects.create(state=ca_elec, local_area='san francisco')

    def test_state_election_count(self):
        self.assertEquals(StateElection.objects.count(), 2)

    def test_local_election_count(self):
        self.assertEquals(LocalElection.objects.count(), 2)

    def test_state_election_primary_key(self):
        f_elec = FederalElection.objects.get(id=1)
        try:
            StateElection.objects.create(federal=f_elec, state='WA', num_districts_in_state=10, num_counties_in_state=33)
            self.fail("Failed to raise IntegrityError for test 'test_state_election_primary_key'.")
        except IntegrityError:
            pass

    def test_local_election_primary_key(self):
        ca_elec = StateElection.objects.get(state='CA')
        try:
            LocalElection.objects.create(state=ca_elec, local_area='santa barbara')
            self.fail("Failed to raise IntegrityError for test 'test_local_election_primary_key'.")
        except IntegrityError:
            pass

class OfficeModelTests(TestCase):
    def setUp(self):
        f_elec = FederalElection.objects.create()
        ca_elec = StateElection.objects.create(federal=f_elec, state='CA', num_districts_in_state=53, num_counties_in_state=58)
        sf_elec = LocalElection.objects.create(state=ca_elec, local_area='san francisco')
        StateOffice.objects.create(state_election=ca_elec, name='State Senator', branch='Legislative')
        LocalOffice.objects.create(local_election=sf_elec, name='Mayor')

    def test_state_office_count(self):
        ca_elec = StateElection.objects.get(state='CA')
        try:
            StateOffice.objects.create(state_election=ca_elec, name='Governor')
            self.assertEquals(StateOffice.objects.count(), 2)
        except Exception as e:
            trace_back = traceback.format_exc()
            message = str(e)+ " " + str(trace_back)
            print(message)

    def test_local_office_count(self):
        sf_elec = LocalElection.objects.get(local_area='san francisco')
        try:
            LocalOffice.objects.create(local_election=sf_elec, name='Superior Court Judge', branch='Judicial')
            self.assertEquals(LocalOffice.objects.count(), 2)
        except Exception as e:
            trace_back = traceback.format_exc()
            message = str(e)+ " " + str(trace_back)
            print(message)

    def test_state_office_primary_key_okay(self):
        f_elec = FederalElection.objects.get(id=1)
        wa_elec = StateElection.objects.create(federal=f_elec, state='WA', num_districts_in_state=10, num_counties_in_state=33)
        try: 
            StateOffice.objects.create(state_election=wa_elec, name='State Senator')
        except Exception as e:
            trace_back = traceback.format_exc()
            message = str(e)+ " " + str(trace_back)
            print(message)

    def test_state_office_primary_key_fail(self):
        ca_elec = StateElection.objects.get(state='CA')
        try:
            StateOffice.objects.create(state_election=ca_elec, name='State Senator')
            self.fail("Failed to raise IntegrityError for test 'test_state_office_primary_key_fail'.")
        except IntegrityError:
            pass

    def test_local_office_primary_key_okay(self):
        ca_elec = StateElection.objects.get(state='CA')
        sb_elec = LocalElection.objects.create(state=ca_elec, local_area='santa barbara')
        try: 
            LocalOffice.objects.create(local_election=sb_elec, name='Mayor')
        except Exception as e:
            trace_back = traceback.format_exc()
            message = str(e)+ " " + str(trace_back)
            print(message)

    def test_local_office_primary_key_fail(self):
        sf_elec = LocalElection.objects.get(local_area='san francisco')
        try: 
            LocalOffice.objects.create(local_election=sf_elec, name='Mayor')
            self.fail("Failed to raise IntegrityError for test 'test_local_office_primary_key_fail'.")
        except IntegrityError:
            pass

class CandidateModelTests(TestCase):
    def setUp(self):
        f_elec = FederalElection.objects.create()
        ca_elec = StateElection.objects.create(federal=f_elec, state='CA', num_districts_in_state=53, num_counties_in_state=58)
        sf_elec = LocalElection.objects.create(state=ca_elec, local_area='san francisco')
        st_senator = StateOffice.objects.create(state_election=ca_elec, name='State Senator', branch='Legislative')
        mayor = LocalOffice.objects.create(local_election=sf_elec, name='Mayor')
        StateCandidate.objects.create(office=st_senator, name='Jeanrique Pearson', score=75)
        StateCandidate.objects.create(office=st_senator, name='Ran Dim Gai', score=80)
        LocalCandidate.objects.create(office=mayor, name='John Doe', score=77)

    def test_state_candidate_count(self):
        self.assertEqual(StateCandidate.objects.count(), 2)

    def test_local_candidate_count(self):
        self.assertEqual(LocalCandidate.objects.count(), 1)

    def test_state_candidate_duplicates_allowed(self):
        ca_elec = StateElection.objects.get(state='CA')
        st_senator = StateOffice.objects.get(state_election=ca_elec, name='State Senator')
        StateCandidate.objects.create(office=st_senator, name='Jeanrique Pearson', score=99)

    def test_local_candidate_count(self):
        ca_elec = StateElection.objects.get(state='CA')
        sf_elec = LocalElection.objects.get(state=ca_elec, local_area='san francisco')
        mayor = LocalOffice.objects.get(local_election=sf_elec, name='Mayor')
        LocalCandidate.objects.create(office=mayor, name='John Doe', score=95)

    def test_candidate_score_cannot_be_negative(self):
        ca_elec = StateElection.objects.get(state='CA')
        st_senator = StateOffice.objects.get(state_election=ca_elec, name='State Senator')
        try:
            StateCandidate.objects.create(office=st_senator, name='Nat Possibal', score=-1)
        except IntegrityError:
            pass