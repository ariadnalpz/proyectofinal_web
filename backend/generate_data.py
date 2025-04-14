import os
import django
import random
from faker import Faker
import pytz

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ropa_backend.settings')  
django.setup()

from colecciones.models import Coleccion
from estilos.models import Estilo
from telas.models import Tela
from ventas.models import Venta

fake = Faker()

def generate_colecciones():
    temporadas = ['Primavera-Verano', 'Otoño-Invierno', 'Primavera', 'Verano', 'Otoño', 'Invierno']
    tendencias = ['Casual', 'Formal', 'Bohemio', 'Minimalista', 'Urbano', 'Vintage']
    for _ in range(4000):  
        Coleccion.objects.create(
            nombre=fake.word().capitalize() + " Collection",  
            temporada=random.choice(temporadas),
            tendencia=random.choice(tendencias),
            stock=random.randint(1, 100)
        )

def generate_estilos():
    colores = ['Rojo', 'Azul', 'Negro', 'Blanco', 'Verde', 'Amarillo', 'Gris']
    tallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    preferencias = ['Alta', 'Media', 'Baja']
    for _ in range(4000):  
        Estilo.objects.create(
            nombre=fake.word().capitalize() + " Style",  
            color=random.choice(colores),
            talla=random.choice(tallas),
            preferencia_cliente=random.choice(preferencias)
        )

def generate_telas():
    tipos = ['Algodón', 'Lino', 'Seda', 'Poliéster', 'Lana', 'Denim']
    colores = ['Rojo', 'Azul', 'Negro', 'Blanco', 'Verde', 'Amarillo', 'Gris']
    for _ in range(4000):  
        Tela.objects.create(
            tipo=random.choice(tipos),
            cantidad=random.randint(10, 500),
            color=random.choice(colores)
        )

def generate_ventas():
    regiones = ['Norte', 'Sur', 'Este', 'Oeste', 'Centro']
    estilos = Estilo.objects.all()
    if not estilos: 
        print("No hay estilos, creando uno por defecto...")
        estilo_default = Estilo.objects.create(
            nombre="Default Style",
            color="Negro",
            talla="M",
            preferencia_cliente="Media"
        )
        estilos = [estilo_default]
    
    for _ in range(4000): 
        estilo_seleccionado = random.choice(estilos)
        naive_date = fake.date_time()
        aware_date = naive_date.replace(tzinfo=pytz.UTC) 
        Venta.objects.create(
            region=random.choice(regiones),
            cantidad=random.randint(1, 50),
            fecha=aware_date,
            estilo=estilo_seleccionado.nombre  
        )

if __name__ == '__main__':
    print("Generando colecciones...")
    generate_colecciones()
    print("Generando estilos...")
    generate_estilos()
    print("Generando telas...")
    generate_telas()
    print("Generando ventas...")
    generate_ventas()
    print("Datos generados exitosamente.")