import json
import os
import re
from urllib import request
from urllib.parse import parse_qs
from wsgiref.simple_server import make_server
import http.cookies

def application(environ, start_response):

    # Obtener cookies de la solicitud
    # Access cookies using http.cookies
    # Acceder a valores de cookies
    request = environ.get('HTTP_COOKIE', '')
    cookies = http.cookies.SimpleCookie(request)
    cedula = cookies['cookie1'].value
    idioma = cookies['cookie2'].value
    

    config_idiomas = {
    'Es': 'configES.json',
    'En': 'configEN.json',
    'Pt': 'configPT.json'
    }
    idioma1 = config_idiomas.get(idioma, 'configES.json')
    
    # Unir la ruta relativa al archivo, utilizando el separador adecuado
    ruta_archivo = os.path.join( "/var/www/html", "src", "perfiles", cedula, "perfil.json")

    # Abrir el archivo en modo lectura
    with open(ruta_archivo, "r", encoding='utf-8') as archivo:
        data=json.load(archivo)
    
    
    conf_path = os.path.join( "/var/www/html", "src", "perfiles", "conf", idioma1)
    with open(conf_path, "r", encoding='utf-8') as f:
        data1 = json.load(f)
    datos = list(data1.values())

    status = '200 OK'
    headers = [('Content-Type', 'text/html'),]
    start_response(status, headers)
    ruta_archivo = os.path.join( "/var/www/html",  "src", "perfil.html")
    with open(ruta_archivo, "r", encoding='utf-8') as f:
        html = f.read()

    replacement_email = f'<a href="https://www.example.com">{data["email"]}</a>'
    new_string=re.sub(r"\[email\]", replacement_email, datos[11])
    datos_perfil={
        'fotoperfil': f'/src/perfiles/{cedula}/{data["imagen"]}',
        'informacion-perfil': data["nombre"],
        'descripcion-persona': data["descripcion"],
        'datos-favoritos1': f'{datos[6]}{data["color"]}',
        'datos-favoritos2': f'{datos[7]}{data["libro"]}',
        'datos-favoritos3': f'{datos[8]}{data["musica"]}',
        'datos-favoritos4': f'{datos[9]}{data["video_juego"]}',
        'datos-favoritos5': f'{datos[10]}{data["lenguajes"]}',
        'textoNuevo': new_string
    }
    

    html=html % datos_perfil

    return [bytes(html, 'utf-8')]


'''httpd = make_server('localhost', 8080, application)
httpd.handle_request()'''
