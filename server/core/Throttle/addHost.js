'use strict';
const _ = require('lodash'),
  loadConfig = require('./loadConfig'),
  persist = require('./persist'),
  applyConfig = require('./applyConfig');

exports = module.exports = hostname => loadConfig()
  .then(throttleConfig => {
    throttleConfig.hosts = _.union(_.get(throttleConfig, 'hosts', []), [hostname]);
    return persist(throttleConfig);
  })
  .then(() => applyConfig());
