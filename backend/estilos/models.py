from django.db import models

class Estilo(models.Model):
    nombre = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    talla = models.CharField(max_length=10)
    preferencia_cliente = models.TextField()

    def __str__(self):
        return self.nombre