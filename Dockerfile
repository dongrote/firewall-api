FROM node:12-alpine

WORKDIR /usr/src/app
COPY . .
CMD npm --prefix server start
