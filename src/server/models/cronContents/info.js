const mongoose = require('mongoose');

const CONSTANTS = {};

const schema = mongoose.Schema({
  userId: {
    type: String,
  },
  userPw: {
    type: String,
  },
  title: {
    type: String,
  },
  contents: {
    type: String,
  },
  gmailUser: {
    type: String,
  },
  gmailAppPassword: {
    type: String,
  },
});

const model = mongoose.model('cron_content', schema);

module.exports = {
  db: { cronContents: model },
  CONSTANTS,
};
