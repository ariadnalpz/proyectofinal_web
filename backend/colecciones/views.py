from rest_framework import viewsets
from .models import Coleccion
from .serializers import ColeccionSerializer

class ColeccionViewSet(viewsets.ModelViewSet):
    queryset = Coleccion.objects.all()
    serializer_class = ColeccionSerializer