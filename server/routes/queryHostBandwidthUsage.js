'use strict';
const _ = require('lodash'),
  HttpError = require('http-error-constructor'),
  core = require('../core');

exports = module.exports = (req, res, next) => {
  const hostname = _.get(req.query, 'hostname'),
    sampleTime = Number(_.get(req.query, 'sampleTime', 10));
  if (!hostname || isNaN(sampleTime)) {
    return Promise.resolve(next(new HttpError(400)));
  }
  return core.Throttle
    .sampleHostBandwidthUsage(hostname, sampleTime)
    .then(bps => res.json({bps}))
    .catch(next);
};
