# ImageUploader
This is an application to upload images and visualize them with the given url

# Run the project in dev mode

1. Complete the environment variable file __.env.template__ and once completed rename it to __.env__

2. Install all project dependencies with the command: 
```
yarn
```

3. Create the docker image to run the database with the command (Important to have the docker daemon open):
```
docker-compose -f docker-compose.yml --env-file .env up --build
```

4. If the image has already been created, use this command to create the database:
```
docker-compose up -d
```

1. Run the project with the command:
```
yarn start:dev
```

## Technologies used
* Nestjs
* MongoDB
* Docker
* Font Awesome
* HandleBars

## Notes
* All images are stored locally inside the __data__ folder.
* Accepted image formats are __[JPG, PNG, JPEG]__.