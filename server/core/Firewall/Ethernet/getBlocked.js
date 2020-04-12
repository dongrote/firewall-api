'use strict';
const _ = require('lodash'),
  ebtables = require('./ebtables');
exports = module.exports = () => ebtables(['-L', 'FORWARD'])
  .then(stdout => _.filter(stdout.split('\n'), line => /-s (.*) -j DROP/.exec(line) !== null))
  .then(lines => _.map(lines, line => /-s (.*) -j DROP/.exec(line)[1]));
