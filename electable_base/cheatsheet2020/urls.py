from django.urls import path

from . import views

app_name = 'cheatsheet2020'
urlpatterns = [
    path('', views.index, name='index'),
    path('search/', views.search, name='search'),
    path('<int:election_id>/<str:office_name>/', views.candidates_list, name='candidates_list'),
    path('<int:election_id>/<str:office_name>/<int:candidate_id>/', views.candidate_details, name='candidate_details')
]