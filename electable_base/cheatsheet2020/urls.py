from rest_framework import routers
from .api import FederalCandidateViewSet, FederalOfficeViewSet, FederalElectionViewSet
from .api import StateElectionViewSet, StateOfficeViewSet, StateCandidateViewSet


router = routers.DefaultRouter()
router.register('api/federal_election', FederalElectionViewSet, 'federal_election')
router.register('api/federal_offices', FederalOfficeViewSet, 'federal_offices')
router.register('api/federal_candidates', FederalCandidateViewSet, 'federal_candidates')
router.register('api/state_election', StateElectionViewSet, 'state_election')
router.register('api/state_office', StateOfficeViewSet, 'state_office')
router.register('api/state_candidates', StateCandidateViewSet, 'state_candidates')

urlpatterns = router.urls


# from django.urls import path

# from . import views

# app_name = 'cheatsheet2020'
# urlpatterns = [
#     path('', views.index, name='index'),
#     path('search/', views.search, name='search'),
#     path('<int:election_id>/<str:office_name>/', views.candidates_list, name='candidates_list'),
#     path('<int:election_id>/<str:office_name>/<int:candidate_id>/', views.candidate_details, name='candidate_details')
# ]
