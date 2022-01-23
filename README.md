# HornLog Client App

This is the app for HornLog. 

## Important Commands
```bash 
# Dev - Build and tag the Docker image
$ docker build -t hornlog-client:dev .

# Dev - Run the app
$ docker run \
    -itd \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    hornlog-client:dev

# Dev - Run the app with docker-compose
$ docker-compose up -d --build

# Prod - Build and tag the Docker image
$ docker build -f Dockerfile.prod -t hornlog-client:prod .

# Prod - Run the app 
$ docker run -itd --rm -p 1337:80 hornlog-client:prod

# Prod - Run the app with docker-compose
$ docker-compose -f docker-compose.prod.yml up -d --build

# Stop the app
$ docker stop hornlog-client

# Stop the app with docker-compose
$ docker-compose stop
```

