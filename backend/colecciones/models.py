from django.db import models

class Coleccion(models.Model):
    nombre = models.CharField(max_length=100)
    temporada = models.CharField(max_length=50)
    tendencia = models.CharField(max_length=50)
    stock = models.IntegerField()

    def __str__(self):
        return f"{self.nombre} - {self.temporada}"