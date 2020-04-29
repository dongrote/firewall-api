'use strict';
const _ = require('lodash');

exports = module.exports = (token, role) => _.get(token, 'role', '') === role;
