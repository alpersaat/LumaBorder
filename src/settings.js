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
    pillarboxDetection: true,
    dualLayerGlow: true,
    bottomFade: false,
    bottomFadeStrength: 60,
    biasLightingMode: 'off',
    biasLightingColor: '#ffe4b5',
    ecoMode: true,
    targetFps: 30,
    workerRender: true,
    autoBatteryEco: true
  },
  cinema: {
    brightness: 85,
    spread: 40,
    blur: 65,
    saturation: 110,
    contrast: 100,
    smoothing: 75,
    letterboxDetection: true,
    pillarboxDetection: true,
    dualLayerGlow: true,
    bottomFade: true,
    bottomFadeStrength: 65,
    biasLightingMode: 'off',
    biasLightingColor: '#ffe4b5',
    ecoMode: true,
    targetFps: 30,
    workerRender: true,
    autoBatteryEco: true
  },
  vibrant: {
    brightness: 130,
    spread: 32,
    blur: 40,
    saturation: 160,
    contrast: 115,
    smoothing: 40,
    letterboxDetection: true,
    pillarboxDetection: true,
    dualLayerGlow: true,
    bottomFade: false,
    bottomFadeStrength: 60,
    biasLightingMode: 'off',
    biasLightingColor: '#ffe4b5',
    ecoMode: false,
    targetFps: 'sync',
    workerRender: true,
    autoBatteryEco: false
  },
  night: {
    brightness: 60,
    spread: 18,
    blur: 50,
    saturation: 90,
    contrast: 90,
    smoothing: 80,
    letterboxDetection: true,
    pillarboxDetection: true,
    dualLayerGlow: false,
    bottomFade: true,
    bottomFadeStrength: 75,
    biasLightingMode: 'pause',
    biasLightingColor: '#ffe4b5',
    ecoMode: true,
    targetFps: 30,
    workerRender: true,
    autoBatteryEco: true
  },
  gaming: {
    brightness: 115,
    spread: 28,
    blur: 35,
    saturation: 140,
    contrast: 110,
    smoothing: 25,
    letterboxDetection: true,
    pillarboxDetection: true,
    dualLayerGlow: true,
    bottomFade: false,
    bottomFadeStrength: 60,
    biasLightingMode: 'off',
    biasLightingColor: '#00e5ff',
    ecoMode: false,
    targetFps: 'sync',
    workerRender: true,
    autoBatteryEco: false
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
  language: 'tr'
};

export function sanitizeSettingValue(key, value) {
  if (value === undefined || value === null) return DEFAULT_SETTINGS[key];
  switch (key) {
    case 'brightness':
    case 'spread':
    case 'blur':
    case 'saturation':
    case 'contrast':
    case 'smoothing':
    case 'bottomFadeStrength': {
      const num = Number(value);
      return Number.isFinite(num) ? Math.max(0, Math.min(500, Math.round(num))) : DEFAULT_SETTINGS[key];
    }
    case 'targetFps': {
      if (value === 'sync' || value === 60 || value === 30 || value === '60' || value === '30') {
        return value === 'sync' ? 'sync' : Number(value);
      }
      return DEFAULT_SETTINGS.targetFps;
    }
    case 'biasLightingColor': {
      if (typeof value === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value.trim())) {
        return value.trim();
      }
      return DEFAULT_SETTINGS.biasLightingColor;
    }
    case 'biasLightingMode': {
      return ['off', 'pause', 'always'].includes(value) ? value : 'off';
    }
    case 'language': {
      return value === 'en' ? 'en' : 'tr';
    }
    case 'activePreset': {
      return typeof value === 'string' ? value.slice(0, 30) : 'default';
    }
    default: {
      if (typeof DEFAULT_SETTINGS[key] === 'boolean') {
        return Boolean(value);
      }
      return value;
    }
  }
}

export class SettingsManager {
  constructor() {
    this.current = { ...DEFAULT_SETTINGS };
    this.listeners = new Set();
    this.pendingDelta = {};
    this.saveTimeout = null;
    this.saveResolvers = [];
    this.initStorageListener();
  }

  async load() {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
        const readArea = (area, defaults) => new Promise((res) => {
          try {
            chrome.storage[area].get(defaults, (items) => res(chrome.runtime.lastError ? {} : (items || {})));
          } catch (e) { res({}); }
        });
        // local, sync yazımı başarısız olduğunda tutulan daha yeni değerleri içerir → sync'i ezer
        Promise.all([readArea('sync', DEFAULT_SETTINGS), readArea('local', {})]).then(([sync, local]) => {
          this.current = this.sanitizeAll({ ...DEFAULT_SETTINGS, ...sync, ...local });
          resolve(this.current);
        });
      } else {
        try {
          const local = localStorage.getItem('lumaborder_settings');
          if (local) {
            this.current = this.sanitizeAll({ ...DEFAULT_SETTINGS, ...JSON.parse(local) });
          }
        } catch (e) {}
        resolve(this.current);
      }
    });
  }

  sanitizeAll(settingsObj) {
    const clean = {};
    for (const key of Object.keys(DEFAULT_SETTINGS)) {
      clean[key] = sanitizeSettingValue(key, settingsObj[key]);
    }
    return clean;
  }

  async save(newSettings) {
    // Anlık olarak bellek içi durumu güncelle
    for (const [key, val] of Object.entries(newSettings)) {
      const sanitized = sanitizeSettingValue(key, val);
      this.current[key] = sanitized;
      this.pendingDelta[key] = sanitized;
    }

    return new Promise((resolve) => {
      this.saveResolvers.push(resolve);

      if (this.saveTimeout) clearTimeout(this.saveTimeout);

      this.saveTimeout = setTimeout(() => {
        const deltaToSave = { ...this.pendingDelta };
        this.pendingDelta = {};
        const resolvers = [...this.saveResolvers];
        this.saveResolvers = [];
        const done = () => resolvers.forEach(r => r(this.current));

        try {
          if (typeof chrome !== 'undefined' && chrome.storage?.sync) {
            // Eklenti yeniden yüklendiyse (context invalidated) yazma deneme, promise'i çöz
            if (!chrome.runtime?.id) return done();

            chrome.storage.sync.set(deltaToSave, () => {
              if (chrome.runtime.lastError) {
                // sync yazılamadı (kota vb.) → local kazanır (load() local'i sync üzerine bindirir)
                chrome.storage.local.set(deltaToSave, done);
              } else {
                // sync güncel: eski local override'ı temizle ki load() bayat değer okumasın
                chrome.storage.local.remove(Object.keys(deltaToSave), done);
              }
            });
          } else {
            try {
              localStorage.setItem('lumaborder_settings', JSON.stringify(this.current));
            } catch (e) {}
            done();
          }
        } catch (err) {
          console.warn('[LumaBorder] Ayarlar kaydedilemedi:', err);
          done();
        }
      }, 100);
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
            if (!(key in DEFAULT_SETTINGS)) continue;
            // local.remove (sync'e geçiş temizliği) bir sıfırlama değildir; yok say
            if (changes[key].newValue === undefined && areaName === 'local') continue;
            const rawVal = changes[key].newValue;
            const cleanVal = sanitizeSettingValue(key, rawVal !== undefined ? rawVal : DEFAULT_SETTINGS[key]);
            if (this.current[key] !== cleanVal) {
              this.current[key] = cleanVal;
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
