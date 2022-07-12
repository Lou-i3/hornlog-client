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
COPY ./.env.example /usr/share/nginx/html/.env

#COPY ./env.sh /usr/share/nginx/html

# if using React Router, add the following line:
# RUN rm -v /etc/nginx/nginx.conf

# COPY nginx/nginx.conf /etc/nginx/
RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# install nodejs & npm
#RUN apk add --update nodejs
#RUN apk add --update npm

# install runtime-env-cra package
#RUN npm i -g runtime-env-cra

ENV API_URL api url
ENV FIREBASE_API_KEY api key
ENV FIREBASE_AUTH_DOMAIN auth
ENV FIREBASE_PROJECT_ID project
ENV FIREBASE_STORAGE_BUCKET stor
ENV FIREBASE_MESSAGING_SENDER_ID XXX
ENV FIREBASE_APP_ID aoo id
ENV FIREBASE_MESUREMENT_ID id

EXPOSE 80
WORKDIR /usr/share/nginx/html
RUN chmod +x set-env.sh
#RUN chmod +x env.sh
# ENTRYPOINT [ "nginx -g \"daemon off;\""]
# CMD ["/bin/sh", "set-env.sh"]
# CMD ["nginx", "-g", "\"daemon off;\""]
ENTRYPOINT ["sh","/usr/share/nginx/html/set-env.sh"]
