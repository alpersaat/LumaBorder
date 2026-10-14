/**
 * Ambition - Popup Controller
 * Hızlı ayar paneli, anlık sekme senkronizasyonu ve dil yönetimi
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
    this.initBatteryListener();
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
      chkDualLayer: document.getElementById('chk-duallayer'),
      chkBottomFade: document.getElementById('chk-bottomfade'),
      chkLetterbox: document.getElementById('chk-letterbox'),
      chkPillarbox: document.getElementById('chk-pillarbox'),
      chkEco: document.getElementById('chk-eco'),
      chkBatteryEco: document.getElementById('chk-battery-eco'),
      chkWorker: document.getElementById('chk-worker'),
      btnReset: document.getElementById('btn-reset'),
      presetButtons: document.querySelectorAll('.preset-pill'),
      biasModeButtons: document.querySelectorAll('.bias-mode-btn'),
      biasPaletteRow: document.getElementById('popup-bias-palette'),
      colorDots: document.querySelectorAll('.color-dot'),
      colorPicker: document.getElementById('popup-color-picker'),
      fpsButtons: document.querySelectorAll('.fps-mode-btn'),
      batteryBadge: document.getElementById('popup-battery-badge'),
      batteryIcon: document.getElementById('popup-battery-icon'),
      batteryText: document.getElementById('popup-battery-text')
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

    // Bias modu buton çevirileri
    const btnBiasOff = document.getElementById('btn-bias-off');
    const btnBiasPause = document.getElementById('btn-bias-pause');
    const btnBiasAlways = document.getElementById('btn-bias-always');
    if (btnBiasOff) btnBiasOff.textContent = i18n.t('biasModeOff');
    if (btnBiasPause) btnBiasPause.textContent = i18n.t('biasModePause');
    if (btnBiasAlways) btnBiasAlways.textContent = i18n.t('biasModeAlways');

    // FPS buton çevirileri
    const btnFpsSync = document.getElementById('btn-fps-sync');
    const btnFps60 = document.getElementById('btn-fps-60');
    const btnFps30 = document.getElementById('btn-fps-30');
    if (btnFpsSync) btnFpsSync.textContent = i18n.t('fpsSync');
    if (btnFps60) btnFps60.textContent = i18n.t('fps60');
    if (btnFps30) btnFps30.textContent = i18n.t('fps30');

    this.updateStatusText();
    this.updateBatteryUI();
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

    if (this.elements.chkDualLayer) this.elements.chkDualLayer.checked = s.dualLayerGlow;
    if (this.elements.chkBottomFade) this.elements.chkBottomFade.checked = s.bottomFade;
    if (this.elements.chkLetterbox) this.elements.chkLetterbox.checked = s.letterboxDetection;
    if (this.elements.chkPillarbox) this.elements.chkPillarbox.checked = s.pillarboxDetection;
    if (this.elements.chkEco) this.elements.chkEco.checked = s.ecoMode;
    if (this.elements.chkBatteryEco) this.elements.chkBatteryEco.checked = s.autoBatteryEco;
    if (this.elements.chkWorker) this.elements.chkWorker.checked = s.workerRender;

    // FPS Modu
    this.updateFpsModeUI(s.targetFps || 'sync');

    // Bias Lighting Mode
    this.updateBiasModeUI(s.biasLightingMode || 'off');

    // Bias Color
    const color = s.biasLightingColor || '#ffe4b5';
    if (this.elements.colorPicker) this.elements.colorPicker.value = color;
    this.elements.colorDots.forEach(dot => {
      dot.classList.toggle('active', dot.dataset.color === color);
    });

    this.updateActivePresetPill(s.activePreset);
  }

  updateFpsModeUI(fps) {
    this.elements.fpsButtons.forEach(btn => {
      btn.classList.toggle('active', String(btn.dataset.fps) === String(fps));
    });
  }

  updateBiasModeUI(mode) {
    this.elements.biasModeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.biasmode === mode);
    });
    if (this.elements.biasPaletteRow) {
      this.elements.biasPaletteRow.style.display = mode === 'off' ? 'none' : 'block';
    }
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
    const bindCheckbox = (el, key, onChange) => {
      if (el) {
        el.addEventListener('change', async (e) => {
          await settingsManager.save({ [key]: e.target.checked });
          if (onChange) onChange();
          this.notifyActiveTab();
        });
      }
    };

    bindCheckbox(this.elements.chkDualLayer, 'dualLayerGlow');
    bindCheckbox(this.elements.chkBottomFade, 'bottomFade');
    bindCheckbox(this.elements.chkLetterbox, 'letterboxDetection');
    bindCheckbox(this.elements.chkPillarbox, 'pillarboxDetection');
    bindCheckbox(this.elements.chkEco, 'ecoMode');
    bindCheckbox(this.elements.chkBatteryEco, 'autoBatteryEco', () => {
      this.updateBatteryUI();
    });
    bindCheckbox(this.elements.chkWorker, 'workerRender');

    // FPS Butonları
    this.elements.fpsButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const fps = btn.dataset.fps;
        this.updateFpsModeUI(fps);
        await settingsManager.save({ targetFps: fps, activePreset: 'custom' });
        this.updateActivePresetPill('custom');
        this.notifyActiveTab();
      });
    });

    // Bias Lighting Modları
    this.elements.biasModeButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const mode = btn.dataset.biasmode;
        this.updateBiasModeUI(mode);
        await settingsManager.save({ biasLightingMode: mode });
        this.notifyActiveTab();
      });
    });

    // Bias Lighting Renk Seçimleri
    this.elements.colorDots.forEach(dot => {
      dot.addEventListener('click', async () => {
        const color = dot.dataset.color;
        this.elements.colorDots.forEach(d => d.classList.toggle('active', d === dot));
        if (this.elements.colorPicker) this.elements.colorPicker.value = color;
        await settingsManager.save({ biasLightingColor: color });
        this.notifyActiveTab();
      });
    });

    if (this.elements.colorPicker) {
      this.elements.colorPicker.addEventListener('change', async (e) => {
        const color = e.target.value;
        this.elements.colorDots.forEach(d => d.classList.remove('active'));
        await settingsManager.save({ biasLightingColor: color });
        this.notifyActiveTab();
      });
    }

    // Sıfırla
    this.elements.btnReset.addEventListener('click', async () => {
      if (confirm(i18n.t('resetConfirm'))) {
        await settingsManager.reset();
        this.renderSettingsValues();
        this.notifyActiveTab();
      }
    });
  }

  initBatteryListener() {
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        this.battery = battery;
        const onUpdate = () => this.updateBatteryUI();
        battery.addEventListener('chargingchange', onUpdate);
        battery.addEventListener('levelchange', onUpdate);
        this.updateBatteryUI();
      }).catch(() => {
        this.updateBatteryUI();
      });
    } else {
      this.updateBatteryUI();
    }
  }

  updateBatteryUI() {
    if (!this.elements.batteryBadge) return;
    if (!this.battery) {
      if (this.elements.batteryText) {
        this.elements.batteryText.textContent = `${i18n.t('batteryStatusTitle')}: ${i18n.t('batteryNotSupported')}`;
      }
      if (this.elements.batteryIcon) this.elements.batteryIcon.textContent = '🔌';
      return;
    }

    const charging = this.battery.charging;
    const level = Math.round(this.battery.level * 100);
    const isEco = settingsManager.current.autoBatteryEco && !charging && level <= 20;

    this.elements.batteryBadge.classList.toggle('eco-active', isEco);
    this.elements.batteryBadge.classList.toggle('charging', charging);

    if (this.elements.batteryIcon) {
      this.elements.batteryIcon.textContent = charging ? '⚡' : (level <= 20 ? '🪫' : '🔋');
    }

    if (this.elements.batteryText) {
      if (isEco) {
        this.elements.batteryText.textContent = `%${level} • ${i18n.t('batteryEcoActiveBadge')}`;
      } else if (charging) {
        this.elements.batteryText.textContent = `%${level} (${i18n.t('batteryCharging')})`;
      } else {
        this.elements.batteryText.textContent = `%${level} (${i18n.t('batteryDischarging')})`;
      }
    }
  }

  notifyActiveTab() {
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'SETTINGS_UPDATED' }, () => {
            // Hedef sekmede content script yoksa hatayı sessizce yut
            if (chrome.runtime.lastError) {}
          });
        }
      });
    }
  }

  checkActiveTab() {
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeUrl = tabs[0]?.url || '';
        if (activeUrl && !activeUrl.includes('youtube.com')) {
          if (this.elements.statusText) {
            this.elements.statusText.textContent = i18n.t('notOnYoutube');
          }
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => new PopupController());
