/**
 * LumaBorder - Audio-Reactive Beat Pulsing Engine
 * Web Audio API (AudioContext & AnalyserNode) tabanlı bas ve ritim tespiti
 * Müzik ve ritmik videolarda ortam ışığını bas vuruşlarıyla hafifçe nabız gibi attırır.
 */

export class AudioReactiveEngine {
  constructor(videoElem, options = {}) {
    this.video = videoElem;
    this.sensitivity = options.sensitivity || 50; // 10 - 100
    this.enabled = Boolean(options.enabled);

    this.audioCtx = null;
    this.analyser = null;
    this.sourceNode = null;
    this.dataArray = null;

    this.currentPulse = 1.0;
    this.bassAverage = 0;
    this.isAttached = false;
    this.isDestroyed = false;

    if (this.enabled) {
      this.init();
    }
  }

  init() {
    if (this.isAttached || this.isDestroyed || !this.video) return;

    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return;

      this.audioCtx = new AudioCtxClass();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 128;
      this.analyser.smoothingTimeConstant = 0.8;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      // captureStream() denenir; bazı tarayıcılarda ses kopyalama için en güvenli yoldur
      let stream = null;
      if (typeof this.video.captureStream === 'function') {
        try { stream = this.video.captureStream(); } catch (e) {}
      } else if (typeof this.video.mozCaptureStream === 'function') {
        try { stream = this.video.mozCaptureStream(); } catch (e) {}
      }

      if (stream && stream.getAudioTracks().length > 0) {
        this.sourceNode = this.audioCtx.createMediaStreamSource(stream);
        this.sourceNode.connect(this.analyser);
        this.isAttached = true;
      } else {
        // Fallback: createMediaElementSource (YouTube'da video sesini kesmemek için hedefe de bağlanmalıdır)
        try {
          this.sourceNode = this.audioCtx.createMediaElementSource(this.video);
          this.sourceNode.connect(this.analyser);
          this.sourceNode.connect(this.audioCtx.destination);
          this.isAttached = true;
        } catch (srcErr) {
          // Cross-origin veya zaten bağlanmış olabilir
        }
      }
    } catch (err) {
      // Ses izinleri veya güvenlik engelleri videoyu asla etkilememeli
      this.isAttached = false;
    }
  }

  setEnabled(enabled) {
    this.enabled = Boolean(enabled);
    if (this.enabled && !this.isAttached) {
      this.init();
    }
  }

  setSensitivity(val) {
    this.sensitivity = Math.max(10, Math.min(100, Number(val) || 50));
  }

  update() {
    if (!this.enabled || !this.isAttached || !this.analyser || !this.dataArray) {
      this.currentPulse = 1.0;
      return 1.0;
    }

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      try { this.audioCtx.resume(); } catch (e) {}
    }

    try {
      this.analyser.getByteFrequencyData(this.dataArray);

      // Bas frekansları: 20Hz - 150Hz (ilk 4-6 bin)
      const bassBins = Math.min(6, this.dataArray.length);
      let bassEnergy = 0;
      for (let i = 0; i < bassBins; i++) {
        bassEnergy += this.dataArray[i];
      }
      bassEnergy = bassEnergy / bassBins; // 0 - 255

      // Dinamik eşik ve hareketli ortalama
      this.bassAverage = this.bassAverage * 0.92 + bassEnergy * 0.08;

      // Hassasiyet çarpanı
      const sensFactor = 1.1 + (100 - this.sensitivity) * 0.005; // 1.1 - 1.55
      const threshold = Math.max(35, this.bassAverage * sensFactor);

      if (bassEnergy > threshold && bassEnergy > 45) {
        // Vuruş (Beat detected)
        const punch = Math.min(0.25, ((bassEnergy - threshold) / 255) * (this.sensitivity / 50) * 0.35);
        this.currentPulse = Math.max(this.currentPulse, 1.0 + punch);
      } else {
        // Yumuşak sönümleme (Exponential decay)
        this.currentPulse = Math.max(1.0, this.currentPulse * 0.94);
      }
    } catch (e) {
      this.currentPulse = 1.0;
    }

    return this.currentPulse;
  }

  getPulse() {
    return this.currentPulse;
  }

  destroy() {
    this.isDestroyed = true;
    if (this.audioCtx) {
      try { this.audioCtx.close(); } catch (e) {}
    }
    this.audioCtx = null;
    this.analyser = null;
    this.sourceNode = null;
    this.isAttached = false;
  }
}

