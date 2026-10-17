import test from 'node:test';
import assert from 'node:assert/strict';
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

test('üst/alt siyah şeritler letterbox olarak algılanır', () => {
  const w = 32, h = 18;
  const d = frame(w, h, (x, y) => (y < 3 || y >= 15 ? 0 : 200));
  const c = analyzeLetterbox(d, w, h);
  assert.equal(c.top, 3 / h);
  assert.equal(c.bottom, 3 / h);
  assert.equal(c.left, 0);
});

test('sol/sağ siyah şeritler pillarbox olarak algılanır, Shorts hariç', () => {
  const w = 32, h = 18;
  const d = frame(w, h, (x) => (x < 4 || x >= 28 ? 0 : 200));
  assert.equal(analyzeLetterbox(d, w, h).left, 4 / w);
  assert.equal(analyzeLetterbox(d, w, h, { isShorts: true }).left, 0);
});

test('tamamen karanlık sahne kırpılmaz', () => {
  const d = frame(32, 18, () => 0);
  assert.deepEqual(analyzeLetterbox(d, 32, 18), { top: 0, bottom: 0, left: 0, right: 0 });
});

test('tam ekran aydınlık sahnelerde kırpma 0 döner (hızlı kenar çıkışı)', () => {
  const d = frame(32, 18, () => 180);
  assert.deepEqual(analyzeLetterbox(d, 32, 18), { top: 0, bottom: 0, left: 0, right: 0 });
});


