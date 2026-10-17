import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getCanvasDimensions,
  getAnalysisCanvasSize,
  computeLayerStyles,
  computeEdgeWeights,
  computeBottomMask,
  computeSourceRect,
  computeBarFillPixels,
  resolveEffectiveFps,
  getMaxBlurPasses,
  createDropSentinel,
  stepDropSentinel
} from '../src/render-config.js';
import { DEFAULT_SETTINGS } from '../src/settings.js';

const S = (over = {}) => ({ ...DEFAULT_SETTINGS, ...over });
const close = (a, b, eps = 0.006) => Math.abs(a - b) < eps;

test('Ultra-Eco çözünürlükleri standart ve Shorts için doğru hesaplanır', () => {
  assert.deepEqual(getCanvasDimensions(false, false), { width: 192, height: 108 });
  assert.deepEqual(getCanvasDimensions(false, true), { width: 96, height: 54 });
  assert.deepEqual(getCanvasDimensions(true, false), { width: 108, height: 192 });
  assert.deepEqual(getCanvasDimensions(true, true), { width: 54, height: 96 });
});

test('analiz tuvali en-boy oranına göre seçilir', () => {
  assert.deepEqual(getAnalysisCanvasSize(false), { width: 32, height: 18 });
  assert.deepEqual(getAnalysisCanvasSize(true), { width: 18, height: 32 });
});

test('standart katman stilleri varsayılan ayarlarla eşleşir', () => {
  const st = computeLayerStyles(S({ nightShiftEnabled: false }));
  assert.equal(st.isNight, false);
  assert.equal(st.blur, 45);
  assert.equal(st.tightBlur, 16);
  assert.equal(st.scaleX, '1.25');
  assert.equal(st.scaleY, '1.25');
  assert.equal(st.tightScaleX, '1.06');
  assert.equal(st.brightness, '1.00');
  assert.equal(st.contrast, '1.05');
  assert.equal(st.saturate, '1.20');
  assert.equal(st.smoothingSec.toFixed(2), '0.15');
});

test('bulanıklık alt sınırı 10 ile korunur', () => {
  assert.equal(computeLayerStyles(S({ blur: 2 })).blur, 10);
  assert.equal(computeLayerStyles(S({ blur: 2 })).tightBlur, 8);
});

test('Shorts katman geometrisi dikey videoya göre ölçeklenir', () => {
  const st = computeLayerStyles(S({ nightShiftEnabled: false, spread: 25 }), { isShorts: true });
  assert.ok(close(Number(st.scaleX), 1.40), st.scaleX);
  assert.ok(close(Number(st.scaleY), 1.0325), st.scaleY);
  assert.ok(close(Number(st.tightScaleX), 1.1375), st.tightScaleX);
  assert.ok(close(Number(st.tightScaleY), 1.015), st.tightScaleY);
});

test('gece karartması parlaklığı ve kelvin sıcaklığını sınırlar', () => {
  const settings = S({
    nightShiftEnabled: true,
    brightness: 100,
    colorTemperature: 9300,
    nightShiftStart: '22:00',
    nightShiftEnd: '07:00'
  });

  const night = computeLayerStyles(settings, { now: new Date(2026, 0, 15, 23, 30) });
  assert.equal(night.isNight, true);
  assert.equal(night.effectiveBrightness, 65);
  assert.equal(night.effectiveKelvin, 3200);
  assert.equal(night.brightness, '0.65');

  const day = computeLayerStyles(settings, { now: new Date(2026, 0, 15, 12, 0) });
  assert.equal(day.isNight, false);
  assert.equal(day.effectiveBrightness, 100);
  assert.equal(day.effectiveKelvin, 9300);

  const off = computeLayerStyles(
    S({ nightShiftEnabled: false, brightness: 100, colorTemperature: 9300 }),
    { now: new Date(2026, 0, 15, 23, 30) }
  );
  assert.equal(off.isNight, false);
  assert.equal(off.effectiveBrightness, 100);
});

test('4-bölge kenar ağırlıkları kapalı kenarları sıfırlar', () => {
  assert.deepEqual(computeEdgeWeights(S({})), [1, 1, 1, 1]);
  assert.deepEqual(computeEdgeWeights(S({ edgeTop: false })), [0, 1, 1, 1]);
  assert.deepEqual(computeEdgeWeights(S({ edgeTopSpread: 50 })), [0.5, 1, 1, 1]);
});

test('alt maske gradyanı altyazı ve manuel solmayı birleştirir', () => {
  assert.equal(computeBottomMask(S({ bottomFade: false, autoSubtitleDim: false }), false), 'none');
  assert.equal(computeBottomMask(S({ bottomFade: false, autoSubtitleDim: true }), false), 'none');

  const manual = computeBottomMask(S({ bottomFade: true, bottomFadeStrength: 60, autoSubtitleDim: false }), false);
  assert.match(manual, /rgba\(0,0,0,0\.40\) 100%\)/);

  const sub = computeBottomMask(S({ bottomFade: true, bottomFadeStrength: 60, autoSubtitleDim: true }), true);
  assert.match(sub, /rgba\(0,0,0,0\.25\) 100%\)/);

  const subOverride = computeBottomMask(S({ bottomFade: false, autoSubtitleDim: true }), true);
  assert.match(subOverride, /rgba\(0,0,0,0\.25\) 100%\)/);
});

