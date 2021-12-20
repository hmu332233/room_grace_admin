const service = require('./services');

(async (req, res, next) => {
  try {
    const data = await service.cron.post();
    console.log('Success');
  } catch (err) {
    console.log(err);
  }
})();
