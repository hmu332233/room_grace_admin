const service = require('./services');

console.log('Start posting..');
try {
  const data = await service.cron.post();
  console.log('Success');
} catch (err) {
  console.log(err);
}
