import test from 'node:test';
import assert from 'node:assert/strict';

// render-worker.js bir worker betiğidir (self.onmessage / self.postMessage).
// Node ortamında self === globalThis olduğundan bunu doğrudan test edebiliriz.
globalThis.self = globalThis;

const posted = [];
globalThis.postMessage = (msg) => posted.push(msg);

await import('../src/render-worker.js');

function tick() {
  return new Promise((r) => setTimeout(r, 0));
}

function makeCtx() {
  const calls = [];
  return {
    calls,
    drawImage: (...args) => calls.push(['drawImage', ...args]),
    fillStyle: null,
    fillRect: (...args) => calls.push(['fillRect', ...args]),
    save: () => calls.push(['save']),
    restore: () => calls.push(['restore'])
  };
}

function makeCanvas2d() {
  const ctx = makeCtx();
  return { getContext: () => ctx, ctx, width: 192, height: 108 };
}

// Letterbox testi karesi: 32x18, üst 3 satır siyah, geri kalanı gri(200)
function letterboxFrame() {
  const w = 32, h = 18;
  const d = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    const v = y < 3 ? 0 : 200;
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = 255;
    }
  }
  return d;
}

// ANALYZE_PIXELS için sahte OffscreenCanvas
function installFakeOffscreenCanvas(imgData) {
  globalThis.OffscreenCanvas = class OffscreenCanvas {
    constructor(w, h) {
      this.width = w;
      this.height = h;
    }
    getContext() {
      return {
        drawImage: () => {},
        getImageData: () => ({ data: imgData })
      };
    }
  };
}
function uninstallFakeOffscreenCanvas() {
  // Native OffscreenCanvas non-writable olabilir; konstruktor fırlatan bir sınıfla değiştir ki worker catch bloğuna düşer ve varsayılan crop döner.
  globalThis.OffscreenCanvas = class OffscreenCanvas {
    constructor() { throw new TypeError('OffscreenCanvas not available'); }
  };
}

test('INIT mesajına READY yanıtı döner (tuval olmadan bile)', () => {
  posted.length = 0;
  self.onmessage({ data: { type: 'INIT', data: {} } });
  assert.ok(posted.some((m) => m.type === 'READY'), 'READY mesajı beklenir');
});

test('INIT diffuse ve tight tuval bağlamlarını bağlar, hata yemesin', () => {
  posted.length = 0;
  const c1 = makeCanvas2d();
  const c2 = makeCanvas2d();
  self.onmessage({ data: { type: 'INIT', data: { diffuseCanvas: c1, tightCanvas: c2 } } });
  assert.ok(posted.some((m) => m.type === 'READY'));
});

test('DRAW_FRAME diffuse tuvaline çizer ve bitmapi kapatır', () => {
  posted.length = 0;
  const canvas = makeCanvas2d();
  self.onmessage({ data: { type: 'INIT', data: { diffuseCanvas: canvas } } });

  let closed = false;
  const bitmap = { close: () => { closed = true; } };

  self.onmessage({
    data: {
      type: 'DRAW_FRAME',
      data: { bitmap, sx: 0, sy: 0, sw: 100, sh: 100, canvasWidth: 192, canvasHeight: 108 }
    }
  });

  const draw = canvas.ctx.calls.find((c) => c[0] === 'drawImage');
  assert.ok(draw, 'diffuseCtx.drawImage çağrılmalı');
  assert.deepEqual(draw.slice(1), [bitmap, 0, 0, 100, 100, 0, 0, 192, 108]);
  assert.equal(closed, true, 'bitmap.close çağrılmalı');
});

test('DRAW_FRAME dualLayer olduğunda tight tuvaline de çizer', () => {
  posted.length = 0;
  const diffuse = makeCanvas2d();
  const tight = makeCanvas2d();
  self.onmessage({ data: { type: 'INIT', data: { diffuseCanvas: diffuse, tightCanvas: tight } } });

  const bitmap = { close: () => {} };
  self.onmessage({
    data: {
      type: 'DRAW_FRAME',
      data: { bitmap, sx: 0, sy: 0, sw: 50, sh: 50, canvasWidth: 192, canvasHeight: 108, dualLayer: true }
    }
  });

  assert.ok(tight.ctx.calls.some((c) => c[0] === 'drawImage'), 'tightCtx.drawImage çağrılmalı');
});