test('kaynak dikdörtgeni kırpmayı %40 ile sınırlar ve en az 10px bırakır', () => {
  const full = computeSourceRect(1920, 1080, { top: 0, bottom: 0, left: 0, right: 0 });
  assert.deepEqual([full.sx, full.sy, full.sw, full.sh], [0, 0, 1920, 1080]);

  const crop = computeSourceRect(1920, 1080, { top: 0.1, bottom: 0.1, left: 0.1, right: 0.1 });
  assert.deepEqual([crop.sx, crop.sy, crop.sw, crop.sh], [192, 108, 1536, 864]);

  const clamped = computeSourceRect(1000, 1000, { top: 0.9, bottom: 0.9, left: 0, right: 0 });
  assert.equal(clamped.cropT, 0.4);
  assert.equal(clamped.cropB, 0.4);
  assert.equal(clamped.sh, 200);

  const tiny = computeSourceRect(20, 20, { top: 0.4, bottom: 0.4, left: 0, right: 0 });
  assert.equal(tiny.sh, 10);
});

test('bar fill piksel ölçüleri oynatıcı dikdörtgeniyle ölçeklenir', () => {
  const px = computeBarFillPixels({ width: 800, height: 500 }, { top: 0.1, bottom: 0.05, left: 0.2, right: 0 });
  assert.deepEqual(px, { top: 50, bottom: 25, left: 160, right: 0 });
});

test('hedef FPS çözümü öncelikleri doğru uygular', () => {
  const base = S({ targetFps: 30, autoBatteryEco: true, freezeDetection: true });
  assert.equal(resolveEffectiveFps(base, {}), 30);
  assert.equal(resolveEffectiveFps(S({ targetFps: 'sync' }), {}), null);
  assert.equal(resolveEffectiveFps(S({ targetFps: 60 }), {}), 60);
  assert.equal(resolveEffectiveFps(base, { isBatteryEcoActive: true }), 30);
  assert.equal(resolveEffectiveFps(S({ targetFps: 60, autoBatteryEco: false }), { isBatteryEcoActive: true }), 60);
  assert.equal(resolveEffectiveFps(S({ targetFps: 'sync' }), { penaltyLevel: 1 }), 30);
  assert.equal(resolveEffectiveFps(S({ targetFps: 60 }), { penaltyLevel: 2 }), 30);
  assert.equal(resolveEffectiveFps(base, { isFrameFrozen: true }), 1);
  assert.equal(resolveEffectiveFps(S({ targetFps: 30, freezeDetection: false }), { isFrameFrozen: true }), 30);
});

test('bulanıklaştırma geçiş sayısı ceza seviyesine göre düşer', () => {
  assert.deepEqual([0, 1, 2].map(getMaxBlurPasses), [3, 3, 1]);
});

test('drop-frame sentinel kare kaybında ceza artırır, temiz pencerede düşürür', () => {
  const s = createDropSentinel();
  assert.equal(s.penaltyLevel, 0);

  // %10 kare kaybı → ceza 1
  stepDropSentinel(s, { dropped: 10, total: 100 });
  assert.equal(s.penaltyLevel, 1);
  assert.equal(s.cleanWindowsCount, 0);

  // Ardışık üç temiz pencere → ceza 0
  stepDropSentinel(s, { dropped: 10, total: 200 });
  stepDropSentinel(s, { dropped: 10, total: 300 });
  assert.equal(s.penaltyLevel, 1);
  stepDropSentinel(s, { dropped: 10, total: 400 });
  assert.equal(s.penaltyLevel, 0);
  assert.equal(s.cleanWindowsCount, 0);
});

test('drop-frame sentinel önemsiz kaybı ve ilerlemeyen sayaçları yok sayar', () => {
  const s = createDropSentinel();
  // İlerleme yok → değişiklik yok
  stepDropSentinel(s, { dropped: 5, total: 0 });
  assert.equal(s.penaltyLevel, 0);

  // 1 kare kayıp (eşik altı) → ceza yok, temiz pencere de artmaz
  stepDropSentinel(s, { dropped: 5, total: 100 });
  stepDropSentinel(s, { dropped: 6, total: 200 });
  assert.equal(s.penaltyLevel, 0);
  assert.equal(s.cleanWindowsCount, 0);

  // Yüksek oran → ceza 2'ye kadar çıkar
  stepDropSentinel(s, { dropped: 20, total: 260 });
  stepDropSentinel(s, { dropped: 40, total: 320 });
  assert.equal(s.penaltyLevel, 2);
});
