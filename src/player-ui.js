/**
 * LumaBorder - In-Player Modern UI & Controls
 * YouTube player kontrol çubuğu butonu ve modern açılır ayarlar paneli
 */

import { i18n } from './i18n.js';
import { PRESETS } from './settings.js';

export class PlayerUI {
  constructor(playerElem, settingsManager, ambientEngine) {
    this.player = playerElem;
    this.settingsManager = settingsManager;
    this.ambientEngine = ambientEngine;

    this.button = null;
    this.menuOverlay = null;
    this.isOpen = false;
    this.activeTab = 'general';

    this.initButton();
  }

  initButton() {
    const rightControls = this.player.querySelector('.ytp-right-controls');
    if (!rightControls) return;

    // Varsa eski butonu kaldır
    const oldBtn = rightControls.querySelector('.lumaborder-player-btn');
    if (oldBtn) oldBtn.remove();

    this.button = document.createElement('button');
    this.button.className = 'ytp-button lumaborder-player-btn';
    this.button.title = `${i18n.t('appName')} - ${i18n.t('appTagline')}`;
    this.button.setAttribute('aria-haspopup', 'true');
    this.button.setAttribute('aria-label', i18n.t('appName'));

    // Modern parlayan ampul / güneş ambilight ikonu
    this.button.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 19c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h-4v1zm2-17c2.76 0 5 2.24 5 5 0 1.95-1.12 3.63-2.76 4.46L14 11.6V16h-4v-4.4l-.24-.14C8.12 10.63 7 8.95 7 7c0-2.76 2.24-5 5-5z"/>
      </svg>
    `;

    // Butonu Ayarlar çarkından (settings button) hemen önceye ekle
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

    // Dışarı tıklanınca menüyü kapat
    document.addEventListener('click', (e) => {
      if (this.isOpen && this.menuOverlay && !this.menuOverlay.contains(e.target) && !this.button.contains(e.target)) {
        this.closeMenu();
      }
    });

    // ESC basılınca kapat
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });

    this.updateButtonState();
  }

  updateButtonState() {
    if (!this.button) return;
    const isEnabled = this.settingsManager.current.enabled;
    this.button.classList.toggle('active', isEnabled);
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

    // Başlık & Üst Bar
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

    // Sekmeler
    const tabs = document.createElement('div');
    tabs.className = 'lumaborder-tabs';
    tabs.innerHTML = `
      <button class="lumaborder-tab ${this.activeTab === 'general' ? 'active' : ''}" data-tab="general">${i18n.t('tabGeneral')}</button>
      <button class="lumaborder-tab ${this.activeTab === 'effects' ? 'active' : ''}" data-tab="effects">${i18n.t('tabEffects')}</button>
      <button class="lumaborder-tab ${this.activeTab === 'presets' ? 'active' : ''}" data-tab="presets">${i18n.t('tabPresets')}</button>
      <button class="lumaborder-tab ${this.activeTab === 'performance' ? 'active' : ''}" data-tab="performance">${i18n.t('tabPerformance')}</button>
    `;

    // İçerik Alanı
    const content = document.createElement('div');
    content.className = 'lumaborder-tab-content';
    content.innerHTML = this.getTabContentHTML(this.activeTab);

    // Alt Bar
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
        <!-- Master Switch -->
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

        <!-- Parlaklık -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${i18n.t('brightness')}</span>
            <span class="lumaborder-control-value" id="val-brightness">${s.brightness}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-brightness" min="20" max="250" value="${s.brightness}">
        </div>

        <!-- Yayılma -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${i18n.t('spread')}</span>
            <span class="lumaborder-control-value" id="val-spread">${s.spread}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-spread" min="5" max="100" value="${s.spread}">
        </div>

        <!-- Bulanıklık / Yumuşaklık -->
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
        <!-- Doygunluk -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${i18n.t('saturation')}</span>
            <span class="lumaborder-control-value" id="val-saturation">${s.saturation}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-saturation" min="50" max="220" value="${s.saturation}">
        </div>

        <!-- Kontrast -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${i18n.t('contrast')}</span>
            <span class="lumaborder-control-value" id="val-contrast">${s.contrast}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-contrast" min="60" max="160" value="${s.contrast}">
        </div>

        <!-- Kare Yumuşatma -->
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
        <!-- Siyah Şerit Algılama -->
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

        <!-- Güç Tasarrufu -->
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

    // Kapat butonu
    const closeBtn = this.menuOverlay.querySelector('#lumaborder-close-menu');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeMenu());

    // Dil butonu
    const langBtn = this.menuOverlay.querySelector('#lumaborder-lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', async () => {
        const nextLang = this.settingsManager.current.language === 'en' ? 'tr' : 'en';
        await this.settingsManager.save({ language: nextLang });
        i18n.setLanguage(nextLang);
        this.renderMenu();
      });
    }

    // Sıfırla
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

    // Sekme geçişleri
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

    // Master Switch
    const masterToggle = this.menuOverlay.querySelector('#lumaborder-master-toggle');
    if (masterToggle) {
      masterToggle.addEventListener('change', async (e) => {
        const enabled = e.target.checked;
        await this.settingsManager.save({ enabled });
        this.ambientEngine.applySettings({ enabled });
        this.updateButtonState();
      });
    }

    // Slider'lar
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

    // Preset butonları
    const presetBtns = this.menuOverlay.querySelectorAll('.lumaborder-preset-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const presetKey = btn.dataset.preset;
        await this.settingsManager.applyPreset(presetKey);
        this.ambientEngine.applySettings(this.settingsManager.current);
        this.renderMenu();
      });
    });

    // Checkbox'lar
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
