const CronContents = require('../models/cronContents');
const jnuPoster = require('../utils/jnuPoster');

exports.post = async () => {
  const { userId, userPw, title, contents } = await CronContents.findFirst();
  return jnuPoster.post({ title, contents, id: userId, pw: userPw });
};
