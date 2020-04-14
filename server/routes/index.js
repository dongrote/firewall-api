'use strict';
const router = require('express').Router();
exports = module.exports = router;
const mutateHostnameBlockStatus = require('./mutateHostnameBlockStatus'),
  queryBlockedHostnames = require('./queryBlockedHostnames'),
  wakeupHost = require('./wakeupHost'),
  queryHostAwake = require('./queryHostAwake');

router.get('/health', (req, res) => res.sendStatus(200));
router.get('/api/inet4', mutateHostnameBlockStatus);
router.get('/api/inet4/blocked', queryBlockedHostnames);
router.get('/api/ethernet/wol', wakeupHost);
router.get('/api/ethernet/awake', queryHostAwake);
