'use strict';
const _ = require('lodash'),
  env = require('../env'),
  HttpError = require('http-error-constructor'),
  core = require('../core'),
  log = require('debug-logger')('api:inet4:mutate');

exports = module.exports = (req, res, next) => {
  const action = _.get(req.query, 'action'),
    hostname = _.get(req.query, 'hostname');
  log.debug(`action: ${action}, hostname: ${hostname}`);
  return ['block', 'unblock'].includes(action) && hostname
    ? core.Firewall.inet4[action](hostname)
      .then(() => log.info(`${action}ed ${hostname}`))
      .then(() => core.Firewall.persist(env.firewallPersistPath()))
      .then(() => log.info('persisted firewall rules'))
      .then(() => res.sendStatus(204))
      .catch(next)
    : Promise.resolve(next(new HttpError(400)));
};
