from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
# from django.template import loader
from django.shortcuts import render, get_object_or_404

from .models import CountyElection, DistrictElection, StateElection, Election, Office, Candidate

# Create your views here.
def index(request):
    elections_list = CountyElection.objects.order_by('-county')
    # output = ', '.join([q.county for q in elections_list])
    # template = loader.get_template('cheatsheet2020/index.html')
    context = {
        'election_list': elections_list,
    }
    return render(request, 'cheatsheet2020/index.html', context)

def search(request):
    if request.method == 'POST':
        county_name = request.POST.get('textfield', None)
        county_election = get_object_or_404(CountyElection, county = county_name)
        return render(request, 'cheatsheet2020/list.html', {'county_election': county_election})
    else:
        return render(request, 'cheatsheet2020/index.html')

def candidates_list(request, election_id, office_name):
    office = get_object_or_404(Office, name = office_name)
    return render(request, 'cheatsheet2020/candidates_list.html', {'election_id': election_id ,'office': office})

def candidate_details(request, election_id, office_name, candidate_id):
    candidate = get_object_or_404(Candidate, id=candidate_id)
    return render(request, 'cheatsheet2020/candidate_detail.html', {'candidate': candidate, 'office_name': office_name})