'use strict';
const env = require('../../env'),
  fs = require('fs'),
  yaml = require('yaml');

const defaultConfig = {
  interface: env.defaultThrottleInterface(),
  bandwidth: env.defaultThrottleBandwidth(),
  hosts: [],
};

exports = module.exports = () => new Promise((resolve, reject) => {
  fs.readFile(env.throttleConfig(), {encoding: 'utf8'}, (err, data) => {
    if (err) {
      return err.code === 'ENOENT' ? resolve(yaml.stringify(defaultConfig)) : reject(err);
    }
    resolve(data);
  });
})
.then(data => yaml.parse(data));
