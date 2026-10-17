import test from 'node:test';
import assert from 'node:assert/strict';
import { computeBassEnergy, sensitivityFactor, computePulse } from '../src/beat-detect.js';

const bins = (first, rest = 0, length = 32) => {
  const a = new Uint8Array(length).fill(rest);
  for (let i = 0; i < Math.min(6, length); i++) a[i] = first;
  return a;
};

test('computeBassEnergy ilk altı bandın ortalamasını alır', () => {
  const data = new Uint8Array(32).fill(0);
  [30, 60, 90, 120, 150, 180].forEach((v, i) => { data[i] = v; });
  // yüksek bantlar ortalamaya girmez
  for (let i = 6; i < 32; i++) data[i] = 255;
  assert.equal(computeBassEnergy(data), (30 + 60 + 90 + 120 + 150 + 180) / 6);
  assert.equal(computeBassEnergy(new Uint8Array(0)), 0);
});

test('hassasiyet çarpanı düşük hassasiyette daha yüksek eşik üretir', () => {
  assert.ok(sensitivityFactor(10) > sensitivityFactor(100));
  assert.ok(Math.abs(sensitivityFactor(100) - 1.1) < 1e-9);
});

test('yüksek bas enerjisi nabzı yükseltir (vuruş)', () => {
  const result = computePulse({ currentPulse: 1.0, bassAverage: 0 }, bins(200), 50);
  assert.ok(result.currentPulse > 1.2, String(result.currentPulse));
  assert.ok(result.bassEnergy > 45);
});

test('sessizlikte nabız yumuşak sönümlenir ve 1.0 altına inmez', () => {
  let state = { currentPulse: 1.3, bassAverage: 0 };
  let pulse = 1.3;
  for (let i = 0; i < 40; i++) {
    const r = computePulse(state, bins(0), 50);
    state = { currentPulse: r.currentPulse, bassAverage: r.bassAverage };
    pulse = r.currentPulse;
  }
  assert.equal(pulse, 1.0);
});

test('mevcut yüksek nabız daha küçük vuruşla korunur (max)', () => {
  const result = computePulse({ currentPulse: 2.0, bassAverage: 0 }, bins(60), 50);
  assert.equal(result.currentPulse, 2.0);
});

test('eşik taban değeri 35\'in altına inmez', () => {
  const result = computePulse({ currentPulse: 1.0, bassAverage: 0 }, bins(0), 100);
  assert.equal(result.threshold, 35);
});
