'use strict';
const cp = require('child_process');

exports = module.exports = args => {
  const child = cp.spawn('ebtables', Array.isArray(args) ? args : [args], {stdio: ['ignore', 'pipe', 'ignore']});
  return Promise.all([
    new Promise((res, rej) => {
      child
        .on('error', rej)
        .on('close', code => res(code))
    }),
    new Promise((res, rej) => {
      let stdout = '';
      child.stdout
        .on('error', rej)
        .on('data', chunk => {
          stdout += chunk.toString();
        })
        .on('end', () => res(stdout));
    }),
  ])
  .then(([exitStatus, stdout]) => stdout);
};
