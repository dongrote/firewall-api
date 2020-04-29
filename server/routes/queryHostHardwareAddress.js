'use strict';
const _ = require('lodash'),
  HttpError = require('http-error-constructor'),
  core = require('../core');

exports = module.exports = (req, res, next) => {
  const hostname = _.get(req.query, 'hostname');
  if (!hostname) {
    return Promise.resolve(next(new HttpError(400, 'missing hostname')));
  }
  return core.Arp.lookupHost(hostname)
    .then(results => res.json(results))
    .catch(err => next(new HttpError(400, err.message)));
};
