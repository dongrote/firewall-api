'use strict';
const reset = require('./reset'),
  cp = require('child_process'),
  dns = require('dns'),
  loadConfig = require('./loadConfig');

const createqdisc = iface => new Promise((resolve, reject) => {
  const args = [
    'qdisc',
    'add',
    'dev',
    iface,
    'root',
    'handle',
    '1:',
    'cbq',
    'avpkt',
    '1000',
    'bandwidth',
    '1000mbit',
  ];
  cp.spawn('tc', args)
    .on('error', reject)
    .on('exit', () => resolve());
});

const createclass = (iface, bandwidth) => new Promise((resolve, reject) => {
  const args = [
    'class',
    'add',
    'dev',
    iface,
    'parent',
    '1:',
    'classid',
    '1:1',
    'cbq',
    'rate',
    bandwidth,
    'allot',
    '1500',
    'prio',
    '5',
    'bounded',
    'isolated',
  ];
  cp.spawn('tc', args)
    .on('error', reject)
    .on('exit', () => resolve());
});

const resolvehostname = hostname => new Promise((resolve, reject) => {
  dns.lookup(hostname, {family: 4}, (err, address) => err ? reject(err) : resolve(address));
});

const createfilter = (iface, hostname) => resolvehostname(hostname)
  .then(ipaddr => new Promise((resolve, reject) => {
    console.log(`creating filter for ${hostname} (${ipaddr})`);
    const args = [
      'filter',
      'add',
      'dev',
      iface,
      'parent',
      '1:',
      'protocol',
      'ip',
      'prio',
      '16',
      'u32',
      'match',
      'ip',
      'dst',
      ipaddr,
      'flowid',
      '1:1',
    ];
    cp.spawn('tc', args)
      .on('error', reject)
      .on('exit', () => resolve())
      .stderr.on('data', chunk => {
        console.log('stderr: ', chunk.toString());
      });
  }));

exports = module.exports = () => reset()
  .then(() => loadConfig())
  .then(throttleConfig => createqdisc(throttleConfig.interface)
    .then(() => createclass(throttleConfig.interface, throttleConfig.bandwidth))
    .then(() => new Promise((resolve, reject) => {
      (function nextHost(i) {
        if (i < throttleConfig.hosts.length) {
          const hostname = throttleConfig.hosts[i];
          createfilter(throttleConfig.interface, hostname)
            .then(() => setImmediate(nextHost, i + 1))
            .catch(reject);
        } else {
          resolve();
        }
      }(0));
    })));
