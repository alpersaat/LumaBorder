/**
 * LumaBorder - Core Ambient Light & Glow Engine
 * Yüksek performanslı WebGL 2.0 / Canvas 2D GPU tabanlı ortam ışığı motoru
 * YouTube Watch, Embed ve YouTube Shorts destekli
 */

import { analyzeLetterbox, checkDirtyFrame } from './letterbox.js';
import { WebGLEngine } from './webgl-engine.js';
import { AudioReactiveEngine } from './audio-reactive.js';
import { kelvinToRGB, isTimeInWindow, extractDominantAccentColor, sampleMultiZoneColors } from './color-utils.js';

export class AmbientEngine {
  constructor(videoElem, playerElem, settings) {
    this.video = videoElem;
    this.player = playerElem;
    this.settings = settings;

    this.container = null;
    this.canvasDiffuse = null;
    this.canvasTight = null;
    this.canvasMultiZone = null;
    this.canvas = null; // Geriye dönük uyumluluk (diffuse referansı)
    this.ctx = null;
    this.ctxTight = null;
    this.ctxMultiZone = null;

    // WebGL 2.0 Render Motoru
    this.webglEngine = null;
    this.isWebGLActive = false;

    // Ses ve Ritim Reaktif Motoru (Item 3.1)
    this.audioEngine = null;

    // Dithering & Bar Fill & Multi-Zone DOM elemanları
    this.ditherOverlay = null;
    this.barFillContainer = null;
    this.barFillElements = {};

    // Küçük analiz tuvali (Letterbox ve Pillarbox analizi için)
    this.analysisCanvas = null;
    this.analysisCtx = null;
    this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
    this.lastAnalysisTime = 0;
    this.prevAnalysisPixels = null;
    this.isFrameFrozen = false;
    this.consecutiveCleanFrames = 0;

    // Akıllı Altyazı Algılama (Item 2.6)
    this.subtitleObserver = null;
    this.isSubtitleVisible = false;

    this.isRunning = false;
    this.animationFrameId = null;
    this.videoCallbackId = null;
    this.lastRenderTime = 0;

    // Worker & OffscreenCanvas Render
    this.destroyed = false;
    this.workerBlobUrl = null;
    this.worker = null;
    this.isWorkerReady = false;
    this.isAnalyzingInWorker = false;

    // Pil Durumu & Akıllı Eko Entegrasyonu
    this.battery = null;
    this.batteryUpdateHandler = null;
    this.isBatteryEcoActive = false;
    this.batteryInfo = { supported: false, charging: true, level: 100, isLowBattery: false, ecoActive: false };
    this.batteryCallbacks = new Set();

    // Dinamik Tema Vurgusu (Accent Tint)
    this.currentAccentColor = '#ff9100';

    this.isShorts = location.pathname.startsWith('/shorts') ||
      Boolean(this.player.closest('ytd-shorts, ytd-reel-video-renderer, #shorts-player'));

    this.canvasWidth = this.isShorts ? 108 : 192;
    this.canvasHeight = this.isShorts ? 192 : 108;

    this.initDOM();
    this.initEngines();
    this.initWorker();
    this.initBattery();
    this.initSubtitleObserver();
    this.applySettings(this.settings);
    this.bindEvents();
  }

