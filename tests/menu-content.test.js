import test from 'node:test';
import assert from 'node:assert/strict';
import { getTabContentHTML } from '../src/menu-content.js';
import { DEFAULT_SETTINGS } from '../src/settings.js';

const t = (key) => key;
const S = (over = {}) => ({ ...DEFAULT_SETTINGS, ...over });

test('general sekmesi master switch, buton konumu ve değerleri yansıtır', () => {
  const html = getTabContentHTML('general', S({ enabled: true, brightness: 130, buttonPosition: 'right' }), t);
  assert.match(html, /id="lumaborder-master-toggle" checked/);
  assert.match(html, /id="val-brightness">130%/);
  assert.match(html, /id="rng-brightness"[^>]*value="130"/);
  assert.match(html, /class="lumaborder-mode-pill active" data-btnpos="right"/);
  assert.doesNotMatch(html, /class="lumaborder-mode-pill active" data-btnpos="left"/);

  const offHtml = getTabContentHTML('general', S({ enabled: false }), t);
  assert.doesNotMatch(offHtml, /id="lumaborder-master-toggle" checked/);
});

test('effects sekmesi bias moduna göre paleti gizler/gösterir', () => {
  const off = getTabContentHTML('effects', S({ biasLightingMode: 'off' }), t);
  assert.match(off, /id="bias-color-palette" style="display:none;"/);

  const on = getTabContentHTML('effects', S({ biasLightingMode: 'always', biasLightingColor: '#00e5ff' }), t);
  assert.match(on, /id="bias-color-palette" style=""/);
  assert.match(on, /class="lumaborder-color-dot active" data-color="#00e5ff"/);
  assert.match(on, /class="lumaborder-mode-pill active" data-biasmode="always"/);
});

test('geçersiz bias rengi renk seçicide varsayılana döner (HTML güvenliği)', () => {
  const html = getTabContentHTML('effects', S({ biasLightingColor: 'red;<script>' }), t);
  assert.match(html, /id="bias-custom-color"[^>]*value="#ffe4b5"/);
  assert.doesNotMatch(html, /<script>/);
});

test('ambilight sekmesi çok bölge, gece kaydırma ve bar fill durumlarını yansıtır', () => {
  const html = getTabContentHTML('ambilight', S({
    multiZone: true,
    zoneCount: 12,
    barFill: true,
    debanding: false,
    audioReactive: false,
    nightShiftEnabled: true,
    nightShiftStart: '21:30',
    nightShiftEnd: '06:30'
  }), t);

  assert.match(html, /id="chk-multizone" checked/);
  assert.match(html, /class="lumaborder-mode-pill active" data-zones="12"/);
  assert.match(html, /id="chk-barfill" checked/);
  assert.doesNotMatch(html, /id="chk-debanding" checked/);
  assert.match(html, /id="row-audio-sens" style="display:none;"/);
  assert.match(html, /id="row-night-shift-time" style=""/);
  assert.match(html, /id="inp-night-start" value="21:30"/);
});

test('presets sekmesi aktif profili işaretler', () => {
  const html = getTabContentHTML('presets', S({ activePreset: 'cinema' }), t);
  assert.match(html, /class="lumaborder-preset-btn active" data-preset="cinema"/);
  assert.doesNotMatch(html, /class="lumaborder-preset-btn active" data-preset="default"/);
});

test('performance sekmesi motor, FPS ve koruma anahtarlarını yansıtır', () => {
  const html = getTabContentHTML('performance', S({
    renderEngine: 'canvas2d',
    targetFps: 'sync',
    dropFrameSentinel: false,
    ultraEco: true,
    workerRender: false,
    letterboxDetection: true,
    pillarboxDetection: false
  }), t);

  assert.match(html, /class="lumaborder-mode-pill active" data-engine="canvas2d"/);
  assert.match(html, /id="val-target-fps">fpsSync</);
  assert.match(html, /class="lumaborder-mode-pill active" data-fps="sync"/);
  assert.doesNotMatch(html, /id="chk-drop-sentinel" checked/);
  assert.match(html, /id="chk-ultra-eco" checked/);
  assert.match(html, /id="chk-letterbox" checked/);
  assert.doesNotMatch(html, /id="chk-pillarbox" checked/);
});

test('performance sekmesi sayısal FPS etiketini biçimlendirir', () => {
  const html = getTabContentHTML('performance', S({ targetFps: 60 }), t);
  assert.match(html, /id="val-target-fps">60 FPS</);
  assert.match(html, /class="lumaborder-mode-pill active" data-fps="60"/);
});

test('bilinmeyen sekme boş içerik döner', () => {
  assert.equal(getTabContentHTML('yok', S(), t), '');
});
