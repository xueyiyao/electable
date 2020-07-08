from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
# from django.template import loader
from django.shortcuts import render, get_object_or_404
from django.views.generic import RedirectView

from .models import FederalElection, StateElection, LocalElection, LocalOffice, Candidate

# Create your views here.
def index(request):
    elections_list = LocalElection.objects.order_by('-county')
    # output = ', '.join([q.county for q in elections_list])
    # template = loader.get_template('cheatsheet2020/index.html')
    context = {
        'election_list': elections_list,
    }
    return render(request, 'cheatsheet2020/index.html', context)

def search(request):
    if request.method == 'POST':
        local_area_name = request.POST.get('textfield', None).lower()
        local_election = get_object_or_404(LocalElection, local_area = local_area_name)
        state_election = get_object_or_404(StateElection, state = local_election.state.state)
        federal_election = get_object_or_404(FederalElection)
        return render(request, 'cheatsheet2020/list.html', {'federal_election': federal_election, 'state_election': state_election, 'local_election': local_election})
    else:
        return HttpResponseRedirect('/cheatsheet2020/')

def candidates_list(request, election_id, office_name):
    local_election = get_object_or_404(LocalElection, id = election_id)
    office = get_object_or_404(LocalOffice, local_election = local_election, name = office_name)
    return render(request, 'cheatsheet2020/candidates_list.html', {'election_id': election_id ,'office': office})

def candidate_details(request, election_id, office_name, candidate_id):
    candidate = get_object_or_404(Candidate, id=candidate_id)
    return render(request, 'cheatsheet2020/candidate_detail.html', {'candidate': candidate, 'office_name': office_name})