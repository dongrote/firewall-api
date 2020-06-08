'use strict';
const loadConfig = require('./loadConfig'),
  persist = require('./persist');

exports = module.exports = iface => loadConfig()
  .then(throttleConfig => {
    throttleConfig.interface = iface;
    return persist(throttleConfig);
  });
