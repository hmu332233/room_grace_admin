const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const mongoose = require('mongoose');
const CronContents = require('./models/cronContents');
const { checkJnuFirstPageForTitle } = require('./utils/jnuFirstPageChecker');

async function loadPendingPostTitle() {
  if (!process.env.MONGO_DB) {
    throw new Error('MONGO_DB 환경 변수가 필요합니다');
  }

  await mongoose.connect(process.env.MONGO_DB);
  try {
    const post = await CronContents.findFirst();
    const title = post && post.title && post.title.trim();
    if (!title) {
      throw new Error('cron_content 문서의 title 값이 비어 있습니다');
    }
    return title;
  } finally {
    await mongoose.connection.close();
  }
}

function writeGithubOutput(found) {
  if (!process.env.GITHUB_OUTPUT) return;
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `found=${found ? 'true' : 'false'}\n`);
}

async function main() {
  const title = await loadPendingPostTitle();
  console.log(`Pending title: ${title}`);

  const result = await checkJnuFirstPageForTitle(title);
  writeGithubOutput(result.found);

  console.log(`found=${result.found ? 'true' : 'false'}`);
  console.log(`Checked URL: ${result.url}`);
  console.log(`Extracted ${result.titles.length} visible title candidates`);

  if (!result.found) {
    console.log('Pending post title was not found on the first page.');
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error('게시 예정 글 첫 페이지 확인 실패:', err.message);
    process.exit(1);
  });
}

module.exports = {
  loadPendingPostTitle,
};
