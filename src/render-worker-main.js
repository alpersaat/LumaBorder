/**
 * LumaBorder - Background Render & Pixel Analysis Worker (kaynak giriş noktası)
 * OffscreenCanvas çizim ve letterbox/pillarbox piksel analizi arka plan işleyicisi.
 *
 * [OTOMATIK DERLENİR] esbuild ile src/render-worker.js dosyasına paketlenir
 * (bkz. scripts/build.js). Piksel analizinin saf mantığı src/pixel-analysis.js
 * içindedir; ana iş parçacığı fallback'i ile aynı davranışı garanti eder.
 */

import { analyzeFrame } from './pixel-analysis.js';

let diffuseCanvas = null;
let diffuseCtx = null;
let tightCanvas = null;
let tightCtx = null;

let analysisCanvas = null;
let analysisCtx = null;
let prevAnalysisData = null;

self.onmessage = function (e) {
  const { type, data } = e.data || {};

  switch (type) {
    case 'INIT': {
      if (data && data.diffuseCanvas) {
        diffuseCanvas = data.diffuseCanvas;
        diffuseCtx = diffuseCanvas.getContext('2d', {
          alpha: false,
          desynchronized: true,
          willReadFrequently: false
        });
      }
      if (data && data.tightCanvas) {
        tightCanvas = data.tightCanvas;
        tightCtx = tightCanvas.getContext('2d', {
          alpha: false,
          desynchronized: true,
          willReadFrequently: false
        });
      }
      if (!analysisCanvas) {
        try {
          analysisCanvas = new OffscreenCanvas(32, 18);
          analysisCtx = analysisCanvas.getContext('2d', { willReadFrequently: true });
        } catch (err) {}
      }
      self.postMessage({ type: 'READY' });
      break;
    }

    case 'DRAW_FRAME': {
      const { bitmap, sx, sy, sw, sh, canvasWidth, canvasHeight, dualLayer } = data || {};
      if (!bitmap) return;

      try {
        if (diffuseCtx) {
          diffuseCtx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, canvasWidth, canvasHeight);
        }
        if (dualLayer && tightCtx) {
          tightCtx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, canvasWidth, canvasHeight);
        }
      } catch (err) {
      } finally {
        if (bitmap && typeof bitmap.close === 'function') {
          bitmap.close();
        }
      }
      break;
    }

    case 'RESET': {
      // Önceki kare verisini ve sahte tuval durumunu temizle, sonraki ilk karenin 'kirlü' sayılmasını sağlar
      prevAnalysisData = null;
      analysisCanvas = null;
      analysisCtx = null;
      break;
    }

    case 'ANALYZE_PIXELS': {
      const { bitmap, checkLetterbox, checkPillarbox, isShorts, checkDirty, extractColors } = data || {};
      if (!bitmap) return;

      let crop = { top: 0, bottom: 0, left: 0, right: 0 };
      let isDirty = true;
      let dominantColor = null;

      try {
        const reqW = isShorts ? 18 : 32;
        const reqH = isShorts ? 32 : 18;
        if (!analysisCanvas || analysisCanvas.width !== reqW || analysisCanvas.height !== reqH) {
          analysisCanvas = new OffscreenCanvas(reqW, reqH);
          analysisCtx = analysisCanvas.getContext('2d', { willReadFrequently: true });
        }
        const w = analysisCanvas.width;
        const h = analysisCanvas.height;
        analysisCtx.drawImage(bitmap, 0, 0, w, h);
        const imgDataObj = analysisCtx.getImageData(0, 0, w, h);
        const imgData = imgDataObj.data;

        const result = analyzeFrame(imgData, w, h, {
          checkLetterbox,
          checkPillarbox,
          isShorts: Boolean(isShorts),
          checkDirty: Boolean(checkDirty),
          extractColors: Boolean(extractColors),
          prevData: prevAnalysisData
        });

        crop = result.crop;
        isDirty = result.isDirty;
        dominantColor = result.dominantColor;
        prevAnalysisData = new Uint8ClampedArray(imgData);
      } catch (err) {
      } finally {
        if (bitmap && typeof bitmap.close === 'function') {
          bitmap.close();
        }
      }

      self.postMessage({ type: 'ANALYSIS_RESULT', crop, isDirty, dominantColor });
      break;
    }

    case 'DRAW_BIAS': {
      const { color, canvasWidth, canvasHeight, dualLayer } = data || {};
      const fill = (ctx) => {
        if (!ctx) return;
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();
      };
      fill(diffuseCtx);
      if (dualLayer) fill(tightCtx);
      break;
    }
  }
};
