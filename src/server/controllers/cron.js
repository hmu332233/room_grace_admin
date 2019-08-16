const scheduler = require('../utils/scheduler');

exports.start = async (req, res, next) => {
  try {
    scheduler.schedule(times, () => console.log('task'));
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