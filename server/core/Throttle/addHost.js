'use strict';
const _ = require('lodash'),
  loadConfig = require('./loadConfig'),
  persist = require('./persist');

exports = module.exports = hostname => loadConfig()
  .then(throttleConfig => {
    throttleConfig.hosts = _.union(_.get(throttleConfig, 'hosts', []), [hostname]);
    return persist(throttleConfig);
  });
