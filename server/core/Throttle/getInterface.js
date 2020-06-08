'use strict';
const loadConfig = require('./loadConfig');

exports = module.exports = () => loadConfig()
  .then(throttleConfig => throttleConfig.interface);
