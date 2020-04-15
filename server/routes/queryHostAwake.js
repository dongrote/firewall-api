'use strict';
const HttpError = require('http-error-constructor');

exports = module.exports = (req, res, next) => Promise.resolve(next(new HttpError(501)));
