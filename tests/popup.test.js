import test from 'node:test';
import assert from 'node:assert/strict';
import { createDocument, createChrome, createElement, flushMicrotasks, sleep } from './helpers/fake-dom.js';
import { translations } from '../src/i18n.js';
import { DEFAULT_SETTINGS, settingsManager } from '../src/settings.js';

// popup.js modül yüklemesinde global `document` üzerine DOMContentLoaded dinleyicisi kaydettiği
// için önce bootstrap document'i kurup modülü bir kez içe alıyoruz.
let domReadyHandler = null;
const bootstrap = createDocument();
bootstrap.addEventListener = (type, fn) => {
  if (type === 'DOMContentLoaded') domReadyHandler = fn;
};

globalThis.document = bootstrap;
globalThis.chrome = createChrome({ sync: { ...DEFAULT_SETTINGS, language: 'tr' } });
globalThis.confirm = () => true;

await import('../popup/popup.js');

const flush = async () => {
  await flushMicrotasks();
  await flushMicrotasks();
};

/** Popup'ın beklediği tüm DOM öğelerini içeren yeni bir ortam kurar. */
function setup() {
  const doc = createDocument();
  const ids = [
    'btn-lang-toggle', 'popup-master-toggle', 'status-indicator', 'status-text',
    'rng-brightness', 'val-brightness', 'rng-spread', 'val-spread', 'rng-blur', 'val-blur',
    'rng-saturation', 'val-saturation', 'chk-duallayer', 'chk-webgl', 'chk-multizone', 'chk-barfill',
    'chk-debanding', 'chk-audio-reactive', 'chk-night-shift', 'chk-dynamic-accent', 'chk-auto-sub-dim',
    'chk-freeze', 'chk-drop-sentinel', 'chk-ultra-eco', 'chk-letterbox', 'chk-pillarbox',
    'chk-battery-eco', 'chk-worker', 'btn-reset', 'popup-bias-palette', 'popup-color-picker',
    'popup-battery-badge', 'popup-battery-icon', 'popup-battery-text'
  ];
  const els = {};
  for (const id of ids) els[id] = doc.register(id);

  const makeButtons = (values, key) => values.map((value) => {
    const btn = createElement('button');
    btn.dataset[key] = value;
    return btn;
  });

  const presetButtons = makeButtons(['default', 'cinema', 'vibrant', 'night', 'gaming'], 'preset');
  const biasModeButtons = makeButtons(['off', 'pause', 'always'], 'biasmode');
  const colorDots = makeButtons(['#ffe4b5', '#fff4e8', '#ffffff', '#00e5ff', '#ff5e00', '#bd00ff'], 'color');
  const fpsButtons = makeButtons(['sync', '60', '30'], 'fps');
  const btnPosButtons = makeButtons(['left', 'right'], 'btnpos');

  doc.setQuery('.preset-pill', presetButtons);
  doc.setQuery('.bias-mode-btn', biasModeButtons);
  doc.setQuery('.color-dot', colorDots);
  doc.setQuery('.fps-mode-btn', fpsButtons);
  doc.setQuery('#btn-popup-pos-left, #btn-popup-pos-right', btnPosButtons);

  const chrome = createChrome({ sync: { ...DEFAULT_SETTINGS, language: 'tr' } });
  globalThis.document = doc;
  globalThis.chrome = chrome;

  return { doc, els, presetButtons, biasModeButtons, colorDots, fpsButtons, btnPosButtons, chrome };
}

const findActive = (buttons) => buttons.find((b) => b.classList.contains('active'));

test('popup DOMContentLoaded ile başlatılır', () => {
  assert.equal(typeof domReadyHandler, 'function');
});

test('popup başlangıçta ayarları ve dili arayüze yansıtır', async () => {
  const env = setup();
  domReadyHandler();
  await flush();

  assert.equal(env.doc.documentElement.lang, 'tr');
  assert.equal(env.els['val-brightness'].textContent, '100%');
  assert.equal(env.els['popup-master-toggle'].checked, true);
  assert.equal(env.els['chk-webgl'].checked, true);
  assert.equal(env.els['chk-ultra-eco'].checked, false);
  assert.equal(env.els['chk-letterbox'].checked, true);
  assert.equal(env.els['status-text'].textContent, translations.tr.statusActive);
  assert.equal(env.els['popup-bias-palette'].style.display, 'none');
  assert.equal(env.els['popup-battery-icon'].textContent, '🔌');

  assert.equal(findActive(env.fpsButtons).dataset.fps, '30');
  assert.equal(findActive(env.colorDots).dataset.color, '#ffe4b5');
  assert.equal(findActive(env.presetButtons).dataset.preset, 'default');
  assert.equal(findActive(env.btnPosButtons).dataset.btnpos, 'left');
});

test('master switch değişimi ayarı kaydeder ve aktif sekmeye bildirir', async () => {
  const env = setup();
  env.chrome.tabs._result = [{ id: 42, url: 'https://www.youtube.com/watch?v=abc' }];
  domReadyHandler();
  await flush();

  const toggle = env.els['popup-master-toggle'];
  toggle.checked = false;
  toggle.dispatch('change');

  assert.equal(settingsManager.current.enabled, false);
  assert.equal(env.els['status-text'].textContent, translations.tr.statusInactive);

  await sleep(160);
  assert.equal(env.chrome._calls.sendMessage.length, 1);
  assert.deepEqual(env.chrome._calls.sendMessage[0], { id: 42, msg: { action: 'SETTINGS_UPDATED' } });
});

test('dil düğmesi dili değiştirir ve arayüzü yeniler', async () => {
  const env = setup();
  domReadyHandler();
  await flush();

  const langBtn = env.els['btn-lang-toggle'];
  assert.equal(langBtn.textContent, 'EN 🇬🇧');

  langBtn.dispatch('click');
  await sleep(160);

  assert.equal(settingsManager.current.language, 'en');
  assert.equal(env.doc.documentElement.lang, 'en');
  assert.equal(langBtn.textContent, 'TR 🇹🇷');
});

test('YouTube dışı sekmede bilgilendirme metni gösterilir', async () => {
  const env = setup();
  env.chrome.tabs._result = [{ id: 1, url: 'https://example.com/' }];
  domReadyHandler();
  await flush();

  assert.equal(env.els['status-text'].textContent, translations.tr.notOnYoutube);
});

test('FPS düğmesi hedef FPS ayarını değiştirir', async () => {
  const env = setup();
  domReadyHandler();
  await flush();

  const syncBtn = env.fpsButtons.find((b) => b.dataset.fps === 'sync');
  syncBtn.dispatch('click');

  assert.equal(settingsManager.current.targetFps, 'sync');
  assert.equal(syncBtn.classList.contains('active'), true);
  assert.equal(settingsManager.current.activePreset, 'custom');
});

test('sıfırla düğmesi ayarları varsayılana döndürür', async () => {
  const env = setup();
  env.chrome._store.sync.brightness = 200;
  domReadyHandler();
  await flush();

  assert.equal(settingsManager.current.brightness, 200);

  env.els['btn-reset'].dispatch('click');
  await sleep(160);

  assert.equal(settingsManager.current.brightness, DEFAULT_SETTINGS.brightness);
});
