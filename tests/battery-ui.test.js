import test from 'node:test';
import assert from 'node:assert/strict';
import { computePopupBatteryView, computeStatusView } from '../src/battery-ui.js';

const t = (key) => key;

test('pil API yoksa desteklenmediği bildirilir', () => {
  const v = computePopupBatteryView({ supported: false }, true, t);
  assert.equal(v.supported, false);
  assert.equal(v.icon, '🔌');
  assert.equal(v.ecoActive, false);
  assert.ok(v.text.includes('batteryStatusTitle'));
  assert.ok(v.text.includes('batteryNotSupported'));
});

test('şarj yokken %20 ve altında eko aktif olur', () => {
  const v = computePopupBatteryView({ supported: true, charging: false, level: 15 }, true, t);
  assert.equal(v.ecoActive, true);
  assert.equal(v.icon, '🪫');
  assert.ok(v.text.startsWith('%15'));
  assert.ok(v.text.includes('batteryEcoActiveBadge'));
});

test('şarj olurken eko devre dışıdır', () => {
  const v = computePopupBatteryView({ supported: true, charging: true, level: 15 }, true, t);
  assert.equal(v.ecoActive, false);
  assert.equal(v.icon, '⚡');
  assert.ok(v.text.includes('batteryCharging'));
});

test('%20 üzerinde normal seviye gösterilir', () => {
  const v = computePopupBatteryView({ supported: true, charging: false, level: 80 }, true, t);
  assert.equal(v.ecoActive, false);
  assert.equal(v.icon, '🔋');
  assert.ok(v.text.includes('batteryDischarging'));
});

test('autoBatteryEco kapalıysa eko hiç etkinleşmez', () => {
  const v = computePopupBatteryView({ supported: true, charging: false, level: 5 }, false, t);
  assert.equal(v.ecoActive, false);
});

test('computeStatusView aktif/pasif metnini ve sınıfını döner', () => {
  assert.deepEqual(computeStatusView(true, t), { text: 'statusActive', inactive: false });
  assert.deepEqual(computeStatusView(false, t), { text: 'statusInactive', inactive: true });
});
