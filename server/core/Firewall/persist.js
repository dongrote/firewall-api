'use strict';
const fs = require('fs'),
  cp = require('child_process');

exports = module.exports = persistPath => {
  const outputStream = fs.createWriteStream(persistPath, {mode: 0o644}),
    saveCommand = cp.spawn('iptables-save', [], {stdio: ['ignore', outputStream, 'ignore']});
  return Promise.all([
    new Promise((resolve, reject) => {
      saveCommand
        .on('error', reject)
        .on('close', () => resolve());
    }),
    new Promise((resolve, reject) => {
      outputStream
        .on('error', reject)
        .on('finish', () => resolve());
    }),
  ]);
};
