'use strict';
const _ = require('lodash'),
  HttpError = require('http-error-constructor'),
  core = require('../core');

exports = module.exports = (req, res, next) => {
  const bandwidth = _.get(req.query, 'bandwidth');
  if (!bandwidth) {
    return Promise.resolve(next(new HttpError(400, 'missing bandwidth')));
  }
  return core.Throttle.setBandwidth(bandwidth)
    .then(() => res.sendStatus(204))
    .catch(next);
};
