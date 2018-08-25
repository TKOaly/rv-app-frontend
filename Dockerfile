FROM node:8.9.0

ENV NPM_CONFIG_LOGLEVEL warn

ENV NODE_ENV production

# Hardcoded for now
ENV REACT_APP_BACKEND_URL http://localhost:3000

WORKDIR /front

COPY package.json /front

COPY yarn.lock /front

COPY ./src /front/src

COPY ./public /front/public

RUN yarn global add serve

RUN yarn install

RUN yarn build

RUN rm -rf node_modules

CMD serve -s build

EXPOSE 5000