  initDOM() {
    // Varsa tüm eski/öksüz container'ları temizle (Shorts reels geçişleri dahil)
    document.querySelectorAll('.lumaborder-ambient-container').forEach(el => el.remove());

    this.container = document.createElement('div');
    this.container.className = 'lumaborder-ambient-container';
    this.container.setAttribute('aria-hidden', 'true');

    // 1. Katman: Diffuse Ambient Canvas (Geniş & Yumuşak / WebGL 2.0 Hedefi)
    this.canvasDiffuse = document.createElement('canvas');
    this.canvasDiffuse.className = 'lumaborder-canvas lumaborder-canvas-diffuse';
    this.canvasDiffuse.width = this.canvasWidth;
    this.canvasDiffuse.height = this.canvasHeight;
    this.canvas = this.canvasDiffuse;

    // 2. Katman: Tight Core Glow Canvas (Keskin, Canlı & Videoya Yakın)
    this.canvasTight = document.createElement('canvas');
    this.canvasTight.className = 'lumaborder-canvas lumaborder-canvas-tight';
    this.canvasTight.width = this.canvasWidth;
    this.canvasTight.height = this.canvasHeight;

    // 3. Katman: Multi-Zone Ambilight Canvas (Item 2.2)
    this.canvasMultiZone = document.createElement('canvas');
    this.canvasMultiZone.className = 'lumaborder-canvas lumaborder-canvas-multizone';
    this.canvasMultiZone.width = this.canvasWidth;
    this.canvasMultiZone.height = this.canvasHeight;
    this.canvasMultiZone.style.display = 'none';

    // 4. Katman: Banding Önleme & Donanım Dithering Overlay (Item 2.4)
    this.ditherOverlay = document.createElement('div');
    this.ditherOverlay.className = 'lumaborder-dither-overlay';
    this.ditherOverlay.setAttribute('aria-hidden', 'true');

    // 5. Katman: Siyah Şerit Doldurucu (Bar Fill Container - Item 2.3)
    this.barFillContainer = document.createElement('div');
    this.barFillContainer.className = 'lumaborder-bar-fill-container';
    this.barFillContainer.style.display = 'none';

    ['top', 'bottom', 'left', 'right'].forEach((pos) => {
      const el = document.createElement('div');
      el.className = `lumaborder-bar-fill lumaborder-bar-fill-${pos}`;
      this.barFillContainer.appendChild(el);
      this.barFillElements[pos] = el;
    });

    this.container.appendChild(this.canvasDiffuse);
    this.container.appendChild(this.canvasTight);
    this.container.appendChild(this.canvasMultiZone);
    this.container.appendChild(this.ditherOverlay);
    this.container.appendChild(this.barFillContainer);

    // Video player'ın en başına (arkasına) ekle
    if (this.player.firstChild) {
      this.player.insertBefore(this.container, this.player.firstChild);
    } else {
      this.player.appendChild(this.container);
    }

    const colorSpace = this.settings.colorSpace === 'display-p3' ? 'display-p3' : 'srgb';

    // WebGL 2.0 denemesi
    if (this.settings.renderEngine === 'webgl' && WebGLEngine.isSupported()) {
      try {
        this.webglEngine = new WebGLEngine(this.canvasDiffuse, { colorSpace });
        if (this.webglEngine.isReady) {
          this.isWebGLActive = true;
        }
      } catch (err) {
        this.isWebGLActive = false;
      }
    }

    // 2D Fallback Context
    if (!this.isWebGLActive) {
      const ctxOptions = {
        alpha: false,
        desynchronized: true,
        willReadFrequently: false,
        colorSpace
      };
      try {
        this.ctx = this.canvasDiffuse.getContext('2d', ctxOptions);
      } catch (e) {
        this.ctx = this.canvasDiffuse.getContext('2d');
      }
    }

    try {
      this.ctxTight = this.canvasTight.getContext('2d', {
        alpha: false,
        desynchronized: true,
        willReadFrequently: false
      });
    } catch (e) {}

    try {
      this.ctxMultiZone = this.canvasMultiZone.getContext('2d', {
        alpha: true,
        desynchronized: true,
        willReadFrequently: false
      });
    } catch (e) {}

    // Letterbox & Pillarbox analiz tuvali (Shorts için 9:16 = 18x32, Standart için 16:9 = 32x18)
    const aW = this.isShorts ? 18 : 32;
    const aH = this.isShorts ? 32 : 18;
    if (typeof OffscreenCanvas !== 'undefined') {
      try {
        this.analysisCanvas = new OffscreenCanvas(aW, aH);
        this.analysisCtx = this.analysisCanvas.getContext('2d', { willReadFrequently: true });
      } catch (e) {
        this.analysisCanvas = null;
      }
    }
    if (!this.analysisCanvas) {
      this.analysisCanvas = document.createElement('canvas');
      this.analysisCanvas.width = aW;
      this.analysisCanvas.height = aH;
      this.analysisCtx = this.analysisCanvas.getContext('2d', {
        willReadFrequently: true
      });
    }
  }

