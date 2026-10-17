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
  targetFps: 30,
  workerRender: true,
  autoBatteryEco: true,
  theaterModeSync: true,
  fullScreenSync: true,
  activePreset: 'default',
  language: 'tr',
  renderEngine: 'webgl',
  freezeDetection: true,
  colorSpace: 'display-p3',
  hdrTonemap: true,
  edgeTop: true,
  edgeRight: true,
  edgeBottom: true,
  edgeLeft: true,
  edgeTopSpread: 100,
  edgeRightSpread: 100,
  edgeBottomSpread: 100,
  edgeLeftSpread: 100,
  multiZone: false,
  zoneCount: 12,
  barFill: false,
  debanding: true,
  colorTemperature: 6500,
  autoSubtitleDim: true,
  audioReactive: false,
  audioSensitivity: 50,
  nightShiftEnabled: false,
  nightShiftStart: '22:00',
  nightShiftEnd: '07:00',
  dynamicAccent: false,
  buttonPosition: 'left',
  dropFrameSentinel: true,
  ultraEco: false
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
    chrome.storage.sync.set({ ...INITIAL_SETTINGS, ...items }, () => {
      if (!chrome.runtime.lastError) {
        chrome.storage.local.remove(Object.keys(INITIAL_SETTINGS));
      }
    });
  });
});

// Kısayol Tuşları (Alt+A / Option+A)
chrome.commands.onCommand.addListener((command) => {
  if (command !== 'toggle-ambient') return;
  chrome.storage.sync.get(['enabled'], (syncRes) => {
    const syncVal = chrome.runtime.lastError ? undefined : syncRes?.enabled;
    chrome.storage.local.get(['enabled'], (localRes) => {
      // local yalnızca sync yazılamadığında tutulan yedektir; okumada sync'e göre değildir
      const localVal = chrome.runtime.lastError ? undefined : localRes?.enabled;
      // sync tek kaynaktır; local yalnızca sync yazılamadığında tutulan yedektir
      const currentState = syncVal !== undefined ? syncVal : (localVal !== undefined ? localVal : true);
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
