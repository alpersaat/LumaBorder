/**
 * Ambition - Popup Controller
 * Hızlı ayar paneli, anlık sekme senkronizasyonu ve dil yönetimi
 */

import { settingsManager } from '../src/settings.js';
import { i18n, translations } from '../src/i18n.js';
import { computePopupBatteryView, computeStatusView } from '../src/battery-ui.js';

export class PopupController {
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
      chkWebGL: document.getElementById('chk-webgl'),
      chkMultiZone: document.getElementById('chk-multizone'),
      chkBarFill: document.getElementById('chk-barfill'),
      chkDebanding: document.getElementById('chk-debanding'),
      chkAudioReactive: document.getElementById('chk-audio-reactive'),
      chkNightShift: document.getElementById('chk-night-shift'),
      chkDynamicAccent: document.getElementById('chk-dynamic-accent'),
      chkAutoSubDim: document.getElementById('chk-auto-sub-dim'),
      chkFreeze: document.getElementById('chk-freeze'),
      chkDropSentinel: document.getElementById('chk-drop-sentinel'),
      chkUltraEco: document.getElementById('chk-ultra-eco'),
      chkLetterbox: document.getElementById('chk-letterbox'),
      chkPillarbox: document.getElementById('chk-pillarbox'),
      chkBatteryEco: document.getElementById('chk-battery-eco'),
      chkWorker: document.getElementById('chk-worker'),
      btnReset: document.getElementById('btn-reset'),
      presetButtons: document.querySelectorAll('.preset-pill'),
      biasModeButtons: document.querySelectorAll('.bias-mode-btn'),
      biasPaletteRow: document.getElementById('popup-bias-palette'),
      colorDots: document.querySelectorAll('.color-dot'),
      colorPicker: document.getElementById('popup-color-picker'),
      fpsButtons: document.querySelectorAll('.fps-mode-btn'),
      btnPosButtons: document.querySelectorAll('#btn-popup-pos-left, #btn-popup-pos-right'),
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

    // Buton konumu çevirileri
    const btnPosLeft = document.getElementById('btn-popup-pos-left');
    const btnPosRight = document.getElementById('btn-popup-pos-right');
    if (btnPosLeft) btnPosLeft.textContent = i18n.t('btnPosLeft');
    if (btnPosRight) btnPosRight.textContent = i18n.t('btnPosRight');

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
    const view = computeStatusView(settingsManager.current.enabled, i18n.t.bind(i18n));
    this.elements.statusText.textContent = view.text;
    this.elements.statusIndicator.classList.toggle('inactive', view.inactive);
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
    if (this.elements.chkWebGL) this.elements.chkWebGL.checked = s.renderEngine === 'webgl';
    if (this.elements.chkMultiZone) this.elements.chkMultiZone.checked = s.multiZone;
    if (this.elements.chkBarFill) this.elements.chkBarFill.checked = s.barFill;
    if (this.elements.chkDebanding) this.elements.chkDebanding.checked = s.debanding;
    if (this.elements.chkAudioReactive) this.elements.chkAudioReactive.checked = s.audioReactive;
    if (this.elements.chkNightShift) this.elements.chkNightShift.checked = s.nightShiftEnabled;
    if (this.elements.chkDynamicAccent) this.elements.chkDynamicAccent.checked = s.dynamicAccent;
    if (this.elements.chkAutoSubDim) this.elements.chkAutoSubDim.checked = s.autoSubtitleDim;
    if (this.elements.chkFreeze) this.elements.chkFreeze.checked = s.freezeDetection;
    if (this.elements.chkDropSentinel) this.elements.chkDropSentinel.checked = s.dropFrameSentinel;
    if (this.elements.chkUltraEco) this.elements.chkUltraEco.checked = s.ultraEco;
    if (this.elements.chkLetterbox) this.elements.chkLetterbox.checked = s.letterboxDetection;
    if (this.elements.chkPillarbox) this.elements.chkPillarbox.checked = s.pillarboxDetection;
    if (this.elements.chkBatteryEco) this.elements.chkBatteryEco.checked = s.autoBatteryEco;
    if (this.elements.chkWorker) this.elements.chkWorker.checked = s.workerRender;

