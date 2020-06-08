'use strict';
const router = require('express').Router();
exports = module.exports = router;
const requireAdminRole = require('../middleware/requireRole')('admin'),
  mutateHostnameBlockStatus = require('./mutateHostnameBlockStatus'),
  queryBlockedHostname = require('./queryBlockedHostname'),
  wakeupHost = require('./wakeupHost'),
  queryOnlineHosts = require('./queryOnlineHosts'),
  queryHostHardwareAddress = require('./queryHostHardwareAddress'),
  queryThrottleState = require('./queryThrottleState'),
  queryThrottledHosts = require('./queryThrottledHosts'),
  addThrottledHost = require('./addThrottledHost'),
  removeThrottledHost = require('./removeThrottledHost'),
  queryThrottleBandwidth = require('./queryThrottleBandwidth'),
  setThrottleBandwidth = require('./setThrottleBandwidth');

router.get('/health', (req, res) => res.sendStatus(200));
router.get('/api/inet4', requireAdminRole, mutateHostnameBlockStatus);
router.get('/api/inet4/blocked', queryBlockedHostname);
router.get('/api/ethernet/wol', wakeupHost);
router.get('/api/ethernet/online', queryOnlineHosts);
router.get('/api/ethernet/arp', queryHostHardwareAddress);
router.get('/api/throttle', queryThrottleState);
router.get('/api/throttle/hosts', queryThrottledHosts);
router.get('/api/throttle/hosts/add', requireAdminRole, addThrottledHost);
router.get('/api/throttle/hosts/remove', requireAdminRole, removeThrottledHost);
router.get('/api/throttle/bandwidth', queryThrottleBandwidth);
router.post('/api/throttle/bandwidth', requireAdminRole, setThrottleBandwidth);
