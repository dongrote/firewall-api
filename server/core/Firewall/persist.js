'use strict';
const fs = require('fs'),
  cp = require('child_process');

exports = module.exports = persistPath => new Promise((resolve, reject) => {
  const outputStream = fs.createWriteStream(persistPath, {mode: 0o644})
    .on('error', reject)
    .on('open', () => {
      const cmd = cp.spawn('iptables-save', [], {stdio: ['ignore', outputStream, 'ignore']});
      return Promise.all([
        new Promise((res, rej) => cmd.on('error', rej).on('exit', () => res())),
        new Promise((res) => outputStream.on('finish', () => res())),
      ])
      .then(() => resolve())
      .catch(reject);
    });
});
