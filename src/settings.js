/**
 * LumaBorder - Settings Manager
 * Ayarların depolanması, önayarlar ve anlık sekme senkronizasyonu
 */

export const PRESETS = {
  default: {
    brightness: 100,
    spread: 25,
    blur: 45,
    saturation: 120,
    contrast: 105,
    smoothing: 60,
    letterboxDetection: true,
    ecoMode: true
  },
  cinema: {
    brightness: 85,
    spread: 40,
    blur: 65,
    saturation: 110,
    contrast: 100,
    smoothing: 75,
    letterboxDetection: true,
    ecoMode: true
  },
  vibrant: {
    brightness: 130,
    spread: 32,
    blur: 40,
    saturation: 160,
    contrast: 115,
    smoothing: 40,
    letterboxDetection: true,
    ecoMode: false
  },
  night: {
    brightness: 60,
    spread: 18,
    blur: 50,
    saturation: 90,
    contrast: 90,
    smoothing: 80,
    letterboxDetection: true,
    ecoMode: true
  },
  gaming: {
    brightness: 115,
    spread: 28,
    blur: 35,
    saturation: 140,
    contrast: 110,
    smoothing: 25,
    letterboxDetection: true,
    ecoMode: false
  }
};

export const DEFAULT_SETTINGS = {
  enabled: true,
  brightness: 100,
  spread: 25,
  blur: 45,
  saturation: 120,
  contrast: 105,
  smoothing: 60,
  letterboxDetection: true,
  ecoMode: true,
  theaterModeSync: true,
  fullScreenSync: true,
  activePreset: 'default',
  language: 'tr'
};

export class SettingsManager {
  constructor() {
    this.current = { ...DEFAULT_SETTINGS };
    this.listeners = new Set();
    this.initStorageListener();
  }

  async load() {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
          if (chrome.runtime.lastError) {
            chrome.storage.local.get(DEFAULT_SETTINGS, (localItems) => {
              this.current = { ...DEFAULT_SETTINGS, ...localItems };
              resolve(this.current);
            });
            return;
          }
          this.current = { ...DEFAULT_SETTINGS, ...items };
          resolve(this.current);
        });
      } else {
        try {
          const local = localStorage.getItem('lumaborder_settings');
          if (local) {
            this.current = { ...DEFAULT_SETTINGS, ...JSON.parse(local) };
          }
        } catch (e) {}
        resolve(this.current);
      }
    });
  }

  async save(newSettings) {
    this.current = { ...this.current, ...newSettings };
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.set(this.current, () => {
          if (chrome.runtime.lastError) {
            chrome.storage.local.set(this.current, () => resolve(this.current));
            return;
          }
          resolve(this.current);
        });
      } else {
        try {
          localStorage.setItem('lumaborder_settings', JSON.stringify(this.current));
        } catch (e) {}
        resolve(this.current);
      }
    });
  }

  applyPreset(presetKey) {
    if (PRESETS[presetKey]) {
      const presetValues = PRESETS[presetKey];
      return this.save({
        ...presetValues,
        activePreset: presetKey
      });
    }
    return Promise.resolve(this.current);
  }

  async reset() {
    const lang = this.current.language;
    return this.save({
      ...DEFAULT_SETTINGS,
      language: lang
    });
  }

  initStorageListener() {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === 'sync' || areaName === 'local') {
          let updated = false;
          for (const key of Object.keys(changes)) {
            if (this.current[key] !== changes[key].newValue) {
              this.current[key] = changes[key].newValue;
              updated = true;
            }
          }
          if (updated) {
            this.notifyListeners(this.current);
          }
        }
      });
    }
  }

  onChange(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners(settings) {
    for (const callback of this.listeners) {
      try {
        callback(settings);
      } catch (err) {
        console.error('Settings notify error:', err);
      }
    }
  }
}

export const settingsManager = new SettingsManager();
