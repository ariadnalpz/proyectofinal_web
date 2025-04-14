from django.db import models

class Venta(models.Model):
    estilo = models.ForeignKey('estilos.Estilo', on_delete=models.CASCADE)
    region = models.CharField(max_length=100)
    cantidad = models.IntegerField()
    fecha = models.DateField()

    def __str__(self):
        return f"{self.estilo.nombre} - {self.region}"