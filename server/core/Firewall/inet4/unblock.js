'use strict';
const isBlocked = require('./isBlocked'),
  cp = require('child_process');

const unblock = hostname => new Promise((resolve, reject) => {
  cp.execFile('iptables', ['-D', 'FORWARD', '-p', 'all', '-s', hostname, '-j', 'REJECT'], err => err ? reject(err) : resolve(null));
});

exports = module.exports = hostname => isBlocked(hostname)
  .then(blocked => blocked ? unblock(hostname) : null);
