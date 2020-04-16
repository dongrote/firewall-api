'use strict';
const fs = require('fs'),
  cp = require('child_process'),
  log = require('debug-logger')('core:Firewall:persist');

exports = module.exports = persistPath => new Promise((resolve, reject) => {
  const outputStream = fs.createWriteStream(persistPath, {mode: 0o644})
    .on('error', err => {
      log.error(err);
      reject(err);
    })
    .on('open', () => {
      log.debug(`created writeStream to ${persistPath}`);
      log.debug('spawning iptables-save command');
      const cmd = cp.spawn('iptables-save', [], {stdio: ['ignore', outputStream, 'ignore']});
      return Promise.all([
        new Promise((res, rej) => cmd
          .on('error', rej)
          .on('exit', () => {
            log.debug('iptables-save exited');
            outputStream.end();
            res();
          })),
        new Promise((res) => outputStream.on('finish', () => {
          log.debug('writeStream finished');
          res();
        })),
      ])
      .then(() => resolve())
      .catch(err => {
        log.error(err);
        reject(err);
      });
    });
});
