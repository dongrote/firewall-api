'use strict';
const router = require('express').Router();
exports = module.exports = router;

router.get('/health', (req, res) => res.sendStatus(200));
