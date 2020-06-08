'use strict';
const cp = require('child_process'),
  loadConfig = require('./loadConfig');

exports = module.exports = () => loadConfig()
  .then(throttleConfig => new Promise((resolve, reject) => {
    cp.spawn('tc', ['qdisc', 'del', 'dev', throttleConfig.interface, 'root'])
      .on('error', reject)
      .on('exit', code => code ? reject(new Error(`exit status ${code}`)) : resolve());
  }));
