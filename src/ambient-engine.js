/**
 * LumaBorder - Core Ambient Light & Glow Engine
 * Yüksek performanslı Canvas/GPU tabanlı ortam ışığı motoru
 * YouTube Watch, Embed ve YouTube Shorts destekli
 */

export class AmbientEngine {
  constructor(videoElem, playerElem, settings) {
    this.video = videoElem;
    this.player = playerElem;
    this.settings = settings;

    this.container = null;
    this.canvasDiffuse = null;
    this.canvasTight = null;
    this.canvas = null; // Geriye dönük uyumluluk (diffuse referansı)
    this.ctx = null;
    this.ctxTight = null;

    // Küçük analiz tuvali (Letterbox ve Pillarbox analizi için)
    this.analysisCanvas = null;
    this.analysisCtx = null;
    this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
    this.lastAnalysisTime = 0;

    this.isRunning = false;
    this.animationFrameId = null;
    this.videoCallbackId = null;
    this.lastRenderTime = 0;

    // Worker & OffscreenCanvas Render
    this.worker = null;
    this.isWorkerReady = false;
    this.isAnalyzingInWorker = false;

    // Pil Durumu & Akıllı Eko Entegrasyonu
    this.battery = null;
    this.batteryUpdateHandler = null;
    this.isBatteryEcoActive = false;
    this.batteryInfo = { supported: false, charging: true, level: 100, isLowBattery: false, ecoActive: false };
    this.batteryCallbacks = new Set();

    this.isShorts = location.pathname.startsWith('/shorts') ||
      Boolean(this.player.closest('ytd-shorts, ytd-reel-video-renderer, #shorts-player'));

    this.canvasWidth = this.isShorts ? 108 : 192;
    this.canvasHeight = this.isShorts ? 192 : 108;

    this.initDOM();
    this.initWorker();
    this.initBattery();
    this.applySettings(this.settings);
    this.bindEvents();
  }

  initDOM() {
    // Varsa eski container'ı temizle
    const old = this.player.querySelector('.lumaborder-ambient-container');
    if (old) old.remove();

    this.container = document.createElement('div');
    this.container.className = 'lumaborder-ambient-container';
    this.container.setAttribute('aria-hidden', 'true');

    // 1. Katman: Diffuse Ambient Canvas (Geniş & Yumuşak)
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

    this.container.appendChild(this.canvasDiffuse);
    this.container.appendChild(this.canvasTight);

    // Video player'ın en başına (arkasına) ekle
    if (this.player.firstChild) {
      this.player.insertBefore(this.container, this.player.firstChild);
    } else {
      this.player.appendChild(this.container);
    }

    this.ctx = this.canvasDiffuse.getContext('2d', {
      alpha: false,
      desynchronized: true,
      willReadFrequently: false
    });

    this.ctxTight = this.canvasTight.getContext('2d', {
      alpha: false,
      desynchronized: true,
      willReadFrequently: false
    });

    // Letterbox & Pillarbox analiz tuvali (OffscreenCanvas öncelikli)
    if (typeof OffscreenCanvas !== 'undefined') {
      try {
        this.analysisCanvas = new OffscreenCanvas(32, 18);
        this.analysisCtx = this.analysisCanvas.getContext('2d', { willReadFrequently: true });
      } catch (e) {
        this.analysisCanvas = null;
      }
    }
    if (!this.analysisCanvas) {
      this.analysisCanvas = document.createElement('canvas');
      this.analysisCanvas.width = 32;
      this.analysisCanvas.height = 18;
      this.analysisCtx = this.analysisCanvas.getContext('2d', {
        willReadFrequently: true
      });
    }
  }

  initWorker() {
    if (!this.settings.workerRender || typeof Worker === 'undefined') return;
    try {
      const workerUrl = (typeof chrome !== 'undefined' && chrome.runtime?.getURL)
        ? chrome.runtime.getURL('src/render-worker.js')
        : null;
      if (workerUrl) {
        this.worker = new Worker(workerUrl);
        this.worker.onmessage = (e) => {
          const { type, crop } = e.data || {};
          if (type === 'READY') {
            this.isWorkerReady = true;
          } else if (type === 'ANALYSIS_RESULT') {
            if (crop) {
              this.letterboxCrop = crop;
            }
            this.isAnalyzingInWorker = false;
          }
        };
        this.worker.onerror = () => {
          this.worker = null;
          this.isWorkerReady = false;
          this.isAnalyzingInWorker = false;
        };
        this.worker.postMessage({ type: 'INIT', data: {} });
      }
    } catch (e) {
      this.worker = null;
      this.isWorkerReady = false;
    }
  }

