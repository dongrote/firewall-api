'use strict';
const cp = require('child_process');

exports = module.exports = (hostname, sampleTime) => new Promise((resolve, reject) => {
  let stdout = Buffer.allocUnsafe(0);
  const child = cp.spawn('pktstat', ['-1', '-w', `${sampleTime}`, '-n', 'ip', 'host', `${hostname}`], {stdio: ['ignore', 'pipe', 'ignore']});
  child
    .on('error', reject)
    .on('exit', () => {
      const lines = stdout.toString().split('\n');
      const [connections, realSampleTime] = lines[0].split(' ').map(Number);
      let totalBytes = 0;
      lines.slice(1)
        .filter(line => line.length > 0)
        .forEach(line => {
          totalBytes += Number(line.split(' ')[0]);
        });
      resolve(totalBytes / realSampleTime);
    });
  child.stdout.on('data', chunk => {
    stdout = Buffer.concat([stdout, chunk]);
  });
});
