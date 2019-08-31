# Build process
FROM node:10.16.2 as build-deps

WORKDIR /usr/src/app

ENV REACT_APP_BACKEND_URL http://localhost:3000
ENV SASS_PATH=src

COPY package.json package-lock.json ./
COPY ./src /usr/src/app/src
COPY ./public /usr/src/app/public

RUN npm install --production
RUN npm run build

# Run with Nginx
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]