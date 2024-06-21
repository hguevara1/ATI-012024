import json
import os
from urllib.parse import parse_qs
from wsgiref.simple_server import make_server
import http.cookies

def application(environ, start_response):
    
    valores=parse_qs(environ['QUERY_STRING'])
    idioma=valores.get('idioma', 'Es')
    config_idiomas = {
    'Es': 'configES.json',
    'En': 'configEN.json',
    'Pt': 'configPT.json'
    }
    idioma1 = config_idiomas.get(idioma[0], 'configES.json')
    # Unir la ruta relativa al archivo, utilizando el separador adecuado
    ruta_archivo = os.path.join( "/var/www/html", "src", "perfiles", "datos", "index.json")

    # Abrir el archivo en modo lectura
    with open(ruta_archivo, "r", encoding='utf-8') as archivo:
        data=json.load(archivo)
    
    
    conf_path = os.path.join( "/var/www/html", "src", "perfiles", "conf", idioma1)
    with open(conf_path, "r", encoding='utf-8') as f:
        data1 = json.load(f)
    datos = list(data1.values())
    lista=cargarCuadros(data)

    status = '200 OK'
    headers = [('Content-Type', 'text/html')]
    start_response(status, headers)
    ruta_archivo = os.path.join( "/var/www/html",  "src", "index.html")
    with open(ruta_archivo, "r", encoding='utf-8') as f:
        html = f.read()


    datos_perfil={
        'sitio1': datos[0][0],
        'sitio2': datos[0][1],
        'sitio3': datos[0][2],
        'saludo': datos[13] + ", " + data[0]['nombre'],
        'boton': datos[12],
        'entrada': datos[4] + "...",
        'copyright': datos[3],
        'perfiles': lista
    }
    

    html=html % datos_perfil

    return [bytes(html, 'utf-8')]

def cargarCuadros(data):
    lista3=""
    cantidadElementos=len(data)
    contadorPrincipal=0
    while cantidadElementos >0:
        contador=0
        lista1=""
        while contador < 4 and cantidadElementos > 0:
            lista1 += f'<div class="contenedor" id="{data[contadorPrincipal]["ci"]}"><img src="/src/perfiles/{data[contadorPrincipal]["imagen"]}" alt="Imagen "><p>{data[contadorPrincipal]["nombre"]}</p></div>'
            contador+=1
            contadorPrincipal+=1
            cantidadElementos-=1
        lista2=f'<div class="fila">{lista1}</div>'
        lista3+=lista2
    return lista3

'''httpd = make_server('localhost', 8080, application)
httpd.handle_request()'''
