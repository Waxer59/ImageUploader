# ImageUploader
Esta es una aplicacion para subir imagenes y visualizarlas con la url dada

# Levantar el proyecto en modo dev

1. Completar el archivo de variables de entorno __.env.template__ y una vez completado renombrarlo a .env

2. Instalar todas las dependencias del proyecto con el comando: 
```
yarn
```

3. Crear la imagen de docker para levantar la base de datos con el comando:
```
docker-compose -f docker-compose.yml --env-file .env up --build
```
4. Si ya esta creada la imagen pero no esta levantada la base de datos levantar la base de datos con el comado:
```
docker-compose up -d
```

5. Ejecutar el proyecto con el comando:
```
yarn start:dev
```

## Tecnologias usadas
* Node
* Express
* MongoDB
* Docker
* Font Awesome
* HandleBars

## Notas
* Todas las imagenes son almacenadas localmente dentro de la carpeta __data__
* Los formatos de imagenes aceptados son [JPG, PNG, JPEG]