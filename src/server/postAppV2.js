const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const mongoose = require('mongoose');
const CronContents = require('./models/cronContents');
const jnuPoster = require('./utils/jnuPosterV2');
const { sendCompleteMessage } = require('./utils/slack');

mongoose.connect(process.env.MONGO_DB);
const db = mongoose.connection;
db.once('open', async () => {
  console.log('DB connected!');
  try {
    const { userId, userPw, title, contents } = await CronContents.findFirst();
    await jnuPoster.post({ title, contents, id: userId, pw: userPw });
    try {
      sendCompleteMessage();
    } catch (err) {
      console.log(err.message);
    }
  } finally {
    db.close();
  }
});
db.on('error', err => {
  console.log('DB ERROR:', err.message);
});
