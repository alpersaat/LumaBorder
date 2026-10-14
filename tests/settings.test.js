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

test('yeni v3.0 ayarları doğru doğrulanır ve sınırlandırılır', () => {
  // renderEngine: webgl veya canvas2d
  assert.equal(sanitizeSettingValue('renderEngine', 'webgl'), 'webgl');
  assert.equal(sanitizeSettingValue('renderEngine', 'canvas2d'), 'canvas2d');
  assert.equal(sanitizeSettingValue('renderEngine', 'invalidEngine'), DEFAULT_SETTINGS.renderEngine);

  // colorSpace: display-p3 veya srgb
  assert.equal(sanitizeSettingValue('colorSpace', 'display-p3'), 'display-p3');
  assert.equal(sanitizeSettingValue('colorSpace', 'srgb'), 'srgb');
  assert.equal(sanitizeSettingValue('colorSpace', 'rec2020'), DEFAULT_SETTINGS.colorSpace);

  // colorTemperature: 2200 - 9300
  assert.equal(sanitizeSettingValue('colorTemperature', 1000), 2200);
  assert.equal(sanitizeSettingValue('colorTemperature', 15000), 9300);
  assert.equal(sanitizeSettingValue('colorTemperature', 6500), 6500);

  // edgeSpread: 0 - 200
  assert.equal(sanitizeSettingValue('edgeTopSpread', 350), 200);
  assert.equal(sanitizeSettingValue('edgeBottomSpread', -10), 0);
  assert.equal(sanitizeSettingValue('edgeLeftSpread', 125), 125);

  // zoneCount: 8, 12, 16
  assert.equal(sanitizeSettingValue('zoneCount', 8), 8);
  assert.equal(sanitizeSettingValue('zoneCount', 12), 12);
  assert.equal(sanitizeSettingValue('zoneCount', 16), 16);
  assert.equal(sanitizeSettingValue('zoneCount', 99), DEFAULT_SETTINGS.zoneCount);

  // audioSensitivity: 10 - 100
  assert.equal(sanitizeSettingValue('audioSensitivity', 5), 10);
  assert.equal(sanitizeSettingValue('audioSensitivity', 200), 100);
  assert.equal(sanitizeSettingValue('audioSensitivity', 75), 75);

  // nightShiftStart / End: HH:mm
  assert.equal(sanitizeSettingValue('nightShiftStart', '23:30'), '23:30');
  assert.equal(sanitizeSettingValue('nightShiftStart', 'bad-time'), DEFAULT_SETTINGS.nightShiftStart);

  // Boolean toggles
  assert.equal(sanitizeSettingValue('freezeDetection', true), true);
  assert.equal(sanitizeSettingValue('freezeDetection', 0), false);
  assert.equal(sanitizeSettingValue('multiZone', 1), true);
  assert.equal(sanitizeSettingValue('dynamicAccent', true), true);
  assert.equal(sanitizeSettingValue('barFill', true), true);
  assert.equal(sanitizeSettingValue('autoSubtitleDim', true), true);
});
