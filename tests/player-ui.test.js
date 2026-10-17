import test from 'node:test';
import assert from 'node:assert/strict';
import { PlayerUI } from '../src/player-ui.js';

/* -------------------------------------------------------------
   Minimal sahte DOM: PlayerUI sadece document/location/
  Element API'lerini kullanır. YouTube'nın gerçek DOM'una
   bağımlıysa resolveControlsTarget kırılacağından bu mantık
   en kritik regresyon testidir.
   ------------------------------------------------------------- */
class FakeClassList {
  constructor() { this._ = new Set(); }
  add(...ks) { ks.forEach((k) => this._.add(k)); }
  remove(...ks) { ks.forEach((k) => this._.delete(k)); }
  toggle(k, force) {
    if (force === undefined) force = !this._.has(k);
    force ? this._.add(k) : this._.delete(k);
    return force;
  }
  contains(k) { return this._.has(k); }
}

class FakeEl {
  constructor(tag = 'div') {
    this.tagName = tag;
    this.children = [];
    this.parentElement = null;
    this.firstChild = null;
    this.lastElementChild = null;
    this.classList = new FakeClassList();
    this.style = {};
    this.dataset = {};
    this.textContent = '';
    this.value = '';
    this.checked = false;
    this.disabled = false;
    this.listeners = {};
    this._qs = {};
  }
  querySelector(sel) { return this._qs[sel] || null; }
  querySelectorAll() { return []; }
  closest() { return null; }
  getBoundingClientRect() { return { left: 0, top: 0, width: 800, height: 600, right: 800, bottom: 600 }; }
  appendChild(el) {
    el.parentElement = this;
    this.children.push(el);
    this.firstChild = this.firstChild || el;
    this.lastElementChild = el;
    return el;
  }
  insertBefore(el, ref) {
    const i = this.children.indexOf(ref);
    if (i === -1) this.children.push(el); else this.children.splice(i, 0, el);
    el.parentElement = this;
    this.firstChild = this.children[0] || null;
    this.lastElementChild = this.children[this.children.length - 1] || null;
    return el;
  }
  remove() {
    if (this.parentElement) {
      this.parentElement.children = this.parentElement.children.filter((c) => c !== this);
      this.parentElement.firstChild = this.parentElement.children[0] || null;
      this.parentElement.lastElementChild = this.parentElement.children[this.parentElement.children.length - 1] || null;
    }
    this.parentElement = null;
  }
  contains(el) { return this.children.includes(el); }
  addEventListener(type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); }
  removeEventListener() {}
  click() { (this.listeners.click || []).forEach((fn) => fn()); }
  setAttribute() {}
}

let querySelectorMap = {};
const doc = {
  querySelector: (sel) => querySelectorMap[sel] || null,
  querySelectorAll: () => [],
  createElement: () => new FakeEl(),
  addEventListener: () => {},
  removeEventListener: () => {},
  body: new FakeEl('body'),
  documentElement: { lang: '' },
  location: { pathname: '/watch?v=ab' }
};
globalThis.document = doc;
Object.defineProperty(globalThis, 'location', {
  value: { pathname: '/watch?v=ab' },
  configurable: true,
  writable: true
});

const settingsManager = {
  current: { buttonPosition: 'left', enabled: true, language: 'tr' },
  save: async () => {},
  applyPreset: async () => {}
};
const ambientEngine = {
  onBatteryChange: (cb) => { cb({ supported: false }); return () => {}; },
  applySettings: () => {}
};
const player = new FakeEl('div');

test('PlayerUI: YouTube kontrolleri yoksa flying (floating) hedefi seçilir', () => {
  querySelectorMap = {};
  const ui = new PlayerUI(player, settingsManager, ambientEngine);
  const target = ui.resolveControlsTarget();
  assert.equal(target.type, 'floating');
  assert.equal(target.container, player);
  assert.equal(target.isFallback, true);
  assert.equal(ui.button.className, 'lumaborder-floating-btn');
  assert.equal(ui.button.style.right, '22px');
});

test('PlayerUI: sol kontroller bulunduğunda standard-left hedefi seçilir', () => {
  const left = new FakeEl('div');
  querySelectorMap = { '.ytp-left-controls': left };
  const ui = new PlayerUI(player, settingsManager, ambientEngine);
  const target = ui.resolveControlsTarget();
  assert.equal(target.type, 'standard-left');
  assert.equal(target.container, left);
});

test('PlayerUI: sağ kontrollerde tam ekran butonu âncı olarak seçilir', () => {
  const right = new FakeEl('div');
  const fs = new FakeEl('button');
  fs.classList.add('ytp-fullscreen-button');
  right._qs = { '.ytp-fullscreen-button': fs };
  querySelectorMap = { '.ytp-right-controls': right };
  const ui = new PlayerUI(player, settingsManager, ambientEngine);
  const target = ui.resolveControlsTarget();
  assert.equal(target.type, 'standard-right');
  assert.equal(target.anchor, fs);
});

