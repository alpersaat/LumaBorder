import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { analyzeLetterbox } from '../src/letterbox.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** OffscreenCanvas + 2D bağlam taklidi; çizilen kaynağın pikselini geri verir. */
function createFakeCanvasClass() {
  class FakeContext {
    constructor() {
      this.lastSource = null;
      this.fillStyle = null;
      this.fills = [];
    }
    drawImage(source) { this.lastSource = source; }
    getImageData(x, y, w, h) {
      const data = (this.lastSource && this.lastSource.data)
        ? this.lastSource.data
        : new Uint8ClampedArray(w * h * 4);
      return { data, width: w, height: h };
    }
    save() {}
    restore() {}
    fillRect(x, y, w, h) { this.fills.push({ x, y, w, h, style: this.fillStyle }); }
  }

  return class OffscreenCanvas {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this._ctx = new FakeContext();
    }
    getContext() { return this._ctx; }
  };
}

function loadWorker() {
  const code = fs.readFileSync(path.join(root, 'src/render-worker.js'), 'utf8');
  const messages = [];
  const self_ = { postMessage: (msg) => messages.push(msg), onmessage: null };
  const context = { self: self_, OffscreenCanvas: createFakeCanvasClass(), console };
  vm.createContext(context);
  vm.runInContext(code, context);
  return {
    messages,
    Canvas: context.OffscreenCanvas,
    send: (data) => self_.onmessage({ data })
  };
}

function letterboxPixels(w, h, topRows, bottomRows) {
  const d = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    const dark = y < topRows || y >= h - bottomRows;
    for (let x = 0; x < w; x++) {
      const v = dark ? 0 : 200;
      const i = (y * w + x) * 4;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = 255;
    }
  }
  return d;
}

test('INIT mesajı READY yanıtı üretir', () => {
  const { messages, send } = loadWorker();
  send({ type: 'INIT', data: {} });
  assert.equal(messages.at(-1).type, 'READY');
});

test('ANALYZE_PIXELS ana iş parçacığıyla aynı kırpmayı döner (parity)', () => {
  const { messages, send } = loadWorker();
  send({ type: 'INIT', data: {} });

  const w = 32, h = 18;
  const data = letterboxPixels(w, h, 3, 3);
  const bitmap = { data, close() { this.closed = true; } };
  send({ type: 'ANALYZE_PIXELS', data: { bitmap, checkLetterbox: true, checkPillarbox: true, isShorts: false } });

  const result = messages.at(-1);
  assert.equal(result.type, 'ANALYSIS_RESULT');
  assert.equal(result.crop.top, 3 / h);
  assert.equal(result.crop.bottom, 3 / h);
  assert.equal(result.crop.left, 0);
  assert.equal(result.crop.right, 0);
  assert.equal(bitmap.closed, true);
});

test('checkDirty ardışık kareler arasında statik sahneyi tespit eder', () => {
  const { messages, send } = loadWorker();
  send({ type: 'INIT', data: {} });

  const w = 32, h = 18;
  const a = letterboxPixels(w, h, 0, 0);
  send({ type: 'ANALYZE_PIXELS', data: { bitmap: { data: a, close() {} }, checkDirty: true } });
  assert.equal(messages.at(-1).isDirty, true); // referans kare yok

  const b = new Uint8ClampedArray(a);
  send({ type: 'ANALYZE_PIXELS', data: { bitmap: { data: b, close() {} }, checkDirty: true } });
  assert.equal(messages.at(-1).isDirty, false); // aynı sahne

  const c = letterboxPixels(w, h, 3, 3);
  send({ type: 'ANALYZE_PIXELS', data: { bitmap: { data: c, close() {} }, checkDirty: true } });
  assert.equal(messages.at(-1).isDirty, true); // sahne değişti
});

test('Shorts için analiz tuvali dikey boyuta geçer', () => {
  const { messages, send } = loadWorker();
  send({ type: 'INIT', data: {} });

  const data = letterboxPixels(18, 32, 0, 0);
  send({ type: 'ANALYZE_PIXELS', data: { bitmap: { data, close() {} }, isShorts: true } });
  assert.equal(messages.at(-1).type, 'ANALYSIS_RESULT');
  assert.equal(messages.at(-1).crop.left, 0);
});

test('DRAW_FRAME bitmap\'i çizer ve kaynağı kapatır', () => {
  const { send, Canvas } = loadWorker();
  const diffuse = new Canvas(192, 108);
  const tight = new Canvas(192, 108);
  send({ type: 'INIT', data: { diffuseCanvas: diffuse, tightCanvas: tight } });

  const bitmap = { closed: false, close() { this.closed = true; } };
  send({ type: 'DRAW_FRAME', data: { bitmap, sx: 0, sy: 0, sw: 100, sh: 100, canvasWidth: 192, canvasHeight: 108, dualLayer: true } });

  assert.equal(diffuse._ctx.lastSource, bitmap);
  assert.equal(tight._ctx.lastSource, bitmap);
  assert.equal(bitmap.closed, true);
});

test('DRAW_BIAS verilen rengi canvasa doldurur', () => {
  const { send, Canvas } = loadWorker();
  const diffuse = new Canvas(192, 108);
  send({ type: 'INIT', data: { diffuseCanvas: diffuse } });

  send({ type: 'DRAW_BIAS', data: { color: '#ffe4b5', canvasWidth: 192, canvasHeight: 108, dualLayer: false } });

  assert.equal(diffuse._ctx.fills.length, 1);
  assert.deepEqual(diffuse._ctx.fills[0], { x: 0, y: 0, w: 192, h: 108, style: '#ffe4b5' });
});

test('bitmap içermeyen ANALYZE_PIXELS ve bilinmeyen mesajlar sessizce yok sayılır', () => {
  const { messages, send } = loadWorker();
  assert.doesNotThrow(() => send({ type: 'ANALYZE_PIXELS', data: {} }));
  assert.doesNotThrow(() => send({ type: 'BILINMEYEN', data: {} }));
  assert.equal(messages.length, 0);
});
