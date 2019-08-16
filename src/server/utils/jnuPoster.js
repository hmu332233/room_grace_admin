const puppeteer = require("puppeteer");

const LOGIN_URL = "https://portal.jnu.ac.kr/Common/Login/Login.aspx";
const WRITE_PAGE_URL = "http://www.jnu.ac.kr/WebApp/web/HOM/COM/Board/board.aspx?boardID=10&bbsMode=write&page=1";
const USER_NAME = '원룸그레이스';

exports.post = async ({ title, userName = USER_NAME, contents, id, pw }) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 로그인
  await page.goto(LOGIN_URL);
  await page.evaluate(
    (id, pw) => {
      document.getElementById(
        "ContentPlaceHolder1_LoginUser_UserName"
      ).value = id;
      document.getElementById(
        "ContentPlaceHolder1_LoginUser_Password"
      ).value = pw;
      document
        .getElementById("ContentPlaceHolder1_LoginUser_LoginButton")
        .click();
    },
    id,
    pw
  );
  await page.waitFor(3000);

  // 글 작성
  await page.goto(WRITE_PAGE_URL);

  // 제목과 이름 작성
  await page.evaluate(
    (title, userName) => {
      document.getElementById(
        "ctl00_ctl00_ContentPlaceHolder1_PageContent_ctl00_txt_boardTitle"
      ).value = title;
      document.getElementById(
        "ctl00_ctl00_ContentPlaceHolder1_PageContent_ctl00_txt_boardWriter"
      ).value = userName;
    },
    title,
    userName
  );
  await page.waitFor(1000);

  // 소스코드 클릭
  await page.click("#cke_18");

  await page.waitFor(500);

  // 소스코드 작성
  await page.evaluate(contents => {
    document.querySelector("#cke_1_contents > textarea").value = contents;
  }, contents);

  // 작성 완료 버튼 클릭 및 브라우저 종료
  await page.click("#ctl00_ctl00_ContentPlaceHolder1_PageContent_ctl00_btnSave");
  await page.waitFor(1000);
  await browser.close();

  return true;
};
