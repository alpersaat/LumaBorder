/**
 * LumaBorder - In-Player Modern UI & Controls
 * YouTube player kontrol çubuğu butonu ve modern açılır ayarlar paneli
 * Standart YouTube ve YouTube Shorts destekli
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
    this.observer = null;
    this.mountRetryTimeout = null;
    this.onPlayerHover = null;
    this.onDocumentClick = null;
    this.onDocumentKeyDown = null;

    if (this.ambientEngine?.onBatteryChange) {
      this.batteryUnsub = this.ambientEngine.onBatteryChange((info) => {
        if (this.isOpen && this.activeTab === 'performance') {
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
    const isShorts = location.pathname.startsWith('/shorts') ||
      Boolean(this.player?.closest?.('ytd-shorts, ytd-reel-video-renderer, #shorts-player'));

    if (isShorts) {
      let activeReel = this.player?.closest?.('ytd-reel-video-renderer') ||
        document.querySelector('ytd-reel-video-renderer[is-active]');

      if (!activeReel) {
        const videos = Array.from(document.querySelectorAll('ytd-reel-video-renderer video'));
        const playingVideo = videos.find(v => !v.paused && v.readyState >= 2) || videos.find(v => !v.paused);
        if (playingVideo) {
          activeReel = playingVideo.closest('ytd-reel-video-renderer');
        }
      }

      if (!activeReel) {
        const reels = Array.from(document.querySelectorAll('ytd-reel-video-renderer'));
        if (reels.length > 0) {
          const centerY = window.innerHeight / 2;
          let minDistance = Infinity;
          for (const r of reels) {
            const rect = r.getBoundingClientRect();
            const dist = Math.abs((rect.top + rect.height / 2) - centerY);
            if (dist < minDistance) {
              minDistance = dist;
              activeReel = r;
            }
          }
        }
      }

      const shortsSelectors = [
        '#actions',
        'ytd-reel-player-overlay-renderer #actions',
        '#actions.ytd-reel-player-overlay-renderer',
        '.ytd-reel-player-overlay-renderer #actions',
        '#overlay #actions',
        '.ytd-reel-player-overlay-renderer'
      ];

      let target = null;
      if (activeReel) {
        for (const sel of shortsSelectors) {
          try {
            target = activeReel.querySelector(sel);
            if (target) break;
          } catch (e) {}
        }
      }

      if (!target) {
        for (const sel of shortsSelectors) {
          try {
            target = document.querySelector(sel);
            if (target) break;
          } catch (e) {}
        }
      }

      if (target) {
        return { container: target, type: 'shorts', anchor: null, isFallback: false };
      }

      // Shorts fallback: Player container üzerine floating buton
      const shortsContainer = activeReel?.querySelector?.('#player-container') || this.player || document.body;
      return { container: shortsContainer, type: 'shorts-floating', anchor: null, isFallback: true };
    }

    // Standart YouTube Player Kontrol Çubuğu Arama Kademesi (A/B Testi & Tasarım Güncelleme Koruması)
    const rightControlsSelectors = [
      '.ytp-right-controls',
      '.ytp-chrome-bottom .ytp-right-controls',
      '.ytp-chrome-controls .ytp-right-controls',
      '.ytp-controls-right',
      '#movie_player .ytp-right-controls',
      '.html5-video-player .ytp-right-controls'
    ];

    let rightControls = null;
    for (const sel of rightControlsSelectors) {
      try {
        rightControls = this.player?.querySelector?.(sel) || document.querySelector(sel);
        if (rightControls) break;
      } catch (e) {}
    }

    if (rightControls) {
      // Tercih sırasına göre yanına eklenecek buton araması
      const anchorSelectors = [
        '.ytp-settings-button',
        '.ytp-subtitles-button',
        '.ytp-miniplayer-button',
        '.ytp-size-button',
        '.ytp-fullscreen-button',
        '.ytp-remote-button'
      ];

      let anchor = null;
      for (const sel of anchorSelectors) {
        try {
          anchor = rightControls.querySelector(sel);
          if (anchor) break;
        } catch (e) {}
      }

      return { container: rightControls, type: 'standard', anchor, isFallback: false };
    }

    // Alternatif 1: Alt kontrol çubuğunun kendisi (.ytp-chrome-bottom)
    const bottomControls = this.player?.querySelector?.('.ytp-chrome-bottom') ||
      this.player?.querySelector?.('.ytp-chrome-controls') ||
      document.querySelector('.ytp-chrome-bottom');
    if (bottomControls) {
      return { container: bottomControls, type: 'standard-alt', anchor: null, isFallback: false };
    }

    // Alternatif 2: Sol kontrol çubuğu (.ytp-left-controls)
    const leftControls = this.player?.querySelector?.('.ytp-left-controls') ||
      document.querySelector('.ytp-left-controls');
    if (leftControls) {
      return { container: leftControls, type: 'standard-left', anchor: null, isFallback: false };
    }

    // Alternatif 3: Üst çubuk (.ytp-chrome-top-buttons / .ytp-chrome-top)
    const topControls = this.player?.querySelector?.('.ytp-chrome-top-buttons') ||
      this.player?.querySelector?.('.ytp-chrome-top');
    if (topControls) {
      return { container: topControls, type: 'standard-top', anchor: null, isFallback: false };
    }

    // Nihai Fallback: Player container üzerine sabit yüzen buton (Floating HUD)
    return { container: this.player || document.querySelector('#movie_player') || document.body, type: 'floating', anchor: null, isFallback: true };
  }

  mountButton() {
    try {
      const target = this.resolveControlsTarget();
      if (!target || !target.container) {
        this.scheduleMountRetry();
        return;
      }

      // Buton zaten bağlı ve doğru container içinde mi?
      if (this.button && this.button.isConnected && this.button.parentElement === target.container) {
        return;
      }

      // Eski veya öksüz butonları temizle
      const existing = document.querySelectorAll('.lumaborder-player-btn, .lumaborder-shorts-btn, .lumaborder-floating-btn');
      existing.forEach(b => {
        if (b !== this.button) b.remove();
      });

      if (!this.button) {
        this.button = document.createElement('button');
        this.button.setAttribute('aria-haspopup', 'true');
        this.button.setAttribute('aria-label', i18n.t('appName'));
        this.button.innerHTML = `
          <svg viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 19c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h-4v1zm2-17c2.76 0 5 2.24 5 5 0 1.95-1.12 3.63-2.76 4.46L14 11.6V16h-4v-4.4l-.24-.14C8.12 10.63 7 8.95 7 7c0-2.76 2.24-5 5-5z"/>
          </svg>
        `;

        this.button.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          this.toggleMenu();
        });
      }

      // Stil ve başlık güncelleme
      if (target.type === 'shorts') {
        this.button.className = 'lumaborder-shorts-btn';
        this.button.title = `${i18n.t('appName')} - Shorts Ambient`;
      } else if (target.isFallback || target.type === 'floating' || target.type === 'shorts-floating') {
        this.button.className = 'lumaborder-floating-btn';
        this.button.title = `${i18n.t('appName')} - ${i18n.t('appTagline')}`;
      } else {
        this.button.className = 'ytp-button lumaborder-player-btn';
        this.button.title = `${i18n.t('appName')} - ${i18n.t('appTagline')}`;
      }

      // Container içine yerleştir
      if (target.anchor && target.anchor.parentNode === target.container) {
        target.container.insertBefore(this.button, target.anchor);
      } else {
        target.container.appendChild(this.button);
      }

      this.updateButtonState();
    } catch (err) {
      console.warn('[LumaBorder] Buton yerleştirme hatası:', err);
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
      console.warn('[LumaBorder] DOM Observer hatası:', err);
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
      this.player.addEventListener('mouseenter', this.onPlayerHover, { passive: true });
      this.player.addEventListener('mousemove', this.onPlayerHover, { passive: true });
    }

    // Dışarı tıklandığında menüyü kapat
    this.onDocumentClick = (e) => {
      if (this.isOpen && this.menuOverlay && !this.menuOverlay.contains(e.target) && this.button && !this.button.contains(e.target)) {
        this.closeMenu();
      }
    };
    document.addEventListener('click', this.onDocumentClick);

    // ESC basıldığında kapat
    this.onDocumentKeyDown = (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    };
    document.addEventListener('keydown', this.onDocumentKeyDown);
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
      <span class="lumaborder-badge">v2.2 • LumaBorder Pro</span>
    `;

    this.menuOverlay.appendChild(header);
    this.menuOverlay.appendChild(tabs);
    this.menuOverlay.appendChild(content);
    this.menuOverlay.appendChild(footer);

    // Menü içindeki tıklama ve klavye etkileşimlerinin YouTube oynatıcısını tetiklemesini önle
    this.menuOverlay.addEventListener('click', (e) => e.stopPropagation());
    this.menuOverlay.addEventListener('mousedown', (e) => e.stopPropagation());
    this.menuOverlay.addEventListener('keydown', (e) => e.stopPropagation());
    this.menuOverlay.addEventListener('keyup', (e) => e.stopPropagation());

    const isShorts = location.pathname.startsWith('/shorts') ||
      Boolean(this.player?.closest?.('ytd-shorts, ytd-reel-video-renderer, #shorts-player'));

    const fullscreenElem = document.fullscreenElement;

    if (fullscreenElem) {
      fullscreenElem.appendChild(this.menuOverlay);
    } else if (isShorts) {
      this.menuOverlay.classList.add('lumaborder-shorts-menu');
      document.body.appendChild(this.menuOverlay);
    } else {
      const targetContainer = this.player || document.querySelector('#movie_player') || document.body;
      targetContainer.appendChild(this.menuOverlay);
    }

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

        <!-- Çift Katmanlı Glow (Dual-Layer) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${i18n.t('dualLayerGlow')}</span>
            <span class="lumaborder-master-sub">${i18n.t('dualLayerDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-duallayer" ${s.dualLayerGlow ? 'checked' : ''}>
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
      const isBiasOff = s.biasLightingMode === 'off';
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

        <!-- Altyazı Koruması (Alt Karartma) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${i18n.t('bottomFade')}</span>
            <span class="lumaborder-master-sub">${i18n.t('bottomFadeDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-bottomfade" ${s.bottomFade ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <div class="lumaborder-control-row" id="row-bottomfade-strength" style="${s.bottomFade ? '' : 'display:none;'}">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${i18n.t('bottomFadeStrength')}</span>
            <span class="lumaborder-control-value" id="val-bottomfade-strength">${s.bottomFadeStrength || 60}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-bottomfade-strength" min="20" max="100" value="${s.bottomFadeStrength || 60}">
        </div>

        <!-- Sabit Arka Işık (Bias Lighting) -->
        <div class="lumaborder-section-divider"></div>
        <div class="lumaborder-control-header" style="margin-top: 10px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${i18n.t('biasLighting')}</span>
        </div>
        <div class="lumaborder-bias-modes">
          <button class="lumaborder-mode-pill ${s.biasLightingMode === 'off' ? 'active' : ''}" data-biasmode="off">${i18n.t('biasModeOff')}</button>
          <button class="lumaborder-mode-pill ${s.biasLightingMode === 'pause' ? 'active' : ''}" data-biasmode="pause">${i18n.t('biasModePause')}</button>
          <button class="lumaborder-mode-pill ${s.biasLightingMode === 'always' ? 'active' : ''}" data-biasmode="always">${i18n.t('biasModeAlways')}</button>
        </div>

        <div class="lumaborder-color-palette" id="bias-color-palette" style="${isBiasOff ? 'display:none;' : ''}">
          <span class="lumaborder-control-label" style="font-size: 11px;">${i18n.t('biasLightingColor')}:</span>
          <div class="lumaborder-color-dots">
            <button class="lumaborder-color-dot ${s.biasLightingColor === '#ffe4b5' ? 'active' : ''}" data-color="#ffe4b5" title="${i18n.t('biasColorWarm')}" style="background: #ffe4b5;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === '#fff4e8' ? 'active' : ''}" data-color="#fff4e8" title="${i18n.t('biasColorNeutral')}" style="background: #fff4e8;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === '#ffffff' ? 'active' : ''}" data-color="#ffffff" title="${i18n.t('biasColorCinema')}" style="background: #ffffff;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === '#00e5ff' ? 'active' : ''}" data-color="#00e5ff" title="${i18n.t('biasColorCyber')}" style="background: #00e5ff;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === '#ff5e00' ? 'active' : ''}" data-color="#ff5e00" title="${i18n.t('biasColorSunset')}" style="background: #ff5e00;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === '#bd00ff' ? 'active' : ''}" data-color="#bd00ff" title="${i18n.t('biasColorPurple')}" style="background: #bd00ff;"></button>
            <input type="color" id="bias-custom-color" class="lumaborder-color-picker" value="${(typeof s.biasLightingColor === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(s.biasLightingColor.trim())) ? s.biasLightingColor.trim() : '#ffe4b5'}" title="${i18n.t('biasColorCustom')}">
          </div>
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
      const fpsLabel = s.targetFps === 'sync' ? i18n.t('fpsSync') : `${s.targetFps} FPS`;
      return `
        <!-- Hedef Kare Hızı (FPS Limiti) -->
        <div class="lumaborder-control-header" style="margin-top: 4px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${i18n.t('targetFps')}</span>
          <span class="lumaborder-control-value" id="val-target-fps">${fpsLabel}</span>
        </div>
        <div class="lumaborder-fps-modes">
          <button class="lumaborder-mode-pill ${s.targetFps === 'sync' ? 'active' : ''}" data-fps="sync">${i18n.t('fpsSync')}</button>
          <button class="lumaborder-mode-pill ${String(s.targetFps) === '60' ? 'active' : ''}" data-fps="60">${i18n.t('fps60')}</button>
          <button class="lumaborder-mode-pill ${String(s.targetFps) === '30' ? 'active' : ''}" data-fps="30">${i18n.t('fps30')}</button>
        </div>
        <div class="lumaborder-hint-text">${i18n.t('targetFpsDesc')}</div>

        <!-- Akıllı Pil Tasarrufu (%20 Altı Otomatik 30 FPS) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${i18n.t('autoBatteryEco')}</span>
            <span class="lumaborder-master-sub">${i18n.t('autoBatteryEcoDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-battery-eco" ${s.autoBatteryEco ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Canlı Pil Durumu Kartı -->
        <div class="lumaborder-battery-card" id="lumaborder-battery-card">
          <div class="lumaborder-battery-info">
            <span class="lumaborder-battery-icon" id="lumaborder-battery-icon">🔋</span>
            <div class="lumaborder-battery-text">
              <span class="lumaborder-battery-title" id="lumaborder-battery-title">${i18n.t('batteryStatusTitle')}</span>
              <span class="lumaborder-battery-sub" id="lumaborder-battery-sub">Kontrol ediliyor...</span>
            </div>
          </div>
          <span class="lumaborder-battery-tag" id="lumaborder-battery-tag">--</span>
        </div>

        <!-- OffscreenCanvas & Worker Render -->
        <div class="lumaborder-master-card" style="margin-top: 12px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${i18n.t('workerRender')}</span>
            <span class="lumaborder-master-sub">${i18n.t('workerRenderDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-worker" ${s.workerRender ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Siyah Şerit Algılama: Letterbox (Üst/Alt) -->
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

        <!-- Siyah Şerit Algılama: Pillarbox (Sağ/Sol) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${i18n.t('pillarboxDetection')}</span>
            <span class="lumaborder-master-sub">${i18n.t('pillarboxDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-pillarbox" ${s.pillarboxDetection ? 'checked' : ''}>
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

    if (this.tabAbortController) {
      this.tabAbortController.abort();
    }
    this.tabAbortController = new AbortController();
    const { signal } = this.tabAbortController;

    // Master Switch
    const masterToggle = this.menuOverlay.querySelector('#lumaborder-master-toggle');
    if (masterToggle) {
      masterToggle.addEventListener('change', async (e) => {
        const enabled = e.target.checked;
        await this.settingsManager.save({ enabled });
        this.ambientEngine.applySettings({ enabled });
        this.updateButtonState();
      }, { signal });
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
        }, { signal });
        slider.addEventListener('change', async (e) => {
          const val = parseInt(e.target.value, 10);
          await this.settingsManager.save({ [key]: val, activePreset: 'custom' });
        }, { signal });
      }
    };

    bindSlider('brightness', 'brightness', '%');
    bindSlider('spread', 'spread', '%');
    bindSlider('blur', 'blur', 'px');
    bindSlider('saturation', 'saturation', '%');
    bindSlider('contrast', 'contrast', '%');
    bindSlider('smoothing', 'smoothing', '%');
    bindSlider('bottomfade-strength', 'bottomFadeStrength', '%');

    // Preset butonları
    const presetBtns = this.menuOverlay.querySelectorAll('.lumaborder-preset-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const presetKey = btn.dataset.preset;
        await this.settingsManager.applyPreset(presetKey);
        this.ambientEngine.applySettings(this.settingsManager.current);
        this.renderMenu();
      }, { signal });
    });

    // Checkbox'lar
    const bindCheckbox = (id, key, onChangeExtra) => {
      const chk = this.menuOverlay.querySelector(`#chk-${id}`);
      if (chk) {
        chk.addEventListener('change', async (e) => {
          await this.settingsManager.save({ [key]: e.target.checked });
          this.ambientEngine.applySettings({ [key]: e.target.checked });
          if (onChangeExtra) onChangeExtra(e.target.checked);
        }, { signal });
      }
    };

    bindCheckbox('duallayer', 'dualLayerGlow');
    bindCheckbox('letterbox', 'letterboxDetection');
    bindCheckbox('pillarbox', 'pillarboxDetection');
    bindCheckbox('eco', 'ecoMode');
    bindCheckbox('battery-eco', 'autoBatteryEco', () => {
      this.updateBatteryCard(this.ambientEngine?.batteryInfo);
    });
    bindCheckbox('worker', 'workerRender');
    bindCheckbox('bottomfade', 'bottomFade', (checked) => {
      const row = this.menuOverlay.querySelector('#row-bottomfade-strength');
      if (row) row.style.display = checked ? 'block' : 'none';
    });

    // FPS Butonları
    const fpsBtns = this.menuOverlay.querySelectorAll('.lumaborder-fps-modes .lumaborder-mode-pill');
    fpsBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const fps = btn.dataset.fps;
        fpsBtns.forEach(b => b.classList.toggle('active', b === btn));
        const valFps = this.menuOverlay.querySelector('#val-target-fps');
        if (valFps) valFps.textContent = fps === 'sync' ? i18n.t('fpsSync') : `${fps} FPS`;
        await this.settingsManager.save({ targetFps: fps, activePreset: 'custom' });
        this.ambientEngine.applySettings({ targetFps: fps });
      }, { signal });
    });

    // Pil Bilgisi Kartı
    this.updateBatteryCard(this.ambientEngine?.batteryInfo);

    // Bias Lighting Mode Butonları (Yalnızca bias modu butonlarını seç)
    const biasModeBtns = this.menuOverlay.querySelectorAll('.lumaborder-bias-modes .lumaborder-mode-pill');
    biasModeBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const mode = btn.dataset.biasmode;
        biasModeBtns.forEach(b => b.classList.toggle('active', b === btn));
        await this.settingsManager.save({ biasLightingMode: mode });
        this.ambientEngine.applySettings({ biasLightingMode: mode });
        const palette = this.menuOverlay.querySelector('#bias-color-palette');
        if (palette) palette.style.display = mode === 'off' ? 'none' : 'block';
      }, { signal });
    });

    // Bias Lighting Renk Noktaları
    const colorDots = this.menuOverlay.querySelectorAll('.lumaborder-color-dot');
    colorDots.forEach(dot => {
      dot.addEventListener('click', async () => {
        const color = dot.dataset.color;
        colorDots.forEach(d => d.classList.toggle('active', d === dot));
        await this.settingsManager.save({ biasLightingColor: color });
        this.ambientEngine.applySettings({ biasLightingColor: color });
        const picker = this.menuOverlay.querySelector('#bias-custom-color');
        if (picker) picker.value = color;
      }, { signal });
    });

    // Custom Color Picker
    const customColor = this.menuOverlay.querySelector('#bias-custom-color');
    if (customColor) {
      customColor.addEventListener('input', (e) => {
        this.ambientEngine.applySettings({ biasLightingColor: e.target.value });
      }, { signal });
      customColor.addEventListener('change', async (e) => {
        await this.settingsManager.save({ biasLightingColor: e.target.value });
        colorDots.forEach(d => d.classList.remove('active'));
      }, { signal });
    }
  }

  updateBatteryCard(info) {
    if (!this.menuOverlay) return;
    const card = this.menuOverlay.querySelector('#lumaborder-battery-card');
    const title = this.menuOverlay.querySelector('#lumaborder-battery-title');
    const sub = this.menuOverlay.querySelector('#lumaborder-battery-sub');
    const tag = this.menuOverlay.querySelector('#lumaborder-battery-tag');
    const icon = this.menuOverlay.querySelector('#lumaborder-battery-icon');
    if (!card || !title || !sub || !tag || !icon) return;

    if (!info || !info.supported) {
      icon.textContent = '🔌';
      title.textContent = i18n.t('batteryStatusTitle');
      sub.textContent = i18n.t('batteryNotSupported');
      tag.textContent = 'Masaüstü/Harici';
      tag.className = 'lumaborder-battery-tag desktop';
      return;
    }

    const isCharging = info.charging;
    const level = info.level;
    const isEco = this.settingsManager.current.autoBatteryEco && !isCharging && level <= 20;

    icon.textContent = isCharging ? '⚡' : (level <= 20 ? '🪫' : '🔋');
    title.textContent = `${i18n.t('batteryStatusTitle')}: %${level} (${isCharging ? i18n.t('batteryCharging') : i18n.t('batteryDischarging')})`;

    if (isEco) {
      sub.textContent = i18n.t('batteryEcoActiveBadge');
      tag.textContent = '30 FPS Eko';
      tag.className = 'lumaborder-battery-tag eco';
    } else if (isCharging) {
      sub.textContent = i18n.t('batteryEcoDisabledBadge');
      tag.textContent = `%${level} Şarjda`;
      tag.className = 'lumaborder-battery-tag charging';
    } else {
      sub.textContent = i18n.t('batteryEcoDisabledBadge');
      tag.textContent = `%${level} Pilde`;
      tag.className = 'lumaborder-battery-tag normal';
    }
  }

  updateTarget(playerElem, ambientEngine) {
    if (this.player && this.onPlayerHover) {
      this.player.removeEventListener('mouseenter', this.onPlayerHover);
      this.player.removeEventListener('mousemove', this.onPlayerHover);
    }

    this.player = playerElem;
    this.ambientEngine = ambientEngine;

    if (this.player && this.onPlayerHover) {
      this.player.addEventListener('mouseenter', this.onPlayerHover, { passive: true });
      this.player.addEventListener('mousemove', this.onPlayerHover, { passive: true });
    }

    this.mountButton();

    if (this.isOpen && this.menuOverlay) {
      const isShorts = location.pathname.startsWith('/shorts') ||
        Boolean(this.player?.closest?.('ytd-shorts, ytd-reel-video-renderer, #shorts-player'));
      this.menuOverlay.classList.toggle('lumaborder-shorts-menu', isShorts);
      if (this.activeTab === 'performance') {
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
      this.player.removeEventListener('mouseenter', this.onPlayerHover);
      this.player.removeEventListener('mousemove', this.onPlayerHover);
      this.onPlayerHover = null;
    }

    if (this.onDocumentClick) {
      document.removeEventListener('click', this.onDocumentClick);
      this.onDocumentClick = null;
    }

    if (this.onDocumentKeyDown) {
      document.removeEventListener('keydown', this.onDocumentKeyDown);
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
}
