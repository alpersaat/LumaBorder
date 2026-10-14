import test from 'node:test';
import assert from 'node:assert/strict';
import { kelvinToRGB, isTimeInWindow, extractDominantAccentColor, sampleMultiZoneColors } from '../src/color-utils.js';
import { checkDirtyFrame } from '../src/letterbox.js';

test('kelvinToRGB doğru RGB çarpanları üretir', () => {
  // 6500K (Standart D65 gün ışığı)
  const d65 = kelvinToRGB(6500);
  assert.equal(d65.r, 255);
  assert.ok(d65.g >= 240 && d65.g <= 255);
  assert.ok(d65.b >= 240 && d65.b <= 255);

  // 2700K (Sıcak akkor lamba): Kırmızı yüksek, mavi düşük
  const warm = kelvinToRGB(2700);
  assert.equal(warm.r, 255);
  assert.ok(warm.g > 150 && warm.g < 210);
  assert.ok(warm.b < 120);

  // 9300K (Soğuk mavi ton): Mavi maksimum
  const cool = kelvinToRGB(9300);
  assert.equal(cool.b, 255);
  assert.ok(cool.r < 235);

  // Sınır aşımı kontrolü (2200 - 9300)
  const clampedLow = kelvinToRGB(1000);
  const kelvin2200 = kelvinToRGB(2200);
  assert.equal(clampedLow.r, kelvin2200.r);
});

test('isTimeInWindow zaman aralıklarını gece yarısı geçişlerinde de doğru hesaplar', () => {
  // 22:00 - 07:00 Gece Karartması
  const d23 = new Date(2026, 9, 14, 23, 30); // 23:30
  assert.equal(isTimeInWindow(d23, '22:00', '07:00'), true);

  const d03 = new Date(2026, 9, 14, 3, 15); // 03:15
  assert.equal(isTimeInWindow(d03, '22:00', '07:00'), true);

  const d14 = new Date(2026, 9, 14, 14, 0); // 14:00 (Öğlen)
  assert.equal(isTimeInWindow(d14, '22:00', '07:00'), false);

  // Gündüz aralığı: 09:00 - 18:00
  const d10 = new Date(2026, 9, 14, 10, 0);
  assert.equal(isTimeInWindow(d10, '09:00', '18:00'), true);
  assert.equal(isTimeInWindow(d23, '09:00', '18:00'), false);
});

test('extractDominantAccentColor baskın renkleri yakalar', () => {
  const w = 10, h = 10;
  const data = new Uint8ClampedArray(w * h * 4);

  // Parlak camgöbeği (Cyan: 0, 255, 255) pikseller doldur
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 0;
    data[i + 1] = 230;
    data[i + 2] = 255;
    data[i + 3] = 255;
  }

  const color = extractDominantAccentColor(data, w, h);
  assert.equal(color.g, 230);
  assert.equal(color.b, 255);
  assert.equal(color.r, 0);
  assert.equal(color.hex, '#00e6ff');
});

test('sampleMultiZoneColors kenar bölgelerini doğru böler', () => {
  const w = 32, h = 18;
  const data = new Uint8ClampedArray(w * h * 4);

  // Sol taraf kırmızı, sağ taraf mavi
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      if (x < w / 2) {
        data[idx] = 255;     // Red
        data[idx + 1] = 0;
        data[idx + 2] = 0;
      } else {
        data[idx] = 0;
        data[idx + 1] = 0;
        data[idx + 2] = 255; // Blue
      }
      data[idx + 3] = 255;
    }
  }

  const zones = sampleMultiZoneColors(data, w, h, 8);
  assert.equal(zones.length, 8);

  const leftZone = zones.find(z => z.edge === 'left');
  const rightZone = zones.find(z => z.edge === 'right');

  assert.ok(leftZone.r > 200 && leftZone.b < 50, 'Sol bölge kırmızı olmalı');
  assert.ok(rightZone.b > 200 && rightZone.r < 50, 'Sağ bölge mavi olmalı');
});

test('checkDirtyFrame durağan sahneleri algılar', () => {
  const len = 32 * 18 * 4;
  const frame1 = new Uint8ClampedArray(len).fill(100);
  const frame2 = new Uint8ClampedArray(len).fill(100);

  // Tamamen aynı kareler -> isDirty: false
  const resSame = checkDirtyFrame(frame1, frame2);
  assert.equal(resSame.isDirty, false);
  assert.equal(resSame.diff, 0);

  // Değişen kareler (sahne geçişi) -> isDirty: true
  const frame3 = new Uint8ClampedArray(len).fill(180);
  const resChanged = checkDirtyFrame(frame1, frame3);
  assert.equal(resChanged.isDirty, true);
  assert.ok(resChanged.diff > 50);
});

