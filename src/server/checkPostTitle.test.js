const assert = require('assert');
const { normalizeTitle, normalizeComparableTitle, hasExactNormalizedTitle, isPotentialTruncatedMatch } = require('./utils/jnuFirstPageChecker');

assert.strictEqual(normalizeTitle('  원룸\n그레이스\t공지  '), '원룸 그레이스 공지');
assert.strictEqual(normalizeTitle('[광주]\u00a0원룸'), '[광주] 원룸');
assert.strictEqual(normalizeComparableTitle('[광주]\u00a0원룸 그레이스 공지'), '원룸 그레이스 공지');

assert.strictEqual(hasExactNormalizedTitle(['첫 글', '[광주]\u00a0원룸\n그레이스\t공지', '다른 글'], '원룸 그레이스 공지'), true);

assert.strictEqual(hasExactNormalizedTitle(['원룸 그레이스 공지사항'], '원룸 그레이스 공지'), false);
assert.strictEqual(hasExactNormalizedTitle(['원룸 그레이스 공지'], '원룸 그레이스 공지사항'), false);
assert.strictEqual(isPotentialTruncatedMatch('[광주]★신축풀옵션 주방분리형 원룸★ (엘리베이터 있음) - 예대...', '★신축풀옵션 주방분리형 원룸★ (엘리베이터 있음) - 예대1분거리'), true);
assert.strictEqual(isPotentialTruncatedMatch('[광주]다른 글...', '원룸 그레이스 공지'), false);

console.log('checkPostTitle helper tests passed');
