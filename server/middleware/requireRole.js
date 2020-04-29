'use strict';
const _ = require('lodash'),
  HttpError = require('http-error-constructor'),
  core = require('../core');

exports = module.exports = role => (req, res, next) => next(core.Auth
  .tokenHasRole(_.get(req, 'jwt', {}), role)
    ? undefined
    : new HttpError(401, `role mismatch ${_.get(req, 'jwt.role', '')} !== ${role}`));
