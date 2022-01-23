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

## 1. Initialization (development)
<!-- <details><summary>Setup the project for dev</summary> -->
### 1.1. Create a new project

```bash
$ npx create-react-app hornlog-client --use-npm
$ cd hornlog-client
```

### 1.2. Add Dockerfile to the root of the project
```dockerfile
# pull official base image
FROM node:alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install # --silent
# RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]
```

### 1.3. Add .dockerignore to the root of the project
```dockerignore
node_modules
build
.dockerignore
Dockerfile
Dockerfile.prod
```

### 1.4 Build and tag the Docker image
```bash
$ docker build -t hornlog-client:dev .
```

### 1.5. Run the app
```bash
$ docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    hornlog-client:dev
```
#### Explanation

1. The docker run command creates and runs a new container instance from the image we just created.

2. -it starts the container in interactive mode. Why is this necessary? As of version 3.4.1, react-scripts exits after start-up (unless CI mode is specified) which will cause the container to exit. Thus the need for interactive mode.

3. --rm removes the container and volumes after the container exits.

4. -v ${PWD}:/app mounts the code into the container at “/app”.

5. Since we want to use the container version of the “node_modules” folder, we configured another volume: -v /app/node_modules. You should now be able to remove the local “node_modules” flavor.

6. -p 3001:3000 exposes port 3000 to other Docker containers on the same network (for inter-container communication) and port 3001 to the host.

7. Finally, -e CHOKIDAR_USEPOLLING=true enables a polling mechanism via chokidar (which wraps fs.watch, fs.watchFile, and fsevents) so that hot-reloading will work.

9. Add -d to run the container in detached mode.

### 1.6. Use docker compose to run the app, add docker-compose.yml to the root of the project
```bash
version: '3.7'

services:
  hornlog-client:
    container_name: hornlog-client
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - '.:/app'
      - '/app/node_modules'
    ports:
      - 3001:3000
    environment:
      - CHOKIDAR_USEPOLLING=true
```

### 1.7. Run the app
```bash
$ docker-compose up -d --build
```

### 1.8. Stop the app
Check that is working then stop it. 
```bash
$ docker-compose stop 
```
</details>

## 2. Initialization (production)
<!-- <details><summary>Setup the project for prod</summary> -->

### 2.0 If you use React Router 
Create the following folder along with a nginx.conf file:
```
└── nginx
    └── nginx.conf
```

nginx.conf:
```nginx.conf
server {

  listen 80;

  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }

  error_page   500 502 503 504  /50x.html;

  location = /50x.html {
    root   /usr/share/nginx/html;
  }

}
```

### 2.1. create a separate Dockerfile for use in production called Dockerfile.prod
```dockerfile
# build environment
FROM node:alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# if using React Router, add the following line:
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2.2. Build and tag the Docker image
```bash
$ docker build -f Dockerfile.prod -t hornlog-client:prod .
```

### 2.3. Run the container
```bash
$ docker run -it --rm -p 1337:80 hornlog-client:prod
```
Check that is working then stop it. 

### 2.4. Use docker compose to run the app, add docker-compose.prod.yml to the root of the project
```dockercompose
version: '3.7'

services:
  hornlog-client-prod:
    container_name: hornlog-client-prod
    build:
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - '1337:80'
```

### 2.5. Run the app
```bash
$ docker-compose -f docker-compose.prod.yml up -d --build
```
