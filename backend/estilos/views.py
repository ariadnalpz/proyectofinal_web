from rest_framework import viewsets
from .models import Estilo
from .serializers import EstiloSerializer

class EstiloViewSet(viewsets.ModelViewSet):
    queryset = Estilo.objects.all()
    serializer_class = EstiloSerializer