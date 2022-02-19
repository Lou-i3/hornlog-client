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
# RUN rm -v /etc/nginx/nginx.conf

# COPY nginx/nginx.conf /etc/nginx/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
ENV API_URL "https://hornlog-api.nas.dewwwe.com"
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]