  initBattery() {
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        this.battery = battery;
        const updateBatteryStatus = () => {
          const charging = battery.charging;
          const level = Math.round(battery.level * 100);
          // Cihaz şarjda değilken ve pil %20 veya altındaysa Eco modu otomatik devreye girer
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

  bindEvents() {
    this.onPlay = () => this.start();
    this.onPause = () => {
      if (this.settings.biasLightingMode === 'pause') {
        this.drawBiasLighting();
      }
      this.stop();
    };
    this.onEnded = () => this.stop();
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
    document.addEventListener('visibilitychange', this.onVisibilityChange);

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
      this.stop();
      return;
    }

    this.container.style.display = 'block';

    // Çift katmanlı (Dual-Layer) görünürlüğü kontrol et
    if (this.canvasTight) {
      this.canvasTight.style.display = this.settings.dualLayerGlow ? 'block' : 'none';
    }

    const brightness = (this.settings.brightness / 100).toFixed(2);
    const contrast = (this.settings.contrast / 100).toFixed(2);
    const saturate = (this.settings.saturation / 100).toFixed(2);
    const blur = Math.max(10, this.settings.blur);
    
    // Shorts için genişleme çarpanını optimize et (yan siyah boşlukları doldurması için)
    let spreadMultiplier = 1 + (this.settings.spread / 100);
    if (this.isShorts) {
      spreadMultiplier = Math.max(1.35, spreadMultiplier * 1.25);
    }
    const spreadScale = spreadMultiplier.toFixed(2);
    const tightScale = Math.min(1.15, 1 + (this.settings.spread / 400)).toFixed(2);
    const tightBlur = Math.max(8, Math.round(blur * 0.35));
    const smoothingSec = (this.settings.smoothing / 100) * 0.25;

    // CSS Değişkenleri üzerinden GPU hızlandırmalı filtre ve dönüşümler
    this.container.style.setProperty('--lumaborder-blur', `${blur}px`);
    this.container.style.setProperty('--lumaborder-scale', `${spreadScale}`);
    this.container.style.setProperty('--lumaborder-tight-scale', `${tightScale}`);
    this.container.style.setProperty('--lumaborder-tight-blur', `${tightBlur}px`);
    this.container.style.setProperty('--lumaborder-brightness', brightness);
    this.container.style.setProperty('--lumaborder-contrast', contrast);
    this.container.style.setProperty('--lumaborder-saturate', saturate);
    this.container.style.setProperty('--lumaborder-transition', `${smoothingSec.toFixed(2)}s`);

    // Altyazı Koruması (Bottom Fade)
    if (this.settings.bottomFade) {
      const strength = Number(this.settings.bottomFadeStrength || 60);
      const bottomAlpha = Math.max(0, (1 - (strength / 100))).toFixed(2);
      const maskGradient = `linear-gradient(to bottom, #000 0%, #000 68%, rgba(0,0,0,${bottomAlpha}) 100%)`;
      this.container.style.setProperty('--lumaborder-bottom-mask', maskGradient);
    } else {
      this.container.style.setProperty('--lumaborder-bottom-mask', 'none');
    }

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

  drawBiasLighting() {
    if (!this.ctx || !this.settings.enabled) return;
    const color = this.settings.biasLightingColor || '#ffe4b5';

    const fillTarget = (ctx) => {
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
    if (this.isRunning || !this.settings.enabled) return;
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
    if (!this.isRunning || !this.settings.enabled) return;

    if (this.settings.biasLightingMode === 'always') {
      this.drawBiasLighting();
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

    // Kullanıcı Tanımlı FPS Limiti & Akıllı Pil Tasarrufu (30 FPS Eko)
    const effectiveFps = (this.isBatteryEcoActive && this.settings.autoBatteryEco)
      ? 30
      : this.settings.targetFps;

    if (effectiveFps && effectiveFps !== 'sync') {
      const fpsVal = Number(effectiveFps) || 60;
      const intervalMs = 1000 / fpsVal;
      const now = performance.now();
      // Jitter toleransı için 2ms marj
      if (now - this.lastRenderTime < intervalMs - 2) {
        scheduleNext();
        return;
      }
      this.lastRenderTime = now;
    }

    this.drawFrame();
    scheduleNext();
  }

  detectLetterbox() {
    const checkLetterbox = Boolean(this.settings.letterboxDetection);
    const checkPillarbox = Boolean(this.settings.pillarboxDetection);

    if ((!checkLetterbox && !checkPillarbox) || !this.analysisCtx) {
      this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
      return;
    }

    const now = performance.now();
    // Pilde veya Eko modunda kontrol aralığını uzatarak GPU tüketimini daha da düşür
    const checkInterval = (this.isBatteryEcoActive && this.settings.autoBatteryEco)
      ? 4000
      : (this.settings.ecoMode ? 2000 : 1200);

    if (now - this.lastAnalysisTime < checkInterval) return;
    this.lastAnalysisTime = now;

    // Worker Render / Analiz Denemesi
    if (this.settings.workerRender && this.worker && this.isWorkerReady && !this.isAnalyzingInWorker && typeof createImageBitmap === 'function') {
      this.isAnalyzingInWorker = true;
      createImageBitmap(this.video, { resizeWidth: 32, resizeHeight: 18, resizeQuality: 'low' })
        .then((bitmap) => {
          this.worker.postMessage({
            type: 'ANALYZE_PIXELS',
            data: {
              bitmap,
              checkLetterbox,
              checkPillarbox,
              isShorts: this.isShorts
            }
          }, [bitmap]);
        })
        .catch(() => {
          this.isAnalyzingInWorker = false;
          this.detectLetterboxMainThread(checkLetterbox, checkPillarbox);
        });
      return;
    }

    this.detectLetterboxMainThread(checkLetterbox, checkPillarbox);
  }

  detectLetterboxMainThread(checkLetterbox, checkPillarbox) {
    if (!this.analysisCtx) return;

    try {
      const w = this.analysisCanvas.width;
      const h = this.analysisCanvas.height;
      this.analysisCtx.drawImage(this.video, 0, 0, w, h);
      const imgData = this.analysisCtx.getImageData(0, 0, w, h).data;
      const threshold = 18;

      let cropTop = 0;
      let cropBottom = 0;
      let cropLeft = 0;
      let cropRight = 0;

      // 1. Letterbox Tespiti (Üst ve Alt Şeritler - 21:9 Sinemaskop)
      if (checkLetterbox) {
        for (let y = 0; y < Math.floor(h / 3); y++) {
          let isBlackRow = true;
          for (let x = 4; x < w - 4; x += 2) {
            const idx = (y * w + x) * 4;
            const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
            if (lum > threshold) {
              isBlackRow = false;
              break;
            }
          }
          if (isBlackRow) cropTop = (y + 1) / h;
          else break;
        }

        for (let y = h - 1; y >= Math.floor(h * 0.66); y--) {
          let isBlackRow = true;
          for (let x = 4; x < w - 4; x += 2) {
            const idx = (y * w + x) * 4;
            const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
            if (lum > threshold) {
              isBlackRow = false;
              break;
            }
          }
          if (isBlackRow) cropBottom = (h - y) / h;
          else break;
        }
      }

      // 2. Pillarbox Tespiti (Sağ ve Sol Siyah Şeritler - 4:3 ve Dikey Videolar)
      if (checkPillarbox && !this.isShorts) {
        for (let x = 0; x < Math.floor(w / 3); x++) {
          let isBlackCol = true;
          for (let y = 2; y < h - 2; y += 2) {
            const idx = (y * w + x) * 4;
            const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
            if (lum > threshold) {
              isBlackCol = false;
              break;
            }
          }
          if (isBlackCol) cropLeft = (x + 1) / w;
          else break;
        }

        for (let x = w - 1; x >= Math.floor(w * 0.66); x--) {
          let isBlackCol = true;
          for (let y = 2; y < h - 2; y += 2) {
            const idx = (y * w + x) * 4;
            const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
            if (lum > threshold) {
              isBlackCol = false;
              break;
            }
          }
          if (isBlackCol) cropRight = (w - x) / w;
          else break;
        }
      }

      this.letterboxCrop = {
        top: cropTop,
        bottom: cropBottom,
        left: cropLeft,
        right: cropRight
      };
    } catch (e) {
      this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
    }
  }

  drawFrame() {
    if (!this.ctx || !this.video || this.video.readyState < 2) return;

    this.detectLetterbox();

    const vw = this.video.videoWidth || this.canvasWidth;
    const vh = this.video.videoHeight || this.canvasHeight;

    const sx = vw * this.letterboxCrop.left;
    const sy = vh * this.letterboxCrop.top;
    const sw = Math.max(10, vw * (1 - this.letterboxCrop.left - this.letterboxCrop.right));
    const sh = Math.max(10, vh * (1 - this.letterboxCrop.top - this.letterboxCrop.bottom));

    try {
      // 1. Katman: Diffuse Ambient
      this.ctx.drawImage(
        this.video,
        sx, sy, sw, sh,
        0, 0, this.canvasWidth, this.canvasHeight
      );

      // 2. Katman: Tight Core Glow (Etkinse ve pil eko değilse veya optimize moddaysa)
      if (this.settings.dualLayerGlow && this.ctxTight) {
        this.ctxTight.drawImage(
          this.video,
          sx, sy, sw, sh,
          0, 0, this.canvasWidth, this.canvasHeight
        );
      }
    } catch (err) {}
  }

  destroy() {
    this.stop();
    if (this.worker) {
      try {
        this.worker.terminate();
      } catch (e) {}
      this.worker = null;
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

    if (this.video) {
      this.video.removeEventListener('play', this.onPlay);
      this.video.removeEventListener('pause', this.onPause);
      this.video.removeEventListener('ended', this.onEnded);
    }
    document.removeEventListener('visibilitychange', this.onVisibilityChange);

    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}
