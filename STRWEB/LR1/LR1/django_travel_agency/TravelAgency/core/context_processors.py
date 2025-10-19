# context_processors.py
from .models import AgencyDetails

def agency_context(request):
    """Добавляет данные агентства в контекст всех шаблонов"""
    agency = AgencyDetails.objects.first()
    return {
        'agency': agency,
    }
