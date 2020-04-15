'use strict';
const ebtables = require('./ebtables'),
  isBlocked = require('./isBlocked');

exports = module.exports = hwaddr => isBlocked(hwaddr)
  .then(blocked => blocked ? null : ebtables(['-A', 'FORWARD', '-s', hwaddr, '-j', 'DROP']));
