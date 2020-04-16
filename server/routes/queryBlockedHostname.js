'use strict';
const _ = require('lodash'),
  core = require('../core'),
  HttpError = require('http-error-constructor');

exports = module.exports = (req, res, next) => {
  const hostname = _.get(req.query, 'hostname');
  return hostname
    ? core.Firewall.inet4.isBlocked(hostname)
      .then(blocked => res.json({hostname, blocked}))
      .catch(next)
    : Promise.resolve(next(new HttpError(400)));
};
