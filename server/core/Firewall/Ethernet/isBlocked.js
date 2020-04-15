'use strict';
const _ = require('lodash'),
  getBlocked = require('./getBlocked');

exports = module.exports = hwaddr => getBlocked()
  .then(blocked => _.includes(blocked, hwaddr));
