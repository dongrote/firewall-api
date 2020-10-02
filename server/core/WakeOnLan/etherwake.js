'use strict';
const _ = require('lodash'),
  cp = require('child_process');

const sanitizeMacAddress = string => string.split(':', 6).map(o => parseInt(o, 16)).map(o => o.toString(16)).join(':');

exports = module.exports = (macAddress, options) => new Promise((resolve, reject) => {
  const sanitizedMacAddress = sanitizeMacAddress(macAddress);
  if ('NaN' === sanitizedMacAddress) {
    return reject(new Error(`invalid MAC address: '${macAddress}'`));
  }
  cp.spawn('etherwake', ['-i', _.get(options, 'iface', 'eth0'), sanitizedMacAddress], {stdio: 'ignore'})
    .on('error', reject)
    .on('exit', () => resolve());
});
