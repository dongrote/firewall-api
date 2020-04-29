'use strict';
const _ = require('lodash'),
  env = require('../../env'),
  rp = require('request-promise-native');

exports = module.exports = () => rp
  .get({
    json: true,
    uri: `${env.tokenIssuerUri()}/api/auth/pubkey`,
  })
  .then(data => _.get(data, 'key.public', ''));
