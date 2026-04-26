const CronContents = require('../models/cronContents');

// V1/V2 토글: 사용할 버전의 require 한 줄만 활성화하세요
// const jnuPoster = require('../utils/jnuPoster');
const jnuPoster = require('../utils/jnuPosterV2');

exports.post = async () => {
  const { userId, userPw, title, contents, gmailUser, gmailAppPassword } = await CronContents.findFirst();
  return jnuPoster.post({
    title,
    contents,
    id: userId,
    pw: userPw,
    gmailUser: gmailUser || process.env.GMAIL_USER,
    gmailAppPassword: gmailAppPassword || process.env.GMAIL_APP_PASSWORD,
  });
};
