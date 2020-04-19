'use strict';
const cp = require('child_process');

exports = module.exports = hostname => new Promise(resolve => {
  cp.execFile('iptables', ['-C', 'FORWARD', '-p', 'all', '-s', hostname, '-j', 'REJECT'], err => resolve(!Boolean(err)));
});
