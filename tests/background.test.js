import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SETTINGS } from '../src/settings.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** background.js'i chrome stub'lı bir sandbox'ta çalıştırır. */
function loadBackground() {
  const code = fs.readFileSync(path.join(root, 'background.js'), 'utf8');
  const store = { sync: {}, local: {} };
  const control = { syncGetFails: false, syncSetFails: false };
  const captured = { syncDefaults: null };
  let lastError = null;
  const asArray = (keys) => Array.isArray(keys) ? keys : (keys == null ? [] : [keys]);

  const sync = {
    get(defaults, cb) {
      captured.syncDefaults = defaults;
      lastError = control.syncGetFails ? { message: 'sync get failed' } : null;
      cb(control.syncGetFails ? {} : { ...defaults, ...store.sync });
      lastError = null;
    },
    set(obj, cb) {
      if (!control.syncSetFails) Object.assign(store.sync, obj);
      lastError = control.syncSetFails ? { message: 'quota exceeded' } : null;
      if (cb) cb();
      lastError = null;
    },
    remove(keys, cb) {
      for (const k of asArray(keys)) delete store.sync[k];
      if (cb) cb();
    }
  };

  const local = {
    get(defaults, cb) { cb({ ...defaults, ...store.local }); },
    set(obj, cb) { Object.assign(store.local, obj); if (cb) cb(); },
    remove(keys, cb) { for (const k of asArray(keys)) delete store.local[k]; if (cb) cb(); }
  };

  const chrome = {
    runtime: {
      get lastError() { return lastError; },
      onInstalled: { addListener: (fn) => { chrome.runtime._installed = fn; } }
    },
    commands: { onCommand: { addListener: (fn) => { chrome.commands._onCommand = fn; } } },
    storage: { sync, local }
  };

  const context = { chrome, console };
  vm.createContext(context);
  vm.runInContext(code, context);
  return { chrome, store, control, captured };
}

test('background başlangıç şeması DEFAULT_SETTINGS ile birebir aynı', () => {
  const { chrome, captured } = loadBackground();
  chrome.runtime._installed(); // sync.get(defaults) varsayılanlarını yakala

  const schema = captured.syncDefaults;
  assert.equal(typeof schema, 'object');
  assert.deepEqual(Object.keys(schema).sort(), Object.keys(DEFAULT_SETTINGS).sort());
  for (const key of Object.keys(DEFAULT_SETTINGS)) {
    assert.deepEqual(schema[key], DEFAULT_SETTINGS[key], `Uyumsuz varsayılan: ${key}`);
  }
});

test('onInstalled eksik ayarları sync\'e yazar ve yerel yedekleri temizler', () => {
  const { chrome, store } = loadBackground();
  store.local = { brightness: 250 };
  store.sync = { brightness: 111 };

  chrome.runtime._installed();

  assert.equal(store.sync.brightness, 111); // kullanıcı değeri korunur
  assert.equal(store.sync.spread, DEFAULT_SETTINGS.spread); // eksik olan doldurulur
  assert.deepEqual(store.local, {}); // sync anahtarları yerelden silinir
});

test('sync okunamazsa onInstalled tam şemayı yerel depoya yazar', () => {
  const { chrome, store, control } = loadBackground();
  control.syncGetFails = true;

  chrome.runtime._installed();

  assert.equal(store.local.spread, DEFAULT_SETTINGS.spread);
  assert.equal(store.sync.spread, undefined);
});

test('toggle-ambient komutu enabled değerini tersine çevirir (sync tek kaynak)', () => {
  const { chrome, store } = loadBackground();
  store.sync.enabled = true;

  chrome.commands._onCommand('toggle-ambient');
  assert.equal(store.sync.enabled, false);

  chrome.commands._onCommand('toggle-ambient');
  assert.equal(store.sync.enabled, true);
});

test('sync\'te enabled yoksa yerel yedek değeri kullanılır', () => {
  const { chrome, store } = loadBackground();
  store.local.enabled = false;

  chrome.commands._onCommand('toggle-ambient');

  assert.equal(store.sync.enabled, true); // !false
  assert.equal(store.local.enabled, undefined); // sync yazıldı → yerel temizlendi
});

test('hiçbir kaynakta enabled yoksa varsayılan true kabul edilir', () => {
  const { chrome, store } = loadBackground();
  chrome.commands._onCommand('toggle-ambient');
  assert.equal(store.sync.enabled, false); // !true
});

test('sync yazılamazsa enabled yerel yedeğe yazılır', () => {
  const { chrome, store, control } = loadBackground();
  store.sync.enabled = true;
  control.syncSetFails = true;

  chrome.commands._onCommand('toggle-ambient');

  assert.equal(store.sync.enabled, true); // yazılamadı
  assert.equal(store.local.enabled, false); // yerel yedek
});

test('ilgisiz komutlar durumu değiştirmez', () => {
  const { chrome, store } = loadBackground();
  store.sync.enabled = true;

  chrome.commands._onCommand('open-settings');

  assert.equal(store.sync.enabled, true);
  assert.equal(store.local.enabled, undefined);
});
