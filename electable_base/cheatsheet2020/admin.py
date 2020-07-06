from django.contrib import admin

from .models import Election, StateElection, CountyElection, DistrictElection, Office, Candidate

class ElectionAdmin(admin.ModelAdmin):
    readonly_fields=('id',)

class StateElectionAdmin(admin.ModelAdmin):
    readonly_fields=('id',)

# Register your models here.
admin.site.register(Election, ElectionAdmin)
admin.site.register(StateElection, ElectionAdmin)
admin.site.register(DistrictElection, ElectionAdmin)
admin.site.register(CountyElection, ElectionAdmin)
admin.site.register(Office)
admin.site.register(Candidate)