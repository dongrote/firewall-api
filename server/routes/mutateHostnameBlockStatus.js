'use strict';
const _ = require('lodash'),
  HttpError = require('http-error-constructor'),
  core = require('../core');

exports = module.exports = (req, res, next) => {
  const action = _.get(req.query, 'action'),
    hostname = _.get(req.query, 'hostname');
  if (!(['block', 'unblock'].includes(action) && hostname)) {
    return Promise.resolve(next(new HttpError(400)));
  }
  return (action === 'block' ? core.Firewall.inet4.block(hostname) : core.Firewall.inet4.unblock(hostname))
    .then(() => res.sendStatus(204))
    .catch(next);
};
