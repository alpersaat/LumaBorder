/**
 * LumaBorder - Background Service Worker (Manifest V3)
 */

chrome.runtime.onInstalled.addListener(() => {
  // Varsayılan ayarları kontrol et ve hazırla
  chrome.storage.sync.get(['enabled'], (result) => {
    if (result.enabled === undefined) {
      chrome.storage.sync.set({
        enabled: true,
        brightness: 100,
        spread: 25,
        blur: 45,
        saturation: 120,
        contrast: 105,
        smoothing: 60,
        letterboxDetection: true,
        ecoMode: true,
        activePreset: 'default',
        language: 'tr'
      });
    }
  });
});

// Kısayol Tuşları (Alt+A / Option+A)
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-ambient') {
    chrome.storage.sync.get(['enabled'], (res) => {
      const nextState = res.enabled !== undefined ? !res.enabled : false;
      chrome.storage.sync.set({ enabled: nextState });
    });
  }
});
