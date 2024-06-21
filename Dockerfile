# Utiliza una imagen base con Ubuntu
FROM ubuntu:latest
# Instala Apache , Python y WSGI
RUN apt-get update && apt-get install -y
RUN apt-get install apache2 -y
RUN apt-get install python3 -y

RUN apt install apache2 apache2-utils ssl-cert libapache2-mod-wsgi-py3 -y
RUN apt-get install python3-pip -y
RUN echo "WSGIScriptAlias /ATI/index.py /var/www/html/my_app.py" >> /etc/apache2/sites-available/000-default.conf
RUN echo "WSGIScriptAlias /ATI/perfil.py /var/www/html/my_app1.py" >> /etc/apache2/sites-available/000-default.conf
# Copia tu aplicación Python al contenedor
RUN mkdir /var/www/html/src
COPY my_app.py /var/www/html/
COPY my_app1.py /var/www/html/
COPY mod-wsgi.conf /etc/apache2/conf-available/ 
COPY src /var/www/html/src/
EXPOSE 80

ENTRYPOINT ["/bin/bash"]