'use strict';
const router = require('express').Router();
exports = module.exports = router;
const requireAdminRole = require('../middleware/requireRole')('admin'),
  mutateHostnameBlockStatus = require('./mutateHostnameBlockStatus'),
  queryBlockedHostname = require('./queryBlockedHostname'),
  wakeupHost = require('./wakeupHost'),
  queryOnlineHosts = require('./queryOnlineHosts');

router.get('/health', (req, res) => res.sendStatus(200));
router.get('/api/inet4', requireAdminRole, mutateHostnameBlockStatus);
router.get('/api/inet4/blocked', queryBlockedHostname);
router.get('/api/ethernet/wol', requireAdminRole, wakeupHost);
router.get('/api/ethernet/online', queryOnlineHosts);
