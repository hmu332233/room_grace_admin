const scheduler = require('../utils/scheduler');
const service = require('../services');

const times = ['0 1 * * *', '0 5 * * *', '0 9 * * *', '0 13 * * *'];

exports.status = (req, res) => {
  res.json({ success: true, data: { isRunning: scheduler.isRunning() } });
};

exports.start = async (req, res, next) => {
  try {
    await scheduler.schedule(times, async () => {
      await service.cron.post();
    });
    res.json({ result: true });
  } catch (err) {
    next(err);
  }
};

exports.stop = async (req, res, next) => {
  try {
    scheduler.destoryAll();
    res.json({ result: true });
  } catch (err) {
    next(err);
  }
};

exports.post = async (req, res, next) => {
  try {
    const data = await service.cron.post();
    res.json({ result: true, data });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
