'use strict';
const _ = require('lodash'),
  core = require('../core'),
  log = require('debug-logger')('middleware:httpAuthorization');

exports = module.exports = (req, res, next) => {
  const token = _.last(_.get(req.headers, 'authorization', 'Bearer ').split(' '));
  return _.size(token) > 0
    ? core.Auth.verifyJwt(token)
      .then(decoded => {
        req.jwt = decoded;
        req.token = token;
        log.debug('jwt', decoded);
        next();
      })
      .catch(next)
    : Promise.resolve(next());
};
