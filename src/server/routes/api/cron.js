const express = require('express');
const router = express.Router();

const controller = require('../../controllers');

router.post('/start', controller.cron.start);
router.post('/stop', controller.cron.stop);

module.exports = router;