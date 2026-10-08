/**
 * Ambition - Popup Controller
 * Hızlı ayar paneli, anlık önizleme ve dil yönetimi
 */

import { settingsManager } from '../src/settings.js';
import { i18n, translations } from '../src/i18n.js';

class PopupController {
  constructor() {
    this.elements = {};
    this.init();
  }

  async init() {
    await settingsManager.load();
    this.cacheElements();
    this.updateLanguageUI();
    this.renderSettingsValues();
    this.bindEvents();
    this.checkActiveTab();
  }

  cacheElements() {
    this.elements = {
      langBtn: document.getElementById('btn-lang-toggle'),
      masterToggle: document.getElementById('popup-master-toggle'),
      statusIndicator: document.getElementById('status-indicator'),
      statusText: document.getElementById('status-text'),
      rngBrightness: document.getElementById('rng-brightness'),
      valBrightness: document.getElementById('val-brightness'),
      rngSpread: document.getElementById('rng-spread'),
      valSpread: document.getElementById('val-spread'),
      rngBlur: document.getElementById('rng-blur'),
      valBlur: document.getElementById('val-blur'),
      rngSaturation: document.getElementById('rng-saturation'),
      valSaturation: document.getElementById('val-saturation'),
      chkLetterbox: document.getElementById('chk-letterbox'),
      chkEco: document.getElementById('chk-eco'),
      btnReset: document.getElementById('btn-reset'),
      presetButtons: document.querySelectorAll('.preset-pill')
    };
  }

  updateLanguageUI() {
    const lang = settingsManager.current.language || 'tr';
    i18n.setLanguage(lang);
    document.documentElement.lang = lang;

    this.elements.langBtn.textContent = lang === 'en' ? 'TR 🇹🇷' : 'EN 🇬🇧';

    const trans = translations[lang] || translations.en;
    for (const key of Object.keys(trans)) {
      const el = document.getElementById(`txt-${key}`);
      if (el) el.textContent = trans[key];
    }

    this.updateStatusText();
  }

  updateStatusText() {
    const enabled = settingsManager.current.enabled;
    const activeText = i18n.t(enabled ? 'statusActive' : 'statusInactive');
    this.elements.statusText.textContent = activeText;
    this.elements.statusIndicator.classList.toggle('inactive', !enabled);
  }

  renderSettingsValues() {
    const s = settingsManager.current;

    this.elements.masterToggle.checked = s.enabled;
    this.updateStatusText();

    this.elements.rngBrightness.value = s.brightness;
    this.elements.valBrightness.textContent = `${s.brightness}%`;

    this.elements.rngSpread.value = s.spread;
    this.elements.valSpread.textContent = `${s.spread}%`;

    this.elements.rngBlur.value = s.blur;
    this.elements.valBlur.textContent = `${s.blur}px`;

    this.elements.rngSaturation.value = s.saturation;
    this.elements.valSaturation.textContent = `${s.saturation}%`;

    this.elements.chkLetterbox.checked = s.letterboxDetection;
    this.elements.chkEco.checked = s.ecoMode;

    this.updateActivePresetPill(s.activePreset);
  }

  updateActivePresetPill(activePreset) {
    this.elements.presetButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.preset === activePreset);
    });
  }

  bindEvents() {
    // Dil değişimi
    this.elements.langBtn.addEventListener('click', async () => {
      const nextLang = settingsManager.current.language === 'en' ? 'tr' : 'en';
      await settingsManager.save({ language: nextLang });
      this.updateLanguageUI();
    });

    // Master Switch
    this.elements.masterToggle.addEventListener('change', async (e) => {
      const enabled = e.target.checked;
      await settingsManager.save({ enabled });
      this.updateStatusText();
      this.notifyActiveTab();
    });

    // Slider'lar
    const handleSlider = (slider, label, key, unit = '%') => {
      slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        label.textContent = `${val}${unit}`;
      });
      slider.addEventListener('change', async (e) => {
        const val = parseInt(e.target.value, 10);
        await settingsManager.save({ [key]: val, activePreset: 'custom' });
        this.updateActivePresetPill('custom');
        this.notifyActiveTab();
      });
    };

    handleSlider(this.elements.rngBrightness, this.elements.valBrightness, 'brightness', '%');
    handleSlider(this.elements.rngSpread, this.elements.valSpread, 'spread', '%');
    handleSlider(this.elements.rngBlur, this.elements.valBlur, 'blur', 'px');
    handleSlider(this.elements.rngSaturation, this.elements.valSaturation, 'saturation', '%');

    // Preset butonları
    this.elements.presetButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const preset = btn.dataset.preset;
        await settingsManager.applyPreset(preset);
        this.renderSettingsValues();
        this.notifyActiveTab();
      });
    });

    // Checkbox'lar
    this.elements.chkLetterbox.addEventListener('change', async (e) => {
      await settingsManager.save({ letterboxDetection: e.target.checked });
      this.notifyActiveTab();
    });

    this.elements.chkEco.addEventListener('change', async (e) => {
      await settingsManager.save({ ecoMode: e.target.checked });
      this.notifyActiveTab();
    });

    // Sıfırla
    this.elements.btnReset.addEventListener('click', async () => {
      if (confirm(i18n.t('resetConfirm'))) {
        await settingsManager.reset();
        this.renderSettingsValues();
        this.notifyActiveTab();
      }
    });
  }

  notifyActiveTab() {
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'SETTINGS_UPDATED' }).catch(() => {});
        }
      });
    }
  }

  checkActiveTab() {
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeUrl = tabs[0]?.url || '';
        if (!activeUrl.includes('youtube.com')) {
          // İsteğe bağlı bilgilendirme
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => new PopupController());

