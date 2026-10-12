/**
 * LumaBorder - Internationalization (i18n) Engine
 * Dil Desteği: Türkçe (tr) ve English (en)
 */

export const translations = {
  tr: {
    appName: "LumaBorder",
    appTagline: "Dinamik Glow & Işık Efekti",
    statusActive: "Aktif",
    statusInactive: "Pasif",
    masterToggle: "Glow Efektini Etkinleştir",
    masterToggleDesc: "Video etrafındaki dinamik ışık halesini açar/kapatır",
    
    // Sekmeler
    tabGeneral: "Genel",
    tabEffects: "Işık & Renk",
    tabPerformance: "Performans",
    tabPresets: "Profiller",
    
    // Ayarlar
    brightness: "Parlaklık",
    brightnessDesc: "Işık halesinin parlaklık seviyesi",
    spread: "Işık Yayılması",
    spreadDesc: "Işığın video kenarlarından ne kadar uzağa yayılacağı",
    blur: "Yumuşaklık (Bulanıklık)",
    blurDesc: "Işık halesinin yumuşaklık ve yayılma derecesi",
    saturation: "Renk Canlılığı",
    saturationDesc: "Renklerin doygunluğu ve canlılık seviyesi",
    contrast: "Kontrast",
    contrastDesc: "Renk kontrastı",
    smoothing: "Kare Yumuşatma",
    smoothingDesc: "Kareler arası ani ışık patlamalarını yumuşatır",
    
    // Gelişmiş Glow & Efektler
    dualLayerGlow: "Çift Katmanlı Glow",
    dualLayerDesc: "Videonun ardında keskin & canlı, dışta ise yumuşak 2 katmanlı sinematik derinlik",
    bottomFade: "Altyazı Koruması (Alt Karartma)",
    bottomFadeDesc: "Parlak altyazıların alt kısımda ani beyaz parlama yapmasını engeller",
    bottomFadeStrength: "Altyazı Karartma Oranı",
    biasLighting: "Sabit Arka Işık (Bias Lighting)",
    biasLightingDesc: "Göz yormayan sıcak veya neon tonlu sabit arka aydınlatma",
    biasLightingMode: "Arka Işık Modu",
    biasModeOff: "Kapalı (Dinamik Video)",
    biasModePause: "Video Duraklatıldığında",
    biasModeAlways: "Her Zaman Sabit Işık",
    biasLightingColor: "Işık Rengi / Sıcaklık",
    biasColorWarm: "2700K Sıcak Beyaz",
    biasColorNeutral: "4000K Doğal Beyaz",
    biasColorCinema: "6500K Sinema D65",
    biasColorCyber: "Neon Siber Mavi",
    biasColorSunset: "Neon Günbatımı",
    biasColorPurple: "Neon Mor",
    biasColorCustom: "Özel Renk",
    
    // Gelişmiş / Performans & Pil
    targetFps: "Hedef Kare Hızı (FPS)",
    targetFpsDesc: "Yüksek Hz ekranlarda GPU ve pil tasarrufu için kare hızını sınırlar",
    fpsSync: "Eşzamanlı (Video)",
    fps60: "60 FPS",
    fps30: "30 FPS (Eko)",
    workerRender: "OffscreenCanvas / Worker Render",
    workerRenderDesc: "Çizim ve piksel analizini arka plana taşıyarak UI takılmalarını sıfırlar",
    autoBatteryEco: "Akıllı Pil Tasarrufu (%20 Altı)",
    autoBatteryEcoDesc: "Cihaz pildeyken %20'nin altına indiğinde otomatik 30 FPS Eko moduna geçer",
    batteryStatusTitle: "Pil Durumu",
    batteryCharging: "Şarj Ediliyor",
    batteryDischarging: "Pilde",
    batteryEcoActiveBadge: "🔋 Pil Tasarrufu Devrede (30 FPS Eko)",
    batteryEcoDisabledBadge: "⚡ Normal Performans",
    batteryNotSupported: "Pil API Desteklenmiyor",
    letterboxDetection: "Üst/Alt Şeritleri Kırp (Letterbox)",
    letterboxDesc: "Sinemaskop filmlerdeki yatay siyah şeritleri yok sayar",
    pillarboxDetection: "Yan Şeritleri Kırp (Pillarbox)",
    pillarboxDesc: "4:3 ve dikey videolardaki sağ/sol siyah şeritleri yok sayar",
    ecoMode: "Güç Tasarrufu (Eco)",
    ecoModeDesc: "Durağan sahnelerde GPU ve pil kullanımını düşürür",
    theaterModeSync: "Gelişmiş Sinema Modu",
    theaterModeSyncDesc: "Sinema modunda ışığı sinematik olarak genişletir",
    fullScreenSync: "Tam Ekran Uyumu",
    fullScreenSyncDesc: "Tam ekran modunda akıcı ve optimize ambilight",
    shortsActive: "Shorts Glow Aktif",
    
    // Hazır Profiller (Presets)
    presetCinema: "Sinema",
    presetVibrant: "Canlı & Parlak",
    presetNight: "Gece Modu",
    presetGaming: "Dinamik Oyun",
    presetDefault: "Dengeli (Varsayılan)",
    
    // Butonlar ve Durumlar
    resetDefaults: "Varsayılana Sıfırla",
    resetConfirm: "Tüm ayarlar varsayılana döndürülsün mü?",
    language: "Dil",
    langTr: "Türkçe",
    langEn: "English",
    close: "Kapat",
    settingsTitle: "LumaBorder Ayarları",
    quickControls: "Hızlı Kontroller",
    notOnYoutube: "Video sayfasında değilsiniz",
    openYoutubeTip: "Bir video veya Shorts açtığınızda efekt otomatik başlayacaktır."
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
    batteryEcoActiveBadge: "🔋 Battery Saver Active (30 FPS Eco)",
    batteryEcoDisabledBadge: "⚡ Normal Performance",
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
    langTr: "Türkçe",
    langEn: "English",
    close: "Close",
    settingsTitle: "LumaBorder Settings",
    quickControls: "Quick Controls",
    notOnYoutube: "Not on a video page",
    openYoutubeTip: "Glow effect activates automatically when watching a video or Shorts."
  }
};

export class I18nManager {
  constructor(initialLang = 'tr') {
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
    return translations[this.currentLang]?.[key] || translations['en']?.[key] || key;
  }
}

export const i18n = new I18nManager('tr');
