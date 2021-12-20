const CronContents = require('../models/cronContents');
const jnuPoster = require('../utils/jnuPoster');
const { sendCompleteMessage } = require('../utils/slack');

exports.post = async () => {
  const { userId, userPw, title, contents } = await CronContents.findFirst();
  const result = await jnuPoster.post({ title, contents, id: userId, pw: userPw });

  try {
    sendCompleteMessage();
  } catch (err) {
    console.log(err);
  }

  return result;
};