  initEngines() {
    // Ses ve Ritim Reaktif Motoru (Item 3.1)
    try {
      this.audioEngine = new AudioReactiveEngine(this.video, {
        enabled: this.settings.audioReactive,
        sensitivity: this.settings.audioSensitivity || 50
      });
    } catch (e) {}
  }

  initSubtitleObserver() {
    if (this.subtitleObserver) {
      this.subtitleObserver.disconnect();
      this.subtitleObserver = null;
    }

    try {
      // YouTube altyazı penceresini izle (.ytp-caption-window-container)
      const captionContainer = this.player?.querySelector?.('.ytp-caption-window-container') ||
                               document.querySelector('.ytp-caption-window-container');
      
      const checkSubtitles = () => {
        if (!this.settings.autoSubtitleDim) {
          this.isSubtitleVisible = false;
          return;
        }
        const hasText = Boolean(
          captionContainer &&
          captionContainer.childElementCount > 0 &&
          captionContainer.textContent.trim().length > 0 &&
          captionContainer.style.display !== 'none'
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
    } catch (e) {}
  }

  async initWorker() {
    if (!this.settings.workerRender || typeof Worker === 'undefined') return;
    try {
      if (typeof chrome === 'undefined' || !chrome.runtime?.getURL) return;
      const res = await fetch(chrome.runtime.getURL('src/render-worker.js'));
      const code = await res.text();
      if (this.destroyed) return;

      this.workerBlobUrl = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
      this.worker = new Worker(this.workerBlobUrl);
      this.worker.onmessage = (e) => {
        const { type, crop, isDirty, dominantColor } = e.data || {};
        if (type === 'READY') {
          this.isWorkerReady = true;
        } else if (type === 'ANALYSIS_RESULT') {
          if (crop) {
            this.letterboxCrop = crop;
          }
          if (typeof isDirty === 'boolean') {
            this.isFrameFrozen = !isDirty;
          }
          if (dominantColor && this.settings.dynamicAccent) {
            this.applyDynamicAccent(dominantColor);
          }
          this.isAnalyzingInWorker = false;
        }
      };
      this.worker.onerror = (e) => {
        this.warnOnce('worker', e && e.message);
        this.disposeWorker();
      };
      this.worker.postMessage({ type: 'INIT', data: {} });
    } catch (e) {
      this.warnOnce('worker-init', e);
      this.disposeWorker();
    }
  }

  disposeWorker() {
    if (this.worker) {
      try { this.worker.terminate(); } catch (e) {}
    }
    if (this.workerBlobUrl) {
      try { URL.revokeObjectURL(this.workerBlobUrl); } catch (e) {}
    }
    this.worker = null;
    this.workerBlobUrl = null;
    this.isWorkerReady = false;
    this.isAnalyzingInWorker = false;
  }

  initBattery() {
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        if (this.destroyed) return;
        this.battery = battery;
        const updateBatteryStatus = () => {
          const charging = battery.charging;
          const level = Math.round(battery.level * 100);
          const isLow = !charging && battery.level <= 0.20;
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
        battery.addEventListener('chargingchange', updateBatteryStatus);
        battery.addEventListener('levelchange', updateBatteryStatus);
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
      try { cb(this.batteryInfo); } catch (e) {}
    }
  }

  unbindVideoEvents() {
    if (this.video) {
      if (this.onPlay) this.video.removeEventListener('play', this.onPlay);
      if (this.onPause) this.video.removeEventListener('pause', this.onPause);
      if (this.onEnded) this.video.removeEventListener('ended', this.onEnded);
      if (this.onLoadedMetadata) this.video.removeEventListener('loadedmetadata', this.onLoadedMetadata);
      if (this.onEmptied) this.video.removeEventListener('emptied', this.onEmptied);
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
    if (this.onVisibilityChange) {
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
      this.onVisibilityChange = null;
    }
  }

  warnOnce(tag, err) {
    this._warned = this._warned || {};
    if (this._warned[tag]) return;
    this._warned[tag] = true;
    console.warn(`[LumaBorder] ${tag} hatası:`, err);
  }

  bindEvents() {
    this.unbindVideoEvents();

    this.onPlay = () => this.start();
    this.onPause = () => {
      if (this.settings.biasLightingMode === 'pause') {
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

    this.video.addEventListener('play', this.onPlay);
    this.video.addEventListener('pause', this.onPause);
    this.video.addEventListener('ended', this.onEnded);
    this.video.addEventListener('loadedmetadata', this.onLoadedMetadata);
    this.video.addEventListener('emptied', this.onEmptied);
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    if (typeof IntersectionObserver !== 'undefined' && this.player) {
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
    } else if (this.settings.biasLightingMode === 'pause' || this.settings.biasLightingMode === 'always') {
      this.drawBiasLighting();
    }
  }

  applySettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };

    if (!this.container) return;

    if (!this.settings.enabled) {
      this.container.style.display = 'none';
      if (this.player) this.player.classList.remove('lumaborder-tint-active');
      this.stop();
      return;
    }

    this.container.style.display = 'block';

    // Katman görünürlükleri
    if (this.canvasTight) {
      this.canvasTight.style.display = this.settings.dualLayerGlow ? 'block' : 'none';
    }
    if (this.canvasMultiZone) {
      this.canvasMultiZone.style.display = this.settings.multiZone ? 'block' : 'none';
    }
    if (this.ditherOverlay) {
      this.ditherOverlay.style.display = this.settings.debanding ? 'block' : 'none';
    }
    if (this.barFillContainer) {
      this.barFillContainer.style.display = this.settings.barFill ? 'block' : 'none';
    }

    // Ses motoru ayarı
    if (this.audioEngine) {
      this.audioEngine.setEnabled(this.settings.audioReactive);
      this.audioEngine.setSensitivity(this.settings.audioSensitivity || 50);
    }

    // Sirkadiyen Ritim / Gece Karartması Kontrolü (Item 3.3)
    let effectiveBrightness = this.settings.brightness;
    let effectiveKelvin = this.settings.colorTemperature || 6500;
    if (this.settings.nightShiftEnabled) {
      const isNight = isTimeInWindow(new Date(), this.settings.nightShiftStart, this.settings.nightShiftEnd);
      if (isNight) {
        effectiveBrightness = Math.round(effectiveBrightness * 0.65);
        effectiveKelvin = Math.min(3200, effectiveKelvin);
      }
    }

    this.effectiveBrightness = effectiveBrightness;
    this.effectiveKelvin = effectiveKelvin;

    const brightness = (effectiveBrightness / 100).toFixed(2);
    const contrast = (this.settings.contrast / 100).toFixed(2);
    const saturate = (this.settings.saturation / 100).toFixed(2);
    const blur = Math.max(10, this.settings.blur);
    
    let scaleX, scaleY, tightScaleX, tightScaleY;
    if (this.isShorts) {
      const spreadRatio = this.settings.spread / 100;
      scaleX = (1.30 + (spreadRatio * 0.40)).toFixed(2);
      scaleY = (1.02 + (spreadRatio * 0.05)).toFixed(2);
      tightScaleX = (1.10 + (spreadRatio * 0.15)).toFixed(2);
      tightScaleY = (1.01 + (spreadRatio * 0.02)).toFixed(2);
    } else {
      const spreadMultiplier = 1 + (this.settings.spread / 100);
      scaleX = spreadMultiplier.toFixed(2);
      scaleY = spreadMultiplier.toFixed(2);
      const tightScale = Math.min(1.15, 1 + (this.settings.spread / 400)).toFixed(2);
      tightScaleX = tightScale;
      tightScaleY = tightScale;
    }

    const tightBlur = Math.max(8, Math.round(blur * 0.35));
    const smoothingSec = (this.settings.smoothing / 100) * 0.25;

    // CSS Değişkenleri üzerinden GPU filtreleri
    this.container.style.setProperty('--lumaborder-blur', `${blur}px`);
    this.container.style.setProperty('--lumaborder-scale', scaleX);
    this.container.style.setProperty('--lumaborder-scale-x', scaleX);
    this.container.style.setProperty('--lumaborder-scale-y', scaleY);
    this.container.style.setProperty('--lumaborder-tight-scale', tightScaleX);
    this.container.style.setProperty('--lumaborder-tight-scale-x', tightScaleX);
    this.container.style.setProperty('--lumaborder-tight-scale-y', tightScaleY);
    this.container.style.setProperty('--lumaborder-tight-blur', `${tightBlur}px`);
    this.container.style.setProperty('--lumaborder-brightness', brightness);
    this.container.style.setProperty('--lumaborder-contrast', contrast);
    this.container.style.setProperty('--lumaborder-saturate', saturate);
    this.container.style.setProperty('--lumaborder-transition', `${smoothingSec.toFixed(2)}s`);

    // 4-Bölge Kenar Kontrolleri & Altyazı Maskelemesi
    this.updateEdgeMaskStyles();

    // Sabit Arka Işık (Bias Lighting) Modu
    if (this.settings.biasLightingMode === 'always') {
      this.drawBiasLighting();
      return;
    } else if (this.settings.biasLightingMode === 'pause' && this.video.paused) {
      this.drawBiasLighting();
      return;
    }

    if (this.settings.enabled && !this.isRunning && !this.video.paused) {
      this.start();
    }
  }

  updateEdgeMaskStyles() {
    if (!this.container) return;

    // 4-Bölge Kenar Kontrol Sınıfları (Item 2.1)
    this.container.classList.toggle('edge-top-off', !this.settings.edgeTop);
    this.container.classList.toggle('edge-right-off', !this.settings.edgeRight);
    this.container.classList.toggle('edge-left-off', !this.settings.edgeLeft);
    this.container.classList.toggle('edge-bottom-off', !this.settings.edgeBottom);

    // Altyazı Koruması (Item 2.6 ve Statik bottomFade)
    const isSubActive = this.settings.autoSubtitleDim && this.isSubtitleVisible;
    const isBottomFadeActive = this.settings.bottomFade || isSubActive;

    if (isBottomFadeActive) {
      const strength = isSubActive ? 75 : Number(this.settings.bottomFadeStrength || 60);
      const bottomAlpha = Math.max(0, (1 - (strength / 100))).toFixed(2);
      const maskGradient = `linear-gradient(to bottom, #000 0%, #000 65%, rgba(0,0,0,${bottomAlpha}) 100%)`;
      this.container.style.setProperty('--lumaborder-bottom-mask', maskGradient);
    } else {
      this.container.style.setProperty('--lumaborder-bottom-mask', 'none');
    }
  }

  applyDynamicAccent(hexColor) {
    if (!this.player || !hexColor) return;
    this.currentAccentColor = hexColor;
    this.player.style.setProperty('--lumaborder-accent-color', hexColor);
    this.player.classList.toggle('lumaborder-tint-active', Boolean(this.settings.dynamicAccent));
  }

  drawBiasLighting() {
    if (!this.settings.enabled) return;
    const color = this.settings.biasLightingColor || '#ffe4b5';

    if (this.isWebGLActive && this.webglEngine) {
      // Sabit renkle WebGL render
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
    if (this.settings.biasLightingMode === 'always') {
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
    if (this.videoCallbackId && 'cancelVideoFrameCallback' in this.video) {
      this.video.cancelVideoFrameCallback(this.videoCallbackId);
      this.videoCallbackId = null;
    }
  }

  renderLoop() {
    if (this.destroyed || !this.isRunning || !this.settings.enabled) return;

    if (this.settings.biasLightingMode === 'always') {
      this.drawBiasLighting();
      this.stop();
      return;
    }

    const scheduleNext = () => {
      if (!this.isRunning || !this.settings.enabled) return;
      if ('requestVideoFrameCallback' in this.video) {
        this.videoCallbackId = this.video.requestVideoFrameCallback(() => {
          this.renderLoop();
        });
      } else {
        this.animationFrameId = requestAnimationFrame(() => {
          this.renderLoop();
        });
      }
    };

    // FPS Limiti & Akıllı Eko
    const effectiveFps = (this.isBatteryEcoActive && this.settings.autoBatteryEco)
      ? 30
      : this.settings.targetFps;

    // Statik Sahne / Freeze Durumunda 1 FPS'e düşür (Item 1.2)
    const activeTargetFps = (this.isFrameFrozen && this.settings.freezeDetection)
      ? 1
      : (effectiveFps && effectiveFps !== 'sync' ? Number(effectiveFps) || 60 : null);

    if (activeTargetFps) {
      const intervalMs = 1000 / activeTargetFps;
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
      this.warnOnce('renderLoop', err);
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
    const checkInterval = (this.isBatteryEcoActive && this.settings.autoBatteryEco)
      ? 4000
      : (this.settings.ecoMode ? 2000 : 1200);

    if (now - this.lastAnalysisTime < checkInterval) return;
    this.lastAnalysisTime = now;

    // Worker üzerinden analiz (Item 1.3 ve 1.4)
    if (this.settings.workerRender && this.worker && this.isWorkerReady && !this.isAnalyzingInWorker && typeof createImageBitmap === 'function') {
      this.isAnalyzingInWorker = true;
      const resizeW = this.isShorts ? 18 : 32;
      const resizeH = this.isShorts ? 32 : 18;
      try {
        createImageBitmap(this.video, { resizeWidth: resizeW, resizeHeight: resizeH, resizeQuality: 'low' })
          .then((bitmap) => {
            if (!this.worker || !this.isWorkerReady) {
              if (bitmap && typeof bitmap.close === 'function') bitmap.close();
              this.isAnalyzingInWorker = false;
              return;
            }
            this.worker.postMessage({
              type: 'ANALYZE_PIXELS',
              data: {
                bitmap,
                checkLetterbox,
                checkPillarbox,
                isShorts: this.isShorts,
                checkDirty: Boolean(this.settings.freezeDetection),
                extractColors: Boolean(this.settings.dynamicAccent || this.settings.multiZone)
              }
            }, [bitmap]);
          })
          .catch(() => {
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

      // 1. Statik Sahne / Freeze Detection (Item 1.2)
      if (this.settings.freezeDetection && this.prevAnalysisPixels) {
        const { isDirty } = checkDirtyFrame(this.prevAnalysisPixels, imgData, 1.2);
        this.isFrameFrozen = !isDirty;
      }
      this.prevAnalysisPixels = new Uint8ClampedArray(imgData);

      // 2. Letterbox Analizi
      this.letterboxCrop = analyzeLetterbox(imgData, w, h, { checkLetterbox, checkPillarbox, isShorts: this.isShorts });

      // 3. Dynamic Accent Tinting (Item 3.4)
      if (this.settings.dynamicAccent) {
        const dominant = extractDominantAccentColor(imgData, w, h);
        this.applyDynamicAccent(dominant.hex);
      }

      // 4. Multi-Zone Ambilight Sampling (Item 2.2)
      if (this.settings.multiZone && this.ctxMultiZone) {
        this.renderMultiZoneLEDs(imgData, w, h);
      }

      // 5. Bar Fill Güncellemesi (Item 2.3)
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

    // 4 kenar etrafında gradyanlar oluşturarak Philips Ambilight efektini simüle et
    const topZones = zones.filter(z => z.edge === 'top');
    const bottomZones = zones.filter(z => z.edge === 'bottom');
    const leftZones = zones.filter(z => z.edge === 'left');
    const rightZones = zones.filter(z => z.edge === 'right');

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

    const topPx = Math.round(playerRect.height * this.letterboxCrop.top);
    const bottomPx = Math.round(playerRect.height * this.letterboxCrop.bottom);
    const leftPx = Math.round(playerRect.width * this.letterboxCrop.left);
    const rightPx = Math.round(playerRect.width * this.letterboxCrop.right);

    this.container.style.setProperty('--lumaborder-letterbox-top', `${topPx}px`);
    this.container.style.setProperty('--lumaborder-letterbox-bottom', `${bottomPx}px`);
    this.container.style.setProperty('--lumaborder-pillarbox-left', `${leftPx}px`);
    this.container.style.setProperty('--lumaborder-pillarbox-right', `${rightPx}px`);
  }

  drawFrame() {
    if (!this.video || this.video.readyState < 2) return;

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

    // Audio-reactive nabız faktörü (Item 3.1)
    let audioPulse = 1.0;
    if (this.audioEngine && this.settings.audioReactive) {
      audioPulse = this.audioEngine.update();
      if (audioPulse > 1.02) {
        const pulseScale = (1 + (this.settings.spread / 100)) * audioPulse;
        this.container.style.setProperty('--lumaborder-scale', pulseScale.toFixed(2));
      }
    }

    // 4-Bölge Kenar Ağırlıkları (Item 2.1)
    const edgeWeights = [
      this.settings.edgeTop ? (this.settings.edgeTopSpread / 100) : 0.0,
      this.settings.edgeRight ? (this.settings.edgeRightSpread / 100) : 0.0,
      this.settings.edgeBottom ? (this.settings.edgeBottomSpread / 100) : 0.0,
      this.settings.edgeLeft ? (this.settings.edgeLeftSpread / 100) : 0.0
    ];

    try {
      // 1. WebGL 2.0 Dual-Kawase Pipeline (Item 1.1)
      if (this.isWebGLActive && this.webglEngine && this.webglEngine.isReady) {
        this.webglEngine.render(this.video, {
          crop: { top: cropT, bottom: cropB, left: cropL, right: cropR },
          brightness: (this.effectiveBrightness / 100) * audioPulse,
          contrast: this.settings.contrast / 100,
          saturation: this.settings.saturation / 100,
          kelvin: this.effectiveKelvin,
          debanding: Boolean(this.settings.debanding),
          hdrTonemap: Boolean(this.settings.hdrTonemap),
          edgeWeights
        });
      } else if (this.ctx) {
        // 2. Canvas 2D Fallback Pipeline
        this.ctx.drawImage(
          this.video,
          sx, sy, sw, sh,
          0, 0, this.canvasWidth, this.canvasHeight
        );
      }

      // 2. Katman: Tight Core Glow
      if (this.settings.dualLayerGlow && this.ctxTight) {
        this.ctxTight.drawImage(this.canvasDiffuse, 0, 0);
      }
    } catch (err) {
      this.warnOnce('drawFrame', err);
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

    this.isShorts = location.pathname.startsWith('/shorts') ||
      Boolean(this.player.closest('ytd-shorts, ytd-reel-video-renderer, #shorts-player'));

    this.canvasWidth = this.isShorts ? 108 : 192;
    this.canvasHeight = this.isShorts ? 192 : 108;

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

    document.querySelectorAll('.lumaborder-ambient-container').forEach((el) => {
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
        this.battery.removeEventListener('chargingchange', this.batteryUpdateHandler);
        this.battery.removeEventListener('levelchange', this.batteryUpdateHandler);
      } catch (e) {}
      this.battery = null;
      this.batteryUpdateHandler = null;
    }
    this.batteryCallbacks.clear();

    if (this.player) {
      this.player.classList.remove('lumaborder-tint-active');
    }

    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}
