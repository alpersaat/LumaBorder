/**
 * LumaBorder - Background Service Worker (Manifest V3)
 */

const INITIAL_SETTINGS = {
  enabled: true,
  brightness: 100,
  spread: 25,
  blur: 45,
  saturation: 120,
  contrast: 105,
  smoothing: 60,
  letterboxDetection: true,
  pillarboxDetection: true,
  dualLayerGlow: true,
  bottomFade: false,
  bottomFadeStrength: 60,
  biasLightingMode: 'off',
  biasLightingColor: '#ffe4b5',
  ecoMode: true,
  targetFps: 'sync',
  workerRender: true,
  autoBatteryEco: true,
  theaterModeSync: true,
  fullScreenSync: true,
  activePreset: 'default',
  language: 'tr'
};

chrome.runtime.onInstalled.addListener(() => {
  // Kurulum veya güncelleme durumunda eksik ayarları doldur ve hazırla
  chrome.storage.sync.get(INITIAL_SETTINGS, (items) => {
    if (chrome.runtime.lastError) {
      chrome.storage.local.get(INITIAL_SETTINGS, (localItems) => {
        chrome.storage.local.set({ ...INITIAL_SETTINGS, ...localItems });
      });
      return;
    }
    chrome.storage.sync.set({ ...INITIAL_SETTINGS, ...items });
  });
});

// Kısayol Tuşları (Alt+A / Option+A)
chrome.commands.onCommand.addListener((command) => {
  if (command !== 'toggle-ambient') return;
  chrome.storage.sync.get(['enabled'], (syncRes) => {
    const syncVal = chrome.runtime.lastError ? undefined : syncRes?.enabled;
    chrome.storage.local.get(['enabled'], (localRes) => {
      // local (sync yazımı başarısız olduğunda tutulur) sync'i ezer
      const localVal = chrome.runtime.lastError ? undefined : localRes?.enabled;
      const currentState = localVal !== undefined ? localVal : (syncVal !== undefined ? syncVal : true);
      const nextState = !currentState;
      chrome.storage.sync.set({ enabled: nextState }, () => {
        if (chrome.runtime.lastError) {
          chrome.storage.local.set({ enabled: nextState });
        } else {
          chrome.storage.local.remove('enabled');
        }
      });
    });
  });
});
