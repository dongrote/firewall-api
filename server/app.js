'use strict';
const express = require('express');
const app = express();
exports = module.exports = app;

const _ = require('lodash'),
  log = require('debug-logger')('firewall-api'),
  HttpError = require('http-error-constructor'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  httpAuthorization = require('./middleware/httpAuthorization'),
  router = require('./routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(httpAuthorization);
app.use(router);
app.use((req, res, next) => next(new HttpError(404)));
app.use((err, req, res, next) => {
  const statusCode = _.get(err, 'statusCode', 500);
  log.error(err);
  res.status(statusCode).send(_.get(err, 'message', 'Internal Server Error'));
});
