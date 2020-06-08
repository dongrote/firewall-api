'use strict';
const core = require('../core');

exports = module.exports = (req, res, next) => core.Throttle.loadConfig()
  .then(config => res.json(config))
  .catch(next);
