/**
 * LumaBorder - Background Render & Pixel Analysis Worker
 * OffscreenCanvas çizim ve letterbox/pillarbox piksel analizi arka plan işleyicisi
 */

let diffuseCanvas = null;
let diffuseCtx = null;
let tightCanvas = null;
let tightCtx = null;

let analysisCanvas = null;
let analysisCtx = null;

self.onmessage = function (e) {
  const { type, data } = e.data || {};

  switch (type) {
    case 'INIT': {
      if (data.diffuseCanvas) {
        diffuseCanvas = data.diffuseCanvas;
        diffuseCtx = diffuseCanvas.getContext('2d', {
          alpha: false,
          desynchronized: true,
          willReadFrequently: false
        });
      }
      if (data.tightCanvas) {
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
      const { bitmap, sx, sy, sw, sh, canvasWidth, canvasHeight, dualLayer } = data;
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

    case 'ANALYZE_PIXELS': {
      const { bitmap, checkLetterbox, checkPillarbox, isShorts } = data;
      if (!bitmap) return;

      let crop = { top: 0, bottom: 0, left: 0, right: 0 };
      try {
        if (!analysisCanvas) {
          analysisCanvas = new OffscreenCanvas(32, 18);
          analysisCtx = analysisCanvas.getContext('2d', { willReadFrequently: true });
        }
        const w = analysisCanvas.width;
        const h = analysisCanvas.height;
        analysisCtx.drawImage(bitmap, 0, 0, w, h);
        const imgData = analysisCtx.getImageData(0, 0, w, h).data;
        const threshold = 18;

        let cropTop = 0;
        let cropBottom = 0;
        let cropLeft = 0;
        let cropRight = 0;

        if (checkLetterbox) {
          for (let y = 0; y < Math.floor(h / 3); y++) {
            let isBlack = true;
            for (let x = 4; x < w - 4; x += 2) {
              const idx = (y * w + x) * 4;
              const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
              if (lum > threshold) { isBlack = false; break; }
            }
            if (isBlack) cropTop = (y + 1) / h; else break;
          }

          for (let y = h - 1; y >= Math.floor(h * 0.66); y--) {
            let isBlack = true;
            for (let x = 4; x < w - 4; x += 2) {
              const idx = (y * w + x) * 4;
              const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
              if (lum > threshold) { isBlack = false; break; }
            }
            if (isBlack) cropBottom = (h - y) / h; else break;
          }
        }

        if (checkPillarbox && !isShorts) {
          for (let x = 0; x < Math.floor(w / 3); x++) {
            let isBlack = true;
            for (let y = 2; y < h - 2; y += 2) {
              const idx = (y * w + x) * 4;
              const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
              if (lum > threshold) { isBlack = false; break; }
            }
            if (isBlack) cropLeft = (x + 1) / w; else break;
          }

          for (let x = w - 1; x >= Math.floor(w * 0.66); x--) {
            let isBlack = true;
            for (let y = 2; y < h - 2; y += 2) {
              const idx = (y * w + x) * 4;
              const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
              if (lum > threshold) { isBlack = false; break; }
            }
            if (isBlack) cropRight = (w - x) / w; else break;
          }
        }

        crop = { top: cropTop, bottom: cropBottom, left: cropLeft, right: cropRight };
      } catch (err) {
      } finally {
        if (bitmap && typeof bitmap.close === 'function') {
          bitmap.close();
        }
      }

      self.postMessage({ type: 'ANALYSIS_RESULT', crop });
      break;
    }

    case 'DRAW_BIAS': {
      const { color, canvasWidth, canvasHeight, dualLayer } = data;
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