test('DRAW_BIAS verilen rengi diffuse (ve dualLayer ise tight) tuvaline doldurur', () => {
  posted.length = 0;
  const canvas = makeCanvas2d();
  const tight = makeCanvas2d();
  self.onmessage({ data: { type: 'INIT', data: { diffuseCanvas: canvas, tightCanvas: tight } } });

  self.onmessage({
    data: { type: 'DRAW_BIAS', data: { color: '#ff0000', canvasWidth: 192, canvasHeight: 108, dualLayer: true } }
  });

  const dFill = canvas.ctx.calls.find((c) => c[0] === 'fillRect');
  const tFill = tight.ctx.calls.find((c) => c[0] === 'fillRect');
  assert.equal(canvas.ctx.fillStyle, '#ff0000');
  assert.deepEqual(dFill.slice(1), [0, 0, 192, 108]);
  assert.ok(tFill, 'dualLayer iken tightCanvas da doldurulmalı');
  assert.deepEqual(tFill.slice(1), [0, 0, 192, 108]);
});

test('ANALYZE_PIXELS letterbox şeritlerini tespit eder (crop.top)', () => {
  posted.length = 0;
  installFakeOffscreenCanvas(letterboxFrame());
  try {
    const bitmap = { close: () => {} };
    self.onmessage({
      data: {
        type: 'ANALYZE_PIXELS',
        data: { bitmap, checkLetterbox: true, checkPillarbox: false, isShorts: false, checkDirty: false, extractColors: false }
      }
    });

    const res = posted.find((m) => m.type === 'ANALYSIS_RESULT');
    assert.ok(res, 'ANALYSIS_RESULT beklenir');
    assert.equal(res.crop.top, 3 / 18, 'üst siyah şerit oranı 3/18 olmalı');
    assert.equal(res.crop.bottom, 0);
    assert.equal(res.crop.left, 0);
    assert.equal(res.crop.right, 0);
    assert.equal(res.isDirty, true);
    assert.equal(res.dominantColor, null);
  } finally {
    uninstallFakeOffscreenCanvas();
  }
});

test('ANALYZE_PIXELS aynı kareyi tekrar gönderirse isDirty false olur', () => {
  posted.length = 0;
  installFakeOffscreenCanvas(letterboxFrame());
  try {
    // Önceki testlerden kalma prevAnalysisData'yı temizle
    self.onmessage({ data: { type: 'RESET' } });
    const send = () => {
      self.onmessage({
        data: {
          type: 'ANALYZE_PIXELS',
          data: { bitmap: { close: () => {} }, checkLetterbox: false, checkPillarbox: false, isShorts: false, checkDirty: true, extractColors: false }
        }
      });
    };
    send();
    let res = posted.find((m) => m.type === 'ANALYSIS_RESULT');
    assert.equal(res.isDirty, true, 'ilk kare kirlidir');

    posted.length = 0;
    send();
    res = posted.find((m) => m.type === 'ANALYSIS_RESULT');
    assert.equal(res.isDirty, false, 'aynı kare durağandır');
  } finally {
    uninstallFakeOffscreenCanvas();
  }
});

test('ANALYZE_PIXELS extractColors ile baskın akcent rengi döndürür', () => {
  posted.length = 0;
  installFakeOffscreenCanvas(letterboxFrame());
  try {
    self.onmessage({
      data: {
        type: 'ANALYZE_PIXELS',
        data: { bitmap: { close: () => {} }, checkLetterbox: false, checkPillarbox: false, isShorts: false, checkDirty: false, extractColors: true }
      }
    });
    const res = posted.find((m) => m.type === 'ANALYSIS_RESULT');
    assert.equal(res.dominantColor, '#c8c8c8', 'gri karenin hexi #c8c8c8 olmalı');
  } finally {
    uninstallFakeOffscreenCanvas();
  }
});

test('ANALYZE_PIXELS OffscreenCanvas yoksa çökmeden varsayılan sonuç döner', async () => {
  posted.length = 0;
  const hadOC = 'OffscreenCanvas' in globalThis;
  uninstallFakeOffscreenCanvas();
  try {
    // Önceki testlerden kalma worker durumunu sıfırla
    self.onmessage({ data: { type: 'RESET' } });
    self.onmessage({
      data: {
        type: 'ANALYZE_PIXELS',
        data: { bitmap: { close: () => {} }, checkLetterbox: true, checkPillarbox: false, isShorts: false, checkDirty: false, extractColors: false }
      }
    });
    await tick();
    const res = posted.find((m) => m.type === 'ANALYSIS_RESULT');
    assert.ok(res, 'hataansa bile ANALYSIS_RESULT dönmeli');
    assert.deepEqual(res.crop, { top: 0, bottom: 0, left: 0, right: 0 });
  } finally {
    if (hadOC) installFakeOffscreenCanvas(new Uint8ClampedArray(4));
  }
});

test('Bilinmeyen mesaj türü çökmez ve hiçbir şey yayımlamaz', () => {
  posted.length = 0;
  self.onmessage({ data: { type: 'NONEXISTENT_TYPE', data: {} } });
  self.onmessage({ data: {} });
  self.onmessage({});
  assert.equal(posted.length, 0);
});
