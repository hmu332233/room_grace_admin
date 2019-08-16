const express = require('express');
const router = express.Router();

const controller = require('../../controllers');

router.get('/start', controller.cron.start);
router.get('/stop', controller.cron.stop);

module.exports = router;