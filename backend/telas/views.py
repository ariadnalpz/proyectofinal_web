from rest_framework import viewsets
from .models import Tela
from .serializers import TelaSerializer

class TelaViewSet(viewsets.ModelViewSet):
    queryset = Tela.objects.all()
    serializer_class = TelaSerializer