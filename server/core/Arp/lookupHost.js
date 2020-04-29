'use strict';
const _ = require('lodash'),
  dns = require('dns'),
  cp = require('child_process');

exports = module.exports = hostname => new Promise((resolve, reject) => {
  dns.lookup(hostname, (err, address, family) =>  err ? reject(err) : resolve({hostname, address, family}));
})
.then(resolution => new Promise((resolve, reject) => {
  cp.execFile('arp', ['-n', resolution.address], (err, stdout) => {
    if (err) return reject(err);
    const lines = stdout.toString().split('\n').filter(s => s.length > 0);
    const fields = _.last(lines).split(' ').filter(s => s.length > 0);
    resolve({
      hostname,
      address: resolution.address,
      ethernet: fields[2],
      family: resolution.family,
    });
  });
}));
