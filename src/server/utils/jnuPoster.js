const { chromium } = require('playwright');

const LOGIN_URL = 'https://sso.jnu.ac.kr/Idp/Login.aspx';
const WRITE_PAGE_URL = 'http://www.jnu.ac.kr/WebApp/web/HOM/COM/Board/board.aspx?boardID=10&bbsMode=write&page=1';
const USER_NAME = '원룸그레이스';

exports.post = async ({ title, userName = USER_NAME, contents, id, pw }) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 로그인
  await page.goto(LOGIN_URL);
  console.log('로그인 페이지 접속');
  await page.waitForTimeout(3000);
  await page.fill('#userId', id);
  await page.fill('#userPwd', pw);
  await page.click('#btnLoginButton');
  console.log('로그인 중');
  await page.waitForTimeout(3000);

  // 글 작성
  const response = await page.goto(WRITE_PAGE_URL);
  console.log('글 작성 페이지:', response.status());

  // 리다이렉트 후 최종 URL 확인 및 페이지 로드 대기
  await page.waitForLoadState('networkidle');
  console.log('글 작성 페이지 리다이렉트 완료');

  // 글 작성 페이지의 필수 요소가 로드될 때까지 대기
  await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolder1_PageContent_ctl00_txt_boardTitle');
  console.log('글 작성 페이지 로드 완료');

  // 제목과 이름 작성
  console.log('내용 작성 시작');
  await page.fill('#ctl00_ctl00_ContentPlaceHolder1_PageContent_ctl00_txt_boardTitle', title);
  // await page.fill('#ctl00_ctl00_ContentPlaceHolder1_PageContent_ctl00_txt_boardWriter', userName);

  // 소스코드 클릭
  await page.click('#cke_18');
  console.log('소스코드 클릭');

  // 소스코드 작성
  console.log('소스코드 작성');
  await page.fill('#cke_1_contents > textarea', contents);

  console.log('내용 작성 완료');

  // 작성 완료 버튼 클릭 및 브라우저 종료
  await page.click('#ctl00_ctl00_ContentPlaceHolder1_PageContent_ctl00_btnSave');
  await page.waitForLoadState('load');
  await browser.close();

  return true;
};
