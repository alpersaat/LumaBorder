/**
 * LumaBorder - Internationalization (i18n) Engine
 * Dil Desteği: Türkçe (tr) ve English (en)
 */

export const translations = {
  tr: {
    appName: "LumaBorder",
    appTagline: "YouTube™ İçin Ortam Işığı & Glow",
    statusActive: "Aktif",
    statusInactive: "Pasif",
    masterToggle: "Ortam Işığını Etkinleştir",
    masterToggleDesc: "Video etrafındaki dinamik ışık halesini açar/kapatır",
    
    // Sekmeler
    tabGeneral: "Genel",
    tabEffects: "Işık & Renk",
    tabPerformance: "Performans",
    tabPresets: "Profiller",
    
    // Ayarlar
    brightness: "Parlaklık",
    brightnessDesc: "Ortam ışığının parlaklık seviyesi",
    spread: "Işık Yayılması",
    spreadDesc: "Işığın video kenarlarından ne kadar uzağa yayılacağı",
    blur: "Yumuşaklık (Bulanıklık)",
    blurDesc: "Işık halesinin yumuşaklık ve yayılma derecesi",
    saturation: "Renk Canlılığı",
    saturationDesc: "Renklerin doygunluğu ve canlılık seviyesi",
    contrast: "Kontrast",
    contrastDesc: "Ortam ışığının renk kontrastı",
    smoothing: "Kare Yumuşatma",
    smoothingDesc: "Kareler arası ani ışık patlamalarını yumuşatır",
    
    // Gelişmiş / Performans
    letterboxDetection: "Siyah Şeritleri Yok Say",
    letterboxDesc: "Sinemaskop filmlerdeki siyah kenarları otomatik kırpar",
    ecoMode: "Güç Tasarrufu (Eco)",
    ecoModeDesc: "Durağan sahnelerde GPU ve pil kullanımını düşürür",
    theaterModeSync: "Gelişmiş Sinema Modu",
    theaterModeSyncDesc: "Sinema modunda ışığı sinematik olarak genişletir",
    fullScreenSync: "Tam Ekran Uyumu",
    fullScreenSyncDesc: "Tam ekran modunda akıcı ve optimize ambilight",
    
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
    notOnYoutube: "YouTube video sayfasında değilsiniz",
    openYoutubeTip: "Bir YouTube videosu açtığınızda ortam ışığı otomatik başlayacaktır."
  },
  en: {
    appName: "LumaBorder",
    appTagline: "Ambient Light & Glow for YouTube™",
    statusActive: "Active",
    statusInactive: "Inactive",
    masterToggle: "Enable Ambient Light",
    masterToggleDesc: "Toggles the dynamic glow aura around video",
    
    // Tabs
    tabGeneral: "General",
    tabEffects: "Light & Color",
    tabPerformance: "Performance",
    tabPresets: "Presets",
    
    // Settings
    brightness: "Brightness",
    brightnessDesc: "Brightness level of the ambient glow",
    spread: "Light Spread",
    spreadDesc: "How far the light aura spreads beyond video edges",
    blur: "Softness (Blur)",
    blurDesc: "Smoothness and dispersion of the glow aura",
    saturation: "Color Vibrance",
    saturationDesc: "Vibrance and color saturation level",
    contrast: "Contrast",
    contrastDesc: "Contrast of ambient colors",
    smoothing: "Frame Smoothing",
    smoothingDesc: "Smooths abrupt color changes between frames",
    
    // Advanced / Performance
    letterboxDetection: "Ignore Black Bars",
    letterboxDesc: "Auto-detects and crops letterbox bars in movies",
    ecoMode: "Power Saver (Eco)",
    ecoModeDesc: "Reduces GPU & battery usage on still/static scenes",
    theaterModeSync: "Enhanced Theater Mode",
    theaterModeSyncDesc: "Cinematically widens ambient aura in theater mode",
    fullScreenSync: "Fullscreen Sync",
    fullScreenSyncDesc: "Fluid and optimized ambilight during fullscreen",
    
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
    notOnYoutube: "You are not on a YouTube video page",
    openYoutubeTip: "Ambient light activates automatically when watching a video."
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
