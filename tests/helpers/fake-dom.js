/**
 * Test yardımcıları: minimal DOM ve chrome API stub'ları.
 * Üretim kodu bağımlılığı yok; yalnızca tests/*.test.js tarafından kullanılır.
 */

export function createElement(tag = 'div') {
  const classes = new Set();
  const el = {
    tagName: String(tag).toUpperCase(),
    nodeName: String(tag).toUpperCase(),
    id: '',
    className: '',
    title: '',
    textContent: '',
    innerHTML: '',
    value: '',
    checked: false,
    disabled: false,
    isConnected: true,
    hidden: false,
    lang: '',
    parentElement: null,
    children: [],
    dataset: {},
    firstChild: null,
    firstElementChild: null,
    lastElementChild: null,
    style: { setProperty() {}, removeProperty() {}, display: '' },
    listeners: Object.create(null),
    _classes: classes,
    classList: {
      add: (c) => classes.add(c),
      remove: (c) => classes.delete(c),
      contains: (c) => classes.has(c),
      toggle: (c, force) => {
        const on = force === undefined ? !classes.has(c) : Boolean(force);
        if (on) classes.add(c); else classes.delete(c);
        return on;
      }
    },
    addEventListener(type, fn) {
      (el.listeners[type] ||= []).push(fn);
    },
    removeEventListener(type, fn) {
      if (el.listeners[type]) el.listeners[type] = el.listeners[type].filter((f) => f !== fn);
    },
    dispatch(type, event = {}) {
      for (const fn of [...(el.listeners[type] || [])]) fn({ type, target: el, ...event });
    },
    appendChild(child) {
      child.parentElement = el;
      el.children.push(child);
      el.firstElementChild = el.children[0];
      el.lastElementChild = child;
      el.firstChild = el.children[0];
      return child;
    },
    insertBefore(child, ref) {
      child.parentElement = el;
      const idx = ref ? el.children.indexOf(ref) : -1;
      if (idx >= 0) el.children.splice(idx, 0, child); else el.children.push(child);
      el.firstElementChild = el.children[0];
      el.lastElementChild = el.children[el.children.length - 1];
      return child;
    },
    contains: () => false,
    remove() {
      if (el.parentElement) {
        el.parentElement.children = el.parentElement.children.filter((c) => c !== el);
      }
      el.isConnected = false;
    },
    setAttribute(name, value) { el[name] = value; },
    getAttribute(name) { return el[name] ?? null; },
    querySelector: () => null,
    querySelectorAll: () => [],
    closest: () => null,
    getBoundingClientRect: () => ({ top: 0, left: 0, width: 100, height: 100, right: 100, bottom: 100 }),
    focus() {},
    click() { el.dispatch('click'); }
  };
  return el;
}

/**
 * getElementById / querySelectorAll kayıtlarını elle besleyebileceğiniz sahte document.
 */
export function createDocument() {
  const byId = new Map();
  const queries = new Map();
  const doc = {
    readyState: 'complete',
    documentElement: createElement('html'),
    body: createElement('body'),
    fullscreenElement: null,
    hidden: false,
    listeners: Object.create(null),
    createElement,
    getElementById(id) { return byId.get(id) || null; },
    querySelector(selector) {
      const v = queries.get(selector);
      if (Array.isArray(v)) return v[0] || null;
      return v || null;
    },
    querySelectorAll(selector) {
      const v = queries.get(selector);
      if (Array.isArray(v)) return v;
      return v ? [v] : [];
    },
    addEventListener(type, fn) { (doc.listeners[type] ||= []).push(fn); },
    removeEventListener(type, fn) {
      if (doc.listeners[type]) doc.listeners[type] = doc.listeners[type].filter((f) => f !== fn);
    },
    dispatch(type, event = {}) {
      for (const fn of [...(doc.listeners[type] || [])]) fn({ type, target: doc, ...event });
    },
    _byId: byId,
    _queries: queries,
    register(id, el = createElement()) { el.id = id; byId.set(id, el); return el; },
    setQuery(selector, value) { queries.set(selector, value); }
  };
  return doc;
}

/**
 * chrome.storage / runtime / tabs stub'ı.
 * `control` alanları ile sync hatalarını simüle edebilirsiniz.
 */
export function createChrome({ sync = {}, local = {}, tabs = [] } = {}) {
  const store = { sync: { ...sync }, local: { ...local } };
  const control = { syncGetFails: false, syncSetFails: false, syncRemoveFails: false };
  const calls = { sendMessage: [] };
  let lastError = null;

  const asArray = (keys) => Array.isArray(keys) ? keys : (keys == null ? [] : [keys]);

  const chrome = {
    _store: store,
    _control: control,
    _calls: calls,
    runtime: {
      id: 'test-extension-id',
      get lastError() { return lastError; },
      getURL: (p) => `chrome-extension://test-extension-id/${p}`,
      onInstalled: { addListener: (fn) => { chrome.runtime._onInstalled = fn; } },
      onMessage: { addListener: (fn) => { chrome.runtime._onMessage = fn; } }
    },
    commands: {
      onCommand: { addListener: (fn) => { chrome.commands._onCommand = fn; } }
    },
    tabs: {
      _result: tabs,
      query(_q, cb) { cb(chrome.tabs._result); },
      sendMessage(id, msg, cb) { calls.sendMessage.push({ id, msg }); if (cb) cb(); }
    },
    storage: {
      onChanged: { addListener: (fn) => { chrome.storage._onChanged = fn; } },
      sync: {
        get(defaults, cb) {
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
          if (!control.syncRemoveFails) for (const k of asArray(keys)) delete store.sync[k];
          lastError = control.syncRemoveFails ? { message: 'remove failed' } : null;
          if (cb) cb();
          lastError = null;
        }
      },
      local: {
        get(defaults, cb) { cb({ ...defaults, ...store.local }); },
        set(obj, cb) { Object.assign(store.local, obj); if (cb) cb(); },
        remove(keys, cb) { for (const k of asArray(keys)) delete store.local[k]; if (cb) cb(); }
      }
    }
  };

  return chrome;
}

/** Verilen global'leri geçici olarak kurar ve eski değerleri geri döndürür. */
export function installGlobals(globals) {
  const previous = {};
  for (const [key, value] of Object.entries(globals)) {
    previous[key] = globalThis[key];
    globalThis[key] = value;
  }
  return () => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete globalThis[key]; else globalThis[key] = value;
    }
  };
}

export const flushMicrotasks = () => new Promise((resolve) => setImmediate(resolve));
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
