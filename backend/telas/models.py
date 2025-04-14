from django.db import models

class Tela(models.Model):
    tipo = models.CharField(max_length=100)
    cantidad = models.FloatField()  # En metros
    color = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.tipo} - {self.color}"