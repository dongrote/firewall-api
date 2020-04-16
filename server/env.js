'use strict';
const _ = require('lodash');

exports = module.exports = {
  firewallPersistPath: () => _.get(process.env, 'FIREWALL_PERSIST_PATH', '/etc/iptables.rules'),
};
