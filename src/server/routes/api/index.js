const express = require('express');
const router = express.Router();

router.use('/v1/cron', require('./cron'));

module.exports = router;