FROM node:12-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm --prefix server install
CMD npm --prefix server start
