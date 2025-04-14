import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ropa_backend.settings') 
django.setup()

from colecciones.models import Coleccion
from estilos.models import Estilo
from telas.models import Tela
from ventas.models import Venta

def delete_ventas():
    print("Eliminando ventas...")
    Venta.objects.all().delete()

def delete_estilos():
    print("Eliminando estilos...")
    Estilo.objects.all().delete()

def delete_telas():
    print("Eliminando telas...")
    Tela.objects.all().delete()

def delete_colecciones():
    print("Eliminando colecciones...")
    Coleccion.objects.all().delete()

if __name__ == '__main__':
    delete_ventas()
    delete_estilos()
    delete_telas()
    delete_colecciones()
    print("Todos los registros han sido eliminados exitosamente.")