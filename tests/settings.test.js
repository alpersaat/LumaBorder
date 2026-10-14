import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeSettingValue, DEFAULT_SETTINGS } from '../src/settings.js';

test('sayısal değerler sınırlanır ve NaN varsayılana döner', () => {
  assert.equal(sanitizeSettingValue('brightness', 9999), 500);
  assert.equal(sanitizeSettingValue('brightness', -5), 0);
  assert.equal(sanitizeSettingValue('brightness', 'abc'), DEFAULT_SETTINGS.brightness);
  assert.equal(sanitizeSettingValue('blur', null), DEFAULT_SETTINGS.blur);
});

test('targetFps yalnızca sync/30/60 kabul eder', () => {
  assert.equal(sanitizeSettingValue('targetFps', '60'), 60);
  assert.equal(sanitizeSettingValue('targetFps', 'sync'), 'sync');
  assert.equal(sanitizeSettingValue('targetFps', 144), DEFAULT_SETTINGS.targetFps);
});

test('geçersiz renk ve mod varsayılana döner', () => {
  assert.equal(sanitizeSettingValue('biasLightingColor', 'red;<script>'), DEFAULT_SETTINGS.biasLightingColor);
  assert.equal(sanitizeSettingValue('biasLightingColor', '#abc'), '#abc');
  assert.equal(sanitizeSettingValue('biasLightingMode', 'x'), 'off');
});

