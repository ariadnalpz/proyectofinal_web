from rest_framework import serializers
from .models import Coleccion

class ColeccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coleccion
        fields = '__all__'