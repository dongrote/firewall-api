'use strict';
const core = require('../core');

exports = module.exports = (req, res, next) => core.Throttle
  .getBandwidth()
  .then(bandwidth => res.json({bandwidth}))
  .catch(next);