    // FPS Modu
    this.updateFpsModeUI(s.targetFps || 'sync');

    // Buton Konumu
    this.updateButtonPositionUI(s.buttonPosition || 'left');

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

  updateButtonPositionUI(pos) {
    this.elements.btnPosButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.btnpos === pos);
    });
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
      settingsManager.current.enabled = enabled;
      this.updateStatusText();
      await settingsManager.save({ enabled });
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
    if (this.elements.chkWebGL) {
      this.elements.chkWebGL.addEventListener('change', async (e) => {
        const engine = e.target.checked ? 'webgl' : 'canvas2d';
        await settingsManager.save({ renderEngine: engine });
        this.notifyActiveTab();
      });
    }
    bindCheckbox(this.elements.chkMultiZone, 'multiZone');
    bindCheckbox(this.elements.chkBarFill, 'barFill');
    bindCheckbox(this.elements.chkDebanding, 'debanding');
    bindCheckbox(this.elements.chkAudioReactive, 'audioReactive');
    bindCheckbox(this.elements.chkNightShift, 'nightShiftEnabled');
    bindCheckbox(this.elements.chkDynamicAccent, 'dynamicAccent');
    bindCheckbox(this.elements.chkAutoSubDim, 'autoSubtitleDim');
    bindCheckbox(this.elements.chkFreeze, 'freezeDetection');
    bindCheckbox(this.elements.chkDropSentinel, 'dropFrameSentinel');
    bindCheckbox(this.elements.chkUltraEco, 'ultraEco');
    bindCheckbox(this.elements.chkLetterbox, 'letterboxDetection');
    bindCheckbox(this.elements.chkPillarbox, 'pillarboxDetection');
    bindCheckbox(this.elements.chkBatteryEco, 'autoBatteryEco', () => {
      this.updateBatteryUI();
    });
    bindCheckbox(this.elements.chkWorker, 'workerRender');

    // FPS Butonları
    this.elements.fpsButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const fps = btn.dataset.fps;
        this.updateFpsModeUI(fps);
        this.updateActivePresetPill('custom');
        await settingsManager.save({ targetFps: fps, activePreset: 'custom' });
        this.notifyActiveTab();
      });
    });

    // Buton Konumu Butonları
    this.elements.btnPosButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const pos = btn.dataset.btnpos;
        this.updateButtonPositionUI(pos);
        await settingsManager.save({ buttonPosition: pos });
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
      const view = computePopupBatteryView({ supported: false }, settingsManager.current.autoBatteryEco, i18n.t.bind(i18n));
      if (this.elements.batteryText) this.elements.batteryText.textContent = view.text;
      if (this.elements.batteryIcon) this.elements.batteryIcon.textContent = view.icon;
      return;
    }

    const view = computePopupBatteryView(
      { supported: true, charging: this.battery.charging, level: Math.round(this.battery.level * 100) },
      settingsManager.current.autoBatteryEco,
      i18n.t.bind(i18n)
    );

    this.elements.batteryBadge.classList.toggle('eco-active', view.ecoActive);
    this.elements.batteryBadge.classList.toggle('charging', view.charging);
    this.setBatteryEcoDisabled(false);

    if (this.elements.batteryIcon) this.elements.batteryIcon.textContent = view.icon;
    if (this.elements.batteryText) this.elements.batteryText.textContent = view.text;
  }

  setBatteryEcoDisabled(disabled) {
    const chk = this.elements.chkBatteryEco;
    if (!chk) return;
    chk.disabled = disabled;
    if (disabled && chk.checked) {
      chk.checked = false;
      settingsManager.save({ autoBatteryEco: false });
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
