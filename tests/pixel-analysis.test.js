import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeFrame, DIRTY_THRESHOLD } from '../src/pixel-analysis.js';
import { analyzeLetterbox } from '../src/letterbox.js';

function frame(w, h, fn) {
  const d = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const v = fn(x, y);
      const i = (y * w + x) * 4;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = 255;
    }
  }
  return d;
}

test('DIRTY_THRESHOLD worker ve ana iş parçacığı için aynıdır', () => {
  assert.equal(DIRTY_THRESHOLD, 1.2);
});

test('analyzeFrame kırpmayı tek kaynaktan (analyzeLetterbox) alır', () => {
  const w = 32, h = 18;
  const d = frame(w, h, (x, y) => (y < 3 || y >= 15 ? 0 : 200));
  const viaFrame = analyzeFrame(d, w, h, {});
  const direct = analyzeLetterbox(d, w, h, {});
  assert.deepEqual(viaFrame.crop, direct);
  assert.equal(viaFrame.crop.top, 3 / h);
  assert.equal(viaFrame.crop.bottom, 3 / h);
});

test('checkDirty açıkken aynı kare kirli sayılmaz', () => {
  const d = frame(32, 18, () => 120);
  const same = analyzeFrame(d, 32, 18, { checkDirty: true, prevData: d });
  assert.equal(same.isDirty, false);

  const prev = frame(32, 18, () => 0);
  const cur = frame(32, 18, () => 255);
  const changed = analyzeFrame(cur, 32, 18, { checkDirty: true, prevData: prev });
  assert.equal(changed.isDirty, true);
});

test('checkDirty kapalıyken kare her zaman kirli kabul edilir', () => {
  const d = frame(32, 18, () => 120);
  assert.equal(analyzeFrame(d, 32, 18, { prevData: d }).isDirty, true);
});

test('extractColors baskın rengin hex değerini döner', () => {
  const d = frame(32, 18, () => 0);
  for (let i = 0; i < d.length; i += 4) { d[i] = 220; d[i + 1] = 20; d[i + 2] = 20; }
  const r = analyzeFrame(d, 32, 18, { extractColors: true });
  assert.equal(r.dominantColor, '#dc1414');
  assert.equal(analyzeFrame(d, 32, 18, {}).dominantColor, null);
});

test('Shorts bağlamında pillarbox kırpması uygulanmaz', () => {
  const w = 32, h = 18;
  const d = frame(w, h, (x) => (x < 4 || x >= 28 ? 0 : 200));
  assert.equal(analyzeFrame(d, w, h, {}).crop.left, 4 / w);
  assert.equal(analyzeFrame(d, w, h, { isShorts: true }).crop.left, 0);
});
