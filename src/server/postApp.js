const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const service = require('./services');

const mongoose = require('mongoose');

const { sendErrorMessage } = require('./utils/slack');

mongoose.connect(process.env.MONGO_DB);
const db = mongoose.connection;
db.once('open', async () => {
  console.log('DB connected!');
  const data = await service.cron.post();
  db.close();
});
db.on('error', err => {
  console.log('DB ERROR:', err.message);
});
