'use strict';
const core = require('../core');

exports = module.exports = (req, res, next) => core.WakeOnLan.online()
  .then(hosts => res.json(hosts))
  .catch(next);
