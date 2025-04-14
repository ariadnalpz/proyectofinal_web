from rest_framework import serializers
from .models import Estilo

class EstiloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estilo
        fields = '__all__'