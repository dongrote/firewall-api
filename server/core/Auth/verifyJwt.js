'use strict';
const fetchVerifyKey = require('./fetchVerifyKey'),
  jwt = require('jsonwebtoken');

exports = module.exports = token => fetchVerifyKey()
  .then(pubkey => new Promise((resolve, reject) => {
    jwt.verify(token, pubkey, {algorithms: ['RS256']}, (err, decoded) => err ? reject(err) : resolve(decoded));
  }));
