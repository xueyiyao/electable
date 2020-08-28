from rest_framework import routers
from .api import FederalCandidateViewSet, FederalOfficeViewSet, FederalElectionViewSet
from .api import StateElectionViewSet, StateOfficeViewSet, StateCandidateViewSet
from .api import LocalElectionViewSet, LocalOfficeViewSet, LocalCandidateViewSet

router = routers.DefaultRouter()
router.register('api/federal_election', FederalElectionViewSet, 'federal_election')
router.register('api/federal_offices', FederalOfficeViewSet, 'federal_offices')
router.register('api/federal_candidates', FederalCandidateViewSet, 'federal_candidates')
router.register('api/state_election', StateElectionViewSet, 'state_election')
router.register('api/state_offices', StateOfficeViewSet, 'state_offices')
router.register('api/state_candidates', StateCandidateViewSet, 'state_candidates')
router.register('api/local_election', LocalElectionViewSet, 'local_election')
router.register('api/local_offices', LocalOfficeViewSet, 'local_offices')
router.register('api/local_candidates', LocalCandidateViewSet, 'local_candidates')

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
