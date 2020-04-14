'use strict';
const cp = require('child_process');

exports = module.exports = hostname => new Promise((resolve, reject) => {
  cp.execFile('iptables', ['-C', 'FORWARD', '-p', 'all', '-s', hostname, '-j', 'REJECT'], err => {
    if (err) {
      return err.code === 1 ? resolve(false) : reject(err);
    }
    resolve(true);
  });
});
