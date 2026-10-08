/**
 * LumaBorder - Core Ambient Light & Glow Engine
 * Yüksek performanslı Canvas/GPU tabanlı ortam ışığı motoru
 */

export class AmbientEngine {
  constructor(videoElem, playerElem, settings) {
    this.video = videoElem;
    this.player = playerElem;
    this.settings = settings;

    this.container = null;
    this.canvas = null;
    this.ctx = null;

    // Küçük analiz tuvali (Siyah şerit / Letterbox tespiti için)
    this.analysisCanvas = null;
    this.analysisCtx = null;
    this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
    this.lastAnalysisTime = 0;

    this.isRunning = false;
    this.animationFrameId = null;
    this.videoCallbackId = null;

    this.canvasWidth = 192;
    this.canvasHeight = 108;

    this.initDOM();
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

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'lumaborder-canvas';
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;

    this.container.appendChild(this.canvas);
    
    // Video player'ın en başına (arkasına) ekle
    if (this.player.firstChild) {
      this.player.insertBefore(this.container, this.player.firstChild);
    } else {
      this.player.appendChild(this.container);
    }

    this.ctx = this.canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
      willReadFrequently: false
    });

    // Letterbox analiz tuvali
    this.analysisCanvas = document.createElement('canvas');
    this.analysisCanvas.width = 32;
    this.analysisCanvas.height = 18;
    this.analysisCtx = this.analysisCanvas.getContext('2d', {
      willReadFrequently: true
    });
  }

  bindEvents() {
    this.onPlay = () => this.start();
    this.onPause = () => this.stop();
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

    const brightness = (this.settings.brightness / 100).toFixed(2);
    const contrast = (this.settings.contrast / 100).toFixed(2);
    const saturate = (this.settings.saturation / 100).toFixed(2);
    const blur = Math.max(10, this.settings.blur);
    const spreadScale = 1 + (this.settings.spread / 100);
    const smoothingSec = (this.settings.smoothing / 100) * 0.25;

    // CSS Değişkenleri üzerinden GPU hızlandırmalı filtre ve dönüşümler
    this.container.style.setProperty('--lumaborder-blur', `${blur}px`);
    this.container.style.setProperty('--lumaborder-scale', `${spreadScale}`);
    this.container.style.setProperty('--lumaborder-brightness', brightness);
    this.container.style.setProperty('--lumaborder-contrast', contrast);
    this.container.style.setProperty('--lumaborder-saturate', saturate);
    this.container.style.setProperty('--lumaborder-transition', `${smoothingSec.toFixed(2)}s`);

    if (this.settings.enabled && !this.isRunning && !this.video.paused) {
      this.start();
    }
  }

  start() {
    if (this.isRunning || !this.settings.enabled) return;
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

    if ('requestVideoFrameCallback' in this.video) {
      this.videoCallbackId = this.video.requestVideoFrameCallback(() => {
        this.drawFrame();
        this.renderLoop();
      });
    } else {
      this.animationFrameId = requestAnimationFrame(() => {
        this.drawFrame();
        this.renderLoop();
      });
    }
  }

  detectLetterbox() {
    if (!this.settings.letterboxDetection || !this.analysisCtx) {
      this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
      return;
    }

    const now = performance.now();
    if (now - this.lastAnalysisTime < 1500) return;
    this.lastAnalysisTime = now;

    try {
      const w = this.analysisCanvas.width;
      const h = this.analysisCanvas.height;
      this.analysisCtx.drawImage(this.video, 0, 0, w, h);
      const imgData = this.analysisCtx.getImageData(0, 0, w, h).data;
      const threshold = 18;

      let cropTop = 0;
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

      let cropBottom = 0;
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

      this.letterboxCrop.top = cropTop;
      this.letterboxCrop.bottom = cropBottom;
    } catch (e) {
      this.letterboxCrop = { top: 0, bottom: 0, left: 0, right: 0 };
    }
  }

  drawFrame() {
    if (!this.ctx || !this.video || this.video.readyState < 2) return;

    this.detectLetterbox();

    const vw = this.video.videoWidth || this.canvasWidth;
    const vh = this.video.videoHeight || this.canvasHeight;

    const sx = 0;
    const sy = vh * this.letterboxCrop.top;
    const sw = vw;
    const sh = Math.max(10, vh * (1 - this.letterboxCrop.top - this.letterboxCrop.bottom));

    try {
      this.ctx.drawImage(
        this.video,
        sx, sy, sw, sh,
        0, 0, this.canvasWidth, this.canvasHeight
      );
    } catch (err) {}
  }

  destroy() {
    this.stop();
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
