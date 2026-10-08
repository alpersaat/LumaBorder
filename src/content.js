/**
 * LumaBorder - Dynamic Video Glow & Border Engine
 * Content Script (All-in-one standalone, zero-dependency, ultra-fast)
 */

(() => {
  if (window.__LUMABORDER_LOADED__) return;
  window.__LUMABORDER_LOADED__ = true;

  /* ==========================================================================
     1. INTERNATIONALIZATION (i18n) DICTIONARY
     ========================================================================== */
  const translations = {
    tr: {
      appName: "LumaBorder",
      appTagline: "Dinamik Glow & Işık Efekti",
      statusActive: "Aktif",
      statusInactive: "Pasif",
      masterToggle: "Glow Efektini Etkinleştir",
      masterToggleDesc: "Video etrafındaki dinamik ışık halesini açar/kapatır",
      tabGeneral: "Genel",
      tabEffects: "Işık & Renk",
      tabPerformance: "Performans",
      tabPresets: "Profiller",
      brightness: "Parlaklık",
      spread: "Işık Yayılması",
      blur: "Yumuşaklık (Blur)",
      saturation: "Renk Canlılığı",
      contrast: "Kontrast",
      smoothing: "Kare Yumuşatma",
      letterboxDetection: "Siyah Şeritleri Yok Say",
      letterboxDesc: "Sinemaskop filmlerdeki siyah kenarları otomatik kırpar",
      ecoMode: "Güç Tasarrufu (Eco)",
      ecoModeDesc: "Durağan sahnelerde GPU ve pil kullanımını düşürür",
      presetCinema: "Sinema",
      presetVibrant: "Canlı",
      presetNight: "Gece",
      presetGaming: "Oyun",
      presetDefault: "Dengeli",
      resetDefaults: "Varsayılana Sıfırla",
      resetConfirm: "Tüm ayarlar varsayılana döndürülsün mü?",
      language: "Dil"
    },
    en: {
      appName: "LumaBorder",
      appTagline: "Dynamic Glow Experience",
      statusActive: "Active",
      statusInactive: "Inactive",
      masterToggle: "Enable Glow Effect",
      masterToggleDesc: "Toggles the dynamic glow aura around video",
      tabGeneral: "General",
      tabEffects: "Light & Color",
      tabPerformance: "Performance",
      tabPresets: "Presets",
      brightness: "Brightness",
      spread: "Light Spread",
      blur: "Softness (Blur)",
      saturation: "Color Vibrance",
      contrast: "Contrast",
      smoothing: "Frame Smoothing",
      letterboxDetection: "Ignore Black Bars",
      letterboxDesc: "Auto-detects and crops letterbox bars in movies",
      ecoMode: "Power Saver (Eco)",
      ecoModeDesc: "Reduces GPU & battery usage on still/static scenes",
      presetCinema: "Cinema",
      presetVibrant: "Vibrant",
      presetNight: "Night",
      presetGaming: "Gaming",
      presetDefault: "Balanced",
      resetDefaults: "Reset to Defaults",
      resetConfirm: "Reset all settings to default values?",
      language: "Language"
    }
  };

  class I18nManager {
    constructor(lang = 'tr') {
      this.currentLang = lang;
    }
    setLanguage(lang) {
      if (translations[lang]) this.currentLang = lang;
    }
    t(key) {
      return translations[this.currentLang]?.[key] || translations.en?.[key] || key;
    }
  }

  const i18n = new I18nManager('tr');

  /* ==========================================================================
     2. SETTINGS & PRESETS
     ========================================================================== */
  const PRESETS = {
    default: { brightness: 100, spread: 25, blur: 45, saturation: 120, contrast: 105, smoothing: 60, letterboxDetection: true, ecoMode: true },
    cinema: { brightness: 85, spread: 40, blur: 65, saturation: 110, contrast: 100, smoothing: 75, letterboxDetection: true, ecoMode: true },
    vibrant: { brightness: 130, spread: 32, blur: 40, saturation: 160, contrast: 115, smoothing: 40, letterboxDetection: true, ecoMode: false },
    night: { brightness: 60, spread: 18, blur: 50, saturation: 90, contrast: 90, smoothing: 80, letterboxDetection: true, ecoMode: true },
    gaming: { brightness: 115, spread: 28, blur: 35, saturation: 140, contrast: 110, smoothing: 25, letterboxDetection: true, ecoMode: false }
  };

  const DEFAULT_SETTINGS = {
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
  };

  class SettingsManager {
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
            const saved = localStorage.getItem('lumaborder_settings');
            if (saved) this.current = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
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
        return this.save({
          ...PRESETS[presetKey],
          activePreset: presetKey
        });
      }
      return Promise.resolve(this.current);
    }

    reset() {
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
            if (updated) this.notifyListeners(this.current);
          }
        });
      }
    }

    onChange(cb) {
      this.listeners.add(cb);
      return () => this.listeners.delete(cb);
    }

    notifyListeners(s) {
      for (const cb of this.listeners) {
        try { cb(s); } catch (e) {}
      }
    }
  }

  const settingsManager = new SettingsManager();

  /* ==========================================================================
     3. AMBIENT ENGINE (Canvas & GPU)
     ========================================================================== */
  class AmbientEngine {
    constructor(videoElem, playerElem, settings) {
      this.video = videoElem;
      this.player = playerElem;
      this.settings = settings;

      this.container = null;
      this.canvas = null;
      this.ctx = null;
      this.analysisCanvas = null;
      this.analysisCtx = null;
      this.letterboxCrop = { top: 0, bottom: 0 };
      this.lastAnalysisTime = 0;

      this.isRunning = false;
      this.animationFrameId = null;
      this.videoCallbackId = null;

      this.canvasWidth = 192;
      this.canvasHeight = 108;

      this.initDOM();
      this.applySettings(this.settings);
      this.bindEvents();
    }

    initDOM() {
      const old = this.player.querySelector('.lumaborder-ambient-container');
      if (old) old.remove();

      this.container = document.createElement('div');
      this.container.className = 'lumaborder-ambient-container';
      this.container.setAttribute('aria-hidden', 'true');

      this.canvas = document.createElement('canvas');
      this.canvas.className = 'lumaborder-canvas';
      this.canvas.width = this.canvasWidth;
      this.canvas.height = this.canvasHeight;

      this.container.appendChild(this.canvas);

      if (this.player.firstChild) {
        this.player.insertBefore(this.container, this.player.firstChild);
      } else {
        this.player.appendChild(this.container);
      }

      this.ctx = this.canvas.getContext('2d', {
        alpha: false,
        desynchronized: true,
        willReadFrequently: false
      });

      this.analysisCanvas = document.createElement('canvas');
      this.analysisCanvas.width = 32;
      this.analysisCanvas.height = 18;
      this.analysisCtx = this.analysisCanvas.getContext('2d', { willReadFrequently: true });
    }

    bindEvents() {
      this.onPlay = () => this.start();
      this.onPause = () => this.stop();
      this.onEnded = () => this.stop();
      this.onVisibilityChange = () => {
        if (document.hidden) {
          this.stop();
        } else if (!this.video.paused && !this.video.ended) {
          this.start();
        }
      };

      this.video.addEventListener('play', this.onPlay);
      this.video.addEventListener('pause', this.onPause);
      this.video.addEventListener('ended', this.onEnded);
      document.addEventListener('visibilitychange', this.onVisibilityChange);

      if (!this.video.paused && !this.video.ended && this.video.readyState >= 2) {
        this.start();
      }
    }

    applySettings(newSettings) {
      this.settings = { ...this.settings, ...newSettings };
      if (!this.container) return;

      if (!this.settings.enabled) {
        this.container.style.display = 'none';
        this.stop();
        return;
      }

      this.container.style.display = 'block';

      const brightness = (this.settings.brightness / 100).toFixed(2);
      const contrast = (this.settings.contrast / 100).toFixed(2);
      const saturate = (this.settings.saturation / 100).toFixed(2);
      const blur = Math.max(10, this.settings.blur);
      const spreadScale = 1 + (this.settings.spread / 100);
      const smoothingSec = (this.settings.smoothing / 100) * 0.25;

      this.container.style.setProperty('--lumaborder-blur', `${blur}px`);
      this.container.style.setProperty('--lumaborder-scale', `${spreadScale}`);
      this.container.style.setProperty('--lumaborder-brightness', brightness);
      this.container.style.setProperty('--lumaborder-contrast', contrast);
      this.container.style.setProperty('--lumaborder-saturate', saturate);
      this.container.style.setProperty('--lumaborder-transition', `${smoothingSec.toFixed(2)}s`);

      if (this.settings.enabled && !this.isRunning && !this.video.paused) {
        this.start();
      }
    }

    start() {
      if (this.isRunning || !this.settings.enabled) return;
      this.isRunning = true;
      this.renderLoop();
    }

    stop() {
      this.isRunning = false;
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      if (this.videoCallbackId && 'cancelVideoFrameCallback' in this.video) {
        this.video.cancelVideoFrameCallback(this.videoCallbackId);
        this.videoCallbackId = null;
      }
    }

    renderLoop() {
      if (!this.isRunning || !this.settings.enabled) return;

      if ('requestVideoFrameCallback' in this.video) {
        this.videoCallbackId = this.video.requestVideoFrameCallback(() => {
          this.drawFrame();
          this.renderLoop();
        });
      } else {
        this.animationFrameId = requestAnimationFrame(() => {
          this.drawFrame();
          this.renderLoop();
        });
      }
    }

    detectLetterbox() {
      if (!this.settings.letterboxDetection || !this.analysisCtx) {
        this.letterboxCrop = { top: 0, bottom: 0 };
        return;
      }

      const now = performance.now();
      if (now - this.lastAnalysisTime < 1500) return;
      this.lastAnalysisTime = now;

      try {
        const w = this.analysisCanvas.width;
        const h = this.analysisCanvas.height;
        this.analysisCtx.drawImage(this.video, 0, 0, w, h);
        const data = this.analysisCtx.getImageData(0, 0, w, h).data;
        const threshold = 18;

        let cropTop = 0;
        for (let y = 0; y < Math.floor(h / 3); y++) {
          let isBlack = true;
          for (let x = 4; x < w - 4; x += 2) {
            const idx = (y * w + x) * 4;
            const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
            if (lum > threshold) { isBlack = false; break; }
          }
          if (isBlack) cropTop = (y + 1) / h; else break;
        }

        let cropBottom = 0;
        for (let y = h - 1; y >= Math.floor(h * 0.66); y--) {
          let isBlack = true;
          for (let x = 4; x < w - 4; x += 2) {
            const idx = (y * w + x) * 4;
            const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
            if (lum > threshold) { isBlack = false; break; }
          }
          if (isBlack) cropBottom = (h - y) / h; else break;
        }

        this.letterboxCrop.top = cropTop;
        this.letterboxCrop.bottom = cropBottom;
      } catch (e) {
        this.letterboxCrop = { top: 0, bottom: 0 };
      }
    }

    drawFrame() {
      if (!this.ctx || !this.video || this.video.readyState < 2) return;

      this.detectLetterbox();

      const vw = this.video.videoWidth || this.canvasWidth;
      const vh = this.video.videoHeight || this.canvasHeight;
      const sx = 0;
      const sy = vh * this.letterboxCrop.top;
      const sw = vw;
      const sh = Math.max(10, vh * (1 - this.letterboxCrop.top - this.letterboxCrop.bottom));

      try {
        this.ctx.drawImage(
          this.video,
          sx, sy, sw, sh,
          0, 0, this.canvasWidth, this.canvasHeight
        );
      } catch (err) {}
    }

    destroy() {
      this.stop();
      if (this.video) {
        this.video.removeEventListener('play', this.onPlay);
        this.video.removeEventListener('pause', this.onPause);
        this.video.removeEventListener('ended', this.onEnded);
      }
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
      if (this.container) {
        this.container.remove();
        this.container = null;
      }
    }
  }

  /* ==========================================================================
     4. PLAYER UI CONTROLS & MODERN IN-PLAYER MENU
     ========================================================================== */
  class PlayerUI {
    constructor(playerElem, settingsMgr, engine) {
      this.player = playerElem;
      this.settingsManager = settingsMgr;
      this.ambientEngine = engine;
      this.button = null;
      this.menuOverlay = null;
      this.isOpen = false;
      this.activeTab = 'general';

      this.initButton();
    }

    initButton() {
      const rightControls = this.player.querySelector('.ytp-right-controls');
      if (!rightControls) return;

      const oldBtn = rightControls.querySelector('.lumaborder-player-btn');
      if (oldBtn) oldBtn.remove();

      this.button = document.createElement('button');
      this.button.className = 'ytp-button lumaborder-player-btn';
      this.button.title = `${i18n.t('appName')}`;
      this.button.setAttribute('aria-haspopup', 'true');
      this.button.setAttribute('aria-label', i18n.t('appName'));

      this.button.innerHTML = `
        <svg viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 19c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h-4v1zm2-17c2.76 0 5 2.24 5 5 0 1.95-1.12 3.63-2.76 4.46L14 11.6V16h-4v-4.4l-.24-.14C8.12 10.63 7 8.95 7 7c0-2.76 2.24-5 5-5z"/>
        </svg>
      `;

      const settingsBtn = rightControls.querySelector('.ytp-settings-button');
      if (settingsBtn) {
        rightControls.insertBefore(this.button, settingsBtn);
      } else {
        rightControls.appendChild(this.button);
      }

      this.button.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMenu();
      });

      document.addEventListener('click', (e) => {
        if (this.isOpen && this.menuOverlay && !this.menuOverlay.contains(e.target) && !this.button.contains(e.target)) {
          this.closeMenu();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) this.closeMenu();
      });

      this.updateButtonState();
    }

    updateButtonState() {
      if (!this.button) return;
      this.button.classList.toggle('active', this.settingsManager.current.enabled);
    }

    toggleMenu() {
      if (this.isOpen) this.closeMenu();
      else this.openMenu();
    }

    openMenu() {
      if (this.isOpen) return;
      this.renderMenu();
      this.isOpen = true;
    }

    closeMenu() {
      if (!this.isOpen) return;
      if (this.menuOverlay) {
        this.menuOverlay.remove();
        this.menuOverlay = null;
      }
      this.isOpen = false;
    }

    renderMenu() {
      if (this.menuOverlay) this.menuOverlay.remove();

      const s = this.settingsManager.current;
      i18n.setLanguage(s.language || 'tr');

      this.menuOverlay = document.createElement('div');
      this.menuOverlay.className = 'lumaborder-menu-overlay';

      const header = document.createElement('div');
      header.className = 'lumaborder-menu-header';
      header.innerHTML = `
        <div class="lumaborder-menu-title">
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/></svg>
          <span>${i18n.t('appName')}</span>
        </div>
        <div class="lumaborder-header-actions">
          <button class="lumaborder-lang-btn" id="lumaborder-lang-toggle">
            ${s.language === 'en' ? 'TR 🇹🇷' : 'EN 🇬🇧'}
          </button>
          <button class="lumaborder-close-btn" id="lumaborder-close-menu">&times;</button>
        </div>
      `;

      const tabs = document.createElement('div');
      tabs.className = 'lumaborder-tabs';
      tabs.innerHTML = `
        <button class="lumaborder-tab ${this.activeTab === 'general' ? 'active' : ''}" data-tab="general">${i18n.t('tabGeneral')}</button>
        <button class="lumaborder-tab ${this.activeTab === 'effects' ? 'active' : ''}" data-tab="effects">${i18n.t('tabEffects')}</button>
        <button class="lumaborder-tab ${this.activeTab === 'presets' ? 'active' : ''}" data-tab="presets">${i18n.t('tabPresets')}</button>
        <button class="lumaborder-tab ${this.activeTab === 'performance' ? 'active' : ''}" data-tab="performance">${i18n.t('tabPerformance')}</button>
      `;

      const content = document.createElement('div');
      content.className = 'lumaborder-tab-content';
      content.innerHTML = this.getTabContentHTML(this.activeTab);

      const footer = document.createElement('div');
      footer.className = 'lumaborder-menu-footer';
      footer.innerHTML = `
        <button class="lumaborder-reset-btn" id="lumaborder-reset-all">${i18n.t('resetDefaults')}</button>
        <span class="lumaborder-badge">v2.0 • Ultra Glow</span>
      `;

      this.menuOverlay.appendChild(header);
      this.menuOverlay.appendChild(tabs);
      this.menuOverlay.appendChild(content);
      this.menuOverlay.appendChild(footer);

      this.player.appendChild(this.menuOverlay);
      this.bindMenuEvents();
    }

    getTabContentHTML(tab) {
      const s = this.settingsManager.current;

      if (tab === 'general') {
        return `
          <div class="lumaborder-master-card">
            <div class="lumaborder-master-text">
              <span class="lumaborder-master-title">${i18n.t('masterToggle')}</span>
              <span class="lumaborder-master-sub">${i18n.t('masterToggleDesc')}</span>
            </div>
            <label class="lumaborder-switch">
              <input type="checkbox" id="lumaborder-master-toggle" ${s.enabled ? 'checked' : ''}>
              <span class="lumaborder-slider-round"></span>
            </label>
          </div>
          <div class="lumaborder-control-row">
            <div class="lumaborder-control-header">
              <span class="lumaborder-control-label">${i18n.t('brightness')}</span>
              <span class="lumaborder-control-value" id="val-brightness">${s.brightness}%</span>
            </div>
            <input type="range" class="lumaborder-range" id="rng-brightness" min="20" max="250" value="${s.brightness}">
          </div>
          <div class="lumaborder-control-row">
            <div class="lumaborder-control-header">
              <span class="lumaborder-control-label">${i18n.t('spread')}</span>
              <span class="lumaborder-control-value" id="val-spread">${s.spread}%</span>
            </div>
            <input type="range" class="lumaborder-range" id="rng-spread" min="5" max="100" value="${s.spread}">
          </div>
          <div class="lumaborder-control-row">
            <div class="lumaborder-control-header">
              <span class="lumaborder-control-label">${i18n.t('blur')}</span>
              <span class="lumaborder-control-value" id="val-blur">${s.blur}px</span>
            </div>
            <input type="range" class="lumaborder-range" id="rng-blur" min="10" max="120" value="${s.blur}">
          </div>
        `;
      }

      if (tab === 'effects') {
        return `
          <div class="lumaborder-control-row">
            <div class="lumaborder-control-header">
              <span class="lumaborder-control-label">${i18n.t('saturation')}</span>
              <span class="lumaborder-control-value" id="val-saturation">${s.saturation}%</span>
            </div>
            <input type="range" class="lumaborder-range" id="rng-saturation" min="50" max="220" value="${s.saturation}">
          </div>
          <div class="lumaborder-control-row">
            <div class="lumaborder-control-header">
              <span class="lumaborder-control-label">${i18n.t('contrast')}</span>
              <span class="lumaborder-control-value" id="val-contrast">${s.contrast}%</span>
            </div>
            <input type="range" class="lumaborder-range" id="rng-contrast" min="60" max="160" value="${s.contrast}">
          </div>
          <div class="lumaborder-control-row">
            <div class="lumaborder-control-header">
              <span class="lumaborder-control-label">${i18n.t('smoothing')}</span>
              <span class="lumaborder-control-value" id="val-smoothing">${s.smoothing}%</span>
            </div>
            <input type="range" class="lumaborder-range" id="rng-smoothing" min="0" max="100" value="${s.smoothing}">
          </div>
        `;
      }

      if (tab === 'presets') {
        return `
          <div class="lumaborder-presets-grid">
            <button class="lumaborder-preset-btn ${s.activePreset === 'default' ? 'active' : ''}" data-preset="default">
              <span class="lumaborder-preset-icon">⚖️</span>
              <span>${i18n.t('presetDefault')}</span>
            </button>
            <button class="lumaborder-preset-btn ${s.activePreset === 'cinema' ? 'active' : ''}" data-preset="cinema">
              <span class="lumaborder-preset-icon">🎬</span>
              <span>${i18n.t('presetCinema')}</span>
            </button>
            <button class="lumaborder-preset-btn ${s.activePreset === 'vibrant' ? 'active' : ''}" data-preset="vibrant">
              <span class="lumaborder-preset-icon">⚡</span>
              <span>${i18n.t('presetVibrant')}</span>
            </button>
            <button class="lumaborder-preset-btn ${s.activePreset === 'night' ? 'active' : ''}" data-preset="night">
              <span class="lumaborder-preset-icon">🌙</span>
              <span>${i18n.t('presetNight')}</span>
            </button>
            <button class="lumaborder-preset-btn ${s.activePreset === 'gaming' ? 'active' : ''}" data-preset="gaming">
              <span class="lumaborder-preset-icon">🎮</span>
              <span>${i18n.t('presetGaming')}</span>
            </button>
          </div>
        `;
      }

      if (tab === 'performance') {
        return `
          <div class="lumaborder-master-card">
            <div class="lumaborder-master-text">
              <span class="lumaborder-master-title">${i18n.t('letterboxDetection')}</span>
              <span class="lumaborder-master-sub">${i18n.t('letterboxDesc')}</span>
            </div>
            <label class="lumaborder-switch">
              <input type="checkbox" id="chk-letterbox" ${s.letterboxDetection ? 'checked' : ''}>
              <span class="lumaborder-slider-round"></span>
            </label>
          </div>
          <div class="lumaborder-master-card">
            <div class="lumaborder-master-text">
              <span class="lumaborder-master-title">${i18n.t('ecoMode')}</span>
              <span class="lumaborder-master-sub">${i18n.t('ecoModeDesc')}</span>
            </div>
            <label class="lumaborder-switch">
              <input type="checkbox" id="chk-eco" ${s.ecoMode ? 'checked' : ''}>
              <span class="lumaborder-slider-round"></span>
            </label>
          </div>
        `;
      }
      return '';
    }

    bindMenuEvents() {
      if (!this.menuOverlay) return;

      const closeBtn = this.menuOverlay.querySelector('#lumaborder-close-menu');
      if (closeBtn) closeBtn.addEventListener('click', () => this.closeMenu());

      const langBtn = this.menuOverlay.querySelector('#lumaborder-lang-toggle');
      if (langBtn) {
        langBtn.addEventListener('click', async () => {
          const nextLang = this.settingsManager.current.language === 'en' ? 'tr' : 'en';
          await this.settingsManager.save({ language: nextLang });
          i18n.setLanguage(nextLang);
          this.renderMenu();
        });
      }

      const resetBtn = this.menuOverlay.querySelector('#lumaborder-reset-all');
      if (resetBtn) {
        resetBtn.addEventListener('click', async () => {
          if (confirm(i18n.t('resetConfirm'))) {
            await this.settingsManager.reset();
            this.ambientEngine.applySettings(this.settingsManager.current);
            this.updateButtonState();
            this.renderMenu();
          }
        });
      }

      const tabBtns = this.menuOverlay.querySelectorAll('.lumaborder-tab');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.activeTab = btn.dataset.tab;
          tabBtns.forEach(b => b.classList.toggle('active', b === btn));
          const content = this.menuOverlay.querySelector('.lumaborder-tab-content');
          if (content) {
            content.innerHTML = this.getTabContentHTML(this.activeTab);
            this.bindTabContentEvents();
          }
        });
      });

      this.bindTabContentEvents();
    }

    bindTabContentEvents() {
      if (!this.menuOverlay) return;

      const masterToggle = this.menuOverlay.querySelector('#lumaborder-master-toggle');
      if (masterToggle) {
        masterToggle.addEventListener('change', async (e) => {
          const enabled = e.target.checked;
          await this.settingsManager.save({ enabled });
          this.ambientEngine.applySettings({ enabled });
          this.updateButtonState();
        });
      }

      const bindSlider = (id, key, unit = '%') => {
        const slider = this.menuOverlay.querySelector(`#rng-${id}`);
        const valLabel = this.menuOverlay.querySelector(`#val-${id}`);
        if (slider && valLabel) {
          slider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            valLabel.textContent = `${val}${unit}`;
            this.ambientEngine.applySettings({ [key]: val });
          });
          slider.addEventListener('change', async (e) => {
            const val = parseInt(e.target.value, 10);
            await this.settingsManager.save({ [key]: val, activePreset: 'custom' });
          });
        }
      };

      bindSlider('brightness', 'brightness', '%');
      bindSlider('spread', 'spread', '%');
      bindSlider('blur', 'blur', 'px');
      bindSlider('saturation', 'saturation', '%');
      bindSlider('contrast', 'contrast', '%');
      bindSlider('smoothing', 'smoothing', '%');

      const presetBtns = this.menuOverlay.querySelectorAll('.lumaborder-preset-btn');
      presetBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
          const presetKey = btn.dataset.preset;
          await this.settingsManager.applyPreset(presetKey);
          this.ambientEngine.applySettings(this.settingsManager.current);
          this.renderMenu();
        });
      });

      const bindCheckbox = (id, key) => {
        const chk = this.menuOverlay.querySelector(`#chk-${id}`);
        if (chk) {
          chk.addEventListener('change', async (e) => {
            await this.settingsManager.save({ [key]: e.target.checked });
            this.ambientEngine.applySettings({ [key]: e.target.checked });
          });
        }
      };

      bindCheckbox('letterbox', 'letterboxDetection');
      bindCheckbox('eco', 'ecoMode');
    }

    destroy() {
      this.closeMenu();
      if (this.button) {
        this.button.remove();
        this.button = null;
      }
    }
  }

  /* ==========================================================================
     5. BOOTSTRAPPER & OBSERVER
     ========================================================================== */
  class LumaBorderApp {
    constructor() {
      this.ambientEngine = null;
      this.playerUI = null;
      this.currentVideo = null;
      this.currentPlayer = null;
      this.initTimeout = null;

      this.init();
    }

    async init() {
      await settingsManager.load();
      i18n.setLanguage(settingsManager.current.language || 'tr');

      this.bindEvents();
      this.observeDOM();

      settingsManager.onChange((newSettings) => {
        i18n.setLanguage(newSettings.language || 'tr');
        if (this.ambientEngine) this.ambientEngine.applySettings(newSettings);
        if (this.playerUI) this.playerUI.updateButtonState();
      });

      this.checkAndBootstrap();
    }

    bindEvents() {
      window.addEventListener('yt-navigate-finish', () => this.scheduleBootstrap());
      window.addEventListener('spfdone', () => this.scheduleBootstrap());
      window.addEventListener('popstate', () => this.scheduleBootstrap());
    }

    scheduleBootstrap() {
      if (this.initTimeout) clearTimeout(this.initTimeout);
      this.initTimeout = setTimeout(() => this.checkAndBootstrap(), 350);
    }

    observeDOM() {
      const observer = new MutationObserver(() => {
        const video = document.querySelector('video.html5-main-video');
        if (video && video !== this.currentVideo) {
          this.checkAndBootstrap();
        }
      });

      observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true
      });
    }

    checkAndBootstrap() {
      const isWatch = location.pathname.startsWith('/watch') || location.pathname.startsWith('/embed/');
      if (!isWatch) {
        this.teardown();
        return;
      }

      const video = document.querySelector('video.html5-main-video');
      const player = document.querySelector('#movie_player') || document.querySelector('.html5-video-player');

      if (!video || !player) {
        setTimeout(() => {
          const retryVideo = document.querySelector('video.html5-main-video');
          const retryPlayer = document.querySelector('#movie_player') || document.querySelector('.html5-video-player');
          if (retryVideo && retryPlayer && retryVideo !== this.currentVideo) {
            this.setup(retryVideo, retryPlayer);
          }
        }, 500);
        return;
      }

      if (this.currentVideo === video && this.currentPlayer === player && this.ambientEngine) {
        return;
      }

      this.setup(video, player);
    }

    setup(video, player) {
      this.teardown();
      this.currentVideo = video;
      this.currentPlayer = player;

      try {
        this.ambientEngine = new AmbientEngine(video, player, settingsManager.current);
        this.playerUI = new PlayerUI(player, settingsManager, this.ambientEngine);
      } catch (err) {
        console.warn('[LumaBorder] Init error:', err);
      }
    }

    teardown() {
      if (this.ambientEngine) {
        this.ambientEngine.destroy();
        this.ambientEngine = null;
      }
      if (this.playerUI) {
        this.playerUI.destroy();
        this.playerUI = null;
      }
      this.currentVideo = null;
      this.currentPlayer = null;
    }
  }

  // Başlat
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new LumaBorderApp());
  } else {
    new LumaBorderApp();
  }
})();
