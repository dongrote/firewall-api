'use strict';
const core = require('../core');

exports = module.exports = (req, res, next) => core.Throttle
  .findHosts()
  .then(hosts => res.json({hosts}))
  .catch(next);
