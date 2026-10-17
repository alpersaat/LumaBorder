import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeSettingValue, DEFAULT_SETTINGS, PRESETS } from '../src/settings.js';
import { analyzeLetterbox } from '../src/letterbox.js';

test('Ultra-Eco ve Drop-Frame Sentinel ayar doğrulama ve varsayılanları', () => {
  assert.equal(DEFAULT_SETTINGS.dropFrameSentinel, true);
  assert.equal(DEFAULT_SETTINGS.ultraEco, false);
  assert.equal(sanitizeSettingValue('dropFrameSentinel', true), true);
  assert.equal(sanitizeSettingValue('dropFrameSentinel', false), false);
  assert.equal(sanitizeSettingValue('ultraEco', true), true);
  assert.equal(sanitizeSettingValue('ultraEco', false), false);
  assert.equal(sanitizeSettingValue('ultraEco', null), DEFAULT_SETTINGS.ultraEco);
});

test('Hazır profillerde Ultra-Eco ve Drop Sentinel durumları', () => {
  assert.equal(PRESETS.default.dropFrameSentinel, true);
  assert.equal(PRESETS.default.ultraEco, false);
  assert.equal(PRESETS.cinema.dropFrameSentinel, true);
  assert.equal(PRESETS.vibrant.dropFrameSentinel, true);
  assert.equal(PRESETS.gaming.dropFrameSentinel, true);
  assert.equal(PRESETS.night.ultraEco, true);
});

test('Drop-Frame Sentinel durum makinesi simülasyonu', () => {
  const sentinel = {
    penaltyLevel: 0,
    cleanWindowsCount: 0,
    lastDropped: 0,
    lastTotal: 0
  };

  const evaluate = (dropped, total) => {
    const deltaDropped = dropped - sentinel.lastDropped;
    const deltaTotal = total - sentinel.lastTotal;
    sentinel.lastDropped = dropped;
    sentinel.lastTotal = total;

    if (deltaTotal <= 0) return;
    const dropRatio = deltaDropped / deltaTotal;

    if (deltaDropped > 2 && dropRatio > 0.04) {
      sentinel.penaltyLevel = Math.min(2, sentinel.penaltyLevel + 1);
      sentinel.cleanWindowsCount = 0;
    } else if (deltaDropped === 0) {
      sentinel.cleanWindowsCount++;
      if (sentinel.cleanWindowsCount >= 3 && sentinel.penaltyLevel > 0) {
        sentinel.penaltyLevel--;
        sentinel.cleanWindowsCount = 0;
      }
    }
  };

  // 1. Normal akış: kare kaybı yok
  evaluate(0, 60);
  assert.equal(sentinel.penaltyLevel, 0);

  // 2. Şiddetli kare kaybı: 60 karede 8 kare atlandı (%13 kayıp)
  evaluate(8, 120);
  assert.equal(sentinel.penaltyLevel, 1, 'Sentinel 1. seviye korumaya geçmeli');

  // 3. Tekrar kare kaybı: 60 karede 10 kare atlandı
  evaluate(18, 180);
  assert.equal(sentinel.penaltyLevel, 2, 'Sentinel 2. seviye korumaya geçmeli');

  // 4. Sistem rahatladı: 3 ardışık temiz pencere
  evaluate(18, 240); // 1. temiz
  assert.equal(sentinel.penaltyLevel, 2);
  evaluate(18, 300); // 2. temiz
  assert.equal(sentinel.penaltyLevel, 2);
  evaluate(18, 360); // 3. temiz -> ceza düşer
  assert.equal(sentinel.penaltyLevel, 1);

  // 3 pencere daha temiz geçerse seviye 0'a iner
  evaluate(18, 420);
  evaluate(18, 480);
  evaluate(18, 540);
  assert.equal(sentinel.penaltyLevel, 0, 'Tamamen normale dönmeli');
});

test('Ultra-Eco çözünürlük matematiksel boyut hesaplaması', () => {
  const getDims = (isShorts, isEco) => ({
    w: isShorts ? (isEco ? 54 : 108) : (isEco ? 96 : 192),
    h: isShorts ? (isEco ? 96 : 192) : (isEco ? 54 : 108)
  });

  const stdNormal = getDims(false, false);
  assert.deepEqual(stdNormal, { w: 192, h: 108 });

  const stdEco = getDims(false, true);
  assert.deepEqual(stdEco, { w: 96, h: 54 });
  assert.equal((stdEco.w * stdEco.h) / (stdNormal.w * stdNormal.h), 0.25, 'Eco mod piksel sayısını tam %75 azaltmalı');

  const shortsNormal = getDims(true, false);
  assert.deepEqual(shortsNormal, { w: 108, h: 192 });

  const shortsEco = getDims(true, true);
  assert.deepEqual(shortsEco, { w: 54, h: 96 });
  assert.equal((shortsEco.w * shortsEco.h) / (shortsNormal.w * shortsNormal.h), 0.25, 'Shorts Eco mod da %75 tasarruf sağlamalı');
});

