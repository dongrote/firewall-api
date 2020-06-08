'use strict';
const loadConfig = require('./loadConfig'),
  persist = require('./persist');

exports = module.exports = bandwidth => loadConfig()
  .then(throttleConfig => {
    throttleConfig.bandwidth = bandwidth;
    return persist(throttleConfig);
  });
