const { chromium } = require('playwright');
const { ImapFlow } = require('imapflow');
const fs = require('fs');

const LOGIN_URL = 'https://sso.jnu.ac.kr/Idp/Login.aspx';
const WRITE_PAGE_URL = 'https://www.jnu.ac.kr/WebApp/web/HOM/COM/Board/board.aspx?boardID=10&bbsMode=write&page=1';
const USER_NAME = '원룸그레이스';

const OTP_REGEX = /OTP\s*:\s*(\d{6})/;
const OTP_SENDER = 'noreply@jnu.ac.kr';
const OTP_POLL_INTERVAL_MS = 2000;
const OTP_POLL_TIMEOUT_MS = 90000;

function extractOtpFromSource(source) {
  const raw = source.toString('utf8');
  const direct = raw.match(OTP_REGEX);
  if (direct) return direct[1];

  const partRegex = /Content-Transfer-Encoding:\s*base64\s*\r?\n\r?\n([A-Za-z0-9+/=\r\n]+)/gi;
  let m;
  while ((m = partRegex.exec(raw)) !== null) {
    const decoded = Buffer.from(m[1].replace(/\s+/g, ''), 'base64').toString('utf8');
    const hit = decoded.match(OTP_REGEX);
    if (hit) return hit[1];
  }
  return null;
}

async function fetchOtpFromGmail(sentAt, gmailUser, gmailAppPassword) {
  if (!gmailUser || !gmailAppPassword) {
    throw new Error('gmailUser / gmailAppPassword 값이 필요합니다');
  }

  const deadline = Date.now() + OTP_POLL_TIMEOUT_MS;

  while (Date.now() < deadline) {
    const client = new ImapFlow({
      host: 'imap.gmail.com',
      port: 993,
      secure: true,
      auth: { user: gmailUser, pass: gmailAppPassword },
      logger: false,
    });

    try {
      await client.connect();
      const lock = await client.getMailboxLock('INBOX');
      try {
        const uids = await client.search({ since: sentAt, from: OTP_SENDER }, { uid: true });
        const recent = uids.slice(-10).reverse();
        for (const uid of recent) {
          const msg = await client.fetchOne(uid, { source: true, internalDate: true }, { uid: true });
          if (!msg || !msg.internalDate || msg.internalDate < sentAt) continue;
          const otp = extractOtpFromSource(msg.source);
          if (otp) return otp;
        }
      } finally {
        lock.release();
      }
    } finally {
      await client.logout().catch(() => {});
    }

    await new Promise(r => setTimeout(r, OTP_POLL_INTERVAL_MS));
  }

  throw new Error('OTP 메일을 시간 내에 받지 못했습니다');
}

async function passMfa(page, gmailUser, gmailAppPassword) {
  console.log('MFA 페이지 감지, 이메일 OTP 흐름 시작');
  await page.click('#btnOtpMethodSmsEmail');
  await page.waitForSelector('#btnSendOtpEmailModal', { state: 'visible' });
  const sentAt = new Date(Date.now() - 30000);
  await page.click('#btnSendOtpEmailModal');
  console.log('OTP 이메일 발송 요청');

  const otp = await fetchOtpFromGmail(sentAt, gmailUser, gmailAppPassword);
  console.log('OTP 수신, 입력 진행');

  await page.waitForSelector('input[type=tel].otp-digit');
  await page.$$eval(
    'input[type=tel].otp-digit',
    (els, code) => {
      els.forEach((el, i) => {
        el.focus();
        el.value = code[i] || '';
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      });
    },
    otp
  );

  await page.waitForURL(url => !url.toString().includes('/mfa/'), { timeout: 30000 });
  console.log('MFA 통과');
}

exports.post = async ({ title, userName = USER_NAME, contents, id, pw, gmailUser, gmailAppPassword }) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
  });

  try {
    await page.goto(LOGIN_URL);
    console.log('로그인 페이지 접속');
    await page.click('#loginTabList > li:nth-child(3) > a');
    await page.fill('#mfaUserIdOtp', id);
    await page.fill('#mfaUserPwdOtp', pw);
    await page.click('#btnOtpAuthSubmit');
    console.log('로그인 제출');

    await page.waitForLoadState('networkidle');

    if (page.url().includes('/mfa/default.aspx')) {
      await passMfa(page, gmailUser, gmailAppPassword);
    }

    for (let attempt = 1; attempt <= 2; attempt++) {
      if (attempt > 1) console.log('글 작성 페이지 이동 재시도:', page.url());
      const response = await page.goto(WRITE_PAGE_URL);
      console.log('글 작성 페이지:', response.status());
      await page.waitForLoadState('networkidle');
      if (page.url().includes('jnu.ac.kr/WebApp')) break;
    }

    if (!page.url().includes('jnu.ac.kr/WebApp')) {
      throw new Error(`글 작성 페이지 이동 실패: ${page.url()}`);
    }

    await page.waitForSelector('#ctl00_ctl00_ContentPlaceHolder1_PageContent_ctl00_txt_boardTitle', { timeout: 10000 });
    console.log('글 작성 페이지 로드 완료');

    await page.fill('#ctl00_ctl00_ContentPlaceHolder1_PageContent_ctl00_txt_boardTitle', title);

    await page.click('#cke_18');
    await page.fill('#cke_1_contents > textarea', contents);
    console.log('내용 작성 완료');

    await page.click('#ctl00_ctl00_ContentPlaceHolder1_PageContent_ctl00_btnSave');
    await page.waitForLoadState('load');

    return true;
  } catch (err) {
    await page.screenshot({ path: 'error-screenshot.png', fullPage: true }).catch(() => {});
    fs.writeFileSync('error-console.log', consoleLogs.join('\n'));
    console.error('게시 실패:', err.message);
    console.error('현재 URL:', page.url());
    throw err;
  } finally {
    await browser.close();
  }
};
