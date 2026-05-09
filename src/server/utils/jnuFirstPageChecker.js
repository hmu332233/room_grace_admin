const { chromium } = require('playwright');

const BOARD_URL = 'https://www.jnu.ac.kr/WebApp/web/HOM/COM/Board/board.aspx?boardID=10';

function normalizeTitle(value) {
  return String(value || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeComparableTitle(value) {
  return normalizeTitle(value).replace(/^\[(광주|여수)\]\s*/, '');
}

function hasExactNormalizedTitle(titles, title) {
  const target = normalizeComparableTitle(title);
  return titles.some(item => normalizeComparableTitle(item) === target);
}

function isTruncatedTitle(title) {
  return normalizeTitle(title).includes('...') || normalizeTitle(title).includes('…');
}

function isPotentialTruncatedMatch(listTitle, targetTitle) {
  const visiblePrefix = normalizeComparableTitle(listTitle)
    .split(/\.{3}|…/)[0]
    .trim();
  return Boolean(visiblePrefix) && normalizeComparableTitle(targetTitle).startsWith(visiblePrefix);
}

function uniqueTitles(titles) {
  const seen = new Set();
  return titles.map(normalizeTitle).filter(title => {
    if (!title || seen.has(title)) return false;
    seen.add(title);
    return true;
  });
}

async function extractFirstPageTitles(page, targetTitle) {
  const entries = await page.evaluate(() => {
    const normalize = value =>
      String(value || '')
        .replace(/\u00a0/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    const isVisible = element => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
    };

    const seen = new Set();
    return Array.from(document.querySelectorAll('a'))
      .filter(isVisible)
      .map(element => ({
        title: normalize(element.textContent),
        href: element.href,
      }))
      .filter(entry => {
        if (!entry.title) return false;
        if (!entry.href.includes('bbsMode=view')) return false;
        if (seen.has(entry.href)) return false;
        if (/^(이전|다음|처음|끝|목록|쓰기|검색|로그인)$/i.test(entry.title)) return false;
        seen.add(entry.href);
        return true;
      });
  });

  const titles = uniqueTitles(entries.map(entry => entry.title));
  if (hasExactNormalizedTitle(titles, targetTitle)) return titles;

  const detailTitles = [];
  const detailEntries = entries.filter(entry => isTruncatedTitle(entry.title) && isPotentialTruncatedMatch(entry.title, targetTitle));

  for (const entry of detailEntries) {
    await page.goto(entry.href, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    const detailTitle = await page
      .locator('h3')
      .first()
      .textContent({ timeout: 10000 })
      .catch(() => '');
    if (detailTitle) detailTitles.push(detailTitle);
  }

  return uniqueTitles(titles.concat(detailTitles));
}

async function checkJnuFirstPageForTitle(title, options = {}) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    locale: 'ko-KR',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    extraHTTPHeaders: {
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    },
  });
  const page = await context.newPage();

  try {
    await page.goto(options.url || BOARD_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await page.waitForSelector('body', { timeout: 10000 });

    const url = page.url();
    const titles = uniqueTitles(await extractFirstPageTitles(page, title));
    return {
      found: hasExactNormalizedTitle(titles, title),
      title: normalizeTitle(title),
      titles,
      url,
    };
  } finally {
    await browser.close();
  }
}

module.exports = {
  BOARD_URL,
  normalizeTitle,
  normalizeComparableTitle,
  hasExactNormalizedTitle,
  isPotentialTruncatedMatch,
  checkJnuFirstPageForTitle,
};
