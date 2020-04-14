'use strict';
const cp = require('child_process'),
  isBlocked = require('./isBlocked');

const block = hostname => new Promise((resolve, reject) => {
  cp.execFile('iptables', ['-I', 'FORWARD', '-p', 'all', '-s', hostname, '-j', 'REJECT'], err => err ? reject(err) : resolve(null));
});

exports = module.exports = hostname => isBlocked(hostname)
  .then(alreadyBlocked => alreadyBlocked ? null : block(hostname));
