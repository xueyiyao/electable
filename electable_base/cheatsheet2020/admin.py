from django.contrib import admin

from .models import Election, StateElection, CountyElection, DistrictElection, Office, Candidate

# Register your models here.
admin.site.register(Election)
admin.site.register(StateElection)
admin.site.register(DistrictElection)
admin.site.register(CountyElection)
admin.site.register(Office)
admin.site.register(Candidate)