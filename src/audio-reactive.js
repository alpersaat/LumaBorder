/**
 * LumaBorder - Audio-Reactive Beat Pulsing Engine
 * Web Audio API (AudioContext & AnalyserNode) tabanlı bas ve ritim tespiti
 * Müzik ve ritmik videolarda ortam ışığını bas vuruşlarıyla hafifçe nabız gibi attırır.
 * Saf nabız matematiği src/beat-detect.js içindedir.
 */

import { computePulse } from './beat-detect.js';

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

      const result = computePulse(
        { currentPulse: this.currentPulse, bassAverage: this.bassAverage },
        this.dataArray,
        this.sensitivity
      );
      this.currentPulse = result.currentPulse;
      this.bassAverage = result.bassAverage;
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

