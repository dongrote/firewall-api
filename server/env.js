'use strict';
const _ = require('lodash');

exports = module.exports = {
  firewallPersistPath: () => _.get(process.env, 'FIREWALL_PERSIST_PATH', '/etc/iptables.rules'),
  throttleConfig: () => _.get(process.env, 'THROTTLE_CONFIG_YAML', 'throttle.yaml'),
  defaultThrottleInterface: () => _.get(process.env, 'DEFAULT_THROTTLE_INTERFACE', 'eth0'),
  defaultThrottleBandwidth: () => _.get(process.env, 'DEFAULT_THROTTLE_BANDWIDTH', '5mbit'),
  tokenIssuerUri: () => _.get(process.env, 'TOKEN_ISSUER_URI'),
  wakeOnLanInterface: () => _.get(process.env, 'WAKE_ON_LAN_INTERFACE', 'eth0'),
};
