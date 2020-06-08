'use strict';
const _ = require('lodash'),
  loadConfig = require('./loadConfig');

exports = module.exports = () => loadConfig()
  .then(throttleConfig => _.get(throttleConfig, 'hosts', []));