test('PlayerUI: Shorts sayfasında #actions varsa shorts türü döner', () => {
  const actions = new FakeEl('div');
  Object.defineProperty(globalThis, 'location', {
    value: { pathname: '/shorts/abc' },
    configurable: true,
    writable: true
  });
  querySelectorMap = { '#actions': actions };
  try {
    const ui = new PlayerUI(player, settingsManager, ambientEngine);
    const target = ui.resolveControlsTarget();
    assert.equal(target.type, 'shorts');
    assert.equal(target.container, actions);
  } finally {
    Object.defineProperty(globalThis, 'location', {
      value: { pathname: '/watch?v=ab' },
      configurable: true,
      writable: true
    });
  }
});

test('PlayerUI: Shorts sayfasında #actions yoksa shorts-fallback kullanılır', () => {
  Object.defineProperty(globalThis, 'location', {
    value: { pathname: '/shorts/abc' },
    configurable: true,
    writable: true
  });
  querySelectorMap = {};
  try {
    const ui = new PlayerUI(player, settingsManager, ambientEngine);
    const target = ui.resolveControlsTarget();
    assert.equal(target.type, 'shorts-floating');
    assert.equal(target.container, player);
    assert.equal(target.isFallback, true);
  } finally {
    Object.defineProperty(globalThis, 'location', {
      value: { pathname: '/watch?v=ab' },
      configurable: true,
      writable: true
    });
  }
});

test('PlayerUI: updateButtonState etkinlik bayrağını active sınıfıyla yansıtır', () => {
  querySelectorMap = {};
  const ui = new PlayerUI(player, settingsManager, ambientEngine);

  settingsManager.current.enabled = true;
  ui.updateButtonState();
  assert.ok(ui.button.classList.contains('active'));

  settingsManager.current.enabled = false;
  ui.updateButtonState();
  assert.ok(!ui.button.classList.contains('active'));
});

test('PlayerUI: getTabContentHTML her sekme için ilgili HTML döner', () => {
  querySelectorMap = {};
  const ui = new PlayerUI(player, settingsManager, ambientEngine);

  const general = ui.getTabContentHTML('general');
  assert.ok(general.includes('lumaborder-master-toggle'));
  assert.ok(general.includes('rng-brightness'));
  assert.ok(general.includes('chk-edge-top'));

  const effects = ui.getTabContentHTML('effects');
  assert.ok(effects.includes('rng-saturation'));
  assert.ok(effects.includes('chk-dynamic-accent'));

  const ambilight = ui.getTabContentHTML('ambilight');
  assert.ok(ambilight.includes('chk-multizone'));
  assert.ok(ambilight.includes('chk-barfill'));

  const presets = ui.getTabContentHTML('presets');
  assert.ok(presets.includes('data-preset="cinema"'));

  const performance = ui.getTabContentHTML('performance');
  assert.ok(performance.includes('chk-hdr-tonemap'));
  assert.ok(performance.includes('chk-worker'));

  assert.equal(ui.getTabContentHTML('bilinmeyen-sekme'), '');
});

test('PlayerUI: menü açılır, kapanır ve toggle çalışır', () => {
  querySelectorMap = {};
  const ui = new PlayerUI(player, settingsManager, ambientEngine);

  ui.openMenu();
  assert.equal(ui.isOpen, true);
  assert.ok(ui.menuOverlay);
  assert.ok(player.contains(ui.menuOverlay));

  ui.closeMenu();
  assert.equal(ui.isOpen, false);
  assert.equal(ui.menuOverlay, null);

  ui.toggleMenu();
  assert.equal(ui.isOpen, true);
  ui.toggleMenu();
  assert.equal(ui.isOpen, false);
});

test('PlayerUI: destroy butonu kaldırır ve gözlemcileri temizler', () => {
  querySelectorMap = {};
  const ui = new PlayerUI(player, settingsManager, ambientEngine);
  assert.ok(player.contains(ui.button));

  ui.destroy();
  assert.equal(ui.button, null);
  assert.equal(ui.observer, null);
});

test('PlayerUI: hedef yoksa mountRetry kılar ama çökmeme', () => {
  querySelectorMap = {};
  const origBody = doc.body;
  doc.body = null;
  try {
    const ui = new PlayerUI(null, settingsManager, ambientEngine);
    assert.ok(ui.mountRetryTimeout !== null, 'mountRetryTimeout ayarlanmalı');
  } finally {
    doc.body = origBody;
  }
});
