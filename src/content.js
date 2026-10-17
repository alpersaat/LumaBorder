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
      tabAmbilight: "Ambilight & Donan\u0131m",
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
      autoSubtitleDim: "Ak\u0131ll\u0131 Dinamik Altyaz\u0131 K\u0131sma",
      autoSubtitleDimDesc: "Ekranda altyaz\u0131 g\xF6r\xFCnd\xFC\u011F\xFC anda alt \u0131\u015F\u0131\u011F\u0131 yumu\u015Fak\xE7a k\u0131sar",
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
      // Bölüm 1 & 2 & 3 Yeni Özellikleri
      renderEngine: "Render Motoru",
      renderEngineDesc: "WebGL 2.0 Dual-Kawase Shader ile %60'a varan GPU tasarrufu",
      engineWebGL: "WebGL 2.0 (Shader)",
      engineCanvas2D: "Canvas 2D (Standart)",
      freezeDetection: "Statik Sahne Dondurucu (Dirty Frame)",
      freezeDetectionDesc: "Dura\u011Fan sahnelerde render'\u0131 dondurarak GPU ve pil tasarrufu sa\u011Flar",
      colorSpace: "Renk Uzay\u0131 & HDR",
      colorSpaceDesc: "Display P3 geni\u015F renk gamutu ve HDR OLED ekran do\u011Frulu\u011Fu",
      hdrTonemap: "HDR Ton E\u015Fleme (Reinhard)",
      hdrTonemapDesc: "Patlayan HDR beyazlar\u0131n\u0131 p\xFCr\xFCzs\xFCz sinematik par\u0131lt\u0131ya d\xF6n\xFC\u015Ft\xFCr\xFCr",
      edgeControls: "4-B\xF6lge Ba\u011F\u0131ms\u0131z Kenar Kontrol\xFC",
      edgeControlsDesc: "\xDCst, Sa\u011F, Alt ve Sol y\xF6nlerindeki \u0131\u015F\u0131k yay\u0131l\u0131m\u0131n\u0131 ba\u011F\u0131ms\u0131z kontrol edin",
      edgeTop: "\xDCst Kenar",
      edgeRight: "Sa\u011F Kenar",
      edgeBottom: "Alt Kenar",
      edgeLeft: "Sol Kenar",
      multiZone: "\xC7ok B\xF6lgeli Ambilight (LED Strip)",
      multiZoneDesc: "Ekran kenarlar\u0131n\u0131 b\xF6lgelere ay\u0131r\u0131p ba\u011F\u0131ms\u0131z renk yay\u0131l\u0131m\u0131 sa\u011Flar",
      zoneCount: "B\xF6lge Say\u0131s\u0131",
      barFill: "Siyah \u015Eerit Doldurucu (Bar Fill)",
      barFillDesc: "Letterbox ve Pillarbox siyah bo\u015Fluklar\u0131 yumu\u015Fak \u0131\u015F\u0131kla doldurur",
      debanding: "Banding \xD6nleme (Dithering)",
      debandingDesc: "Karanl\u0131k sahnelerde renk basamaklanmas\u0131n\u0131 p\xFCr\xFCzs\xFCzle\u015Ftirir",
      colorTemperature: "Renk S\u0131cakl\u0131\u011F\u0131 (Kelvin)",
      colorTemperatureDesc: "Oda ayd\u0131nlatmas\u0131na uygun beyaz dengesi (2200K - 9300K)",
      audioReactive: "M\xFCzik & Bas Reaktif Ritim",
      audioReactiveDesc: "Web Audio API ile bas vuru\u015Flar\u0131nda \u0131\u015F\u0131\u011F\u0131n ritmik nab\u0131z atmas\u0131",
      audioSensitivity: "Bas Alg\u0131lama Hassasiyeti",
      nightShift: "Zaman Ayarl\u0131 Gece Karartmas\u0131",
      nightShiftDesc: "Gece saatlerinde parlakl\u0131\u011F\u0131 otomatik azalt\u0131r ve s\u0131cak tona ge\xE7er",
      nightShiftActive: "\u{1F319} Gece Modu Devrede",
      dynamicAccent: "Oynat\u0131c\u0131 UI Ak\u0131ll\u0131 Renklendirme",
      dynamicAccentDesc: "YouTube ilerleme \xE7ubu\u011Funu videonun tematik rengine g\xF6re boyar",
      buttonPosition: "Oynat\u0131c\u0131 Buton Konumu",
      buttonPositionDesc: "LumaBorder butonunun YouTube oynat\u0131c\u0131s\u0131ndaki konumu",
      btnPosLeft: "Sol Taraf (\xD6nerilen)",
      btnPosRight: "Sa\u011F Taraf (Ayarlar\u0131n Yan\u0131)",
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
      ultraEco: "Ultra-Eco \xC7\xF6z\xFCn\xFCrl\xFCk (96x54)",
      ultraEcoDesc: "Tuval \xE7\xF6z\xFCn\xFCrl\xFC\u011F\xFCn\xFC 96x54 piksele \xE7ekerek GPU bellek ve hesaplama y\xFCk\xFCn\xFC %75 d\xFC\u015F\xFCr\xFCr",
      dropFrameSentinel: "Kare D\xFC\u015F\xFC\u015F\xFC Korumas\u0131 (Drop Sentinel)",
      dropFrameSentinelDesc: "Donan\u0131m zorland\u0131\u011F\u0131nda kare atlamay\u0131 \xF6nlemek i\xE7in FPS ve shader d\xF6ng\xFCs\xFCn\xFC dinamik korur",
      batteryStatusTitle: "Pil Durumu",
      batteryCharging: "\u015Earj Ediliyor",
      batteryDischarging: "Pilde",
      batteryEcoActiveBadge: "\u{1F50B} Pil Tasarrufu Devrede (30 FPS Eko)",
      batteryEcoDisabledBadge: "\u26A1 Normal Performans",
      batteryNotSupported: "Pil API Desteklenmiyor",
      batteryUnsupportedTag: "Desteklenmiyor",
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
      tabAmbilight: "Ambilight & Hardware",
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
      autoSubtitleDim: "Smart Dynamic Subtitle Dimmer",
      autoSubtitleDimDesc: "Automatically dims bottom glow whenever subtitles are detected on screen",
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
      // New Features
      renderEngine: "Render Engine",
      renderEngineDesc: "WebGL 2.0 Dual-Kawase Shader delivers up to 60% GPU power savings",
      engineWebGL: "WebGL 2.0 (Shader)",
      engineCanvas2D: "Canvas 2D (Standard)",
      freezeDetection: "Dirty Frame & Freeze Detection",
      freezeDetectionDesc: "Freezes rendering on static scenes (podcasts, slides) to save GPU and battery",
      colorSpace: "Color Space & HDR",
      colorSpaceDesc: "Display P3 wide gamut and HDR OLED color precision",
      hdrTonemap: "HDR Tone Mapping (Reinhard)",
      hdrTonemapDesc: "Prevents highlight clipping by converting peak whites to a smooth cinematic glow",
      edgeControls: "4-Zone Independent Edge Controls",
      edgeControlsDesc: "Independently adjust spread and visibility for Top, Right, Bottom, and Left",
      edgeTop: "Top Edge",
      edgeRight: "Right Edge",
      edgeBottom: "Bottom Edge",
      edgeLeft: "Left Edge",
      multiZone: "Multi-Zone Ambilight (LED Strip)",
      multiZoneDesc: "Samples screen periphery into discrete zones for authentic Ambilight effect",
      zoneCount: "Zone Count",
      barFill: "Black Bar Fill (Seamless Ambient)",
      barFillDesc: "Fills letterbox and pillarbox black bars with blurred dynamic ambient light",
      debanding: "Debanding & Dithering",
      debandingDesc: "Eliminates gradient banding steps on dark backgrounds and OLED screens",
      colorTemperature: "Color Temperature (Kelvin)",
      colorTemperatureDesc: "Adjust white balance (2200K - 9300K) to match your physical room lighting",
      audioReactive: "Audio-Reactive Beat Pulsing",
      audioReactiveDesc: "Web Audio API pulses ambient spread and brightness with the music bass beat",
      audioSensitivity: "Bass Sensitivity",
      nightShift: "Scheduled Night Shift",
      nightShiftDesc: "Automatically dims brightness and shifts to warm white during night hours",
      nightShiftActive: "\u{1F319} Night Shift Active",
      dynamicAccent: "Dynamic Player Accent Tinting",
      dynamicAccentDesc: "Tints YouTube progress bar and controls to match the video's dominant hue",
      buttonPosition: "Player Button Position",
      buttonPositionDesc: "Placement of the LumaBorder button on YouTube player controls",
      btnPosLeft: "Left Side (Recommended)",
      btnPosRight: "Right Side (Near Settings)",
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
      ultraEco: "Ultra-Eco Resolution (96x54)",
      ultraEcoDesc: "Reduces canvas resolution to 96x54 to cut GPU memory and computation by 75%",
      dropFrameSentinel: "Drop-Frame Sentinel Protection",
      dropFrameSentinelDesc: "Dynamically adapts FPS and shader load to prevent dropped frames on heavy videos",
      batteryStatusTitle: "Battery Status",
      batteryCharging: "Charging",
      batteryDischarging: "On Battery",
      batteryEcoActiveBadge: "\u{1F50B} Battery Saver Active (30 FPS Eco)",
      batteryEcoDisabledBadge: "\u26A1 Normal Performance",
      batteryNotSupported: "Battery API Not Supported",
      batteryUnsupportedTag: "Not Supported",
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
      targetFps: 30,
      workerRender: true,
      autoBatteryEco: true,
      renderEngine: "webgl",
      freezeDetection: true,
      colorSpace: "display-p3",
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
      nightShiftStart: "22:00",
      nightShiftEnd: "07:00",
      dynamicAccent: false,
      dropFrameSentinel: true,
      ultraEco: false
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
      targetFps: 30,
      workerRender: true,
      autoBatteryEco: true,
      renderEngine: "webgl",
      freezeDetection: true,
      colorSpace: "display-p3",
      hdrTonemap: true,
      edgeTop: true,
      edgeRight: true,
      edgeBottom: true,
      edgeLeft: true,
      edgeTopSpread: 100,
      edgeRightSpread: 100,
      edgeBottomSpread: 70,
      edgeLeftSpread: 100,
      multiZone: false,
      zoneCount: 12,
      barFill: true,
      debanding: true,
      colorTemperature: 6500,
      autoSubtitleDim: true,
      audioReactive: false,
      audioSensitivity: 50,
      nightShiftEnabled: false,
      nightShiftStart: "22:00",
      nightShiftEnd: "07:00",
      dynamicAccent: false,
      dropFrameSentinel: true,
      ultraEco: false
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
      autoBatteryEco: false,
      renderEngine: "webgl",
      freezeDetection: true,
      colorSpace: "display-p3",
      hdrTonemap: true,
      edgeTop: true,
      edgeRight: true,
      edgeBottom: true,
      edgeLeft: true,
      edgeTopSpread: 100,
      edgeRightSpread: 100,
      edgeBottomSpread: 100,
      edgeLeftSpread: 100,
      multiZone: true,
      zoneCount: 16,
      barFill: false,
      debanding: true,
      colorTemperature: 6500,
      autoSubtitleDim: true,
      audioReactive: false,
      audioSensitivity: 50,
      nightShiftEnabled: false,
      nightShiftStart: "22:00",
      nightShiftEnd: "07:00",
      dynamicAccent: true,
      dropFrameSentinel: true,
      ultraEco: false
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
      autoBatteryEco: true,
      renderEngine: "webgl",
      freezeDetection: true,
      colorSpace: "srgb",
      hdrTonemap: true,
      edgeTop: true,
      edgeRight: true,
      edgeBottom: false,
      edgeLeft: true,
      edgeTopSpread: 100,
      edgeRightSpread: 100,
      edgeBottomSpread: 50,
      edgeLeftSpread: 100,
      multiZone: false,
      zoneCount: 12,
      barFill: true,
      debanding: true,
      colorTemperature: 3200,
      autoSubtitleDim: true,
      audioReactive: false,
      audioSensitivity: 50,
      nightShiftEnabled: false,
      nightShiftStart: "22:00",
      nightShiftEnd: "07:00",
      dynamicAccent: false,
      dropFrameSentinel: true,
      ultraEco: true
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
      autoBatteryEco: false,
      renderEngine: "webgl",
      freezeDetection: true,
      colorSpace: "display-p3",
      hdrTonemap: true,
      edgeTop: true,
      edgeRight: true,
      edgeBottom: true,
      edgeLeft: true,
      edgeTopSpread: 100,
      edgeRightSpread: 100,
      edgeBottomSpread: 100,
      edgeLeftSpread: 100,
      multiZone: true,
      zoneCount: 12,
      barFill: false,
      debanding: true,
      colorTemperature: 7500,
      autoSubtitleDim: true,
      audioReactive: true,
      audioSensitivity: 65,
      nightShiftEnabled: false,
      nightShiftStart: "22:00",
      nightShiftEnd: "07:00",
      dynamicAccent: true,
      dropFrameSentinel: true,
      ultraEco: false
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
    targetFps: 30,
    workerRender: true,
    autoBatteryEco: true,
    theaterModeSync: true,
    fullScreenSync: true,
    activePreset: "default",
    language: "tr",
    // Yeni Özellikler (v2.4 - v3.0)
    renderEngine: "webgl",
    freezeDetection: true,
    colorSpace: "display-p3",
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
    nightShiftStart: "22:00",
    nightShiftEnd: "07:00",
    dynamicAccent: false,
    buttonPosition: "left",
    // Performans Odaklı Yenilikler
    dropFrameSentinel: true,
    ultraEco: false
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
      case "colorTemperature": {
        const num = Number(value);
        return Number.isFinite(num) ? Math.max(2200, Math.min(9300, Math.round(num))) : DEFAULT_SETTINGS.colorTemperature;
      }
      case "edgeTopSpread":
      case "edgeRightSpread":
      case "edgeBottomSpread":
      case "edgeLeftSpread": {
        const num = Number(value);
        return Number.isFinite(num) ? Math.max(0, Math.min(200, Math.round(num))) : 100;
      }
      case "zoneCount": {
        const num = Number(value);
        return [8, 12, 16].includes(num) ? num : DEFAULT_SETTINGS.zoneCount;
      }
      case "audioSensitivity": {
        const num = Number(value);
        return Number.isFinite(num) ? Math.max(10, Math.min(100, Math.round(num))) : DEFAULT_SETTINGS.audioSensitivity;
      }
      case "renderEngine": {
        return ["webgl", "canvas2d"].includes(value) ? value : DEFAULT_SETTINGS.renderEngine;
      }
      case "colorSpace": {
        return ["display-p3", "srgb"].includes(value) ? value : DEFAULT_SETTINGS.colorSpace;
      }
      case "nightShiftStart":
      case "nightShiftEnd": {
        if (typeof value === "string" && /^\d{2}:\d{2}$/.test(value.trim())) {
          return value.trim();
        }
        return DEFAULT_SETTINGS[key];
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
      case "buttonPosition": {
        return ["left", "right"].includes(value) ? value : DEFAULT_SETTINGS.buttonPosition;
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
              chrome.storage[area].get(defaults, (items) => res({ ok: !chrome.runtime.lastError, items: items || {} }));
            } catch (e) {
              res({ ok: false, items: {} });
            }
          });
          Promise.all([readArea("sync", DEFAULT_SETTINGS), readArea("local", {})]).then(([syncRes, localRes]) => {
            const { ok: syncOk, items: sync } = syncRes;
            const { ok: localOk, items: local } = localRes;
            const merged = { ...DEFAULT_SETTINGS, ...sync };
            const toSync = {};
            for (const key of Object.keys(local)) {
              if (!(key in DEFAULT_SETTINGS)) continue;
              const syncVal = sync[key];
              const localVal = local[key];
              if (localVal !== DEFAULT_SETTINGS[key] && (syncVal === void 0 || syncVal === DEFAULT_SETTINGS[key])) {
                toSync[key] = sanitizeSettingValue(key, localVal);
                merged[key] = toSync[key];
              }
            }
            const localKeys = Object.keys(local).filter((k) => k in DEFAULT_SETTINGS);
            const apply = () => {
              this.current = this.sanitizeAll(merged);
              resolve(this.current);
            };
            if (syncOk && Object.keys(toSync).length) {
              chrome.storage.sync.set(toSync, () => {
                if (!chrome.runtime.lastError) {
                  if (localKeys.length) chrome.storage.local.remove(localKeys, apply);
                  else apply();
                } else {
                  apply();
                }
              });
            } else if (syncOk) {
              if (localKeys.length) chrome.storage.local.remove(localKeys, apply);
              else apply();
            } else {
              this.current = this.sanitizeAll({ ...DEFAULT_SETTINGS, ...local });
              resolve(this.current);
            }
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

  // src/letterbox.js
  var ZERO_CROP = Object.freeze({ top: 0, bottom: 0, left: 0, right: 0 });
  var THRESHOLD = 18;
  var lumAt = (d, i) => 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
  function analyzeLetterbox(imgData, w, h, { checkLetterbox = true, checkPillarbox = true, isShorts = false } = {}) {
    const cx = Math.floor(w / 2);
    const cy = Math.floor(h / 2);
    let sum = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        sum += lumAt(imgData, ((cy + dy) * w + (cx + dx)) * 4);
      }
    }
    if (sum / 9 <= THRESHOLD) return { ...ZERO_CROP };
    const rowBlack = (y) => {
      for (let x = 4; x < w - 4; x += 2) if (lumAt(imgData, (y * w + x) * 4) > THRESHOLD) return false;
      return true;
    };
    const colBlack = (x) => {
      for (let y = 2; y < h - 2; y += 2) if (lumAt(imgData, (y * w + x) * 4) > THRESHOLD) return false;
      return true;
    };
    const topBlack = checkLetterbox && rowBlack(0);
    const bottomBlack = checkLetterbox && rowBlack(h - 1);
    const leftBlack = checkPillarbox && !isShorts && colBlack(0);
    const rightBlack = checkPillarbox && !isShorts && colBlack(w - 1);
    if (!topBlack && !bottomBlack && !leftBlack && !rightBlack) {
      return { ...ZERO_CROP };
    }
    const crop = { ...ZERO_CROP };
    if (checkLetterbox) {
      if (topBlack) {
        crop.top = 1 / h;
        for (let y = 1; y < Math.floor(h / 3); y++) {
          if (rowBlack(y)) crop.top = (y + 1) / h;
          else break;
        }
      }
      if (bottomBlack) {
        crop.bottom = 1 / h;
        for (let y = h - 2; y >= Math.floor(h * 0.66); y--) {
          if (rowBlack(y)) crop.bottom = (h - y) / h;
          else break;
        }
      }
    }
    if (checkPillarbox && !isShorts) {
      if (leftBlack) {
        crop.left = 1 / w;
        for (let x = 1; x < Math.floor(w / 3); x++) {
          if (colBlack(x)) crop.left = (x + 1) / w;
          else break;
        }
      }
      if (rightBlack) {
        crop.right = 1 / w;
        for (let x = w - 2; x >= Math.floor(w * 0.66); x--) {
          if (colBlack(x)) crop.right = (w - x) / w;
          else break;
        }
      }
    }
    return crop;
  }
  function checkDirtyFrame(prevData, currData, threshold = 1.5) {
    if (!prevData || !currData || prevData.length !== currData.length) {
      return { isDirty: true, diff: 100 };
    }
    let totalDiff = 0;
    let samples = 0;
    const step = 8;
    for (let i = 0; i < currData.length; i += step * 4) {
      const l1 = lumAt(prevData, i);
      const l2 = lumAt(currData, i);
      totalDiff += Math.abs(l1 - l2);
      samples++;
    }
    const avgDiff = samples > 0 ? totalDiff / samples : 100;
    return {
      isDirty: avgDiff >= threshold,
      diff: avgDiff
    };
  }

  // src/color-utils.js
  function kelvinToRGB(kelvin) {
    const temp = Math.max(2200, Math.min(9300, Number(kelvin) || 6500)) / 100;
    let red, green, blue;
    if (temp <= 66) {
      red = 255;
    } else {
      red = temp - 60;
      red = 329.698727446 * Math.pow(red, -0.1332047592);
      red = Math.max(0, Math.min(255, red));
    }
    if (temp <= 66) {
      green = temp;
      green = 99.4708025861 * Math.log(green) - 161.1195681661;
      green = Math.max(0, Math.min(255, green));
    } else {
      green = temp - 60;
      green = 288.1221695283 * Math.pow(green, -0.0755148492);
      green = Math.max(0, Math.min(255, green));
    }
    if (temp >= 66) {
      blue = 255;
    } else if (temp <= 19) {
      blue = 0;
    } else {
      blue = temp - 10;
      blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
      blue = Math.max(0, Math.min(255, blue));
    }
    const r = Math.round(red);
    const g = Math.round(green);
    const b = Math.round(blue);
    return {
      r,
      g,
      b,
      rNorm: r / 255,
      gNorm: g / 255,
      bNorm: b / 255,
      cssRgb: `rgb(${r}, ${g}, ${b})`
    };
  }
  function isTimeInWindow(date, startStr = "22:00", endStr = "07:00") {
    if (!date || !(date instanceof Date)) date = /* @__PURE__ */ new Date();
    const parseMinutes = (str) => {
      if (!str || typeof str !== "string") return 0;
      const parts = str.split(":");
      const h = parseInt(parts[0], 10) || 0;
      const m = parseInt(parts[1], 10) || 0;
      return h * 60 + m;
    };
    const currentMinutes = date.getHours() * 60 + date.getMinutes();
    const startMinutes = parseMinutes(startStr);
    const endMinutes = parseMinutes(endStr);
    if (startMinutes <= endMinutes) {
      return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    } else {
      return currentMinutes >= startMinutes || currentMinutes < endMinutes;
    }
  }
  function extractDominantAccentColor(data, width, height) {
    if (!data || data.length < 4) {
      return { hex: "#ff0000", rgb: "rgb(255, 0, 0)", r: 255, g: 0, b: 0 };
    }
    let totalR = 0;
    let totalG = 0;
    let totalB = 0;
    let maxSaturation = -1;
    let bestR = 255, bestG = 0, bestB = 0;
    let count = 0;
    const totalPixels = Math.floor(data.length / 4);
    const step = Math.max(1, Math.floor(totalPixels / 100));
    for (let i = 0; i < data.length; i += step * 4) {
      const r2 = data[i];
      const g2 = data[i + 1];
      const b2 = data[i + 2];
      const max = Math.max(r2, g2, b2);
      const min = Math.min(r2, g2, b2);
      const lum = (max + min) / 2;
      if (lum < 25 || lum > 235) continue;
      const sat = max === 0 ? 0 : (max - min) / max;
      totalR += r2;
      totalG += g2;
      totalB += b2;
      count++;
      if (sat > maxSaturation) {
        maxSaturation = sat;
        bestR = r2;
        bestG = g2;
        bestB = b2;
      }
    }
    const r = count > 0 && maxSaturation > 0.2 ? bestR : count > 0 ? Math.round(totalR / count) : 255;
    const g = count > 0 && maxSaturation > 0.2 ? bestG : count > 0 ? Math.round(totalG / count) : 0;
    const b = count > 0 && maxSaturation > 0.2 ? bestB : count > 0 ? Math.round(totalB / count) : 0;
    const toHex = (c) => c.toString(16).padStart(2, "0");
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    return { hex, rgb: `rgb(${r}, ${g}, ${b})`, r, g, b };
  }
  function sampleMultiZoneColors(data, width, height, zoneCount = 8) {
    const zones = [];
    if (!data || width <= 0 || height <= 0) return zones;
    let topCount, sideCount, botCount;
    if (zoneCount >= 16) {
      topCount = 5;
      sideCount = 3;
      botCount = 5;
    } else if (zoneCount >= 12) {
      topCount = 4;
      sideCount = 2;
      botCount = 4;
    } else {
      topCount = 3;
      sideCount = 1;
      botCount = 3;
    }
    const sampleRect = (x0, y0, x1, y1) => {
      let rSum = 0, gSum = 0, bSum = 0, cnt = 0;
      const startX = Math.max(0, Math.min(width - 1, Math.floor(x0)));
      const endX = Math.max(0, Math.min(width, Math.floor(x1)));
      const startY = Math.max(0, Math.min(height - 1, Math.floor(y0)));
      const endY = Math.max(0, Math.min(height, Math.floor(y1)));
      for (let y = startY; y < endY; y += 2) {
        for (let x = startX; x < endX; x += 2) {
          const idx = (y * width + x) * 4;
          rSum += data[idx];
          gSum += data[idx + 1];
          bSum += data[idx + 2];
          cnt++;
        }
      }
      const r = cnt > 0 ? Math.round(rSum / cnt) : 0;
      const g = cnt > 0 ? Math.round(gSum / cnt) : 0;
      const b = cnt > 0 ? Math.round(bSum / cnt) : 0;
      const toHex = (c) => c.toString(16).padStart(2, "0");
      return { r, g, b, hex: `#${toHex(r)}${toHex(g)}${toHex(b)}` };
    };
    const edgeDepthY = Math.max(2, Math.floor(height * 0.25));
    const edgeDepthX = Math.max(2, Math.floor(width * 0.25));
    const topStep = width / topCount;
    for (let i = 0; i < topCount; i++) {
      const c = sampleRect(i * topStep, 0, (i + 1) * topStep, edgeDepthY);
      zones.push({ edge: "top", index: i, ...c });
    }
    const sideStep = height / (sideCount + 1);
    for (let i = 1; i <= sideCount; i++) {
      const c = sampleRect(width - edgeDepthX, (i - 0.5) * sideStep, width, (i + 0.5) * sideStep);
      zones.push({ edge: "right", index: i - 1, ...c });
    }
    for (let i = botCount - 1; i >= 0; i--) {
      const c = sampleRect(i * topStep, height - edgeDepthY, (i + 1) * topStep, height);
      zones.push({ edge: "bottom", index: i, ...c });
    }
    for (let i = sideCount; i >= 1; i--) {
      const c = sampleRect(0, (i - 0.5) * sideStep, edgeDepthX, (i + 0.5) * sideStep);
      zones.push({ edge: "left", index: i - 1, ...c });
    }
    return zones;
  }

  // src/webgl-engine.js
  var WebGLEngine = class {
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      this.options = options;
      this.gl = null;
      this.isReady = false;
      this.lostContext = false;
      this.programs = {};
      this.textures = {};
      this.fboPyramid = [];
      this.quadVAO = null;
      this.quadVBO = null;
      this.inputCanvas = null;
      this.inputCtx = null;
      this.init();
    }
    static isSupported() {
      try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2");
        return Boolean(gl);
      } catch (e) {
        return false;
      }
    }
    init() {
      try {
        const gl = this.canvas.getContext("webgl2", {
          alpha: false,
          antialias: false,
          depth: false,
          stencil: false,
          desynchronized: true,
          preserveDrawingBuffer: false,
          powerPreference: "high-performance"
        });
        if (!gl) {
          return;
        }
        this.gl = gl;
        if (this.options.colorSpace === "display-p3" && "drawingBufferColorSpace" in gl) {
          gl.drawingBufferColorSpace = "display-p3";
        }
        this.initContextLossHandling();
        this.initShaders();
        this.initBuffers();
        this.setupFramebuffers();
        this.isReady = true;
      } catch (err) {
        console.warn("[LumaBorder] WebGL 2.0 ba\u015Flat\u0131lamad\u0131, Canvas2D fallback devreye giriyor:", err);
        this.destroy();
      }
    }
    initContextLossHandling() {
      this.canvas.addEventListener("webglcontextlost", (e) => {
        e.preventDefault();
        this.lostContext = true;
        this.isReady = false;
      }, false);
      this.canvas.addEventListener("webglcontextrestored", () => {
        this.lostContext = false;
        this.init();
      }, false);
    }
    compileShader(type, source) {
      const gl = this.gl;
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(`Shader compile failed: ${info}`);
      }
      return shader;
    }
    createProgram(vsSource, fsSource) {
      const gl = this.gl;
      const vs = this.compileShader(gl.VERTEX_SHADER, vsSource);
      const fs = this.compileShader(gl.FRAGMENT_SHADER, fsSource);
      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(prog);
        gl.deleteProgram(prog);
        throw new Error(`Program link failed: ${info}`);
      }
      return prog;
    }
    initShaders() {
      const vsCommon = `#version 300 es
      precision highp float;
      layout(location = 0) in vec2 a_pos;
      out vec2 v_uv;
      void main() {
        v_uv = (a_pos + 1.0) * 0.5;
        // Video dokusu OpenGL koordinatlar\u0131na g\xF6re dikey \xE7evrilir
        v_uv.y = 1.0 - v_uv.y;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;
      const fsDownsample = `#version 300 es
      precision highp float;
      uniform sampler2D u_image;
      uniform vec2 u_halfpixel;
      uniform vec4 u_crop; // top, bottom, left, right
      in vec2 v_uv;
      out vec4 fragColor;

      void main() {
        vec2 uv = v_uv;
        // Letterbox / Pillarbox k\u0131rpmas\u0131
        vec2 croppedUV = vec2(
          mix(u_crop.z, 1.0 - u_crop.w, uv.x),
          mix(u_crop.x, 1.0 - u_crop.y, uv.y)
        );

        vec2 d = u_halfpixel * 1.5;
        vec4 sum = texture(u_image, croppedUV) * 4.0;
        sum += texture(u_image, croppedUV - d);
        sum += texture(u_image, croppedUV + d);
        sum += texture(u_image, croppedUV + vec2(d.x, -d.y));
        sum += texture(u_image, croppedUV + vec2(-d.x, d.y));

        fragColor = sum / 8.0;
      }
    `;
      const fsUpsample = `#version 300 es
      precision highp float;
      uniform sampler2D u_image;
      uniform vec2 u_halfpixel;
      in vec2 v_uv;
      out vec4 fragColor;

      void main() {
        vec2 d = u_halfpixel * 1.5;
        vec4 sum = vec4(0.0);
        sum += texture(u_image, v_uv + vec2(-d.x * 2.0, 0.0));
        sum += texture(u_image, v_uv + vec2(-d.x, d.y)) * 2.0;
        sum += texture(u_image, v_uv + vec2(0.0, d.y * 2.0));
        sum += texture(u_image, v_uv + vec2(d.x, d.y)) * 2.0;
        sum += texture(u_image, v_uv + vec2(d.x * 2.0, 0.0));
        sum += texture(u_image, v_uv + vec2(d.x, -d.y)) * 2.0;
        sum += texture(u_image, v_uv + vec2(0.0, -d.y * 2.0));
        sum += texture(u_image, v_uv + vec2(-d.x, -d.y)) * 2.0;

        fragColor = sum / 12.0;
      }
    `;
      const fsFinal = `#version 300 es
      precision highp float;
      uniform sampler2D u_image;
      uniform float u_brightness;
      uniform float u_contrast;
      uniform float u_saturation;
      uniform vec3 u_kelvinRGB;
      uniform bool u_debanding;
      uniform vec4 u_edgeWeights; // top, right, bottom, left [0.0 - 1.0]
      uniform bool u_hdrTonemap;
      in vec2 v_uv;
      out vec4 fragColor;

      // Triangular Dithering (Banding ve basamaklanmay\u0131 \xF6nler)
      float ditherNoise(vec2 uv) {
        return (fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
      }

      // Reinhard Tonemapping (HDR patlayan beyazlar\u0131 yumu\u015Fak sinematik par\u0131lt\u0131ya d\xF6n\xFC\u015Ft\xFCr\xFCr)
      vec3 tonemap(vec3 color) {
        return color / (color + vec3(1.0));
      }

      void main() {
        vec4 base = texture(u_image, v_uv);
        vec3 color = base.rgb;

        // 1. Kelvin Renk S\u0131cakl\u0131\u011F\u0131 \xC7arpan\u0131
        color *= u_kelvinRGB;

        // 2. Doygunluk (Saturation)
        float lum = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(lum), color, u_saturation);

        // 3. Kontrast
        color = (color - 0.5) * u_contrast + 0.5;

        // 4. Parlakl\u0131k
        color *= u_brightness;

        // 5. HDR Tonemapping
        if (u_hdrTonemap) {
          color = tonemap(color);
        }

        // 6. 4-B\xF6lge Kenar Kontrol A\u011F\u0131rl\u0131kland\u0131rmas\u0131
        // v_uv: (0,0) sol \xFCst, (1,1) sa\u011F alt
        float edgeFactor = 1.0;
        if (v_uv.y < 0.25) edgeFactor *= mix(u_edgeWeights.x, 1.0, v_uv.y * 4.0); // \xDCst
        if (v_uv.x > 0.75) edgeFactor *= mix(1.0, u_edgeWeights.y, (v_uv.x - 0.75) * 4.0); // Sa\u011F
        if (v_uv.y > 0.75) edgeFactor *= mix(1.0, u_edgeWeights.z, (v_uv.y - 0.75) * 4.0); // Alt
        if (v_uv.x < 0.25) edgeFactor *= mix(u_edgeWeights.w, 1.0, v_uv.x * 4.0); // Sol
        color *= clamp(edgeFactor, 0.0, 1.0);

        // 7. Debanding Dithering
        if (u_debanding) {
          color += vec3(ditherNoise(gl_FragCoord.xy));
        }

        fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
      }
    `;
      this.programs.downsample = this.createProgram(vsCommon, fsDownsample);
      this.programs.upsample = this.createProgram(vsCommon, fsUpsample);
      this.programs.final = this.createProgram(vsCommon, fsFinal);
    }
    initBuffers() {
      const gl = this.gl;
      this.quadVAO = gl.createVertexArray();
      gl.bindVertexArray(this.quadVAO);
      this.quadVBO = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.quadVBO);
      const vertices = new Float32Array([
        -1,
        -1,
        1,
        -1,
        -1,
        1,
        -1,
        1,
        1,
        -1,
        1,
        1
      ]);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.bindVertexArray(null);
      this.textures.video = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.textures.video);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }
    setupFramebuffers() {
      const gl = this.gl;
      this.destroyFramebuffers();
      let w = this.canvas.width;
      let h = this.canvas.height;
      for (let i = 0; i < 3; i++) {
        w = Math.max(8, Math.floor(w / 2));
        h = Math.max(8, Math.floor(h / 2));
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        this.fboPyramid.push({ fbo, tex, width: w, height: h });
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    destroyFramebuffers() {
      const gl = this.gl;
      if (!gl) return;
      for (const item of this.fboPyramid) {
        if (item.fbo) gl.deleteFramebuffer(item.fbo);
        if (item.tex) gl.deleteTexture(item.tex);
      }
      this.fboPyramid = [];
    }
    ensureInputCanvas(width, height) {
      if (!this.inputCanvas || this.inputCanvas.width !== width || this.inputCanvas.height !== height) {
        try {
          if (typeof OffscreenCanvas !== "undefined") {
            this.inputCanvas = new OffscreenCanvas(width, height);
          } else {
            this.inputCanvas = document.createElement("canvas");
            this.inputCanvas.width = width;
            this.inputCanvas.height = height;
          }
          this.inputCtx = this.inputCanvas.getContext("2d", {
            alpha: false,
            desynchronized: true,
            willReadFrequently: false
          });
        } catch (e) {
          this.inputCanvas = null;
          this.inputCtx = null;
        }
      }
      return this.inputCanvas;
    }
    render(video, config = {}) {
      if (!this.isReady || this.lostContext || !video || video.readyState < 2) return;
      const gl = this.gl;
      const {
        crop = { top: 0, bottom: 0, left: 0, right: 0 },
        brightness = 1,
        contrast = 1,
        saturation = 1.2,
        kelvin = 6500,
        debanding = true,
        hdrTonemap = true,
        edgeWeights = [1, 1, 1, 1],
        // [top, right, bottom, left]
        maxPasses = this.fboPyramid.length
      } = config;
      let uploadSource = video;
      if (this.ensureInputCanvas(this.canvas.width, this.canvas.height) && this.inputCtx) {
        try {
          this.inputCtx.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
          uploadSource = this.inputCanvas;
        } catch (e) {
          uploadSource = video;
        }
      }
      gl.bindTexture(gl.TEXTURE_2D, this.textures.video);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, uploadSource);
      gl.bindVertexArray(this.quadVAO);
      const activePasses = Math.max(1, Math.min(this.fboPyramid.length, maxPasses));
      let currentInputTex = this.textures.video;
      for (let i = 0; i < activePasses; i++) {
        const step = this.fboPyramid[i];
        gl.bindFramebuffer(gl.FRAMEBUFFER, step.fbo);
        gl.viewport(0, 0, step.width, step.height);
        gl.useProgram(this.programs.downsample);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, currentInputTex);
        gl.uniform1i(gl.getUniformLocation(this.programs.downsample, "u_image"), 0);
        gl.uniform2f(gl.getUniformLocation(this.programs.downsample, "u_halfpixel"), 0.5 / step.width, 0.5 / step.height);
        if (i === 0) {
          gl.uniform4f(gl.getUniformLocation(this.programs.downsample, "u_crop"), crop.top, crop.bottom, crop.left, crop.right);
        } else {
          gl.uniform4f(gl.getUniformLocation(this.programs.downsample, "u_crop"), 0, 0, 0, 0);
        }
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        currentInputTex = step.tex;
      }
      for (let i = activePasses - 2; i >= 0; i--) {
        const step = this.fboPyramid[i];
        gl.bindFramebuffer(gl.FRAMEBUFFER, step.fbo);
        gl.viewport(0, 0, step.width, step.height);
        gl.useProgram(this.programs.upsample);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, currentInputTex);
        gl.uniform1i(gl.getUniformLocation(this.programs.upsample, "u_image"), 0);
        gl.uniform2f(gl.getUniformLocation(this.programs.upsample, "u_halfpixel"), 0.5 / step.width, 0.5 / step.height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        currentInputTex = step.tex;
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      const kelvinRGB = kelvinToRGB(kelvin);
      gl.useProgram(this.programs.final);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, currentInputTex);
      gl.uniform1i(gl.getUniformLocation(this.programs.final, "u_image"), 0);
      gl.uniform1f(gl.getUniformLocation(this.programs.final, "u_brightness"), brightness);
      gl.uniform1f(gl.getUniformLocation(this.programs.final, "u_contrast"), contrast);
      gl.uniform1f(gl.getUniformLocation(this.programs.final, "u_saturation"), saturation);
      gl.uniform3f(gl.getUniformLocation(this.programs.final, "u_kelvinRGB"), kelvinRGB.rNorm, kelvinRGB.gNorm, kelvinRGB.bNorm);
      gl.uniform1i(gl.getUniformLocation(this.programs.final, "u_debanding"), debanding ? 1 : 0);
      gl.uniform1i(gl.getUniformLocation(this.programs.final, "u_hdrTonemap"), hdrTonemap ? 1 : 0);
      gl.uniform4f(gl.getUniformLocation(this.programs.final, "u_edgeWeights"), edgeWeights[0], edgeWeights[1], edgeWeights[2], edgeWeights[3]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      gl.bindVertexArray(null);
    }
    resize(width, height) {
      if (!this.gl) return;
      this.canvas.width = width;
      this.canvas.height = height;
      if (this.inputCanvas) {
        this.inputCanvas.width = width;
        this.inputCanvas.height = height;
      }
      this.setupFramebuffers();
    }
    destroy() {
      const gl = this.gl;
      if (gl) {
        this.destroyFramebuffers();
        if (this.quadVBO) gl.deleteBuffer(this.quadVBO);
        if (this.quadVAO) gl.deleteVertexArray(this.quadVAO);
        if (this.textures.video) gl.deleteTexture(this.textures.video);
        for (const p of Object.values(this.programs)) {
          if (p) gl.deleteProgram(p);
        }
      }
      this.inputCanvas = null;
      this.inputCtx = null;
      this.gl = null;
      this.isReady = false;
    }
  };

  // src/beat-detect.js
  var BASS_BIN_COUNT = 6;
  function computeBassEnergy(dataArray, binCount = BASS_BIN_COUNT) {
    const bins = Math.min(binCount, dataArray?.length || 0);
    if (bins <= 0) return 0;
    let sum = 0;
    for (let i = 0; i < bins; i++) sum += dataArray[i];
    return sum / bins;
  }
  function sensitivityFactor(sensitivity) {
    return 1.1 + (100 - sensitivity) * 5e-3;
  }
  function computePulse(state, dataArray, sensitivity) {
    const bassEnergy = computeBassEnergy(dataArray);
    const bassAverage = state.bassAverage * 0.92 + bassEnergy * 0.08;
    const threshold = Math.max(35, bassAverage * sensitivityFactor(sensitivity));
    let currentPulse;
    if (bassEnergy > threshold && bassEnergy > 45) {
      const punch = Math.min(0.25, (bassEnergy - threshold) / 255 * (sensitivity / 50) * 0.35);
      currentPulse = Math.max(state.currentPulse, 1 + punch);
    } else {
      currentPulse = Math.max(1, state.currentPulse * 0.94);
    }
    return { currentPulse, bassAverage, bassEnergy, threshold };
  }

  // src/audio-reactive.js
  var AudioReactiveEngine = class {
    constructor(videoElem, options = {}) {
      this.video = videoElem;
      this.sensitivity = options.sensitivity || 50;
      this.enabled = Boolean(options.enabled);
      this.audioCtx = null;
      this.analyser = null;
      this.sourceNode = null;
      this.dataArray = null;
      this.currentPulse = 1;
      this.bassAverage = 0;
      this.isAttached = false;
      this.isDestroyed = false;
      if (this.enabled) {
        this.init();
      }
    }
    init() {
      if (this.isAttached || this.isDestroyed || !this.video) return;
      try {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtxClass) return;
        this.audioCtx = new AudioCtxClass();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 128;
        this.analyser.smoothingTimeConstant = 0.8;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        let stream = null;
        if (typeof this.video.captureStream === "function") {
          try {
            stream = this.video.captureStream();
          } catch (e) {
          }
        } else if (typeof this.video.mozCaptureStream === "function") {
          try {
            stream = this.video.mozCaptureStream();
          } catch (e) {
          }
        }
        if (stream && stream.getAudioTracks().length > 0) {
          this.sourceNode = this.audioCtx.createMediaStreamSource(stream);
          this.sourceNode.connect(this.analyser);
          this.isAttached = true;
        } else {
          try {
            this.sourceNode = this.audioCtx.createMediaElementSource(this.video);
            this.sourceNode.connect(this.analyser);
            this.sourceNode.connect(this.audioCtx.destination);
            this.isAttached = true;
          } catch (srcErr) {
          }
        }
      } catch (err) {
        this.isAttached = false;
      }
    }
    setEnabled(enabled) {
      this.enabled = Boolean(enabled);
      if (this.enabled && !this.isAttached) {
        this.init();
      }
    }
    setSensitivity(val) {
      this.sensitivity = Math.max(10, Math.min(100, Number(val) || 50));
    }
    update() {
      if (!this.enabled || !this.isAttached || !this.analyser || !this.dataArray) {
        this.currentPulse = 1;
        return 1;
      }
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        try {
          this.audioCtx.resume();
        } catch (e) {
        }
      }
      try {
        this.analyser.getByteFrequencyData(this.dataArray);
        const result = computePulse(
          { currentPulse: this.currentPulse, bassAverage: this.bassAverage },
          this.dataArray,
          this.sensitivity
        );
        this.currentPulse = result.currentPulse;
        this.bassAverage = result.bassAverage;
      } catch (e) {
        this.currentPulse = 1;
      }
      return this.currentPulse;
    }
    getPulse() {
      return this.currentPulse;
    }
    destroy() {
      this.isDestroyed = true;
      if (this.audioCtx) {
        try {
          this.audioCtx.close();
        } catch (e) {
        }
      }
      this.audioCtx = null;
      this.analyser = null;
      this.sourceNode = null;
      this.isAttached = false;
    }
  };

  // src/render-config.js
  function getCanvasDimensions(isShorts, ultraEco) {
    const isEco = Boolean(ultraEco);
    return {
      width: isShorts ? isEco ? 54 : 108 : isEco ? 96 : 192,
      height: isShorts ? isEco ? 96 : 192 : isEco ? 54 : 108
    };
  }
  function getAnalysisCanvasSize(isShorts) {
    return isShorts ? { width: 18, height: 32 } : { width: 32, height: 18 };
  }
  function computeLayerStyles(settings, { isShorts = false, now = /* @__PURE__ */ new Date() } = {}) {
    let effectiveBrightness = settings.brightness;
    let effectiveKelvin = settings.colorTemperature || 6500;
    let isNight = false;
    if (settings.nightShiftEnabled) {
      isNight = isTimeInWindow(now, settings.nightShiftStart, settings.nightShiftEnd);
      if (isNight) {
        effectiveBrightness = Math.round(effectiveBrightness * 0.65);
        effectiveKelvin = Math.min(3200, effectiveKelvin);
      }
    }
    const blur = Math.max(10, settings.blur);
    let scaleX, scaleY, tightScaleX, tightScaleY;
    if (isShorts) {
      const spreadRatio = settings.spread / 100;
      scaleX = (1.3 + spreadRatio * 0.4).toFixed(2);
      scaleY = (1.02 + spreadRatio * 0.05).toFixed(2);
      tightScaleX = (1.1 + spreadRatio * 0.15).toFixed(2);
      tightScaleY = (1.01 + spreadRatio * 0.02).toFixed(2);
    } else {
      const spreadMultiplier = 1 + settings.spread / 100;
      scaleX = spreadMultiplier.toFixed(2);
      scaleY = spreadMultiplier.toFixed(2);
      const tightScale = Math.min(1.15, 1 + settings.spread / 400).toFixed(2);
      tightScaleX = tightScale;
      tightScaleY = tightScale;
    }
    return {
      isNight,
      effectiveBrightness,
      effectiveKelvin,
      blur,
      tightBlur: Math.max(8, Math.round(blur * 0.35)),
      smoothingSec: settings.smoothing / 100 * 0.25,
      scaleX,
      scaleY,
      tightScaleX,
      tightScaleY,
      brightness: (effectiveBrightness / 100).toFixed(2),
      contrast: (settings.contrast / 100).toFixed(2),
      saturate: (settings.saturation / 100).toFixed(2)
    };
  }
  function computeEdgeWeights(settings) {
    return [
      settings.edgeTop ? settings.edgeTopSpread / 100 : 0,
      settings.edgeRight ? settings.edgeRightSpread / 100 : 0,
      settings.edgeBottom ? settings.edgeBottomSpread / 100 : 0,
      settings.edgeLeft ? settings.edgeLeftSpread / 100 : 0
    ];
  }
  function computeBottomMask(settings, isSubtitleVisible) {
    const isSubActive = Boolean(settings.autoSubtitleDim) && Boolean(isSubtitleVisible);
    const isBottomFadeActive = Boolean(settings.bottomFade) || isSubActive;
    if (!isBottomFadeActive) return "none";
    const strength = isSubActive ? 75 : Number(settings.bottomFadeStrength || 60);
    const bottomAlpha = Math.max(0, 1 - strength / 100).toFixed(2);
    return `linear-gradient(to bottom, #000 0%, #000 65%, rgba(0,0,0,${bottomAlpha}) 100%)`;
  }
  function computeSourceRect(videoWidth, videoHeight, crop = {}, minSize = 10) {
    const clamp = (v) => Math.max(0, Math.min(0.4, v || 0));
    const cropL = clamp(crop.left);
    const cropR = clamp(crop.right);
    const cropT = clamp(crop.top);
    const cropB = clamp(crop.bottom);
    const sx = Math.max(0, Math.floor(videoWidth * cropL));
    const sy = Math.max(0, Math.floor(videoHeight * cropT));
    const sw = Math.min(videoWidth - sx, Math.max(minSize, Math.round(videoWidth * (1 - cropL - cropR))));
    const sh = Math.min(videoHeight - sy, Math.max(minSize, Math.round(videoHeight * (1 - cropT - cropB))));
    return { sx, sy, sw, sh, cropL, cropR, cropT, cropB };
  }
  function computeBarFillPixels(playerRect, crop) {
    return {
      top: Math.round(playerRect.height * crop.top),
      bottom: Math.round(playerRect.height * crop.bottom),
      left: Math.round(playerRect.width * crop.left),
      right: Math.round(playerRect.width * crop.right)
    };
  }
  function resolveEffectiveFps(settings, { isBatteryEcoActive = false, penaltyLevel = 0, isFrameFrozen = false } = {}) {
    if (isFrameFrozen && settings.freezeDetection) return 1;
    let effectiveFps = isBatteryEcoActive && settings.autoBatteryEco ? 30 : settings.targetFps;
    if (penaltyLevel >= 1 && (effectiveFps === "sync" || effectiveFps === 60)) {
      effectiveFps = 30;
    }
    return effectiveFps && effectiveFps !== "sync" ? Number(effectiveFps) || 60 : null;
  }
  function getMaxBlurPasses(penaltyLevel) {
    return penaltyLevel >= 2 ? 1 : 3;
  }
  function createDropSentinel() {
    return {
      lastCheckTime: 0,
      lastDroppedFrames: 0,
      lastTotalFrames: 0,
      penaltyLevel: 0,
      cleanWindowsCount: 0
    };
  }
  function stepDropSentinel(state, { dropped = 0, total = 0 } = {}) {
    const deltaDropped = dropped - state.lastDroppedFrames;
    const deltaTotal = total - state.lastTotalFrames;
    state.lastDroppedFrames = dropped;
    state.lastTotalFrames = total;
    if (deltaTotal <= 0) return state;
    const dropRatio = deltaDropped / deltaTotal;
    if (deltaDropped > 2 && dropRatio > 0.04) {
      state.penaltyLevel = Math.min(2, state.penaltyLevel + 1);
      state.cleanWindowsCount = 0;
    } else if (deltaDropped === 0) {
      state.cleanWindowsCount++;
      if (state.cleanWindowsCount >= 3 && state.penaltyLevel > 0) {
        state.penaltyLevel--;
        state.cleanWindowsCount = 0;
      }
    } else if (deltaDropped > 0) {
      state.cleanWindowsCount = 0;
    }
    return state;
  }

  // src/ambient-engine.js
  var AmbientEngine = class {
    constructor(videoElem, playerElem, settings) {
      this.video = videoElem;
      this.player = playerElem;
      this.settings = settings;
      this.container = null;
      this.canvasDiffuse = null;
      this.canvasTight = null;
      this.canvasMultiZone = null;
      this.canvas = null;
      this.ctx = null;
      this.ctxTight = null;
      this.ctxMultiZone = null;
      this.webglEngine = null;
      this.isWebGLActive = false;
      this.audioEngine = null;
      this.ditherOverlay = null;
      this.barFillContainer = null;
      this.barFillElements = {};
      this.analysisCanvas = null;
      this.analysisCtx = null;
      this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
      this.lastAnalysisTime = 0;
      this.prevAnalysisPixels = null;
      this.isFrameFrozen = false;
      this.consecutiveCleanFrames = 0;
      this.subtitleObserver = null;
      this.isSubtitleVisible = false;
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
      this.currentAccentColor = "#ff9100";
      this.dropSentinel = createDropSentinel();
      this._lastAudioPulse = 1;
      this._lastBarPx = { top: -1, bottom: -1, left: -1, right: -1 };
      this._lastMaskStr = "";
      this._lastAccentApplied = false;
      this.isShorts = location.pathname.startsWith("/shorts") || Boolean(this.player.closest("ytd-shorts, ytd-reel-video-renderer, #shorts-player"));
      const dims = getCanvasDimensions(this.isShorts, this.settings.ultraEco);
      this.canvasWidth = dims.width;
      this.canvasHeight = dims.height;
      this.initDOM();
      this.initEngines();
      this.initWorker();
      this.initBattery();
      this.initSubtitleObserver();
      this.applySettings(this.settings);
      this.bindEvents();
    }
    updateCanvasSizes() {
      if (this.canvasDiffuse) {
        this.canvasDiffuse.width = this.canvasWidth;
        this.canvasDiffuse.height = this.canvasHeight;
        if (this.webglEngine) {
          this.webglEngine.resize(this.canvasWidth, this.canvasHeight);
        }
      }
      if (this.canvasTight) {
        this.canvasTight.width = this.canvasWidth;
        this.canvasTight.height = this.canvasHeight;
      }
      if (this.canvasMultiZone) {
        this.canvasMultiZone.width = this.canvasWidth;
        this.canvasMultiZone.height = this.canvasHeight;
      }
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
      this.canvasMultiZone = document.createElement("canvas");
      this.canvasMultiZone.className = "lumaborder-canvas lumaborder-canvas-multizone";
      this.canvasMultiZone.width = this.canvasWidth;
      this.canvasMultiZone.height = this.canvasHeight;
      this.canvasMultiZone.style.display = "none";
      this.ditherOverlay = document.createElement("div");
      this.ditherOverlay.className = "lumaborder-dither-overlay";
      this.ditherOverlay.setAttribute("aria-hidden", "true");
      this.barFillContainer = document.createElement("div");
      this.barFillContainer.className = "lumaborder-bar-fill-container";
      this.barFillContainer.style.display = "none";
      ["top", "bottom", "left", "right"].forEach((pos) => {
        const el = document.createElement("div");
        el.className = `lumaborder-bar-fill lumaborder-bar-fill-${pos}`;
        this.barFillContainer.appendChild(el);
        this.barFillElements[pos] = el;
      });
      this.container.appendChild(this.canvasDiffuse);
      this.container.appendChild(this.canvasTight);
      this.container.appendChild(this.canvasMultiZone);
      this.container.appendChild(this.ditherOverlay);
      this.container.appendChild(this.barFillContainer);
      if (this.player.firstChild) {
        this.player.insertBefore(this.container, this.player.firstChild);
      } else {
        this.player.appendChild(this.container);
      }
      const colorSpace = this.settings.colorSpace === "display-p3" ? "display-p3" : "srgb";
      if (this.settings.renderEngine === "webgl" && WebGLEngine.isSupported()) {
        try {
          this.webglEngine = new WebGLEngine(this.canvasDiffuse, { colorSpace });
          if (this.webglEngine.isReady) {
            this.isWebGLActive = true;
          }
        } catch (err) {
          this.isWebGLActive = false;
        }
      }
      if (!this.isWebGLActive) {
        const ctxOptions = {
          alpha: false,
          desynchronized: true,
          willReadFrequently: false,
          colorSpace
        };
        try {
          this.ctx = this.canvasDiffuse.getContext("2d", ctxOptions);
        } catch (e) {
          this.ctx = this.canvasDiffuse.getContext("2d");
        }
      }
      try {
        this.ctxTight = this.canvasTight.getContext("2d", {
          alpha: false,
          desynchronized: true,
          willReadFrequently: false
        });
      } catch (e) {
      }
      try {
        this.ctxMultiZone = this.canvasMultiZone.getContext("2d", {
          alpha: true,
          desynchronized: true,
          willReadFrequently: false
        });
      } catch (e) {
      }
      const { width: aW, height: aH } = getAnalysisCanvasSize(this.isShorts);
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
    initEngines() {
      try {
        this.audioEngine = new AudioReactiveEngine(this.video, {
          enabled: this.settings.audioReactive,
          sensitivity: this.settings.audioSensitivity || 50
        });
      } catch (e) {
      }
    }
    initSubtitleObserver() {
      if (this.subtitleObserver) {
        this.subtitleObserver.disconnect();
        this.subtitleObserver = null;
      }
      try {
        const captionContainer = this.player?.querySelector?.(".ytp-caption-window-container") || document.querySelector(".ytp-caption-window-container");
        const checkSubtitles = () => {
          if (!this.settings.autoSubtitleDim) {
            this.isSubtitleVisible = false;
            return;
          }
          const hasText = Boolean(
            captionContainer && captionContainer.childElementCount > 0 && captionContainer.textContent.trim().length > 0 && captionContainer.style.display !== "none"
          );
          if (this.isSubtitleVisible !== hasText) {
            this.isSubtitleVisible = hasText;
            this.updateEdgeMaskStyles();
          }
        };
        if (captionContainer) {
          this.subtitleObserver = new MutationObserver(checkSubtitles);
          this.subtitleObserver.observe(captionContainer, { childList: true, subtree: true, characterData: true });
        }
      } catch (e) {
      }
    }
    async initWorker() {
      if (!this.settings.workerRender || typeof Worker === "undefined") return;
      try {
        if (typeof chrome === "undefined" || !chrome.runtime?.getURL) return;
        const workerUrl = chrome.runtime.getURL("src/render-worker.js");
        let workerInstance = null;
        try {
          workerInstance = new Worker(workerUrl);
        } catch (directErr) {
          try {
            const res = await fetch(workerUrl);
            const code = await res.text();
            if (this.destroyed) return;
            this.workerBlobUrl = URL.createObjectURL(new Blob([code], { type: "text/javascript" }));
            workerInstance = new Worker(this.workerBlobUrl);
          } catch (blobErr) {
            this.disposeWorker();
            return;
          }
        }
        if (!workerInstance || this.destroyed) {
          if (workerInstance) {
            try {
              workerInstance.terminate();
            } catch (e) {
            }
          }
          return;
        }
        this.worker = workerInstance;
        this.worker.onmessage = (e) => {
          const { type, crop, isDirty, dominantColor } = e.data || {};
          if (type === "READY") {
            this.isWorkerReady = true;
          } else if (type === "ANALYSIS_RESULT") {
            if (crop) {
              this.letterboxCrop = crop;
            }
            if (typeof isDirty === "boolean") {
              this.isFrameFrozen = !isDirty;
            }
            if (dominantColor && this.settings.dynamicAccent) {
              this.applyDynamicAccent(dominantColor);
            }
            this.isAnalyzingInWorker = false;
          }
        };
        this.worker.onerror = (e) => {
          if (e && typeof e.preventDefault === "function") {
            e.preventDefault();
          }
          this.disposeWorker();
        };
        this.worker.postMessage({ type: "INIT", data: {} });
      } catch (e) {
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
          this.notifyBatteryListeners();
        });
      } else {
        this.batteryInfo.supported = false;
        this.notifyBatteryListeners();
      }
    }
    onBatteryChange(cb) {
      this.batteryCallbacks.add(cb);
      cb(this.batteryInfo);
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
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect();
        this.intersectionObserver = null;
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
      console.warn("[LumaBorder]", tag, "hatas\u0131:", err);
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
        this.initSubtitleObserver();
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
      if (typeof IntersectionObserver !== "undefined" && this.player) {
        this.intersectionObserver = new IntersectionObserver((entries) => {
          const entry = entries[entries.length - 1];
          if (!entry) return;
          if (!entry.isIntersecting) {
            this.stop();
          } else if (!document.hidden && this.video && !this.video.paused && !this.video.ended) {
            this.start();
          }
        });
        this.intersectionObserver.observe(this.player);
      }
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
        if (this.player) this.player.classList.remove("lumaborder-tint-active");
        this.stop();
        return;
      }
      this.container.style.display = "block";
      const oldW = this.canvasWidth;
      const oldH = this.canvasHeight;
      const dims = getCanvasDimensions(this.isShorts, this.settings.ultraEco);
      this.canvasWidth = dims.width;
      this.canvasHeight = dims.height;
      if (oldW !== this.canvasWidth || oldH !== this.canvasHeight) {
        this.updateCanvasSizes();
      }
      if (this.canvasTight) {
        this.canvasTight.style.display = this.settings.dualLayerGlow ? "block" : "none";
      }
      if (this.canvasMultiZone) {
        this.canvasMultiZone.style.display = this.settings.multiZone ? "block" : "none";
      }
      if (this.ditherOverlay) {
        this.ditherOverlay.style.display = this.settings.debanding ? "block" : "none";
      }
      if (this.barFillContainer) {
        this.barFillContainer.style.display = this.settings.barFill ? "block" : "none";
      }
      if (this.audioEngine) {
        this.audioEngine.setEnabled(this.settings.audioReactive);
        this.audioEngine.setSensitivity(this.settings.audioSensitivity || 50);
      }
      const styles = computeLayerStyles(this.settings, { isShorts: this.isShorts });
      this.effectiveBrightness = styles.effectiveBrightness;
      this.effectiveKelvin = styles.effectiveKelvin;
      const brightness = styles.brightness;
      const contrast = styles.contrast;
      const saturate = styles.saturate;
      const blur = styles.blur;
      const scaleX = styles.scaleX;
      const scaleY = styles.scaleY;
      const tightScaleX = styles.tightScaleX;
      const tightScaleY = styles.tightScaleY;
      const tightBlur = styles.tightBlur;
      const smoothingSec = styles.smoothingSec;
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
      this.updateEdgeMaskStyles();
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
    updateEdgeMaskStyles() {
      if (!this.container) return;
      this.container.classList.toggle("edge-top-off", !this.settings.edgeTop);
      this.container.classList.toggle("edge-right-off", !this.settings.edgeRight);
      this.container.classList.toggle("edge-left-off", !this.settings.edgeLeft);
      this.container.classList.toggle("edge-bottom-off", !this.settings.edgeBottom);
      const maskGradient = computeBottomMask(this.settings, this.isSubtitleVisible);
      if (this._lastMaskStr !== maskGradient) {
        this._lastMaskStr = maskGradient;
        this.container.style.setProperty("--lumaborder-bottom-mask", maskGradient);
      }
    }
    applyDynamicAccent(hexColor) {
      if (!this.player || !hexColor) return;
      const active = Boolean(this.settings.dynamicAccent);
      if (this.currentAccentColor === hexColor && this._lastAccentApplied === active) return;
      this.currentAccentColor = hexColor;
      this._lastAccentApplied = active;
      this.player.style.setProperty("--lumaborder-accent-color", hexColor);
      this.player.classList.toggle("lumaborder-tint-active", active);
    }
    drawBiasLighting() {
      if (!this.settings.enabled) return;
      const color = this.settings.biasLightingColor || "#ffe4b5";
      if (this.isWebGLActive && this.webglEngine) {
      }
      const fillTarget = (ctx) => {
        if (!ctx) return;
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
    updateDropFrameSentinel() {
      if (!this.settings.dropFrameSentinel || !this.video || typeof this.video.getVideoPlaybackQuality !== "function") {
        return;
      }
      const now = performance.now();
      if (now - this.dropSentinel.lastCheckTime < 2e3) return;
      this.dropSentinel.lastCheckTime = now;
      try {
        const quality = this.video.getVideoPlaybackQuality();
        if (!quality) return;
        const dropped = quality.droppedVideoFrames || 0;
        const total = quality.totalVideoFrames || 0;
        stepDropSentinel(this.dropSentinel, { dropped, total });
      } catch (e) {
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
      this.updateDropFrameSentinel();
      const activeTargetFps = resolveEffectiveFps(this.settings, {
        isBatteryEcoActive: this.isBatteryEcoActive,
        penaltyLevel: this.dropSentinel.penaltyLevel,
        isFrameFrozen: this.isFrameFrozen
      });
      if (activeTargetFps) {
        const intervalMs = 1e3 / activeTargetFps;
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
        this.warnOnce("renderLoop", err);
      }
      scheduleNext();
    }
    detectLetterbox() {
      const checkLetterbox = Boolean(this.settings.letterboxDetection);
      const checkPillarbox = Boolean(this.settings.pillarboxDetection);
      if (!this.video || this.video.videoWidth <= 0 || this.video.videoHeight <= 0) {
        return;
      }
      const now = performance.now();
      const isFrozen = this.isFrameFrozen && this.settings.freezeDetection;
      const checkInterval = isFrozen ? 4e3 : this.isBatteryEcoActive && this.settings.autoBatteryEco ? 4e3 : this.settings.ecoMode ? 2e3 : 1200;
      if (now - this.lastAnalysisTime < checkInterval) return;
      this.lastAnalysisTime = now;
      if (this.settings.workerRender && this.worker && this.isWorkerReady && !this.isAnalyzingInWorker && typeof createImageBitmap === "function") {
        this.isAnalyzingInWorker = true;
        const { width: resizeW, height: resizeH } = getAnalysisCanvasSize(this.isShorts);
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
                isShorts: this.isShorts,
                checkDirty: Boolean(this.settings.freezeDetection),
                extractColors: Boolean(this.settings.dynamicAccent || this.settings.multiZone)
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
        const imgDataObj = this.analysisCtx.getImageData(0, 0, w, h);
        const imgData = imgDataObj.data;
        if (this.settings.freezeDetection && this.prevAnalysisPixels) {
          const { isDirty } = checkDirtyFrame(this.prevAnalysisPixels, imgData, 1.2);
          this.isFrameFrozen = !isDirty;
        }
        this.prevAnalysisPixels = new Uint8ClampedArray(imgData);
        this.letterboxCrop = analyzeLetterbox(imgData, w, h, { checkLetterbox, checkPillarbox, isShorts: this.isShorts });
        if (this.settings.dynamicAccent) {
          const dominant = extractDominantAccentColor(imgData, w, h);
          this.applyDynamicAccent(dominant.hex);
        }
        if (this.settings.multiZone && this.ctxMultiZone) {
          this.renderMultiZoneLEDs(imgData, w, h);
        }
        if (this.settings.barFill) {
          this.updateBarFillDOM();
        }
      } catch (e) {
        this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
      }
    }
    renderMultiZoneLEDs(imgData, w, h) {
      const zones = sampleMultiZoneColors(imgData, w, h, this.settings.zoneCount || 12);
      if (!zones.length || !this.ctxMultiZone) return;
      const ctx = this.ctxMultiZone;
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      const topZones = zones.filter((z) => z.edge === "top");
      const bottomZones = zones.filter((z) => z.edge === "bottom");
      const leftZones = zones.filter((z) => z.edge === "left");
      const rightZones = zones.filter((z) => z.edge === "right");
      const drawEdgeGradient = (edgeZones, x0, y0, x1, y1) => {
        if (!edgeZones.length) return;
        const grad = ctx.createLinearGradient(x0, y0, x1, y1);
        const step = 1 / Math.max(1, edgeZones.length - 1);
        edgeZones.forEach((z, idx) => {
          grad.addColorStop(Math.min(1, idx * step), z.hex);
        });
        ctx.fillStyle = grad;
        ctx.fillRect(Math.min(x0, x1), Math.min(y0, y1), Math.max(1, Math.abs(x1 - x0) || this.canvasWidth), Math.max(1, Math.abs(y1 - y0) || this.canvasHeight));
      };
      drawEdgeGradient(topZones, 0, 0, this.canvasWidth, 0);
      drawEdgeGradient(bottomZones, 0, this.canvasHeight, this.canvasWidth, this.canvasHeight);
      drawEdgeGradient(leftZones, 0, 0, 0, this.canvasHeight);
      drawEdgeGradient(rightZones, this.canvasWidth, 0, this.canvasWidth, this.canvasHeight);
    }
    updateBarFillDOM() {
      if (!this.barFillContainer) return;
      const playerRect = this.player?.getBoundingClientRect();
      if (!playerRect) return;
      const { top: topPx, bottom: bottomPx, left: leftPx, right: rightPx } = computeBarFillPixels(playerRect, this.letterboxCrop);
      if (this._lastBarPx.top !== topPx) {
        this._lastBarPx.top = topPx;
        this.container.style.setProperty("--lumaborder-letterbox-top", `${topPx}px`);
      }
      if (this._lastBarPx.bottom !== bottomPx) {
        this._lastBarPx.bottom = bottomPx;
        this.container.style.setProperty("--lumaborder-letterbox-bottom", `${bottomPx}px`);
      }
      if (this._lastBarPx.left !== leftPx) {
        this._lastBarPx.left = leftPx;
        this.container.style.setProperty("--lumaborder-pillarbox-left", `${leftPx}px`);
      }
      if (this._lastBarPx.right !== rightPx) {
        this._lastBarPx.right = rightPx;
        this.container.style.setProperty("--lumaborder-pillarbox-right", `${rightPx}px`);
      }
    }
    drawFrame() {
      if (!this.video || this.video.readyState < 2) return;
      this.detectLetterbox();
      const vw = this.video.videoWidth || this.canvasWidth;
      const vh = this.video.videoHeight || this.canvasHeight;
      const { sx, sy, sw, sh, cropL, cropR, cropT, cropB } = computeSourceRect(vw, vh, this.letterboxCrop);
      let audioPulse = 1;
      if (this.audioEngine && this.settings.audioReactive) {
        audioPulse = this.audioEngine.update();
        if (Math.abs(audioPulse - this._lastAudioPulse) > 5e-3) {
          this._lastAudioPulse = audioPulse;
          this.container.style.transform = `scale(${audioPulse.toFixed(3)}) translateZ(0)`;
        }
      } else if (this._lastAudioPulse !== 1) {
        this._lastAudioPulse = 1;
        this.container.style.transform = "translateZ(0)";
      }
      const edgeWeights = computeEdgeWeights(this.settings);
      try {
        const maxPasses = getMaxBlurPasses(this.dropSentinel.penaltyLevel);
        if (this.isWebGLActive && this.webglEngine && this.webglEngine.isReady) {
          this.webglEngine.render(this.video, {
            crop: { top: cropT, bottom: cropB, left: cropL, right: cropR },
            brightness: this.effectiveBrightness / 100 * audioPulse,
            contrast: this.settings.contrast / 100,
            saturation: this.settings.saturation / 100,
            kelvin: this.effectiveKelvin,
            debanding: Boolean(this.settings.debanding),
            hdrTonemap: Boolean(this.settings.hdrTonemap),
            edgeWeights,
            maxPasses
          });
        } else if (this.ctx) {
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
        }
        if (this.settings.dualLayerGlow && this.ctxTight) {
          const source = this.isWebGLActive && this.webglEngine?.inputCanvas ? this.webglEngine.inputCanvas : this.canvasDiffuse;
          this.ctxTight.drawImage(source, 0, 0);
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
      const dims = getCanvasDimensions(this.isShorts, this.settings.ultraEco);
      this.canvasWidth = dims.width;
      this.canvasHeight = dims.height;
      if (this.canvasDiffuse) {
        this.canvasDiffuse.width = this.canvasWidth;
        this.canvasDiffuse.height = this.canvasHeight;
        if (this.webglEngine) {
          this.webglEngine.resize(this.canvasWidth, this.canvasHeight);
        }
      }
      if (this.canvasTight) {
        this.canvasTight.width = this.canvasWidth;
        this.canvasTight.height = this.canvasHeight;
      }
      if (this.canvasMultiZone) {
        this.canvasMultiZone.width = this.canvasWidth;
        this.canvasMultiZone.height = this.canvasHeight;
      }
      const { width: aW, height: aH } = getAnalysisCanvasSize(this.isShorts);
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
      this.initSubtitleObserver();
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
      if (this.webglEngine) {
        this.webglEngine.destroy();
        this.webglEngine = null;
      }
      if (this.audioEngine) {
        this.audioEngine.destroy();
        this.audioEngine = null;
      }
      if (this.subtitleObserver) {
        this.subtitleObserver.disconnect();
        this.subtitleObserver = null;
      }
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
      if (this.player) {
        this.player.classList.remove("lumaborder-tint-active");
      }
      if (this.container) {
        this.container.remove();
        this.container = null;
      }
    }
  };

  // src/ui-target.js
  var SHORTS_ACTION_SELECTORS = [
    "#actions",
    "ytd-reel-player-overlay-renderer #actions",
    "#actions.ytd-reel-player-overlay-renderer",
    ".ytd-reel-player-overlay-renderer #actions",
    "#overlay #actions",
    ".ytd-reel-player-overlay-renderer"
  ];
  var LEFT_CONTROLS_SELECTORS = [
    ".ytp-left-controls",
    ".ytp-chrome-bottom .ytp-left-controls",
    ".ytp-chrome-controls .ytp-left-controls",
    ".ytp-controls-left",
    "#movie_player .ytp-left-controls",
    ".html5-video-player .ytp-left-controls"
  ];
  var RIGHT_CONTROLS_SELECTORS = [
    ".ytp-right-controls",
    ".ytp-chrome-bottom .ytp-right-controls",
    ".ytp-chrome-controls .ytp-right-controls",
    ".ytp-controls-right",
    "#movie_player .ytp-right-controls",
    ".html5-video-player .ytp-right-controls"
  ];
  var RIGHT_ANCHOR_SELECTORS = [
    ".ytp-subtitles-button",
    ".ytp-settings-button",
    ".ytp-miniplayer-button",
    ".ytp-size-button",
    ".ytp-fullscreen-button"
  ];
  function isShortsContext(player, pathname = "") {
    return Boolean(pathname && pathname.startsWith("/shorts")) || Boolean(player?.closest?.("ytd-shorts, ytd-reel-video-renderer, #shorts-player"));
  }
  function safeQuery(scope, selector) {
    try {
      return scope?.querySelector?.(selector) || null;
    } catch (e) {
      return null;
    }
  }
  function firstMatch(scopes, selectors) {
    for (const selector of selectors) {
      for (const scope of scopes) {
        const el = safeQuery(scope, selector);
        if (el) return el;
      }
    }
    return null;
  }
  function resolveControlsTarget(doc, player, options = {}) {
    const { isShorts = false, buttonPosition = "left", innerHeight = 0 } = options;
    if (isShorts) {
      let activeReel = player?.closest?.("ytd-reel-video-renderer") || doc.querySelector("ytd-reel-video-renderer[is-active]");
      if (!activeReel) {
        const videos = Array.from(doc.querySelectorAll("ytd-reel-video-renderer video"));
        const playingVideo = videos.find((v) => !v.paused && v.readyState >= 2) || videos.find((v) => !v.paused);
        if (playingVideo) {
          activeReel = playingVideo.closest("ytd-reel-video-renderer");
        }
      }
      if (!activeReel) {
        const reels = Array.from(doc.querySelectorAll("ytd-reel-video-renderer"));
        if (reels.length > 0) {
          const centerY = innerHeight / 2;
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
      let target = null;
      if (activeReel) {
        target = firstMatch([activeReel], SHORTS_ACTION_SELECTORS);
      }
      if (!target) {
        target = firstMatch([doc], SHORTS_ACTION_SELECTORS);
      }
      if (target) {
        return { container: target, type: "shorts", anchor: null, isFallback: false };
      }
      const shortsContainer = activeReel?.querySelector?.("#player-container") || player || doc.body;
      return { container: shortsContainer, type: "shorts-floating", anchor: null, isFallback: true };
    }
    const preferredPos = buttonPosition || "left";
    const leftControls = firstMatch([player, doc], LEFT_CONTROLS_SELECTORS);
    const rightControls = firstMatch([player, doc], RIGHT_CONTROLS_SELECTORS);
    const getRightAnchor = (rc) => {
      if (!rc) return null;
      for (const sel of RIGHT_ANCHOR_SELECTORS) {
        const el = safeQuery(rc, sel);
        if (el) return el;
      }
      return rc.firstElementChild || null;
    };
    if (preferredPos === "left" && leftControls) {
      return { container: leftControls, type: "standard-left", anchor: null, isFallback: false };
    }
    if (preferredPos === "right" && rightControls) {
      return { container: rightControls, type: "standard-right", anchor: getRightAnchor(rightControls), isFallback: false };
    }
    if (leftControls) {
      return { container: leftControls, type: "standard-left", anchor: null, isFallback: false };
    }
    if (rightControls) {
      return { container: rightControls, type: "standard-right", anchor: getRightAnchor(rightControls), isFallback: false };
    }
    const bottomControls = safeQuery(player, ".ytp-chrome-bottom") || safeQuery(player, ".ytp-chrome-controls") || safeQuery(doc, ".ytp-chrome-bottom");
    if (bottomControls) {
      return { container: bottomControls, type: "standard-alt", anchor: null, isFallback: false };
    }
    const topControls = safeQuery(player, ".ytp-chrome-top-buttons") || safeQuery(player, ".ytp-chrome-top");
    if (topControls) {
      return { container: topControls, type: "standard-top", anchor: null, isFallback: false };
    }
    return {
      container: player || safeQuery(doc, "#movie_player") || doc.body,
      type: "floating",
      anchor: null,
      isFallback: true
    };
  }

  // src/menu-content.js
  function getTabContentHTML(tab, s, t) {
    if (tab === "general") {
      return `
        <!-- Master Switch -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("masterToggle")}</span>
            <span class="lumaborder-master-sub">${t("masterToggleDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="lumaborder-master-toggle" ${s.enabled ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Oynat\u0131c\u0131 Buton Konumu (Sol / Sa\u011F) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("buttonPosition")}</span>
            <span class="lumaborder-master-sub">${t("buttonPositionDesc")}</span>
          </div>
          <div class="lumaborder-engine-modes">
            <button class="lumaborder-mode-pill ${s.buttonPosition !== "right" ? "active" : ""}" data-btnpos="left" id="btn-pos-left">${t("btnPosLeft")}</button>
            <button class="lumaborder-mode-pill ${s.buttonPosition === "right" ? "active" : ""}" data-btnpos="right" id="btn-pos-right">${t("btnPosRight")}</button>
          </div>
        </div>

        <!-- \xC7ift Katmanl\u0131 Glow (Dual-Layer) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("dualLayerGlow")}</span>
            <span class="lumaborder-master-sub">${t("dualLayerDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-duallayer" ${s.dualLayerGlow ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Parlakl\u0131k -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t("brightness")}</span>
            <span class="lumaborder-control-value" id="val-brightness">${s.brightness}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-brightness" min="20" max="250" value="${s.brightness}">
        </div>

        <!-- Yay\u0131lma -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t("spread")}</span>
            <span class="lumaborder-control-value" id="val-spread">${s.spread}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-spread" min="5" max="100" value="${s.spread}">
        </div>

        <!-- Bulan\u0131kl\u0131k / Yumu\u015Fakl\u0131k -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t("blur")}</span>
            <span class="lumaborder-control-value" id="val-blur">${s.blur}px</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-blur" min="10" max="120" value="${s.blur}">
        </div>

        <!-- 4-B\xF6lge Ba\u011F\u0131ms\u0131z Kenar Kontrol\xFC (Item 2.1) -->
        <div class="lumaborder-section-divider"></div>
        <div class="lumaborder-control-header" style="margin-top: 8px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${t("edgeControls")}</span>
        </div>
        <div class="lumaborder-hint-text">${t("edgeControlsDesc")}</div>
        <div class="lumaborder-edge-grid">
          <div class="lumaborder-edge-item">
            <div class="lumaborder-edge-header">
              <span>${t("edgeTop")}</span>
              <input type="checkbox" id="chk-edge-top" ${s.edgeTop ? "checked" : ""}>
            </div>
            <input type="range" class="lumaborder-range" id="rng-edge-top" min="0" max="200" value="${s.edgeTopSpread}">
          </div>
          <div class="lumaborder-edge-item">
            <div class="lumaborder-edge-header">
              <span>${t("edgeRight")}</span>
              <input type="checkbox" id="chk-edge-right" ${s.edgeRight ? "checked" : ""}>
            </div>
            <input type="range" class="lumaborder-range" id="rng-edge-right" min="0" max="200" value="${s.edgeRightSpread}">
          </div>
          <div class="lumaborder-edge-item">
            <div class="lumaborder-edge-header">
              <span>${t("edgeBottom")}</span>
              <input type="checkbox" id="chk-edge-bottom" ${s.edgeBottom ? "checked" : ""}>
            </div>
            <input type="range" class="lumaborder-range" id="rng-edge-bottom" min="0" max="200" value="${s.edgeBottomSpread}">
          </div>
          <div class="lumaborder-edge-item">
            <div class="lumaborder-edge-header">
              <span>${t("edgeLeft")}</span>
              <input type="checkbox" id="chk-edge-left" ${s.edgeLeft ? "checked" : ""}>
            </div>
            <input type="range" class="lumaborder-range" id="rng-edge-left" min="0" max="200" value="${s.edgeLeftSpread}">
          </div>
        </div>
      `;
    }
    if (tab === "effects") {
      const isBiasOff = s.biasLightingMode === "off";
      return `
        <!-- Doygunluk -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t("saturation")}</span>
            <span class="lumaborder-control-value" id="val-saturation">${s.saturation}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-saturation" min="50" max="220" value="${s.saturation}">
        </div>

        <!-- Kontrast -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t("contrast")}</span>
            <span class="lumaborder-control-value" id="val-contrast">${s.contrast}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-contrast" min="60" max="160" value="${s.contrast}">
        </div>

        <!-- Kare Yumu\u015Fatma -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t("smoothing")}</span>
            <span class="lumaborder-control-value" id="val-smoothing">${s.smoothing}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-smoothing" min="0" max="100" value="${s.smoothing}">
        </div>

        <!-- Kelvin Renk S\u0131cakl\u0131\u011F\u0131 (Item 2.5) -->
        <div class="lumaborder-control-row" style="margin-top: 10px;">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t("colorTemperature")}</span>
            <span class="lumaborder-control-value" id="val-kelvin">${s.colorTemperature || 6500}K</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-kelvin" min="2200" max="9300" step="50" value="${s.colorTemperature || 6500}">
          <div class="lumaborder-hint-text">${t("colorTemperatureDesc")}</div>
        </div>

        <!-- Dynamic Accent Tinting (Item 3.4) -->
        <div class="lumaborder-master-card" style="margin-top: 10px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("dynamicAccent")}</span>
            <span class="lumaborder-master-sub">${t("dynamicAccentDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-dynamic-accent" ${s.dynamicAccent ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Dinamik Altyaz\u0131 K\u0131sma (Item 2.6) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("autoSubtitleDim")}</span>
            <span class="lumaborder-master-sub">${t("autoSubtitleDimDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-auto-sub-dim" ${s.autoSubtitleDim ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Sabit Arka I\u015F\u0131k (Bias Lighting) -->
        <div class="lumaborder-section-divider"></div>
        <div class="lumaborder-control-header" style="margin-top: 10px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${t("biasLighting")}</span>
        </div>
        <div class="lumaborder-bias-modes">
          <button class="lumaborder-mode-pill ${s.biasLightingMode === "off" ? "active" : ""}" data-biasmode="off">${t("biasModeOff")}</button>
          <button class="lumaborder-mode-pill ${s.biasLightingMode === "pause" ? "active" : ""}" data-biasmode="pause">${t("biasModePause")}</button>
          <button class="lumaborder-mode-pill ${s.biasLightingMode === "always" ? "active" : ""}" data-biasmode="always">${t("biasModeAlways")}</button>
        </div>

        <div class="lumaborder-color-palette" id="bias-color-palette" style="${isBiasOff ? "display:none;" : ""}">
          <span class="lumaborder-control-label" style="font-size: 11px;">${t("biasLightingColor")}:</span>
          <div class="lumaborder-color-dots">
            <button class="lumaborder-color-dot ${s.biasLightingColor === "#ffe4b5" ? "active" : ""}" data-color="#ffe4b5" title="${t("biasColorWarm")}" style="background: #ffe4b5;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === "#fff4e8" ? "active" : ""}" data-color="#fff4e8" title="${t("biasColorNeutral")}" style="background: #fff4e8;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === "#ffffff" ? "active" : ""}" data-color="#ffffff" title="${t("biasColorCinema")}" style="background: #ffffff;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === "#00e5ff" ? "active" : ""}" data-color="#00e5ff" title="${t("biasColorCyber")}" style="background: #00e5ff;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === "#ff5e00" ? "active" : ""}" data-color="#ff5e00" title="${t("biasColorSunset")}" style="background: #ff5e00;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === "#bd00ff" ? "active" : ""}" data-color="#bd00ff" title="${t("biasColorPurple")}" style="background: #bd00ff;"></button>
            <input type="color" id="bias-custom-color" class="lumaborder-color-picker" value="${typeof s.biasLightingColor === "string" && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(s.biasLightingColor.trim()) ? s.biasLightingColor.trim() : "#ffe4b5"}" title="${t("biasColorCustom")}">
          </div>
        </div>
      `;
    }
    if (tab === "ambilight") {
      return `
        <!-- \xC7ok B\xF6lgeli Ambilight (Item 2.2) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("multiZone")}</span>
            <span class="lumaborder-master-sub">${t("multiZoneDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-multizone" ${s.multiZone ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>
        <div class="lumaborder-zone-modes">
          <button class="lumaborder-mode-pill ${s.zoneCount === 8 ? "active" : ""}" data-zones="8">8 ${t("zoneCount")}</button>
          <button class="lumaborder-mode-pill ${s.zoneCount === 12 ? "active" : ""}" data-zones="12">12 ${t("zoneCount")}</button>
          <button class="lumaborder-mode-pill ${s.zoneCount === 16 ? "active" : ""}" data-zones="16">16 ${t("zoneCount")}</button>
        </div>

        <!-- Siyah \u015Eerit Doldurucu (Bar Fill - Item 2.3) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("barFill")}</span>
            <span class="lumaborder-master-sub">${t("barFillDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-barfill" ${s.barFill ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Banding \xD6nleme (Dithering - Item 2.4) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("debanding")}</span>
            <span class="lumaborder-master-sub">${t("debandingDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-debanding" ${s.debanding ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- M\xFCzik & Bas Reaktif Ritim Modu (Item 3.1) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("audioReactive")}</span>
            <span class="lumaborder-master-sub">${t("audioReactiveDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-audio-reactive" ${s.audioReactive ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>
        <div class="lumaborder-control-row" id="row-audio-sens" style="${s.audioReactive ? "" : "display:none;"}">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t("audioSensitivity")}</span>
            <span class="lumaborder-control-value" id="val-audio-sens">${s.audioSensitivity || 50}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-audio-sens" min="10" max="100" value="${s.audioSensitivity || 50}">
        </div>

        <!-- Zaman Ayarl\u0131 Gece Karartmas\u0131 (Item 3.3) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("nightShift")}</span>
            <span class="lumaborder-master-sub">${t("nightShiftDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-night-shift" ${s.nightShiftEnabled ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>
        <div class="lumaborder-time-row" id="row-night-shift-time" style="${s.nightShiftEnabled ? "" : "display:none;"}">
          <span>Saat:</span>
          <input type="text" class="lumaborder-time-input" id="inp-night-start" value="${s.nightShiftStart || "22:00"}" style="width: 55px;">
          <span>\u2014</span>
          <input type="text" class="lumaborder-time-input" id="inp-night-end" value="${s.nightShiftEnd || "07:00"}" style="width: 55px;">
        </div>
      `;
    }
    if (tab === "presets") {
      return `
        <div class="lumaborder-presets-grid">
          <button class="lumaborder-preset-btn ${s.activePreset === "default" ? "active" : ""}" data-preset="default">
            <span class="lumaborder-preset-icon">\u2696\uFE0F</span>
            <span>${t("presetDefault")}</span>
          </button>
          <button class="lumaborder-preset-btn ${s.activePreset === "cinema" ? "active" : ""}" data-preset="cinema">
            <span class="lumaborder-preset-icon">\u{1F3AC}</span>
            <span>${t("presetCinema")}</span>
          </button>
          <button class="lumaborder-preset-btn ${s.activePreset === "vibrant" ? "active" : ""}" data-preset="vibrant">
            <span class="lumaborder-preset-icon">\u26A1</span>
            <span>${t("presetVibrant")}</span>
          </button>
          <button class="lumaborder-preset-btn ${s.activePreset === "night" ? "active" : ""}" data-preset="night">
            <span class="lumaborder-preset-icon">\u{1F319}</span>
            <span>${t("presetNight")}</span>
          </button>
          <button class="lumaborder-preset-btn ${s.activePreset === "gaming" ? "active" : ""}" data-preset="gaming">
            <span class="lumaborder-preset-icon">\u{1F3AE}</span>
            <span>${t("presetGaming")}</span>
          </button>
        </div>
      `;
    }
    if (tab === "performance") {
      const fpsLabel = s.targetFps === "sync" ? t("fpsSync") : `${s.targetFps} FPS`;
      return `
        <!-- Render Motoru (Item 1.1) -->
        <div class="lumaborder-control-header" style="margin-top: 4px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${t("renderEngine")}</span>
        </div>
        <div class="lumaborder-engine-modes">
          <button class="lumaborder-mode-pill ${s.renderEngine === "webgl" ? "active" : ""}" data-engine="webgl">${t("engineWebGL")}</button>
          <button class="lumaborder-mode-pill ${s.renderEngine === "canvas2d" ? "active" : ""}" data-engine="canvas2d">${t("engineCanvas2D")}</button>
        </div>
        <div class="lumaborder-hint-text">${t("renderEngineDesc")}</div>

        <!-- Renk Uzay\u0131 & HDR Tonemapping (Item 1.5) -->
        <div class="lumaborder-control-header" style="margin-top: 10px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${t("colorSpace")}</span>
        </div>
        <div class="lumaborder-engine-modes">
          <button class="lumaborder-mode-pill ${s.colorSpace === "display-p3" ? "active" : ""}" data-cspace="display-p3">Display P3 (HDR)</button>
          <button class="lumaborder-mode-pill ${s.colorSpace === "srgb" ? "active" : ""}" data-cspace="srgb">sRGB (Standart)</button>
        </div>

        <div class="lumaborder-master-card" style="margin-top: 8px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("hdrTonemap")}</span>
            <span class="lumaborder-master-sub">${t("hdrTonemapDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-hdr-tonemap" ${s.hdrTonemap ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Statik Sahne Dondurucu (Dirty Frame Freeze - Item 1.2) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("freezeDetection")}</span>
            <span class="lumaborder-master-sub">${t("freezeDetectionDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-freeze" ${s.freezeDetection ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Kare D\xFC\u015F\xFC\u015F\xFC Korumas\u0131 (Drop Sentinel - Item 2) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("dropFrameSentinel")}</span>
            <span class="lumaborder-master-sub">${t("dropFrameSentinelDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-drop-sentinel" ${s.dropFrameSentinel ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Ultra-Eco \xC7\xF6z\xFCn\xFCrl\xFCk (96x54 / %75 GPU Tasarrufu - Item 6) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("ultraEco")}</span>
            <span class="lumaborder-master-sub">${t("ultraEcoDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-ultra-eco" ${s.ultraEco ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Hedef Kare H\u0131z\u0131 (FPS Limiti) -->
        <div class="lumaborder-control-header" style="margin-top: 12px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${t("targetFps")}</span>
          <span class="lumaborder-control-value" id="val-target-fps">${fpsLabel}</span>
        </div>
        <div class="lumaborder-fps-modes">
          <button class="lumaborder-mode-pill ${s.targetFps === "sync" ? "active" : ""}" data-fps="sync">${t("fpsSync")}</button>
          <button class="lumaborder-mode-pill ${String(s.targetFps) === "60" ? "active" : ""}" data-fps="60">${t("fps60")}</button>
          <button class="lumaborder-mode-pill ${String(s.targetFps) === "30" ? "active" : ""}" data-fps="30">${t("fps30")}</button>
        </div>

        <!-- Ak\u0131ll\u0131 Pil Tasarrufu (%20 Alt\u0131 Otomatik 30 FPS) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("autoBatteryEco")}</span>
            <span class="lumaborder-master-sub">${t("autoBatteryEcoDesc")}</span>
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
              <span class="lumaborder-battery-title" id="lumaborder-battery-title">${t("batteryStatusTitle")}</span>
              <span class="lumaborder-battery-sub" id="lumaborder-battery-sub">Kontrol ediliyor...</span>
            </div>
          </div>
          <span class="lumaborder-battery-tag" id="lumaborder-battery-tag">--</span>
        </div>

        <!-- OffscreenCanvas & Worker Render (Item 1.3) -->
        <div class="lumaborder-master-card" style="margin-top: 12px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("workerRender")}</span>
            <span class="lumaborder-master-sub">${t("workerRenderDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-worker" ${s.workerRender ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Siyah \u015Eerit Alg\u0131lama (Item 1.4) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("letterboxDetection")}</span>
            <span class="lumaborder-master-sub">${t("letterboxDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-letterbox" ${s.letterboxDetection ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t("pillarboxDetection")}</span>
            <span class="lumaborder-master-sub">${t("pillarboxDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-pillarbox" ${s.pillarboxDetection ? "checked" : ""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>
      `;
    }
    return "";
  }

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
     * YouTube A/B testleri, Shorts ve yeni UI düzenlerine karşı çok katmanlı DOM hedef çözücü.
     * Saf mantık src/ui-target.js içindedir ve tests/ui-target.test.js ile doğrulanır.
     */
    resolveControlsTarget() {
      return resolveControlsTarget(document, this.player, {
        isShorts: isShortsContext(this.player, location.pathname),
        buttonPosition: this.settingsManager?.current?.buttonPosition || "left",
        innerHeight: typeof window !== "undefined" ? window.innerHeight : 0
      });
    }
    mountButton(force = false) {
      try {
        const target = this.resolveControlsTarget();
        if (!target || !target.container) {
          this.scheduleMountRetry();
          return;
        }
        if (!force && this.button && this.button.isConnected && this.button.parentElement === target.container) {
          if (target.type === "standard-left") {
            if (target.container.lastElementChild === this.button) return;
          } else {
            return;
          }
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
          <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
            <path class="ytp-svg-shadow" transform="matrix(0.8, 0, 0, 0.8, 8.4, 1.4)" d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 19c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h-4v1zm2-17c2.76 0 5 2.24 5 5 0 1.95-1.12 3.63-2.76 4.46L14 11.6V16h-4v-4.4l-.24-.14C8.12 10.63 7 8.95 7 7c0-2.76 2.24-5 5-5z"/>
            <path class="ytp-svg-fill" transform="matrix(0.8, 0, 0, 0.8, 8.4, 1.4)" d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 19c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h-4v1zm2-17c2.76 0 5 2.24 5 5 0 1.95-1.12 3.63-2.76 4.46L14 11.6V16h-4v-4.4l-.24-.14C8.12 10.63 7 8.95 7 7c0-2.76 2.24-5 5-5z"/>
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
        if (target.type === "standard-left") {
          target.container.appendChild(this.button);
        } else if (target.type === "shorts") {
          target.container.appendChild(this.button);
        } else {
          if (target.type === "floating" || target.type === "shorts-floating") {
            Object.assign(this.button.style, {
              position: "fixed",
              top: "auto",
              bottom: "22px",
              left: "auto",
              right: "22px",
              zIndex: "2147483647"
            });
            target.container.appendChild(this.button);
          } else {
            let anchorDirectChild = null;
            if (target.anchor && target.container.contains(target.anchor)) {
              anchorDirectChild = target.anchor;
              while (anchorDirectChild && anchorDirectChild.parentElement !== target.container) {
                anchorDirectChild = anchorDirectChild.parentElement;
              }
            }
            if (anchorDirectChild && anchorDirectChild.parentElement === target.container) {
              target.container.insertBefore(this.button, anchorDirectChild);
            } else {
              const fsBtn = target.container.querySelector(".ytp-fullscreen-button");
              let fsDirectChild = fsBtn;
              while (fsDirectChild && fsDirectChild.parentElement !== target.container) {
                fsDirectChild = fsDirectChild.parentElement;
              }
              if (fsDirectChild && fsDirectChild.parentElement === target.container) {
                target.container.insertBefore(this.button, fsDirectChild);
              } else if (target.container.firstChild) {
                target.container.insertBefore(this.button, target.container.firstChild);
              } else {
                target.container.appendChild(this.button);
              }
            }
          }
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
      <button class="lumaborder-tab ${this.activeTab === "ambilight" ? "active" : ""}" data-tab="ambilight">${i18n.t("tabAmbilight")}</button>
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
      <span class="lumaborder-badge">v3.0 \u2022 LumaBorder Ultra</span>
    `;
      this.menuOverlay.appendChild(header);
      this.menuOverlay.appendChild(tabs);
      this.menuOverlay.appendChild(content);
      this.menuOverlay.appendChild(footer);
      this.menuOverlay.addEventListener("click", (e) => e.stopPropagation());
      this.menuOverlay.addEventListener("mousedown", (e) => e.stopPropagation());
      this.menuOverlay.addEventListener("keydown", (e) => e.stopPropagation());
      this.menuOverlay.addEventListener("keyup", (e) => e.stopPropagation());
      const isShorts = isShortsContext(this.player, location.pathname);
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
      if (!isShorts) {
        let isLeft = true;
        if (this.button && this.button.isConnected) {
          const btnRect = this.button.getBoundingClientRect();
          const playerRect = (this.player || document.body).getBoundingClientRect();
          if (playerRect.width > 0) {
            isLeft = btnRect.left < playerRect.left + playerRect.width / 2;
          }
        } else {
          isLeft = (this.settingsManager?.current?.buttonPosition || "left") === "left";
        }
        this.menuOverlay.classList.toggle("lumaborder-menu-left", isLeft);
      }
      this.bindMenuEvents();
    }
    /**
     * Sekme içerik HTML'i saf src/menu-content.js'ten üretilir (tests/menu-content.test.js).
     */
    getTabContentHTML(tab) {
      return getTabContentHTML(tab, this.settingsManager.current, i18n.t.bind(i18n));
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
      const btnPosButtons = this.menuOverlay.querySelectorAll("#btn-pos-left, #btn-pos-right");
      btnPosButtons.forEach((btn) => {
        btn.addEventListener("click", async () => {
          const pos = btn.dataset.btnpos;
          btnPosButtons.forEach((b) => b.classList.toggle("active", b === btn));
          await this.settingsManager.save({ buttonPosition: pos });
          this.mountButton(true);
          if (this.menuOverlay) {
            this.menuOverlay.classList.toggle("lumaborder-menu-left", pos === "left");
          }
        }, { signal });
      });
      const bindSlider = (id, key, unit = "%", isDirectNumber = false) => {
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
      bindSlider("kelvin", "colorTemperature", "K");
      bindSlider("audio-sens", "audioSensitivity", "%");
      ["top", "right", "bottom", "left"].forEach((edge) => {
        const capitalized = edge.charAt(0).toUpperCase() + edge.slice(1);
        const chk = this.menuOverlay.querySelector(`#chk-edge-${edge}`);
        if (chk) {
          chk.addEventListener("change", async (e) => {
            await this.settingsManager.save({ [`edge${capitalized}`]: e.target.checked });
            this.ambientEngine.applySettings({ [`edge${capitalized}`]: e.target.checked });
          }, { signal });
        }
        const rng = this.menuOverlay.querySelector(`#rng-edge-${edge}`);
        if (rng) {
          rng.addEventListener("input", (e) => {
            const val = parseInt(e.target.value, 10);
            this.ambientEngine.applySettings({ [`edge${capitalized}Spread`]: val });
          }, { signal });
          rng.addEventListener("change", async (e) => {
            const val = parseInt(e.target.value, 10);
            await this.settingsManager.save({ [`edge${capitalized}Spread`]: val });
          }, { signal });
        }
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
      bindCheckbox("battery-eco", "autoBatteryEco", () => {
        this.updateBatteryCard(this.ambientEngine?.batteryInfo);
      });
      bindCheckbox("worker", "workerRender");
      bindCheckbox("freeze", "freezeDetection");
      bindCheckbox("drop-sentinel", "dropFrameSentinel");
      bindCheckbox("ultra-eco", "ultraEco");
      bindCheckbox("hdr-tonemap", "hdrTonemap");
      bindCheckbox("dynamic-accent", "dynamicAccent");
      bindCheckbox("auto-sub-dim", "autoSubtitleDim");
      bindCheckbox("multizone", "multiZone");
      bindCheckbox("barfill", "barFill");
      bindCheckbox("debanding", "debanding");
      bindCheckbox("audio-reactive", "audioReactive", (checked) => {
        const row = this.menuOverlay.querySelector("#row-audio-sens");
        if (row) row.style.display = checked ? "block" : "none";
      });
      bindCheckbox("night-shift", "nightShiftEnabled", (checked) => {
        const row = this.menuOverlay.querySelector("#row-night-shift-time");
        if (row) row.style.display = checked ? "flex" : "none";
      });
      const startInp = this.menuOverlay.querySelector("#inp-night-start");
      const endInp = this.menuOverlay.querySelector("#inp-night-end");
      if (startInp) {
        startInp.addEventListener("change", async (e) => {
          await this.settingsManager.save({ nightShiftStart: e.target.value });
          this.ambientEngine.applySettings({ nightShiftStart: e.target.value });
        }, { signal });
      }
      if (endInp) {
        endInp.addEventListener("change", async (e) => {
          await this.settingsManager.save({ nightShiftEnd: e.target.value });
          this.ambientEngine.applySettings({ nightShiftEnd: e.target.value });
        }, { signal });
      }
      const engineBtns = this.menuOverlay.querySelectorAll(".lumaborder-engine-modes .lumaborder-mode-pill[data-engine]");
      engineBtns.forEach((btn) => {
        btn.addEventListener("click", async () => {
          const engine = btn.dataset.engine;
          engineBtns.forEach((b) => b.classList.toggle("active", b === btn));
          await this.settingsManager.save({ renderEngine: engine });
          this.ambientEngine.applySettings({ renderEngine: engine });
        }, { signal });
      });
      const cspaceBtns = this.menuOverlay.querySelectorAll(".lumaborder-engine-modes .lumaborder-mode-pill[data-cspace]");
      cspaceBtns.forEach((btn) => {
        btn.addEventListener("click", async () => {
          const cspace = btn.dataset.cspace;
          cspaceBtns.forEach((b) => b.classList.toggle("active", b === btn));
          await this.settingsManager.save({ colorSpace: cspace });
          this.ambientEngine.applySettings({ colorSpace: cspace });
        }, { signal });
      });
      const zoneBtns = this.menuOverlay.querySelectorAll(".lumaborder-zone-modes .lumaborder-mode-pill");
      zoneBtns.forEach((btn) => {
        btn.addEventListener("click", async () => {
          const zones = parseInt(btn.dataset.zones, 10);
          zoneBtns.forEach((b) => b.classList.toggle("active", b === btn));
          await this.settingsManager.save({ zoneCount: zones });
          this.ambientEngine.applySettings({ zoneCount: zones });
        }, { signal });
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
      const presetBtns = this.menuOverlay.querySelectorAll(".lumaborder-preset-btn");
      presetBtns.forEach((btn) => {
        btn.addEventListener("click", async () => {
          const presetKey = btn.dataset.preset;
          await this.settingsManager.applyPreset(presetKey);
          this.ambientEngine.applySettings(this.settingsManager.current);
          this.renderMenu();
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
        tag.textContent = i18n.t("batteryUnsupportedTag");
        tag.className = "lumaborder-battery-tag desktop";
        this.setBatteryEcoDisabled(true);
        return;
      }
      this.setBatteryEcoDisabled(false);
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
    setBatteryEcoDisabled(disabled) {
      const chk = this.menuOverlay?.querySelector("#chk-battery-eco");
      if (!chk) return;
      chk.disabled = disabled;
      if (disabled && chk.checked) {
        chk.checked = false;
        this.settingsManager.save({ autoBatteryEco: false });
        this.ambientEngine.applySettings({ autoBatteryEco: false });
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
        const isShorts = isShortsContext(this.player, location.pathname);
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
            if (this.playerUI) {
              this.playerUI.updateButtonState();
              this.playerUI.mountButton();
            }
          });
          if (typeof chrome !== "undefined" && chrome.runtime?.onMessage) {
            chrome.runtime.onMessage.addListener((msg) => {
              if (msg && msg.action === "SETTINGS_UPDATED") {
                settingsManager.load().then((updated) => {
                  i18n.setLanguage(updated.language || "tr");
                  if (this.ambientEngine) this.ambientEngine.applySettings(updated);
                  if (this.playerUI) {
                    this.playerUI.updateButtonState();
                    this.playerUI.mountButton();
                  }
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
