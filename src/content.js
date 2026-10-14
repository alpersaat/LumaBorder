/**
 * LumaBorder - Dynamic Video Glow & Border Engine
 * [OTOMATIK DERLENMİŞ DOSYA - DO NOT EDIT DIRECTLY]
 * Kaynak dosyalar src/ dizinindedir (ambient-engine.js, player-ui.js, settings.js, i18n.js, content-main.js).
 * Derlemek için: npm run build | Canlı izleme için: npm run dev
 */
(() => {
  // src/i18n.js
  var translations = {
    tr: {
      appName: "LumaBorder",
      appTagline: "Dinamik Glow & I\u015F\u0131k Efekti",
      statusActive: "Aktif",
      statusInactive: "Pasif",
      masterToggle: "Glow Efektini Etkinle\u015Ftir",
      masterToggleDesc: "Video etraf\u0131ndaki dinamik \u0131\u015F\u0131k halesini a\xE7ar/kapat\u0131r",
      // Sekmeler
      tabGeneral: "Genel",
      tabEffects: "I\u015F\u0131k & Renk",
      tabPerformance: "Performans",
      tabPresets: "Profiller",
      // Ayarlar
      brightness: "Parlakl\u0131k",
      brightnessDesc: "I\u015F\u0131k halesinin parlakl\u0131k seviyesi",
      spread: "I\u015F\u0131k Yay\u0131lmas\u0131",
      spreadDesc: "I\u015F\u0131\u011F\u0131n video kenarlar\u0131ndan ne kadar uza\u011Fa yay\u0131laca\u011F\u0131",
      blur: "Yumu\u015Fakl\u0131k (Bulan\u0131kl\u0131k)",
      blurDesc: "I\u015F\u0131k halesinin yumu\u015Fakl\u0131k ve yay\u0131lma derecesi",
      saturation: "Renk Canl\u0131l\u0131\u011F\u0131",
      saturationDesc: "Renklerin doygunlu\u011Fu ve canl\u0131l\u0131k seviyesi",
      contrast: "Kontrast",
      contrastDesc: "Renk kontrast\u0131",
      smoothing: "Kare Yumu\u015Fatma",
      smoothingDesc: "Kareler aras\u0131 ani \u0131\u015F\u0131k patlamalar\u0131n\u0131 yumu\u015Fat\u0131r",
      // Gelişmiş Glow & Efektler
      dualLayerGlow: "\xC7ift Katmanl\u0131 Glow",
      dualLayerDesc: "Videonun ard\u0131nda keskin & canl\u0131, d\u0131\u015Fta ise yumu\u015Fak 2 katmanl\u0131 sinematik derinlik",
      bottomFade: "Altyaz\u0131 Korumas\u0131 (Alt Karartma)",
      bottomFadeDesc: "Parlak altyaz\u0131lar\u0131n alt k\u0131s\u0131mda ani beyaz parlama yapmas\u0131n\u0131 engeller",
      bottomFadeStrength: "Altyaz\u0131 Karartma Oran\u0131",
      biasLighting: "Sabit Arka I\u015F\u0131k (Bias Lighting)",
      biasLightingDesc: "G\xF6z yormayan s\u0131cak veya neon tonlu sabit arka ayd\u0131nlatma",
      biasLightingMode: "Arka I\u015F\u0131k Modu",
      biasModeOff: "Kapal\u0131 (Dinamik Video)",
      biasModePause: "Video Duraklat\u0131ld\u0131\u011F\u0131nda",
      biasModeAlways: "Her Zaman Sabit I\u015F\u0131k",
      biasLightingColor: "I\u015F\u0131k Rengi / S\u0131cakl\u0131k",
      biasColorWarm: "2700K S\u0131cak Beyaz",
      biasColorNeutral: "4000K Do\u011Fal Beyaz",
      biasColorCinema: "6500K Sinema D65",
      biasColorCyber: "Neon Siber Mavi",
      biasColorSunset: "Neon G\xFCnbat\u0131m\u0131",
      biasColorPurple: "Neon Mor",
      biasColorCustom: "\xD6zel Renk",
      // Gelişmiş / Performans & Pil
      targetFps: "Hedef Kare H\u0131z\u0131 (FPS)",
      targetFpsDesc: "Y\xFCksek Hz ekranlarda GPU ve pil tasarrufu i\xE7in kare h\u0131z\u0131n\u0131 s\u0131n\u0131rlar",
      fpsSync: "E\u015Fzamanl\u0131 (Video)",
      fps60: "60 FPS",
      fps30: "30 FPS (Eko)",
      workerRender: "OffscreenCanvas / Worker Render",
      workerRenderDesc: "\xC7izim ve piksel analizini arka plana ta\u015F\u0131yarak UI tak\u0131lmalar\u0131n\u0131 s\u0131f\u0131rlar",
      autoBatteryEco: "Ak\u0131ll\u0131 Pil Tasarrufu (%20 Alt\u0131)",
      autoBatteryEcoDesc: "Cihaz pildeyken %20'nin alt\u0131na indi\u011Finde otomatik 30 FPS Eko moduna ge\xE7er",
      batteryStatusTitle: "Pil Durumu",
      batteryCharging: "\u015Earj Ediliyor",
      batteryDischarging: "Pilde",
      batteryEcoActiveBadge: "\u{1F50B} Pil Tasarrufu Devrede (30 FPS Eko)",
      batteryEcoDisabledBadge: "\u26A1 Normal Performans",
      batteryNotSupported: "Pil API Desteklenmiyor",
      letterboxDetection: "\xDCst/Alt \u015Eeritleri K\u0131rp (Letterbox)",
      letterboxDesc: "Sinemaskop filmlerdeki yatay siyah \u015Feritleri yok sayar",
      pillarboxDetection: "Yan \u015Eeritleri K\u0131rp (Pillarbox)",
      pillarboxDesc: "4:3 ve dikey videolardaki sa\u011F/sol siyah \u015Feritleri yok sayar",
      ecoMode: "G\xFC\xE7 Tasarrufu (Eco)",
      ecoModeDesc: "Dura\u011Fan sahnelerde GPU ve pil kullan\u0131m\u0131n\u0131 d\xFC\u015F\xFCr\xFCr",
      theaterModeSync: "Geli\u015Fmi\u015F Sinema Modu",
      theaterModeSyncDesc: "Sinema modunda \u0131\u015F\u0131\u011F\u0131 sinematik olarak geni\u015Fletir",
      fullScreenSync: "Tam Ekran Uyumu",
      fullScreenSyncDesc: "Tam ekran modunda ak\u0131c\u0131 ve optimize ambilight",
      shortsActive: "Shorts Glow Aktif",
      // Hazır Profiller (Presets)
      presetCinema: "Sinema",
      presetVibrant: "Canl\u0131 & Parlak",
      presetNight: "Gece Modu",
      presetGaming: "Dinamik Oyun",
      presetDefault: "Dengeli (Varsay\u0131lan)",
      // Butonlar ve Durumlar
      resetDefaults: "Varsay\u0131lana S\u0131f\u0131rla",
      resetConfirm: "T\xFCm ayarlar varsay\u0131lana d\xF6nd\xFCr\xFCls\xFCn m\xFC?",
      language: "Dil",
      langTr: "T\xFCrk\xE7e",
      langEn: "English",
      close: "Kapat",
      settingsTitle: "LumaBorder Ayarlar\u0131",
      quickControls: "H\u0131zl\u0131 Kontroller",
      notOnYoutube: "Video sayfas\u0131nda de\u011Filsiniz",
      openYoutubeTip: "Bir video veya Shorts a\xE7t\u0131\u011F\u0131n\u0131zda efekt otomatik ba\u015Flayacakt\u0131r."
    },
    en: {
      appName: "LumaBorder",
      appTagline: "Dynamic Glow Experience",
      statusActive: "Active",
      statusInactive: "Inactive",
      masterToggle: "Enable Glow Effect",
      masterToggleDesc: "Toggles the dynamic glow aura around video",
      // Tabs
      tabGeneral: "General",
      tabEffects: "Light & Color",
      tabPerformance: "Performance",
      tabPresets: "Presets",
      // Settings
      brightness: "Brightness",
      brightnessDesc: "Brightness level of the glow aura",
      spread: "Light Spread",
      spreadDesc: "How far the light aura spreads beyond video edges",
      blur: "Softness (Blur)",
      blurDesc: "Smoothness and dispersion of the glow aura",
      saturation: "Color Vibrance",
      saturationDesc: "Vibrance and color saturation level",
      contrast: "Contrast",
      contrastDesc: "Contrast of glow colors",
      smoothing: "Frame Smoothing",
      smoothingDesc: "Smooths abrupt color changes between frames",
      // Advanced Glow & Effects
      dualLayerGlow: "Dual-Layer Glow",
      dualLayerDesc: "Tight vibrant core + soft diffuse ambient for 2x cinematic depth",
      bottomFade: "Subtitle Protection (Bottom Fade)",
      bottomFadeDesc: "Dims bottom glow to prevent blinding flashes from white subtitles",
      bottomFadeStrength: "Bottom Dimming Level",
      biasLighting: "Bias Lighting (Static Aura)",
      biasLightingDesc: "Comfortable static backlighting to reduce eye strain",
      biasLightingMode: "Bias Lighting Mode",
      biasModeOff: "Off (Dynamic Video)",
      biasModePause: "When Video Paused",
      biasModeAlways: "Always Static Light",
      biasLightingColor: "Light Color / Temperature",
      biasColorWarm: "2700K Warm White",
      biasColorNeutral: "4000K Neutral White",
      biasColorCinema: "6500K Cinema D65",
      biasColorCyber: "Cyber Blue",
      biasColorSunset: "Sunset Orange",
      biasColorPurple: "Deep Purple",
      biasColorCustom: "Custom Color",
      // Advanced / Performance & Battery
      targetFps: "Target Frame Rate (FPS)",
      targetFpsDesc: "Limits FPS to reduce GPU usage and save laptop battery on high-Hz displays",
      fpsSync: "Sync (Video)",
      fps60: "60 FPS",
      fps30: "30 FPS (Eco)",
      workerRender: "OffscreenCanvas / Worker Render",
      workerRenderDesc: "Offloads canvas drawing and pixel analysis to background worker to prevent UI lag",
      autoBatteryEco: "Smart Battery Saver (<20%)",
      autoBatteryEcoDesc: "Automatically activates 30 FPS Eco mode when unplugged and battery drops below 20%",
      batteryStatusTitle: "Battery Status",
      batteryCharging: "Charging",
      batteryDischarging: "On Battery",
      batteryEcoActiveBadge: "\u{1F50B} Battery Saver Active (30 FPS Eco)",
      batteryEcoDisabledBadge: "\u26A1 Normal Performance",
      batteryNotSupported: "Battery API Not Supported",
      letterboxDetection: "Crop Top/Bottom Bars (Letterbox)",
      letterboxDesc: "Auto-detects and crops letterbox bars in movies",
      pillarboxDetection: "Crop Side Bars (Pillarbox)",
      pillarboxDesc: "Auto-detects and crops pillarbox bars in 4:3 or vertical videos",
      ecoMode: "Power Saver (Eco)",
      ecoModeDesc: "Reduces GPU & battery usage on still/static scenes",
      theaterModeSync: "Enhanced Theater Mode",
      theaterModeSyncDesc: "Cinematically widens ambient aura in theater mode",
      fullScreenSync: "Fullscreen Sync",
      fullScreenSyncDesc: "Fluid and optimized glow during fullscreen",
      shortsActive: "Shorts Glow Active",
      // Presets
      presetCinema: "Cinema",
      presetVibrant: "Vibrant & Bright",
      presetNight: "Night Light",
      presetGaming: "Gaming Dynamic",
      presetDefault: "Balanced (Default)",
      // Buttons & Status
      resetDefaults: "Reset to Defaults",
      resetConfirm: "Reset all settings to default values?",
      language: "Language",
      langTr: "T\xFCrk\xE7e",
      langEn: "English",
      close: "Close",
      settingsTitle: "LumaBorder Settings",
      quickControls: "Quick Controls",
      notOnYoutube: "Not on a video page",
      openYoutubeTip: "Glow effect activates automatically when watching a video or Shorts."
    }
  };
  var I18nManager = class {
    constructor(initialLang = "tr") {
      this.currentLang = initialLang;
    }
    setLanguage(lang) {
      if (translations[lang]) {
        this.currentLang = lang;
      }
    }
    getLanguage() {
      return this.currentLang;
    }
    t(key) {
      return translations[this.currentLang]?.[key] || translations["en"]?.[key] || key;
    }
  };
  var i18n = new I18nManager("tr");

  // src/settings.js
  var PRESETS = {
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
      biasLightingMode: "off",
      biasLightingColor: "#ffe4b5",
      ecoMode: true,
      targetFps: "sync",
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
      biasLightingMode: "off",
      biasLightingColor: "#ffe4b5",
      ecoMode: true,
      targetFps: "sync",
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
      biasLightingMode: "off",
      biasLightingColor: "#ffe4b5",
      ecoMode: false,
      targetFps: "sync",
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
      biasLightingMode: "pause",
      biasLightingColor: "#ffe4b5",
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
      biasLightingMode: "off",
      biasLightingColor: "#00e5ff",
      ecoMode: false,
      targetFps: "sync",
      workerRender: true,
      autoBatteryEco: false
    }
  };
  var DEFAULT_SETTINGS = {
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
    biasLightingMode: "off",
    biasLightingColor: "#ffe4b5",
    ecoMode: true,
    targetFps: "sync",
    workerRender: true,
    autoBatteryEco: true,
    theaterModeSync: true,
    fullScreenSync: true,
    activePreset: "default",
    language: "tr"
  };
  function sanitizeSettingValue(key, value) {
    if (value === void 0 || value === null) return DEFAULT_SETTINGS[key];
    switch (key) {
      case "brightness":
      case "spread":
      case "blur":
      case "saturation":
      case "contrast":
      case "smoothing":
      case "bottomFadeStrength": {
        const num = Number(value);
        return Number.isFinite(num) ? Math.max(0, Math.min(500, Math.round(num))) : DEFAULT_SETTINGS[key];
      }
      case "targetFps": {
        if (value === "sync" || value === 60 || value === 30 || value === "60" || value === "30") {
          return value === "sync" ? "sync" : Number(value);
        }
        return DEFAULT_SETTINGS.targetFps;
      }
      case "biasLightingColor": {
        if (typeof value === "string" && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value.trim())) {
          return value.trim();
        }
        return DEFAULT_SETTINGS.biasLightingColor;
      }
      case "biasLightingMode": {
        return ["off", "pause", "always"].includes(value) ? value : "off";
      }
      case "language": {
        return value === "en" ? "en" : "tr";
      }
      case "activePreset": {
        return typeof value === "string" ? value.slice(0, 30) : "default";
      }
      default: {
        if (typeof DEFAULT_SETTINGS[key] === "boolean") {
          return Boolean(value);
        }
        return value;
      }
    }
  }
  var SettingsManager = class {
    constructor() {
      this.current = { ...DEFAULT_SETTINGS };
      this.listeners = /* @__PURE__ */ new Set();
      this.pendingDelta = {};
      this.saveTimeout = null;
      this.saveResolvers = [];
      this.initStorageListener();
    }
    async load() {
      return new Promise((resolve) => {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync) {
          const readArea = (area, defaults) => new Promise((res) => {
            try {
              chrome.storage[area].get(defaults, (items) => res(chrome.runtime.lastError ? {} : items || {}));
            } catch (e) {
              res({});
            }
          });
          Promise.all([readArea("sync", DEFAULT_SETTINGS), readArea("local", {})]).then(([sync, local]) => {
            this.current = this.sanitizeAll({ ...DEFAULT_SETTINGS, ...sync, ...local });
            resolve(this.current);
          });
        } else {
          try {
            const local = localStorage.getItem("lumaborder_settings");
            if (local) {
              this.current = this.sanitizeAll({ ...DEFAULT_SETTINGS, ...JSON.parse(local) });
            }
          } catch (e) {
          }
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
          const done = () => resolvers.forEach((r) => r(this.current));
          try {
            if (typeof chrome !== "undefined" && chrome.storage?.sync) {
              if (!chrome.runtime?.id) return done();
              chrome.storage.sync.set(deltaToSave, () => {
                if (chrome.runtime.lastError) {
                  chrome.storage.local.set(deltaToSave, done);
                } else {
                  chrome.storage.local.remove(Object.keys(deltaToSave), done);
                }
              });
            } else {
              try {
                localStorage.setItem("lumaborder_settings", JSON.stringify(this.current));
              } catch (e) {
              }
              done();
            }
          } catch (err) {
            console.warn("[LumaBorder] Ayarlar kaydedilemedi:", err);
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
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.onChanged) {
        chrome.storage.onChanged.addListener((changes, areaName) => {
          if (areaName === "sync" || areaName === "local") {
            let updated = false;
            for (const key of Object.keys(changes)) {
              if (!(key in DEFAULT_SETTINGS)) continue;
              if (changes[key].newValue === void 0 && areaName === "local") continue;
              const rawVal = changes[key].newValue;
              const cleanVal = sanitizeSettingValue(key, rawVal !== void 0 ? rawVal : DEFAULT_SETTINGS[key]);
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
          console.error("Settings notify error:", err);
        }
      }
    }
  };
  var settingsManager = new SettingsManager();

  // src/ambient-engine.js
  var AmbientEngine = class {
    constructor(videoElem, playerElem, settings) {
      this.video = videoElem;
      this.player = playerElem;
      this.settings = settings;
      this.container = null;
      this.canvasDiffuse = null;
      this.canvasTight = null;
      this.canvas = null;
      this.ctx = null;
      this.ctxTight = null;
      this.analysisCanvas = null;
      this.analysisCtx = null;
      this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
      this.lastAnalysisTime = 0;
      this.isRunning = false;
      this.animationFrameId = null;
      this.videoCallbackId = null;
      this.lastRenderTime = 0;
      this.destroyed = false;
      this.workerBlobUrl = null;
      this.worker = null;
      this.isWorkerReady = false;
      this.isAnalyzingInWorker = false;
      this.battery = null;
      this.batteryUpdateHandler = null;
      this.isBatteryEcoActive = false;
      this.batteryInfo = { supported: false, charging: true, level: 100, isLowBattery: false, ecoActive: false };
      this.batteryCallbacks = /* @__PURE__ */ new Set();
      this.isShorts = location.pathname.startsWith("/shorts") || Boolean(this.player.closest("ytd-shorts, ytd-reel-video-renderer, #shorts-player"));
      this.canvasWidth = this.isShorts ? 108 : 192;
      this.canvasHeight = this.isShorts ? 192 : 108;
      this.initDOM();
      this.initWorker();
      this.initBattery();
      this.applySettings(this.settings);
      this.bindEvents();
    }
    initDOM() {
      document.querySelectorAll(".lumaborder-ambient-container").forEach((el) => el.remove());
      this.container = document.createElement("div");
      this.container.className = "lumaborder-ambient-container";
      this.container.setAttribute("aria-hidden", "true");
      this.canvasDiffuse = document.createElement("canvas");
      this.canvasDiffuse.className = "lumaborder-canvas lumaborder-canvas-diffuse";
      this.canvasDiffuse.width = this.canvasWidth;
      this.canvasDiffuse.height = this.canvasHeight;
      this.canvas = this.canvasDiffuse;
      this.canvasTight = document.createElement("canvas");
      this.canvasTight.className = "lumaborder-canvas lumaborder-canvas-tight";
      this.canvasTight.width = this.canvasWidth;
      this.canvasTight.height = this.canvasHeight;
      this.container.appendChild(this.canvasDiffuse);
      this.container.appendChild(this.canvasTight);
      if (this.player.firstChild) {
        this.player.insertBefore(this.container, this.player.firstChild);
      } else {
        this.player.appendChild(this.container);
      }
      this.ctx = this.canvasDiffuse.getContext("2d", {
        alpha: false,
        desynchronized: true,
        willReadFrequently: false
      });
      this.ctxTight = this.canvasTight.getContext("2d", {
        alpha: false,
        desynchronized: true,
        willReadFrequently: false
      });
      const aW = this.isShorts ? 18 : 32;
      const aH = this.isShorts ? 32 : 18;
      if (typeof OffscreenCanvas !== "undefined") {
        try {
          this.analysisCanvas = new OffscreenCanvas(aW, aH);
          this.analysisCtx = this.analysisCanvas.getContext("2d", { willReadFrequently: true });
        } catch (e) {
          this.analysisCanvas = null;
        }
      }
      if (!this.analysisCanvas) {
        this.analysisCanvas = document.createElement("canvas");
        this.analysisCanvas.width = aW;
        this.analysisCanvas.height = aH;
        this.analysisCtx = this.analysisCanvas.getContext("2d", {
          willReadFrequently: true
        });
      }
    }
    async initWorker() {
      if (!this.settings.workerRender || typeof Worker === "undefined") return;
      try {
        if (typeof chrome === "undefined" || !chrome.runtime?.getURL) return;
        const res = await fetch(chrome.runtime.getURL("src/render-worker.js"));
        const code = await res.text();
        if (this.destroyed) return;
        this.workerBlobUrl = URL.createObjectURL(new Blob([code], { type: "text/javascript" }));
        this.worker = new Worker(this.workerBlobUrl);
        this.worker.onmessage = (e) => {
          const { type, crop } = e.data || {};
          if (type === "READY") {
            this.isWorkerReady = true;
          } else if (type === "ANALYSIS_RESULT") {
            if (crop) {
              this.letterboxCrop = crop;
            }
            this.isAnalyzingInWorker = false;
          }
        };
        this.worker.onerror = (e) => {
          this.warnOnce("worker", e && e.message);
          this.disposeWorker();
        };
        this.worker.postMessage({ type: "INIT", data: {} });
      } catch (e) {
        this.warnOnce("worker-init", e);
        this.disposeWorker();
      }
    }
    disposeWorker() {
      if (this.worker) {
        try {
          this.worker.terminate();
        } catch (e) {
        }
      }
      if (this.workerBlobUrl) {
        try {
          URL.revokeObjectURL(this.workerBlobUrl);
        } catch (e) {
        }
      }
      this.worker = null;
      this.workerBlobUrl = null;
      this.isWorkerReady = false;
      this.isAnalyzingInWorker = false;
    }
    initBattery() {
      if (typeof navigator !== "undefined" && "getBattery" in navigator) {
        navigator.getBattery().then((battery) => {
          if (this.destroyed) return;
          this.battery = battery;
          const updateBatteryStatus = () => {
            const charging = battery.charging;
            const level = Math.round(battery.level * 100);
            const isLow = !charging && battery.level <= 0.2;
            this.isBatteryEcoActive = isLow;
            this.batteryInfo = {
              supported: true,
              charging,
              level,
              isLowBattery: isLow,
              ecoActive: Boolean(this.settings.autoBatteryEco && isLow)
            };
            this.notifyBatteryListeners();
          };
          this.batteryUpdateHandler = updateBatteryStatus;
          battery.addEventListener("chargingchange", updateBatteryStatus);
          battery.addEventListener("levelchange", updateBatteryStatus);
          updateBatteryStatus();
        }).catch(() => {
          this.batteryInfo.supported = false;
        });
      }
    }
    onBatteryChange(cb) {
      this.batteryCallbacks.add(cb);
      if (this.batteryInfo.supported) {
        cb(this.batteryInfo);
      }
      return () => this.batteryCallbacks.delete(cb);
    }
    notifyBatteryListeners() {
      for (const cb of this.batteryCallbacks) {
        try {
          cb(this.batteryInfo);
        } catch (e) {
        }
      }
    }
    unbindVideoEvents() {
      if (this.video) {
        if (this.onPlay) this.video.removeEventListener("play", this.onPlay);
        if (this.onPause) this.video.removeEventListener("pause", this.onPause);
        if (this.onEnded) this.video.removeEventListener("ended", this.onEnded);
        if (this.onLoadedMetadata) this.video.removeEventListener("loadedmetadata", this.onLoadedMetadata);
        if (this.onEmptied) this.video.removeEventListener("emptied", this.onEmptied);
      }
      if (this.onVisibilityChange) {
        document.removeEventListener("visibilitychange", this.onVisibilityChange);
        this.onVisibilityChange = null;
      }
    }
    warnOnce(tag, err) {
      this._warned = this._warned || {};
      if (this._warned[tag]) return;
      this._warned[tag] = true;
      console.warn(`[LumaBorder] ${tag} hatas\u0131:`, err);
    }
    bindEvents() {
      this.unbindVideoEvents();
      this.onPlay = () => this.start();
      this.onPause = () => {
        if (this.settings.biasLightingMode === "pause") {
          this.drawBiasLighting();
        }
        this.stop();
      };
      this.onEnded = () => this.stop();
      this.onLoadedMetadata = () => {
        this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
        if (!this.video.paused && !this.video.ended && this.video.readyState >= 2) {
          this.start();
        }
      };
      this.onEmptied = () => {
        this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
      };
      this.onVisibilityChange = () => {
        if (document.hidden) {
          this.stop();
        } else if (!this.video.paused && !this.video.ended) {
          this.start();
        }
      };
      this.video.addEventListener("play", this.onPlay);
      this.video.addEventListener("pause", this.onPause);
      this.video.addEventListener("ended", this.onEnded);
      this.video.addEventListener("loadedmetadata", this.onLoadedMetadata);
      this.video.addEventListener("emptied", this.onEmptied);
      document.addEventListener("visibilitychange", this.onVisibilityChange);
      if (!this.video.paused && !this.video.ended && this.video.readyState >= 2) {
        this.start();
      } else if (this.settings.biasLightingMode === "pause" || this.settings.biasLightingMode === "always") {
        this.drawBiasLighting();
      }
    }
    applySettings(newSettings) {
      this.settings = { ...this.settings, ...newSettings };
      if (!this.container) return;
      if (!this.settings.enabled) {
        this.container.style.display = "none";
        this.stop();
        return;
      }
      this.container.style.display = "block";
      if (this.canvasTight) {
        this.canvasTight.style.display = this.settings.dualLayerGlow ? "block" : "none";
      }
      const brightness = (this.settings.brightness / 100).toFixed(2);
      const contrast = (this.settings.contrast / 100).toFixed(2);
      const saturate = (this.settings.saturation / 100).toFixed(2);
      const blur = Math.max(10, this.settings.blur);
      let scaleX, scaleY, tightScaleX, tightScaleY;
      if (this.isShorts) {
        const spreadRatio = this.settings.spread / 100;
        scaleX = (1.3 + spreadRatio * 0.4).toFixed(2);
        scaleY = (1.02 + spreadRatio * 0.05).toFixed(2);
        tightScaleX = (1.1 + spreadRatio * 0.15).toFixed(2);
        tightScaleY = (1.01 + spreadRatio * 0.02).toFixed(2);
      } else {
        const spreadMultiplier = 1 + this.settings.spread / 100;
        scaleX = spreadMultiplier.toFixed(2);
        scaleY = spreadMultiplier.toFixed(2);
        const tightScale = Math.min(1.15, 1 + this.settings.spread / 400).toFixed(2);
        tightScaleX = tightScale;
        tightScaleY = tightScale;
      }
      const tightBlur = Math.max(8, Math.round(blur * 0.35));
      const smoothingSec = this.settings.smoothing / 100 * 0.25;
      this.container.style.setProperty("--lumaborder-blur", `${blur}px`);
      this.container.style.setProperty("--lumaborder-scale", scaleX);
      this.container.style.setProperty("--lumaborder-scale-x", scaleX);
      this.container.style.setProperty("--lumaborder-scale-y", scaleY);
      this.container.style.setProperty("--lumaborder-tight-scale", tightScaleX);
      this.container.style.setProperty("--lumaborder-tight-scale-x", tightScaleX);
      this.container.style.setProperty("--lumaborder-tight-scale-y", tightScaleY);
      this.container.style.setProperty("--lumaborder-tight-blur", `${tightBlur}px`);
      this.container.style.setProperty("--lumaborder-brightness", brightness);
      this.container.style.setProperty("--lumaborder-contrast", contrast);
      this.container.style.setProperty("--lumaborder-saturate", saturate);
      this.container.style.setProperty("--lumaborder-transition", `${smoothingSec.toFixed(2)}s`);
      if (this.settings.bottomFade) {
        const strength = Number(this.settings.bottomFadeStrength || 60);
        const bottomAlpha = Math.max(0, 1 - strength / 100).toFixed(2);
        const maskGradient = `linear-gradient(to bottom, #000 0%, #000 68%, rgba(0,0,0,${bottomAlpha}) 100%)`;
        this.container.style.setProperty("--lumaborder-bottom-mask", maskGradient);
      } else {
        this.container.style.setProperty("--lumaborder-bottom-mask", "none");
      }
      if (this.settings.biasLightingMode === "always") {
        this.drawBiasLighting();
        return;
      } else if (this.settings.biasLightingMode === "pause" && this.video.paused) {
        this.drawBiasLighting();
        return;
      }
      if (this.settings.enabled && !this.isRunning && !this.video.paused) {
        this.start();
      }
    }
    drawBiasLighting() {
      if (!this.ctx || !this.settings.enabled) return;
      const color = this.settings.biasLightingColor || "#ffe4b5";
      const fillTarget = (ctx) => {
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.restore();
      };
      fillTarget(this.ctx);
      if (this.settings.dualLayerGlow && this.ctxTight) {
        fillTarget(this.ctxTight);
      }
    }
    start() {
      if (this.destroyed || this.isRunning || !this.settings.enabled) return;
      if (this.settings.biasLightingMode === "always") {
        this.drawBiasLighting();
        return;
      }
      this.isRunning = true;
      this.renderLoop();
    }
    stop() {
      this.isRunning = false;
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      if (this.videoCallbackId && "cancelVideoFrameCallback" in this.video) {
        this.video.cancelVideoFrameCallback(this.videoCallbackId);
        this.videoCallbackId = null;
      }
    }
    renderLoop() {
      if (this.destroyed || !this.isRunning || !this.settings.enabled) return;
      if (this.settings.biasLightingMode === "always") {
        this.drawBiasLighting();
        this.stop();
        return;
      }
      const scheduleNext = () => {
        if (!this.isRunning || !this.settings.enabled) return;
        if ("requestVideoFrameCallback" in this.video) {
          this.videoCallbackId = this.video.requestVideoFrameCallback(() => {
            this.renderLoop();
          });
        } else {
          this.animationFrameId = requestAnimationFrame(() => {
            this.renderLoop();
          });
        }
      };
      const effectiveFps = this.isBatteryEcoActive && this.settings.autoBatteryEco ? 30 : this.settings.targetFps;
      if (effectiveFps && effectiveFps !== "sync") {
        const fpsVal = Number(effectiveFps) || 60;
        const intervalMs = 1e3 / fpsVal;
        const now = performance.now();
        if (now - this.lastRenderTime < intervalMs - 2) {
          scheduleNext();
          return;
        }
        this.lastRenderTime = now;
      }
      try {
        this.drawFrame();
      } catch (err) {
      }
      scheduleNext();
    }
    detectLetterbox() {
      const checkLetterbox = Boolean(this.settings.letterboxDetection);
      const checkPillarbox = Boolean(this.settings.pillarboxDetection);
      if (!checkLetterbox && !checkPillarbox || !this.analysisCtx) {
        this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
        return;
      }
      if (!this.video || this.video.videoWidth <= 0 || this.video.videoHeight <= 0) {
        return;
      }
      const now = performance.now();
      const checkInterval = this.isBatteryEcoActive && this.settings.autoBatteryEco ? 4e3 : this.settings.ecoMode ? 2e3 : 1200;
      if (now - this.lastAnalysisTime < checkInterval) return;
      this.lastAnalysisTime = now;
      if (this.settings.workerRender && this.worker && this.isWorkerReady && !this.isAnalyzingInWorker && typeof createImageBitmap === "function") {
        this.isAnalyzingInWorker = true;
        const resizeW = this.isShorts ? 18 : 32;
        const resizeH = this.isShorts ? 32 : 18;
        try {
          createImageBitmap(this.video, { resizeWidth: resizeW, resizeHeight: resizeH, resizeQuality: "low" }).then((bitmap) => {
            if (!this.worker || !this.isWorkerReady) {
              if (bitmap && typeof bitmap.close === "function") bitmap.close();
              this.isAnalyzingInWorker = false;
              return;
            }
            this.worker.postMessage({
              type: "ANALYZE_PIXELS",
              data: {
                bitmap,
                checkLetterbox,
                checkPillarbox,
                isShorts: this.isShorts
              }
            }, [bitmap]);
          }).catch(() => {
            this.isAnalyzingInWorker = false;
            this.detectLetterboxMainThread(checkLetterbox, checkPillarbox);
          });
        } catch (bitmapSyncErr) {
          this.isAnalyzingInWorker = false;
          this.detectLetterboxMainThread(checkLetterbox, checkPillarbox);
        }
        return;
      }
      this.detectLetterboxMainThread(checkLetterbox, checkPillarbox);
    }
    detectLetterboxMainThread(checkLetterbox, checkPillarbox) {
      if (!this.analysisCtx || !this.video || this.video.videoWidth <= 0 || this.video.videoHeight <= 0) return;
      try {
        const w = this.analysisCanvas.width;
        const h = this.analysisCanvas.height;
        this.analysisCtx.drawImage(this.video, 0, 0, w, h);
        const imgData = this.analysisCtx.getImageData(0, 0, w, h).data;
        const threshold = 18;
        const centerX = Math.floor(w / 2);
        const centerY = Math.floor(h / 2);
        let centerLumSum = 0;
        let sampleCount = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const idx = ((centerY + dy) * w + (centerX + dx)) * 4;
            centerLumSum += 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
            sampleCount++;
          }
        }
        const avgCenterLum = centerLumSum / sampleCount;
        if (avgCenterLum <= threshold) {
          this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
          return;
        }
        let cropTop = 0;
        let cropBottom = 0;
        let cropLeft = 0;
        let cropRight = 0;
        if (checkLetterbox) {
          for (let y = 0; y < Math.floor(h / 3); y++) {
            let isBlackRow = true;
            for (let x = 4; x < w - 4; x += 2) {
              const idx = (y * w + x) * 4;
              const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
              if (lum > threshold) {
                isBlackRow = false;
                break;
              }
            }
            if (isBlackRow) cropTop = (y + 1) / h;
            else break;
          }
          for (let y = h - 1; y >= Math.floor(h * 0.66); y--) {
            let isBlackRow = true;
            for (let x = 4; x < w - 4; x += 2) {
              const idx = (y * w + x) * 4;
              const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
              if (lum > threshold) {
                isBlackRow = false;
                break;
              }
            }
            if (isBlackRow) cropBottom = (h - y) / h;
            else break;
          }
        }
        if (checkPillarbox && !this.isShorts) {
          for (let x = 0; x < Math.floor(w / 3); x++) {
            let isBlackCol = true;
            for (let y = 2; y < h - 2; y += 2) {
              const idx = (y * w + x) * 4;
              const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
              if (lum > threshold) {
                isBlackCol = false;
                break;
              }
            }
            if (isBlackCol) cropLeft = (x + 1) / w;
            else break;
          }
          for (let x = w - 1; x >= Math.floor(w * 0.66); x--) {
            let isBlackCol = true;
            for (let y = 2; y < h - 2; y += 2) {
              const idx = (y * w + x) * 4;
              const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
              if (lum > threshold) {
                isBlackCol = false;
                break;
              }
            }
            if (isBlackCol) cropRight = (w - x) / w;
            else break;
          }
        }
        this.letterboxCrop = {
          top: cropTop,
          bottom: cropBottom,
          left: cropLeft,
          right: cropRight
        };
      } catch (e) {
        this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
      }
    }
    drawFrame() {
      if (!this.ctx || !this.video || this.video.readyState < 2) return;
      this.detectLetterbox();
      const vw = this.video.videoWidth || this.canvasWidth;
      const vh = this.video.videoHeight || this.canvasHeight;
      const cropL = Math.max(0, Math.min(0.4, this.letterboxCrop.left));
      const cropR = Math.max(0, Math.min(0.4, this.letterboxCrop.right));
      const cropT = Math.max(0, Math.min(0.4, this.letterboxCrop.top));
      const cropB = Math.max(0, Math.min(0.4, this.letterboxCrop.bottom));
      const sx = Math.max(0, Math.floor(vw * cropL));
      const sy = Math.max(0, Math.floor(vh * cropT));
      const sw = Math.min(vw - sx, Math.max(10, Math.floor(vw * (1 - cropL - cropR))));
      const sh = Math.min(vh - sy, Math.max(10, Math.floor(vh * (1 - cropT - cropB))));
      try {
        this.ctx.drawImage(
          this.video,
          sx,
          sy,
          sw,
          sh,
          0,
          0,
          this.canvasWidth,
          this.canvasHeight
        );
        if (this.settings.dualLayerGlow && this.ctxTight) {
          this.ctxTight.drawImage(
            this.video,
            sx,
            sy,
            sw,
            sh,
            0,
            0,
            this.canvasWidth,
            this.canvasHeight
          );
        }
      } catch (err) {
        this.warnOnce("drawFrame", err);
      }
    }
    updateTarget(videoElem, playerElem) {
      if (this.video === videoElem && this.player === playerElem && this.container?.isConnected) {
        return;
      }
      this.stop();
      this.unbindVideoEvents();
      this.video = videoElem;
      this.player = playerElem;
      this.isShorts = location.pathname.startsWith("/shorts") || Boolean(this.player.closest("ytd-shorts, ytd-reel-video-renderer, #shorts-player"));
      this.canvasWidth = this.isShorts ? 108 : 192;
      this.canvasHeight = this.isShorts ? 192 : 108;
      if (this.canvasDiffuse) {
        this.canvasDiffuse.width = this.canvasWidth;
        this.canvasDiffuse.height = this.canvasHeight;
      }
      if (this.canvasTight) {
        this.canvasTight.width = this.canvasWidth;
        this.canvasTight.height = this.canvasHeight;
      }
      const aW = this.isShorts ? 18 : 32;
      const aH = this.isShorts ? 32 : 18;
      if (this.analysisCanvas) {
        this.analysisCanvas.width = aW;
        this.analysisCanvas.height = aH;
      }
      if (this.container && this.player) {
        if (this.player.firstChild) {
          this.player.insertBefore(this.container, this.player.firstChild);
        } else {
          this.player.appendChild(this.container);
        }
      }
      document.querySelectorAll(".lumaborder-ambient-container").forEach((el) => {
        if (el !== this.container) el.remove();
      });
      this.applySettings(this.settings);
      this.bindEvents();
      if (!this.video.paused && !this.video.ended && this.video.readyState >= 2) {
        this.start();
      }
    }
    destroy() {
      this.destroyed = true;
      this.stop();
      this.unbindVideoEvents();
      this.disposeWorker();
      if (this.battery && this.batteryUpdateHandler) {
        try {
          this.battery.removeEventListener("chargingchange", this.batteryUpdateHandler);
          this.battery.removeEventListener("levelchange", this.batteryUpdateHandler);
        } catch (e) {
        }
        this.battery = null;
        this.batteryUpdateHandler = null;
      }
      this.batteryCallbacks.clear();
      if (this.container) {
        this.container.remove();
        this.container = null;
      }
    }
  };

  // src/player-ui.js
  var PlayerUI = class {
    constructor(playerElem, settingsManager2, ambientEngine) {
      this.player = playerElem;
      this.settingsManager = settingsManager2;
      this.ambientEngine = ambientEngine;
      this.button = null;
      this.menuOverlay = null;
      this.isOpen = false;
      this.activeTab = "general";
      this.observer = null;
      this.mountRetryTimeout = null;
      this.onPlayerHover = null;
      this.onDocumentClick = null;
      this.onDocumentKeyDown = null;
      if (this.ambientEngine?.onBatteryChange) {
        this.batteryUnsub = this.ambientEngine.onBatteryChange((info) => {
          if (this.isOpen && this.activeTab === "performance") {
            this.updateBatteryCard(info);
          }
        });
      }
      this.initButton();
    }
    initButton() {
      this.mountButton();
      this.setupObserver();
      this.setupEventListeners();
    }
    /**
     * YouTube A/B testleri, Shorts ve yeni UI düzenlerine karşı çok katmanlı DOM hedef çözücü
     */
    resolveControlsTarget() {
      const isShorts = location.pathname.startsWith("/shorts") || Boolean(this.player?.closest?.("ytd-shorts, ytd-reel-video-renderer, #shorts-player"));
      if (isShorts) {
        let activeReel = this.player?.closest?.("ytd-reel-video-renderer") || document.querySelector("ytd-reel-video-renderer[is-active]");
        if (!activeReel) {
          const videos = Array.from(document.querySelectorAll("ytd-reel-video-renderer video"));
          const playingVideo = videos.find((v) => !v.paused && v.readyState >= 2) || videos.find((v) => !v.paused);
          if (playingVideo) {
            activeReel = playingVideo.closest("ytd-reel-video-renderer");
          }
        }
        if (!activeReel) {
          const reels = Array.from(document.querySelectorAll("ytd-reel-video-renderer"));
          if (reels.length > 0) {
            const centerY = window.innerHeight / 2;
            let minDistance = Infinity;
            for (const r of reels) {
              const rect = r.getBoundingClientRect();
              const dist = Math.abs(rect.top + rect.height / 2 - centerY);
              if (dist < minDistance) {
                minDistance = dist;
                activeReel = r;
              }
            }
          }
        }
        const shortsSelectors = [
          "#actions",
          "ytd-reel-player-overlay-renderer #actions",
          "#actions.ytd-reel-player-overlay-renderer",
          ".ytd-reel-player-overlay-renderer #actions",
          "#overlay #actions",
          ".ytd-reel-player-overlay-renderer"
        ];
        let target = null;
        if (activeReel) {
          for (const sel of shortsSelectors) {
            try {
              target = activeReel.querySelector(sel);
              if (target) break;
            } catch (e) {
            }
          }
        }
        if (!target) {
          for (const sel of shortsSelectors) {
            try {
              target = document.querySelector(sel);
              if (target) break;
            } catch (e) {
            }
          }
        }
        if (target) {
          return { container: target, type: "shorts", anchor: null, isFallback: false };
        }
        const shortsContainer = activeReel?.querySelector?.("#player-container") || this.player || document.body;
        return { container: shortsContainer, type: "shorts-floating", anchor: null, isFallback: true };
      }
      const rightControlsSelectors = [
        ".ytp-right-controls",
        ".ytp-chrome-bottom .ytp-right-controls",
        ".ytp-chrome-controls .ytp-right-controls",
        ".ytp-controls-right",
        "#movie_player .ytp-right-controls",
        ".html5-video-player .ytp-right-controls"
      ];
      let rightControls = null;
      for (const sel of rightControlsSelectors) {
        try {
          rightControls = this.player?.querySelector?.(sel) || document.querySelector(sel);
          if (rightControls) break;
        } catch (e) {
        }
      }
      if (rightControls) {
        const anchorSelectors = [
          ".ytp-settings-button",
          ".ytp-subtitles-button",
          ".ytp-miniplayer-button",
          ".ytp-size-button",
          ".ytp-fullscreen-button",
          ".ytp-remote-button"
        ];
        let anchor = null;
        for (const sel of anchorSelectors) {
          try {
            anchor = rightControls.querySelector(sel);
            if (anchor) break;
          } catch (e) {
          }
        }
        return { container: rightControls, type: "standard", anchor, isFallback: false };
      }
      const bottomControls = this.player?.querySelector?.(".ytp-chrome-bottom") || this.player?.querySelector?.(".ytp-chrome-controls") || document.querySelector(".ytp-chrome-bottom");
      if (bottomControls) {
        return { container: bottomControls, type: "standard-alt", anchor: null, isFallback: false };
      }
      const leftControls = this.player?.querySelector?.(".ytp-left-controls") || document.querySelector(".ytp-left-controls");
      if (leftControls) {
        return { container: leftControls, type: "standard-left", anchor: null, isFallback: false };
      }
      const topControls = this.player?.querySelector?.(".ytp-chrome-top-buttons") || this.player?.querySelector?.(".ytp-chrome-top");
      if (topControls) {
        return { container: topControls, type: "standard-top", anchor: null, isFallback: false };
      }
      return { container: this.player || document.querySelector("#movie_player") || document.body, type: "floating", anchor: null, isFallback: true };
    }
    mountButton() {
      try {
        const target = this.resolveControlsTarget();
        if (!target || !target.container) {
          this.scheduleMountRetry();
          return;
        }
        if (this.button && this.button.isConnected && this.button.parentElement === target.container) {
          return;
        }
        const existing = document.querySelectorAll(".lumaborder-player-btn, .lumaborder-shorts-btn, .lumaborder-floating-btn");
        existing.forEach((b) => {
          if (b !== this.button) b.remove();
        });
        if (!this.button) {
          this.button = document.createElement("button");
          this.button.setAttribute("aria-haspopup", "true");
          this.button.setAttribute("aria-label", i18n.t("appName"));
          this.button.innerHTML = `
          <svg viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 19c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h-4v1zm2-17c2.76 0 5 2.24 5 5 0 1.95-1.12 3.63-2.76 4.46L14 11.6V16h-4v-4.4l-.24-.14C8.12 10.63 7 8.95 7 7c0-2.76 2.24-5 5-5z"/>
          </svg>
        `;
          this.button.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.toggleMenu();
          });
        }
        if (target.type === "shorts") {
          this.button.className = "lumaborder-shorts-btn";
          this.button.title = `${i18n.t("appName")} - Shorts Ambient`;
        } else if (target.isFallback || target.type === "floating" || target.type === "shorts-floating") {
          this.button.className = "lumaborder-floating-btn";
          this.button.title = `${i18n.t("appName")} - ${i18n.t("appTagline")}`;
        } else {
          this.button.className = "ytp-button lumaborder-player-btn";
          this.button.title = `${i18n.t("appName")} - ${i18n.t("appTagline")}`;
        }
        if (target.anchor && target.anchor.parentNode === target.container) {
          target.container.insertBefore(this.button, target.anchor);
        } else {
          target.container.appendChild(this.button);
        }
        this.updateButtonState();
      } catch (err) {
        console.warn("[LumaBorder] Buton yerle\u015Ftirme hatas\u0131:", err);
      }
    }
    scheduleMountRetry(delay = 200) {
      if (this.mountRetryTimeout) clearTimeout(this.mountRetryTimeout);
      this.mountRetryTimeout = setTimeout(() => {
        this.mountButton();
      }, delay);
    }
    setupObserver() {
      try {
        this.observer = new MutationObserver(() => {
          if (!this.button || !this.button.isConnected) {
            this.mountButton();
          }
        });
        const observeTarget = this.player || document.body;
        this.observer.observe(observeTarget, {
          childList: true,
          subtree: true
        });
      } catch (err) {
        console.warn("[LumaBorder] DOM Observer hatas\u0131:", err);
      }
    }
    setupEventListeners() {
      let hoverRaf = null;
      this.onPlayerHover = () => {
        if (this.button && this.button.isConnected) return;
        if (hoverRaf) return;
        hoverRaf = requestAnimationFrame(() => {
          hoverRaf = null;
          if (!this.button || !this.button.isConnected) {
            this.mountButton();
          }
        });
      };
      if (this.player) {
        this.player.addEventListener("mouseenter", this.onPlayerHover, { passive: true });
        this.player.addEventListener("mousemove", this.onPlayerHover, { passive: true });
      }
      this.onDocumentClick = (e) => {
        if (this.isOpen && this.menuOverlay && !this.menuOverlay.contains(e.target) && this.button && !this.button.contains(e.target)) {
          this.closeMenu();
        }
      };
      document.addEventListener("click", this.onDocumentClick);
      this.onDocumentKeyDown = (e) => {
        if (e.key === "Escape" && this.isOpen) {
          this.closeMenu();
        }
      };
      document.addEventListener("keydown", this.onDocumentKeyDown);
    }
    updateButtonState() {
      if (!this.button) return;
      const isEnabled = this.settingsManager.current.enabled;
      this.button.classList.toggle("active", isEnabled);
    }
    toggleMenu() {
      if (this.isOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    }
    openMenu() {
      if (this.isOpen) return;
      this.renderMenu();
      this.isOpen = true;
    }
    closeMenu() {
      if (!this.isOpen) return;
      if (this.tabAbortController) {
        this.tabAbortController.abort();
        this.tabAbortController = null;
      }
      if (this.menuOverlay) {
        this.menuOverlay.remove();
        this.menuOverlay = null;
      }
      this.isOpen = false;
    }
    renderMenu() {
      if (this.menuOverlay) this.menuOverlay.remove();
      const s = this.settingsManager.current;
      i18n.setLanguage(s.language || "tr");
      this.menuOverlay = document.createElement("div");
      this.menuOverlay.className = "lumaborder-menu-overlay";
      const header = document.createElement("div");
      header.className = "lumaborder-menu-header";
      header.innerHTML = `
      <div class="lumaborder-menu-title">
        <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/></svg>
        <span>${i18n.t("appName")}</span>
      </div>
      <div class="lumaborder-header-actions">
        <button class="lumaborder-lang-btn" id="lumaborder-lang-toggle">
          ${s.language === "en" ? "TR \u{1F1F9}\u{1F1F7}" : "EN \u{1F1EC}\u{1F1E7}"}
        </button>
        <button class="lumaborder-close-btn" id="lumaborder-close-menu">&times;</button>
      </div>
    `;
      const tabs = document.createElement("div");
      tabs.className = "lumaborder-tabs";
      tabs.innerHTML = `
      <button class="lumaborder-tab ${this.activeTab === "general" ? "active" : ""}" data-tab="general">${i18n.t("tabGeneral")}</button>
      <button class="lumaborder-tab ${this.activeTab === "effects" ? "active" : ""}" data-tab="effects">${i18n.t("tabEffects")}</button>
      <button class="lumaborder-tab ${this.activeTab === "presets" ? "active" : ""}" data-tab="presets">${i18n.t("tabPresets")}</button>
      <button class="lumaborder-tab ${this.activeTab === "performance" ? "active" : ""}" data-tab="performance">${i18n.t("tabPerformance")}</button>
    `;
      const content = document.createElement("div");
      content.className = "lumaborder-tab-content";
      content.innerHTML = this.getTabContentHTML(this.activeTab);
      const footer = document.createElement("div");
      footer.className = "lumaborder-menu-footer";
      footer.innerHTML = `
      <button class="lumaborder-reset-btn" id="lumaborder-reset-all">${i18n.t("resetDefaults")}</button>
      <span class="lumaborder-badge">v2.2 \u2022 LumaBorder Pro</span>
    `;
      this.menuOverlay.appendChild(header);
      this.menuOverlay.appendChild(tabs);
      this.menuOverlay.appendChild(content);
      this.menuOverlay.appendChild(footer);
      this.menuOverlay.addEventListener("click", (e) => e.stopPropagation());
      this.menuOverlay.addEventListener("mousedown", (e) => e.stopPropagation());
      this.menuOverlay.addEventListener("keydown", (e) => e.stopPropagation());
      this.menuOverlay.addEventListener("keyup", (e) => e.stopPropagation());
      const isShorts = location.pathname.startsWith("/shorts") || Boolean(this.player?.closest?.("ytd-shorts, ytd-reel-video-renderer, #shorts-player"));
      const fullscreenElem = document.fullscreenElement;
      if (fullscreenElem) {
        fullscreenElem.appendChild(this.menuOverlay);
      } else if (isShorts) {
        this.menuOverlay.classList.add("lumaborder-shorts-menu");
        document.body.appendChild(this.menuOverlay);
      } else {
        const targetContainer = this.player || document.querySelector("#movie_player") || document.body;
        targetContainer.appendChild(this.menuOverlay);
      }
      this.bindMenuEvents();
    }
    getTabContentHTML(tab) {
      const s = this.settingsManager.current;
      if (tab === "general") {
        return `
        <!-- Master Switch -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${i18n.t("masterToggle")}</span>
            <span class="lumaborder-master-sub">${i18n.t("masterToggleDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="lumaborder-master-toggle" ${s.enabled ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- \xC7ift Katmanl\u0131 Glow (Dual-Layer) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${i18n.t("dualLayerGlow")}</span>
            <span class="lumaborder-master-sub">${i18n.t("dualLayerDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-duallayer" ${s.dualLayerGlow ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Parlakl\u0131k -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${i18n.t("brightness")}</span>
            <span class="lumaborder-control-value" id="val-brightness">${s.brightness}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-brightness" min="20" max="250" value="${s.brightness}">
        </div>

        <!-- Yay\u0131lma -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${i18n.t("spread")}</span>
            <span class="lumaborder-control-value" id="val-spread">${s.spread}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-spread" min="5" max="100" value="${s.spread}">
        </div>

        <!-- Bulan\u0131kl\u0131k / Yumu\u015Fakl\u0131k -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${i18n.t("blur")}</span>
            <span class="lumaborder-control-value" id="val-blur">${s.blur}px</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-blur" min="10" max="120" value="${s.blur}">
        </div>
      `;
      }
      if (tab === "effects") {
        const isBiasOff = s.biasLightingMode === "off";
        return `
        <!-- Doygunluk -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${i18n.t("saturation")}</span>
            <span class="lumaborder-control-value" id="val-saturation">${s.saturation}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-saturation" min="50" max="220" value="${s.saturation}">
        </div>

        <!-- Kontrast -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${i18n.t("contrast")}</span>
            <span class="lumaborder-control-value" id="val-contrast">${s.contrast}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-contrast" min="60" max="160" value="${s.contrast}">
        </div>

        <!-- Kare Yumu\u015Fatma -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${i18n.t("smoothing")}</span>
            <span class="lumaborder-control-value" id="val-smoothing">${s.smoothing}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-smoothing" min="0" max="100" value="${s.smoothing}">
        </div>

        <!-- Altyaz\u0131 Korumas\u0131 (Alt Karartma) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${i18n.t("bottomFade")}</span>
            <span class="lumaborder-master-sub">${i18n.t("bottomFadeDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-bottomfade" ${s.bottomFade ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <div class="lumaborder-control-row" id="row-bottomfade-strength" style="${s.bottomFade ? "" : "display:none;"}">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${i18n.t("bottomFadeStrength")}</span>
            <span class="lumaborder-control-value" id="val-bottomfade-strength">${s.bottomFadeStrength || 60}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-bottomfade-strength" min="20" max="100" value="${s.bottomFadeStrength || 60}">
        </div>

        <!-- Sabit Arka I\u015F\u0131k (Bias Lighting) -->
        <div class="lumaborder-section-divider"></div>
        <div class="lumaborder-control-header" style="margin-top: 10px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${i18n.t("biasLighting")}</span>
        </div>
        <div class="lumaborder-bias-modes">
          <button class="lumaborder-mode-pill ${s.biasLightingMode === "off" ? "active" : ""}" data-biasmode="off">${i18n.t("biasModeOff")}</button>
          <button class="lumaborder-mode-pill ${s.biasLightingMode === "pause" ? "active" : ""}" data-biasmode="pause">${i18n.t("biasModePause")}</button>
          <button class="lumaborder-mode-pill ${s.biasLightingMode === "always" ? "active" : ""}" data-biasmode="always">${i18n.t("biasModeAlways")}</button>
        </div>

        <div class="lumaborder-color-palette" id="bias-color-palette" style="${isBiasOff ? "display:none;" : ""}">
          <span class="lumaborder-control-label" style="font-size: 11px;">${i18n.t("biasLightingColor")}:</span>
          <div class="lumaborder-color-dots">
            <button class="lumaborder-color-dot ${s.biasLightingColor === "#ffe4b5" ? "active" : ""}" data-color="#ffe4b5" title="${i18n.t("biasColorWarm")}" style="background: #ffe4b5;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === "#fff4e8" ? "active" : ""}" data-color="#fff4e8" title="${i18n.t("biasColorNeutral")}" style="background: #fff4e8;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === "#ffffff" ? "active" : ""}" data-color="#ffffff" title="${i18n.t("biasColorCinema")}" style="background: #ffffff;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === "#00e5ff" ? "active" : ""}" data-color="#00e5ff" title="${i18n.t("biasColorCyber")}" style="background: #00e5ff;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === "#ff5e00" ? "active" : ""}" data-color="#ff5e00" title="${i18n.t("biasColorSunset")}" style="background: #ff5e00;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === "#bd00ff" ? "active" : ""}" data-color="#bd00ff" title="${i18n.t("biasColorPurple")}" style="background: #bd00ff;"></button>
            <input type="color" id="bias-custom-color" class="lumaborder-color-picker" value="${typeof s.biasLightingColor === "string" && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(s.biasLightingColor.trim()) ? s.biasLightingColor.trim() : "#ffe4b5"}" title="${i18n.t("biasColorCustom")}">
          </div>
        </div>
      `;
      }
      if (tab === "presets") {
        return `
        <div class="lumaborder-presets-grid">
          <button class="lumaborder-preset-btn ${s.activePreset === "default" ? "active" : ""}" data-preset="default">
            <span class="lumaborder-preset-icon">\u2696\uFE0F</span>
            <span>${i18n.t("presetDefault")}</span>
          </button>
          <button class="lumaborder-preset-btn ${s.activePreset === "cinema" ? "active" : ""}" data-preset="cinema">
            <span class="lumaborder-preset-icon">\u{1F3AC}</span>
            <span>${i18n.t("presetCinema")}</span>
          </button>
          <button class="lumaborder-preset-btn ${s.activePreset === "vibrant" ? "active" : ""}" data-preset="vibrant">
            <span class="lumaborder-preset-icon">\u26A1</span>
            <span>${i18n.t("presetVibrant")}</span>
          </button>
          <button class="lumaborder-preset-btn ${s.activePreset === "night" ? "active" : ""}" data-preset="night">
            <span class="lumaborder-preset-icon">\u{1F319}</span>
            <span>${i18n.t("presetNight")}</span>
          </button>
          <button class="lumaborder-preset-btn ${s.activePreset === "gaming" ? "active" : ""}" data-preset="gaming">
            <span class="lumaborder-preset-icon">\u{1F3AE}</span>
            <span>${i18n.t("presetGaming")}</span>
          </button>
        </div>
      `;
      }
      if (tab === "performance") {
        const fpsLabel = s.targetFps === "sync" ? i18n.t("fpsSync") : `${s.targetFps} FPS`;
        return `
        <!-- Hedef Kare H\u0131z\u0131 (FPS Limiti) -->
        <div class="lumaborder-control-header" style="margin-top: 4px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${i18n.t("targetFps")}</span>
          <span class="lumaborder-control-value" id="val-target-fps">${fpsLabel}</span>
        </div>
        <div class="lumaborder-fps-modes">
          <button class="lumaborder-mode-pill ${s.targetFps === "sync" ? "active" : ""}" data-fps="sync">${i18n.t("fpsSync")}</button>
          <button class="lumaborder-mode-pill ${String(s.targetFps) === "60" ? "active" : ""}" data-fps="60">${i18n.t("fps60")}</button>
          <button class="lumaborder-mode-pill ${String(s.targetFps) === "30" ? "active" : ""}" data-fps="30">${i18n.t("fps30")}</button>
        </div>
        <div class="lumaborder-hint-text">${i18n.t("targetFpsDesc")}</div>

        <!-- Ak\u0131ll\u0131 Pil Tasarrufu (%20 Alt\u0131 Otomatik 30 FPS) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${i18n.t("autoBatteryEco")}</span>
            <span class="lumaborder-master-sub">${i18n.t("autoBatteryEcoDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-battery-eco" ${s.autoBatteryEco ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Canl\u0131 Pil Durumu Kart\u0131 -->
        <div class="lumaborder-battery-card" id="lumaborder-battery-card">
          <div class="lumaborder-battery-info">
            <span class="lumaborder-battery-icon" id="lumaborder-battery-icon">\u{1F50B}</span>
            <div class="lumaborder-battery-text">
              <span class="lumaborder-battery-title" id="lumaborder-battery-title">${i18n.t("batteryStatusTitle")}</span>
              <span class="lumaborder-battery-sub" id="lumaborder-battery-sub">Kontrol ediliyor...</span>
            </div>
          </div>
          <span class="lumaborder-battery-tag" id="lumaborder-battery-tag">--</span>
        </div>

        <!-- OffscreenCanvas & Worker Render -->
        <div class="lumaborder-master-card" style="margin-top: 12px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${i18n.t("workerRender")}</span>
            <span class="lumaborder-master-sub">${i18n.t("workerRenderDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-worker" ${s.workerRender ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Siyah \u015Eerit Alg\u0131lama: Letterbox (\xDCst/Alt) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${i18n.t("letterboxDetection")}</span>
            <span class="lumaborder-master-sub">${i18n.t("letterboxDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-letterbox" ${s.letterboxDetection ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Siyah \u015Eerit Alg\u0131lama: Pillarbox (Sa\u011F/Sol) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${i18n.t("pillarboxDetection")}</span>
            <span class="lumaborder-master-sub">${i18n.t("pillarboxDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-pillarbox" ${s.pillarboxDetection ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- G\xFC\xE7 Tasarrufu -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${i18n.t("ecoMode")}</span>
            <span class="lumaborder-master-sub">${i18n.t("ecoModeDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-eco" ${s.ecoMode ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>
      `;
      }
      return "";
    }
    bindMenuEvents() {
      if (!this.menuOverlay) return;
      const closeBtn = this.menuOverlay.querySelector("#lumaborder-close-menu");
      if (closeBtn) closeBtn.addEventListener("click", () => this.closeMenu());
      const langBtn = this.menuOverlay.querySelector("#lumaborder-lang-toggle");
      if (langBtn) {
        langBtn.addEventListener("click", async () => {
          const nextLang = this.settingsManager.current.language === "en" ? "tr" : "en";
          await this.settingsManager.save({ language: nextLang });
          i18n.setLanguage(nextLang);
          this.renderMenu();
        });
      }
      const resetBtn = this.menuOverlay.querySelector("#lumaborder-reset-all");
      if (resetBtn) {
        resetBtn.addEventListener("click", async () => {
          if (confirm(i18n.t("resetConfirm"))) {
            await this.settingsManager.reset();
            this.ambientEngine.applySettings(this.settingsManager.current);
            this.updateButtonState();
            this.renderMenu();
          }
        });
      }
      const tabBtns = this.menuOverlay.querySelectorAll(".lumaborder-tab");
      tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          this.activeTab = btn.dataset.tab;
          tabBtns.forEach((b) => b.classList.toggle("active", b === btn));
          const content = this.menuOverlay.querySelector(".lumaborder-tab-content");
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
      if (this.tabAbortController) {
        this.tabAbortController.abort();
      }
      this.tabAbortController = new AbortController();
      const { signal } = this.tabAbortController;
      const masterToggle = this.menuOverlay.querySelector("#lumaborder-master-toggle");
      if (masterToggle) {
        masterToggle.addEventListener("change", async (e) => {
          const enabled = e.target.checked;
          await this.settingsManager.save({ enabled });
          this.ambientEngine.applySettings({ enabled });
          this.updateButtonState();
        }, { signal });
      }
      const bindSlider = (id, key, unit = "%") => {
        const slider = this.menuOverlay.querySelector(`#rng-${id}`);
        const valLabel = this.menuOverlay.querySelector(`#val-${id}`);
        if (slider && valLabel) {
          slider.addEventListener("input", (e) => {
            const val = parseInt(e.target.value, 10);
            valLabel.textContent = `${val}${unit}`;
            this.ambientEngine.applySettings({ [key]: val });
          }, { signal });
          slider.addEventListener("change", async (e) => {
            const val = parseInt(e.target.value, 10);
            await this.settingsManager.save({ [key]: val, activePreset: "custom" });
          }, { signal });
        }
      };
      bindSlider("brightness", "brightness", "%");
      bindSlider("spread", "spread", "%");
      bindSlider("blur", "blur", "px");
      bindSlider("saturation", "saturation", "%");
      bindSlider("contrast", "contrast", "%");
      bindSlider("smoothing", "smoothing", "%");
      bindSlider("bottomfade-strength", "bottomFadeStrength", "%");
      const presetBtns = this.menuOverlay.querySelectorAll(".lumaborder-preset-btn");
      presetBtns.forEach((btn) => {
        btn.addEventListener("click", async () => {
          const presetKey = btn.dataset.preset;
          await this.settingsManager.applyPreset(presetKey);
          this.ambientEngine.applySettings(this.settingsManager.current);
          this.renderMenu();
        }, { signal });
      });
      const bindCheckbox = (id, key, onChangeExtra) => {
        const chk = this.menuOverlay.querySelector(`#chk-${id}`);
        if (chk) {
          chk.addEventListener("change", async (e) => {
            await this.settingsManager.save({ [key]: e.target.checked });
            this.ambientEngine.applySettings({ [key]: e.target.checked });
            if (onChangeExtra) onChangeExtra(e.target.checked);
          }, { signal });
        }
      };
      bindCheckbox("duallayer", "dualLayerGlow");
      bindCheckbox("letterbox", "letterboxDetection");
      bindCheckbox("pillarbox", "pillarboxDetection");
      bindCheckbox("eco", "ecoMode");
      bindCheckbox("battery-eco", "autoBatteryEco", () => {
        this.updateBatteryCard(this.ambientEngine?.batteryInfo);
      });
      bindCheckbox("worker", "workerRender");
      bindCheckbox("bottomfade", "bottomFade", (checked) => {
        const row = this.menuOverlay.querySelector("#row-bottomfade-strength");
        if (row) row.style.display = checked ? "block" : "none";
      });
      const fpsBtns = this.menuOverlay.querySelectorAll(".lumaborder-fps-modes .lumaborder-mode-pill");
      fpsBtns.forEach((btn) => {
        btn.addEventListener("click", async () => {
          const fps = btn.dataset.fps;
          fpsBtns.forEach((b) => b.classList.toggle("active", b === btn));
          const valFps = this.menuOverlay.querySelector("#val-target-fps");
          if (valFps) valFps.textContent = fps === "sync" ? i18n.t("fpsSync") : `${fps} FPS`;
          await this.settingsManager.save({ targetFps: fps, activePreset: "custom" });
          this.ambientEngine.applySettings({ targetFps: fps });
        }, { signal });
      });
      this.updateBatteryCard(this.ambientEngine?.batteryInfo);
      const biasModeBtns = this.menuOverlay.querySelectorAll(".lumaborder-bias-modes .lumaborder-mode-pill");
      biasModeBtns.forEach((btn) => {
        btn.addEventListener("click", async () => {
          const mode = btn.dataset.biasmode;
          biasModeBtns.forEach((b) => b.classList.toggle("active", b === btn));
          await this.settingsManager.save({ biasLightingMode: mode });
          this.ambientEngine.applySettings({ biasLightingMode: mode });
          const palette = this.menuOverlay.querySelector("#bias-color-palette");
          if (palette) palette.style.display = mode === "off" ? "none" : "block";
        }, { signal });
      });
      const colorDots = this.menuOverlay.querySelectorAll(".lumaborder-color-dot");
      colorDots.forEach((dot) => {
        dot.addEventListener("click", async () => {
          const color = dot.dataset.color;
          colorDots.forEach((d) => d.classList.toggle("active", d === dot));
          await this.settingsManager.save({ biasLightingColor: color });
          this.ambientEngine.applySettings({ biasLightingColor: color });
          const picker = this.menuOverlay.querySelector("#bias-custom-color");
          if (picker) picker.value = color;
        }, { signal });
      });
      const customColor = this.menuOverlay.querySelector("#bias-custom-color");
      if (customColor) {
        customColor.addEventListener("input", (e) => {
          this.ambientEngine.applySettings({ biasLightingColor: e.target.value });
        }, { signal });
        customColor.addEventListener("change", async (e) => {
          await this.settingsManager.save({ biasLightingColor: e.target.value });
          colorDots.forEach((d) => d.classList.remove("active"));
        }, { signal });
      }
    }
    updateBatteryCard(info) {
      if (!this.menuOverlay) return;
      const card = this.menuOverlay.querySelector("#lumaborder-battery-card");
      const title = this.menuOverlay.querySelector("#lumaborder-battery-title");
      const sub = this.menuOverlay.querySelector("#lumaborder-battery-sub");
      const tag = this.menuOverlay.querySelector("#lumaborder-battery-tag");
      const icon = this.menuOverlay.querySelector("#lumaborder-battery-icon");
      if (!card || !title || !sub || !tag || !icon) return;
      if (!info || !info.supported) {
        icon.textContent = "\u{1F50C}";
        title.textContent = i18n.t("batteryStatusTitle");
        sub.textContent = i18n.t("batteryNotSupported");
        tag.textContent = "Masa\xFCst\xFC/Harici";
        tag.className = "lumaborder-battery-tag desktop";
        return;
      }
      const isCharging = info.charging;
      const level = info.level;
      const isEco = this.settingsManager.current.autoBatteryEco && !isCharging && level <= 20;
      icon.textContent = isCharging ? "\u26A1" : level <= 20 ? "\u{1FAAB}" : "\u{1F50B}";
      title.textContent = `${i18n.t("batteryStatusTitle")}: %${level} (${isCharging ? i18n.t("batteryCharging") : i18n.t("batteryDischarging")})`;
      if (isEco) {
        sub.textContent = i18n.t("batteryEcoActiveBadge");
        tag.textContent = "30 FPS Eko";
        tag.className = "lumaborder-battery-tag eco";
      } else if (isCharging) {
        sub.textContent = i18n.t("batteryEcoDisabledBadge");
        tag.textContent = `%${level} \u015Earjda`;
        tag.className = "lumaborder-battery-tag charging";
      } else {
        sub.textContent = i18n.t("batteryEcoDisabledBadge");
        tag.textContent = `%${level} Pilde`;
        tag.className = "lumaborder-battery-tag normal";
      }
    }
    updateTarget(playerElem, ambientEngine) {
      if (this.player && this.onPlayerHover) {
        this.player.removeEventListener("mouseenter", this.onPlayerHover);
        this.player.removeEventListener("mousemove", this.onPlayerHover);
      }
      this.player = playerElem;
      this.ambientEngine = ambientEngine;
      if (this.player && this.onPlayerHover) {
        this.player.addEventListener("mouseenter", this.onPlayerHover, { passive: true });
        this.player.addEventListener("mousemove", this.onPlayerHover, { passive: true });
      }
      this.mountButton();
      if (this.isOpen && this.menuOverlay) {
        const isShorts = location.pathname.startsWith("/shorts") || Boolean(this.player?.closest?.("ytd-shorts, ytd-reel-video-renderer, #shorts-player"));
        this.menuOverlay.classList.toggle("lumaborder-shorts-menu", isShorts);
        if (this.activeTab === "performance") {
          this.updateBatteryCard(this.ambientEngine?.batteryInfo);
        }
      }
    }
    destroy() {
      this.closeMenu();
      if (this.mountRetryTimeout) {
        clearTimeout(this.mountRetryTimeout);
        this.mountRetryTimeout = null;
      }
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      if (this.player && this.onPlayerHover) {
        this.player.removeEventListener("mouseenter", this.onPlayerHover);
        this.player.removeEventListener("mousemove", this.onPlayerHover);
        this.onPlayerHover = null;
      }
      if (this.onDocumentClick) {
        document.removeEventListener("click", this.onDocumentClick);
        this.onDocumentClick = null;
      }
      if (this.onDocumentKeyDown) {
        document.removeEventListener("keydown", this.onDocumentKeyDown);
        this.onDocumentKeyDown = null;
      }
      if (this.batteryUnsub) {
        this.batteryUnsub();
        this.batteryUnsub = null;
      }
      if (this.button) {
        this.button.remove();
        this.button = null;
      }
    }
  };

  // src/content-main.js
  (() => {
    if (window.__LUMABORDER_LOADED__) return;
    window.__LUMABORDER_LOADED__ = true;
    class LumaBorderApp {
      constructor() {
        this.ambientEngine = null;
        this.playerUI = null;
        this.currentVideo = null;
        this.currentPlayer = null;
        this.currentReel = null;
        this.initTimeout = null;
        this.retryTimeout = null;
        this.observer = null;
        this.init();
      }
      async init() {
        try {
          await settingsManager.load();
          i18n.setLanguage(settingsManager.current.language || "tr");
          this.bindEvents();
          this.observeDOM();
          settingsManager.onChange((newSettings) => {
            i18n.setLanguage(newSettings.language || "tr");
            if (this.ambientEngine) this.ambientEngine.applySettings(newSettings);
            if (this.playerUI) this.playerUI.updateButtonState();
          });
          if (typeof chrome !== "undefined" && chrome.runtime?.onMessage) {
            chrome.runtime.onMessage.addListener((msg) => {
              if (msg && msg.action === "SETTINGS_UPDATED") {
                settingsManager.load().then((updated) => {
                  i18n.setLanguage(updated.language || "tr");
                  if (this.ambientEngine) this.ambientEngine.applySettings(updated);
                  if (this.playerUI) this.playerUI.updateButtonState();
                });
              }
            });
          }
          this.checkAndBootstrap();
        } catch (err) {
          console.warn("[LumaBorder] Ba\u015Flatma hatas\u0131:", err);
        }
      }
      bindEvents() {
        window.addEventListener("yt-navigate-finish", () => this.scheduleBootstrap(150));
        window.addEventListener("spfdone", () => this.scheduleBootstrap(150));
        window.addEventListener("popstate", () => this.scheduleBootstrap(150));
        document.addEventListener("loadedmetadata", (e) => {
          if (e.target && e.target.tagName === "VIDEO") {
            this.scheduleBootstrap(100);
          }
        }, true);
        window.addEventListener("wheel", () => {
          if (location.pathname.startsWith("/shorts")) {
            this.scheduleBootstrap(100);
          }
        }, { passive: true });
        window.addEventListener("keydown", (e) => {
          if (location.pathname.startsWith("/shorts") && ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "j", "k"].includes(e.key)) {
            this.scheduleBootstrap(100);
          }
        }, { passive: true });
        window.addEventListener("click", (e) => {
          if (location.pathname.startsWith("/shorts")) {
            if (e.target && e.target.closest && e.target.closest("#navigation-button-down, #navigation-button-up, ytd-reel-video-renderer")) {
              this.scheduleBootstrap(100);
            }
          }
        }, { passive: true });
        document.addEventListener("play", (e) => {
          if (e.target && e.target.tagName === "VIDEO") {
            if (location.pathname.startsWith("/shorts")) {
              this.handleShortsVideoPlay(e.target);
            } else {
              this.scheduleBootstrap(100);
            }
          }
        }, true);
      }
      handleShortsVideoPlay(video) {
        if (!video) return;
        const activeReel = video.closest("ytd-reel-video-renderer");
        const player = activeReel?.querySelector("#player-container") || activeReel?.querySelector(".player-container") || activeReel?.querySelector("#shorts-player") || video.parentElement;
        if (video !== this.currentVideo || player !== this.currentPlayer || activeReel !== this.currentReel) {
          this.currentReel = activeReel;
          this.setup(video, player);
        }
      }
      scheduleBootstrap(delay = 300) {
        if (this.initTimeout) clearTimeout(this.initTimeout);
        this.initTimeout = setTimeout(() => this.checkAndBootstrap(), delay);
      }
      observeDOM() {
        try {
          let observerDebounce = null;
          const observer = new MutationObserver(() => {
            if (observerDebounce) return;
            observerDebounce = setTimeout(() => {
              observerDebounce = null;
              const isShorts = location.pathname.startsWith("/shorts");
              if (isShorts) {
                const activeReel = document.querySelector("ytd-reel-video-renderer[is-active]");
                const video = activeReel ? activeReel.querySelector("video") : document.querySelector("ytd-shorts video");
                if (video && (video !== this.currentVideo || activeReel !== this.currentReel)) {
                  this.scheduleBootstrap(100);
                }
              } else {
                const video = document.querySelector("video.html5-main-video") || document.querySelector("video");
                if (video && video !== this.currentVideo) {
                  this.scheduleBootstrap(150);
                }
              }
            }, 150);
          });
          const target = document.querySelector("ytd-page-manager") || document.body || document.documentElement;
          this.observer = observer;
          if (target) {
            observer.observe(target, {
              childList: true,
              subtree: true,
              attributes: true,
              attributeFilter: ["is-active", "src"]
            });
          }
        } catch (err) {
          console.warn("[LumaBorder] DOM Observer kurulum hatas\u0131:", err);
        }
      }
      /**
       * YouTube A/B testleri, Shorts ve yeni UI düzenlerine karşı çok katmanlı video & player bulucu
       */
      findTargetVideoAndPlayer(isShorts) {
        let video = null;
        let player = null;
        let activeReel = null;
        if (isShorts) {
          activeReel = document.querySelector("ytd-reel-video-renderer[is-active]");
          if (!activeReel) {
            const videos = Array.from(document.querySelectorAll("ytd-reel-video-renderer video"));
            const playingVideo = videos.find((v) => !v.paused && v.readyState >= 2) || videos.find((v) => !v.paused);
            if (playingVideo) {
              activeReel = playingVideo.closest("ytd-reel-video-renderer");
              video = playingVideo;
            }
          }
          if (!activeReel) {
            const reels = Array.from(document.querySelectorAll("ytd-reel-video-renderer"));
            if (reels.length > 0) {
              const centerY = window.innerHeight / 2;
              let closestReel = null;
              let minDistance = Infinity;
              for (const r of reels) {
                const rect = r.getBoundingClientRect();
                const dist = Math.abs(rect.top + rect.height / 2 - centerY);
                if (dist < minDistance) {
                  minDistance = dist;
                  closestReel = r;
                }
              }
              activeReel = closestReel;
            }
          }
          if (activeReel) {
            if (!video) {
              video = activeReel.querySelector("video.html5-main-video") || activeReel.querySelector("video");
            }
            player = activeReel.querySelector("#player-container") || activeReel.querySelector(".player-container") || activeReel.querySelector("#shorts-player") || activeReel;
          }
          if (!video) {
            video = document.querySelector("#shorts-player video") || document.querySelector("ytd-shorts video") || document.querySelector("video");
            player = document.querySelector("#shorts-player") || (video ? video.parentElement : null);
          }
        } else {
          const playerSelectors = [
            "#movie_player",
            ".html5-video-player",
            "#player .html5-video-player",
            "ytd-watch-flexy #movie_player",
            "ytd-player #movie_player",
            "#player-container",
            "#ytd-player"
          ];
          for (const sel of playerSelectors) {
            try {
              const el = document.querySelector(sel);
              if (el) {
                player = el;
                break;
              }
            } catch (e) {
            }
          }
          const videoSelectors = [
            "video.html5-main-video",
            "#movie_player video",
            ".html5-video-player video",
            "ytd-watch-flexy video",
            "video"
          ];
          if (player) {
            for (const sel of videoSelectors) {
              try {
                const el = player.querySelector(sel);
                if (el) {
                  video = el;
                  break;
                }
              } catch (e) {
              }
            }
          }
          if (!video) {
            for (const sel of videoSelectors) {
              try {
                const el = document.querySelector(sel);
                if (el) {
                  video = el;
                  break;
                }
              } catch (e) {
              }
            }
          }
          if (video && !player) {
            player = video.closest(".html5-video-player") || video.closest("#movie_player") || video.parentElement;
          }
        }
        return { video, player, activeReel };
      }
      checkAndBootstrap(attempt = 0) {
        const isWatch = location.pathname.startsWith("/watch") || location.pathname.startsWith("/embed/");
        const isShorts = location.pathname.startsWith("/shorts");
        if (!isWatch && !isShorts) {
          this.teardown();
          return;
        }
        const { video, player, activeReel } = this.findTargetVideoAndPlayer(isShorts);
        if (!video || !player) {
          if (attempt < 10) {
            clearTimeout(this.retryTimeout);
            this.retryTimeout = setTimeout(() => this.checkAndBootstrap(attempt + 1), 300);
          }
          return;
        }
        if (this.currentVideo === video && this.currentPlayer === player && this.ambientEngine && (isShorts ? this.currentReel === activeReel : true)) {
          return;
        }
        this.currentReel = activeReel;
        this.setup(video, player);
      }
      setup(video, player) {
        if (!video || !player) return;
        this.currentVideo = video;
        this.currentPlayer = player;
        try {
          if (this.ambientEngine && this.playerUI) {
            this.ambientEngine.updateTarget(video, player);
            this.playerUI.updateTarget(player, this.ambientEngine);
          } else {
            this.teardown();
            this.currentVideo = video;
            this.currentPlayer = player;
            this.ambientEngine = new AmbientEngine(video, player, settingsManager.current);
            this.playerUI = new PlayerUI(player, settingsManager, this.ambientEngine);
          }
        } catch (err) {
          console.warn("[LumaBorder] Kurulum hatas\u0131:", err);
        }
      }
      teardown() {
        clearTimeout(this.retryTimeout);
        clearTimeout(this.initTimeout);
        this.retryTimeout = null;
        this.initTimeout = null;
        if (this.ambientEngine) {
          try {
            this.ambientEngine.destroy();
          } catch (e) {
          }
          this.ambientEngine = null;
        }
        if (this.playerUI) {
          try {
            this.playerUI.destroy();
          } catch (e) {
          }
          this.playerUI = null;
        }
        this.currentVideo = null;
        this.currentPlayer = null;
        this.currentReel = null;
      }
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => new LumaBorderApp());
    } else {
      new LumaBorderApp();
    }
  })();
})();
