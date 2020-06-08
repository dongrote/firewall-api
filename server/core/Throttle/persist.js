'use strict';
const env = require('../../env'),
  fs = require('fs'),
  yaml = require('yaml');

exports = module.exports = throttleConfig => new Promise((resolve, reject) => {
  fs.writeFile(env.throttleConfig(), yaml.stringify(throttleConfig), err => err ? reject(err) : resolve());
});
