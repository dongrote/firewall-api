'use strict';
const _ = require('lodash'),
  env = require('../env'),
  core = require('../core'),
  HttpError = require('http-error-constructor');

exports = module.exports = (req, res, next) => {
  const hwaddr = _.get(req.query, 'hwaddr');
  if (!hwaddr) {
    return Promise.resolve(next(new HttpError(400)));
  }
  return core.WakeOnLan.etherwake(hwaddr, {iface: env.wakeOnLanInterface()})
    .then(() => res.sendStatus(204))
    .catch(err => {
      if (err.message.startsWith('invalid MAC')) {
        throw new HttpError(400, err.message);
      }
      throw err;
    });
};
