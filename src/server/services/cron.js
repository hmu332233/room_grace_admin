const CronContents = require('../models/cronContents');
const scheduler = require('../utils/scheduler');
const jnuPoster = require('../utils/jnuPoster');

exports.post = async () => {
  const { userId, userPw, title, contents } = await CronContents.findFirst();
  try {
    return await jnuPoster.post({ title, contents, id: userId, pw: userPw });
  } catch (err) {
    throw new Error({ type: 'POST ERROR', err });
  }
};