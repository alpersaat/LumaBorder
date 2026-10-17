import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveControlsTarget, isShortsContext } from '../src/ui-target.js';

/** Basit seçici haritası tabanlı sahte DOM kapsamı. */
function scope(map = {}) {
  return {
    querySelector(selector) {
      const v = map[selector];
      if (Array.isArray(v)) return v[0] ?? null;
      return v ?? null;
    },
    querySelectorAll(selector) {
      const v = map[selector];
      return Array.isArray(v) ? v : (v ? [v] : []);
    }
  };
}

test('tercih sol ise sol kontroller hedeflenir', () => {
  const left = scope();
  const player = scope({ '.ytp-left-controls': left });
  const r = resolveControlsTarget(scope(), player, { buttonPosition: 'left' });
  assert.equal(r.type, 'standard-left');
  assert.equal(r.container, left);
  assert.equal(r.isFallback, false);
});

test('tercih sağ ise sağ kontroller ve bilinen çapa bulunur', () => {
  const settingsBtn = {};
  const right = scope({ '.ytp-settings-button': settingsBtn });
  const player = scope({ '.ytp-right-controls': right });
  const r = resolveControlsTarget(scope(), player, { buttonPosition: 'right' });
  assert.equal(r.type, 'standard-right');
  assert.equal(r.container, right);
  assert.equal(r.anchor, settingsBtn);
});

test('bilinen çapa yoksa sağ kontrolün ilk çocuğu çapa olur', () => {
  const child = {};
  const right = scope({});
  right.firstElementChild = child;
  const player = scope({ '.ytp-right-controls': right });
  const r = resolveControlsTarget(scope(), player, { buttonPosition: 'right' });
  assert.equal(r.anchor, child);
});

test('tercih edilen kontrol yoksa alternatif tarafa düşer', () => {
  const left = scope();
  const player = scope({ '.ytp-left-controls': left });
  const r = resolveControlsTarget(scope(), player, { buttonPosition: 'right' });
  assert.equal(r.type, 'standard-left');
  assert.equal(r.container, left);
});

test('sol/sağ yoksa alt kontrol çubuğuna düşer', () => {
  const bottom = scope();
  const player = scope({ '.ytp-chrome-bottom': bottom });
  const r = resolveControlsTarget(scope(), player, { buttonPosition: 'left' });
  assert.equal(r.type, 'standard-alt');
  assert.equal(r.container, bottom);
});

test('yalnızca üst kontroller varsa üst çubuğa düşer', () => {
  const top = {};
  const player = scope({ '.ytp-chrome-top-buttons': top });
  const r = resolveControlsTarget(scope(), player, { buttonPosition: 'left' });
  assert.equal(r.type, 'standard-top');
  assert.equal(r.container, top);
});

test('hiçbir kontrol bulunamazsa oynatıcıya yüzen modda bağlanır', () => {
  const player = scope({});
  const r = resolveControlsTarget(scope(), player, { buttonPosition: 'left' });
  assert.equal(r.type, 'floating');
  assert.equal(r.isFallback, true);
  assert.equal(r.container, player);
});

test('Shorts bağlamında aktif reel içindeki aksiyon çubuğu hedeflenir', () => {
  const actions = {};
  const reel = scope({ '#actions': actions });
  const player = { closest: (sel) => (sel === 'ytd-reel-video-renderer' ? reel : null) };
  const r = resolveControlsTarget(scope(), player, { isShorts: true });
  assert.equal(r.type, 'shorts');
  assert.equal(r.container, actions);
  assert.equal(r.isFallback, false);
});

test('Shorts içinde aksiyon çubuğu yoksa yüzen moda düşer', () => {
  const reel = scope({});
  const player = { closest: () => reel };
  const r = resolveControlsTarget(scope(), player, { isShorts: true });
  assert.equal(r.type, 'shorts-floating');
  assert.equal(r.isFallback, true);
  assert.equal(r.container, player);
});

test('aktif reel yoksa oynayan video üzerinden reel bulunur', () => {
  const actions = {};
  const reel = scope({ '#actions': actions });
  const video = {
    paused: false,
    readyState: 3,
    closest: (sel) => (sel === 'ytd-reel-video-renderer' ? reel : null)
  };
  const doc = scope({ 'ytd-reel-video-renderer video': [video] });
  const player = { closest: () => null };
  const r = resolveControlsTarget(doc, player, { isShorts: true });
  assert.equal(r.container, actions);
});

test('oynayan video yoksa merkeze en yakın reel seçilir', () => {
  const actions = {};
  const far = scope({});
  far.getBoundingClientRect = () => ({ top: 0, height: 100 });
  const near = scope({ '#actions': actions });
  near.getBoundingClientRect = () => ({ top: 300, height: 100 });

  const doc = scope({ 'ytd-reel-video-renderer': [far, near] });
  const player = { closest: () => null };
  const r = resolveControlsTarget(doc, player, { isShorts: true, innerHeight: 700 });
  assert.equal(r.container, actions);
});

test('isShortsContext yol ve DOM üzerinden Shorts algılar', () => {
  assert.equal(isShortsContext({ closest: () => null }, '/shorts/abc'), true);
  assert.equal(isShortsContext({ closest: (sel) => (sel.includes('ytd-shorts') ? {} : null) }, '/watch'), true);
  assert.equal(isShortsContext({ closest: () => null }, '/watch'), false);
});
