# Usa la imagen oficial de Ubuntu como base
FROM ubuntu:latest

# Actualiza el sistema y luego instala Apache
RUN apt-get update && apt-get install -y apache2

# Expone el puerto 80 para acceder al servidor Apache
EXPOSE 80
# Copia el archivo index.html al directorio de documentos de Apache
COPY index.html /var/www/html/

# Copia las carpetas src y doc al directorio de documentos de Apache
COPY ./ /var/www/html/

# Inicia el servicio de Apache al ejecutar el contenedor
CMD ["apache2ctl", "-D", "FOREGROUND"]