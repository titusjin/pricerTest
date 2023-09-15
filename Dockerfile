# build stage
FROM node:15 as builder
ARG path=/usr/src/app

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get -y install autoconf automake libtool nasm make pkg-config git apt-utils
RUN apt-get -y install nginx

# Create app directory
RUN mkdir -p $path
WORKDIR $path
# Versions
RUN npm -v
RUN node -v
# Bundle app source
COPY . $path
# Install app dependencies
RUN npm install

# Environment variables
# RUN npm run int-build
# RUN npm run test-build
RUN npm run build

# production stage
FROM nginx:1.16.1-alpine as production-stage
COPY conf.d/default.conf /etc/nginx/conf.d
# COPY /nginx/mime.types /etc/nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
