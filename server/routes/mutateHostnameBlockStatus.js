'use strict';
const _ = require('lodash'),
  env = require('../env'),
  HttpError = require('http-error-constructor'),
  core = require('../core');

exports = module.exports = (req, res, next) => {
  const action = _.get(req.query, 'action'),
    hostname = _.get(req.query, 'hostname');
  return ['block', 'unblock'].includes(action) && hostname
    ? core.Firewall.inet4[action](hostname)
      .then(() => core.Firewall.persist(env.firewallPersistPath()))
      .then(() => res.sendStatus(204))
      .catch(next)
    : Promise.resolve(next(new HttpError(400)));
};
