'use strict';
const cp = require('child_process'),
  regex = /.*at ([^ ]+) /;

exports = module.exports = () => new Promise((resolve, reject) => {
  let stdout = '';
  const child = cp.spawn('arp', ['-a', '-n'], {stdio: ['ignore', 'pipe', 'ignore']});
  child.on('error', reject);
  child.stdout
    .on('data', chunk => {
      stdout += chunk.toString();
    })
    .on('finish', () => {
      const addresses = stdout.split('\n').map(line => {
        const m = line.match(regex);
        return m ? m[1] : null;
      });
      resolve(addresses.filter(a => !(a === null || a === '<incomplete>')));
    });
});
