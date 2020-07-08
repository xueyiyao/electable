from django.contrib import admin

from .models import FederalElection, StateElection, LocalElection
from .models import FederalOffice, FederalCandidate, StateOffice, StateCandidate, LocalOffice, LocalCandidate

class ElectionAdmin(admin.ModelAdmin):
    readonly_fields=('id',)

# Register your models here.
admin.site.register(FederalElection, ElectionAdmin)
admin.site.register(StateElection, ElectionAdmin)
admin.site.register(LocalElection, ElectionAdmin)
admin.site.register(FederalOffice)
admin.site.register(FederalCandidate)
admin.site.register(StateOffice)
admin.site.register(StateCandidate)
admin.site.register(LocalOffice)
admin.site.register(LocalCandidate)