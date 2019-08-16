const cron = require('node-cron');
let task = null;

exports.start = async (req, res, next) => {
  try {
    task = cron.schedule('* * * * * *', () =>  {
      console.log('task!');
    }, {
      scheduled: false
    });
    task.start();
    res.json({ result: true });
  } catch (err) {
    next(err);
  }
};

exports.stop = async (req, res, next) => {
  try {
    task.stop();
    res.json({ result: true });
  } catch (err) {
    next(err);
  }
};