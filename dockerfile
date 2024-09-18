#imagen base
FROM node:20

# Crear un directorio de trabajo
WORKDIR /app

# Instalar dependencias globales si es necesario (como Angular CLI)
RUN npm install -g @angular/cli

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar todo el código fuente a la carpeta de trabajo
COPY . .

# Exponer el puerto para acceder a la aplicación en desarrollo
EXPOSE 4200

# Iniciar el servidor de desarrollo
CMD ["ng", "serve"]