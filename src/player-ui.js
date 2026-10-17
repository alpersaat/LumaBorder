/**
 * LumaBorder - In-Player Modern UI & Controls
 * YouTube player kontrol çubuğu butonu ve modern açılır ayarlar paneli
 * Standart YouTube ve YouTube Shorts destekli
 */

import { i18n } from './i18n.js';
import { PRESETS } from './settings.js';
import { resolveControlsTarget as resolveControlsTargetPure, isShortsContext } from './ui-target.js';
import { getTabContentHTML } from './menu-content.js';

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
   * YouTube A/B testleri, Shorts ve yeni UI düzenlerine karşı çok katmanlı DOM hedef çözücü.
   * Saf mantık src/ui-target.js içindedir ve tests/ui-target.test.js ile doğrulanır.
   */
  resolveControlsTarget() {
    return resolveControlsTargetPure(document, this.player, {
      isShorts: isShortsContext(this.player, location.pathname),
      buttonPosition: this.settingsManager?.current?.buttonPosition || 'left',
      innerHeight: typeof window !== 'undefined' ? window.innerHeight : 0
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
        if (target.type === 'standard-left') {
          if (target.container.lastElementChild === this.button) return;
        } else {
          return;
        }
      }

      const existing = document.querySelectorAll('.lumaborder-player-btn, .lumaborder-shorts-btn, .lumaborder-floating-btn');
      existing.forEach(b => {
        if (b !== this.button) b.remove();
      });

      if (!this.button) {
        this.button = document.createElement('button');
        this.button.setAttribute('aria-haspopup', 'true');
        this.button.setAttribute('aria-label', i18n.t('appName'));
        this.button.innerHTML = `
          <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
            <path class="ytp-svg-shadow" transform="matrix(0.8, 0, 0, 0.8, 8.4, 1.4)" d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 19c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h-4v1zm2-17c2.76 0 5 2.24 5 5 0 1.95-1.12 3.63-2.76 4.46L14 11.6V16h-4v-4.4l-.24-.14C8.12 10.63 7 8.95 7 7c0-2.76 2.24-5 5-5z"/>
            <path class="ytp-svg-fill" transform="matrix(0.8, 0, 0, 0.8, 8.4, 1.4)" d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 19c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h-4v1zm2-17c2.76 0 5 2.24 5 5 0 1.95-1.12 3.63-2.76 4.46L14 11.6V16h-4v-4.4l-.24-.14C8.12 10.63 7 8.95 7 7c0-2.76 2.24-5 5-5z"/>
          </svg>
        `;

        this.button.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          this.toggleMenu();
        });
      }

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

      if (target.type === 'standard-left') {
        // Sol tarafa yerleşim: ytp-left-controls sonuna (zaman ve bölüm göstergesinin sağına) eklenir
        target.container.appendChild(this.button);
      } else if (target.type === 'shorts') {
        target.container.appendChild(this.button);
      } else {
        // Sağ kontroller veya fallback: ASLA tam ekran butonunun sağına/üstüne eklenmez!
        if (target.type === 'floating' || target.type === 'shorts-floating') {
          // Yüzen (fallback) HUD: A/B arayüzlerde kontroller eşleşmediğinde devreye girer.
          // Viewport'e göre sabit alt-sağ köşede durur -> YouTube'ın kendi
          // tam-ekran butonuyla jamais çakışmaz ve kullanıcı her zaman görebilir / tıklayabilir.
          Object.assign(this.button.style, {
            position: 'fixed',
            top: 'auto',
            bottom: '22px',
            left: 'auto',
            right: '22px',
            zIndex: '2147483647'
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
            // Tam ekran butonunun soluna (önüne) veya en başa yerleştir
            const fsBtn = target.container.querySelector('.ytp-fullscreen-button');
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

    this.onDocumentClick = (e) => {
      if (this.isOpen && this.menuOverlay && !this.menuOverlay.contains(e.target) && this.button && !this.button.contains(e.target)) {
        this.closeMenu();
      }
    };
    document.addEventListener('click', this.onDocumentClick);

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
      <button class="lumaborder-tab ${this.activeTab === 'ambilight' ? 'active' : ''}" data-tab="ambilight">${i18n.t('tabAmbilight')}</button>
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
      <span class="lumaborder-badge">v3.0 • LumaBorder Ultra</span>
    `;

    this.menuOverlay.appendChild(header);
    this.menuOverlay.appendChild(tabs);
    this.menuOverlay.appendChild(content);
    this.menuOverlay.appendChild(footer);

    this.menuOverlay.addEventListener('click', (e) => e.stopPropagation());
    this.menuOverlay.addEventListener('mousedown', (e) => e.stopPropagation());
    this.menuOverlay.addEventListener('keydown', (e) => e.stopPropagation());
    this.menuOverlay.addEventListener('keyup', (e) => e.stopPropagation());

    const isShorts = isShortsContext(this.player, location.pathname);

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

    if (!isShorts) {
      let isLeft = true;
      if (this.button && this.button.isConnected) {
        const btnRect = this.button.getBoundingClientRect();
        const playerRect = (this.player || document.body).getBoundingClientRect();
        if (playerRect.width > 0) {
          isLeft = btnRect.left < (playerRect.left + playerRect.width / 2);
        }
      } else {
        isLeft = (this.settingsManager?.current?.buttonPosition || 'left') === 'left';
      }
      this.menuOverlay.classList.toggle('lumaborder-menu-left', isLeft);
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

    // Buton Konumu Seçimi (Sol vs Sağ)
    const btnPosButtons = this.menuOverlay.querySelectorAll('#btn-pos-left, #btn-pos-right');
    btnPosButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const pos = btn.dataset.btnpos;
        btnPosButtons.forEach(b => b.classList.toggle('active', b === btn));
        await this.settingsManager.save({ buttonPosition: pos });
        this.mountButton(true);
        if (this.menuOverlay) {
          this.menuOverlay.classList.toggle('lumaborder-menu-left', pos === 'left');
        }
      }, { signal });
    });

    // Slider bağlayıcı
    const bindSlider = (id, key, unit = '%', isDirectNumber = false) => {
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
    bindSlider('kelvin', 'colorTemperature', 'K');
    bindSlider('audio-sens', 'audioSensitivity', '%');

    // 4-Bölge Kenar Slider'ları
    ['top', 'right', 'bottom', 'left'].forEach(edge => {
      const capitalized = edge.charAt(0).toUpperCase() + edge.slice(1);
      const chk = this.menuOverlay.querySelector(`#chk-edge-${edge}`);
      if (chk) {
        chk.addEventListener('change', async (e) => {
          await this.settingsManager.save({ [`edge${capitalized}`]: e.target.checked });
          this.ambientEngine.applySettings({ [`edge${capitalized}`]: e.target.checked });
        }, { signal });
      }
      const rng = this.menuOverlay.querySelector(`#rng-edge-${edge}`);
      if (rng) {
        rng.addEventListener('input', (e) => {
          const val = parseInt(e.target.value, 10);
          this.ambientEngine.applySettings({ [`edge${capitalized}Spread`]: val });
        }, { signal });
        rng.addEventListener('change', async (e) => {
          const val = parseInt(e.target.value, 10);
          await this.settingsManager.save({ [`edge${capitalized}Spread`]: val });
        }, { signal });
      }
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
    bindCheckbox('battery-eco', 'autoBatteryEco', () => {
      this.updateBatteryCard(this.ambientEngine?.batteryInfo);
    });
    bindCheckbox('worker', 'workerRender');
    bindCheckbox('freeze', 'freezeDetection');
    bindCheckbox('drop-sentinel', 'dropFrameSentinel');
    bindCheckbox('ultra-eco', 'ultraEco');
    bindCheckbox('hdr-tonemap', 'hdrTonemap');
    bindCheckbox('dynamic-accent', 'dynamicAccent');
    bindCheckbox('auto-sub-dim', 'autoSubtitleDim');
    bindCheckbox('multizone', 'multiZone');
    bindCheckbox('barfill', 'barFill');
    bindCheckbox('debanding', 'debanding');
    bindCheckbox('audio-reactive', 'audioReactive', (checked) => {
      const row = this.menuOverlay.querySelector('#row-audio-sens');
      if (row) row.style.display = checked ? 'block' : 'none';
    });
    bindCheckbox('night-shift', 'nightShiftEnabled', (checked) => {
      const row = this.menuOverlay.querySelector('#row-night-shift-time');
      if (row) row.style.display = checked ? 'flex' : 'none';
    });

    // Zaman Girişleri (Night Shift)
    const startInp = this.menuOverlay.querySelector('#inp-night-start');
    const endInp = this.menuOverlay.querySelector('#inp-night-end');
    if (startInp) {
      startInp.addEventListener('change', async (e) => {
        await this.settingsManager.save({ nightShiftStart: e.target.value });
        this.ambientEngine.applySettings({ nightShiftStart: e.target.value });
      }, { signal });
    }
    if (endInp) {
      endInp.addEventListener('change', async (e) => {
        await this.settingsManager.save({ nightShiftEnd: e.target.value });
        this.ambientEngine.applySettings({ nightShiftEnd: e.target.value });
      }, { signal });
    }

    // Engine Mode Seçimi (WebGL vs Canvas2D)
    const engineBtns = this.menuOverlay.querySelectorAll('.lumaborder-engine-modes .lumaborder-mode-pill[data-engine]');
    engineBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const engine = btn.dataset.engine;
        engineBtns.forEach(b => b.classList.toggle('active', b === btn));
        await this.settingsManager.save({ renderEngine: engine });
        this.ambientEngine.applySettings({ renderEngine: engine });
      }, { signal });
    });

    // Color Space Seçimi (Display P3 vs sRGB)
    const cspaceBtns = this.menuOverlay.querySelectorAll('.lumaborder-engine-modes .lumaborder-mode-pill[data-cspace]');
    cspaceBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const cspace = btn.dataset.cspace;
        cspaceBtns.forEach(b => b.classList.toggle('active', b === btn));
        await this.settingsManager.save({ colorSpace: cspace });
        this.ambientEngine.applySettings({ colorSpace: cspace });
      }, { signal });
    });

    // Multi-Zone Sayısı Butonları
    const zoneBtns = this.menuOverlay.querySelectorAll('.lumaborder-zone-modes .lumaborder-mode-pill');
    zoneBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const zones = parseInt(btn.dataset.zones, 10);
        zoneBtns.forEach(b => b.classList.toggle('active', b === btn));
        await this.settingsManager.save({ zoneCount: zones });
        this.ambientEngine.applySettings({ zoneCount: zones });
      }, { signal });
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

    // Pil Bilgisi Kartı
    this.updateBatteryCard(this.ambientEngine?.batteryInfo);

    // Bias Lighting Mode Butonları
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
      tag.textContent = i18n.t('batteryUnsupportedTag');
      tag.className = 'lumaborder-battery-tag desktop';
      this.setBatteryEcoDisabled(true);
      return;
    }
    this.setBatteryEcoDisabled(false);

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

  setBatteryEcoDisabled(disabled) {
    const chk = this.menuOverlay?.querySelector('#chk-battery-eco');
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
      const isShorts = isShortsContext(this.player, location.pathname);
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
