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
    // Varsa tüm eski/öksüz container'ları temizle (Shorts reels geçişleri dahil)
    document.querySelectorAll('.lumaborder-ambient-container').forEach(el => el.remove());

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

  async initWorker() {
    if (!this.settings.workerRender || typeof Worker === 'undefined') return;
    try {
      if (typeof chrome === 'undefined' || !chrome.runtime?.getURL) return;
      // content script youtube.com origin'inde çalışır; chrome-extension:// URL'i doğrudan Worker olamaz.
      // Kodu fetch ile alıp Blob URL üzerinden başlatıyoruz (sayfa CSP'si engellerse fallback devreye girer).
      const res = await fetch(chrome.runtime.getURL('src/render-worker.js'));
      const code = await res.text();
      if (this.destroyed) return;

      this.workerBlobUrl = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
      this.worker = new Worker(this.workerBlobUrl);
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

  unbindVideoEvents() {
    if (this.video) {
      if (this.onPlay) this.video.removeEventListener('play', this.onPlay);
      if (this.onPause) this.video.removeEventListener('pause', this.onPause);
      if (this.onEnded) this.video.removeEventListener('ended', this.onEnded);
      if (this.onLoadedMetadata) this.video.removeEventListener('loadedmetadata', this.onLoadedMetadata);
      if (this.onEmptied) this.video.removeEventListener('emptied', this.onEmptied);
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
      // Yeni video yüklendiğinde (SPA / playlist geçişleri) kırpmayı sıfırla ve yeniden hesapla
      this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
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
    
    let scaleX, scaleY, tightScaleX, tightScaleY;
    if (this.isShorts) {
      // Shorts için: dikey videonun sağ ve solundaki geniş siyah alanları doldurmak üzere yatayda geniş,
      // dikeyde ise üst/alt UI ve komşu videolara taşmaması için kontrollü dar ölçekleme
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

    // CSS Değişkenleri üzerinden GPU hızlandırmalı filtre ve dönüşümler
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
      this.stop(); // isRunning=false: mod değişince start() yeniden çalışabilsin
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

    try {
      this.drawFrame();
    } catch (err) {}
    scheduleNext();
  }

  detectLetterbox() {
    const checkLetterbox = Boolean(this.settings.letterboxDetection);
    const checkPillarbox = Boolean(this.settings.pillarboxDetection);

    if ((!checkLetterbox && !checkPillarbox) || !this.analysisCtx) {
      this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
      return;
    }

    // Video henüz hazır değilse veya sıfır boyutluysa (reklam/yükleme esnası) bekle
    if (!this.video || this.video.videoWidth <= 0 || this.video.videoHeight <= 0) {
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
                isShorts: this.isShorts
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
      const imgData = this.analysisCtx.getImageData(0, 0, w, h).data;
      const threshold = 18;

      // Sahne kararması kontrolü (Merkez parlaklık analizi):
      // Eğer merkez de tamamen karanlıksa bu letterbox değil sahne kararmasıdır; kırpma sıfırlanır.
      const centerX = Math.floor(w / 2);
      const centerY = Math.floor(h / 2);
      let centerLumSum = 0;
      let sampleCount = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const idx = ((centerY + dy) * w + (centerX + dx)) * 4;
          centerLumSum += 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
          sampleCount++;
        }
      }
      const avgCenterLum = centerLumSum / sampleCount;

      if (avgCenterLum <= threshold) {
        this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
        return;
      }

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

    const cropL = Math.max(0, Math.min(0.4, this.letterboxCrop.left));
    const cropR = Math.max(0, Math.min(0.4, this.letterboxCrop.right));
    const cropT = Math.max(0, Math.min(0.4, this.letterboxCrop.top));
    const cropB = Math.max(0, Math.min(0.4, this.letterboxCrop.bottom));

    const sx = Math.max(0, Math.floor(vw * cropL));
    const sy = Math.max(0, Math.floor(vh * cropT));
    const sw = Math.min(vw - sx, Math.max(10, Math.floor(vw * (1 - cropL - cropR))));
    const sh = Math.min(vh - sy, Math.max(10, Math.floor(vh * (1 - cropT - cropB))));

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
    }
    if (this.canvasTight) {
      this.canvasTight.width = this.canvasWidth;
      this.canvasTight.height = this.canvasHeight;
    }

    const aW = this.isShorts ? 18 : 32;
    const aH = this.isShorts ? 32 : 18;
    if (this.analysisCanvas) {
      this.analysisCanvas.width = aW;
      this.analysisCanvas.height = aH;
    }

    // Container'ı yeni player'a taşı
    if (this.container && this.player) {
      if (this.player.firstChild) {
        this.player.insertBefore(this.container, this.player.firstChild);
      } else {
        this.player.appendChild(this.container);
      }
    }

    // Diğer tüm öksüz ambians konteynerlerini temizle
    document.querySelectorAll('.lumaborder-ambient-container').forEach((el) => {
      if (el !== this.container) el.remove();
    });

    this.applySettings(this.settings);
    this.bindEvents();

    if (!this.video.paused && !this.video.ended && this.video.readyState >= 2) {
      this.start();
    }
  }

  destroy() {
    this.destroyed = true;
    this.stop();
    this.unbindVideoEvents(); // visibilitychange dinleyicisi de burada kaldırılır
    this.disposeWorker();
    if (this.battery && this.batteryUpdateHandler) {
      try {
        this.battery.removeEventListener('chargingchange', this.batteryUpdateHandler);
        this.battery.removeEventListener('levelchange', this.batteryUpdateHandler);
      } catch (e) {}
      this.battery = null;
      this.batteryUpdateHandler = null;
    }
    this.batteryCallbacks.clear();

    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}
