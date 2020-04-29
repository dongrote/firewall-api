'use strict';
const _ = require('lodash');

exports = module.exports = {
  firewallPersistPath: () => _.get(process.env, 'FIREWALL_PERSIST_PATH', '/etc/iptables.rules'),
  tokenIssuerUri: () => _.get(process.env, 'TOKEN_ISSUER_URI'),
};
