/**
 * LumaBorder - Background Render & Pixel Analysis Worker
 * [OTOMATIK DERLENMİŞ DOSYA - DO NOT EDIT DIRECTLY]
 * Kaynak: src/render-worker-main.js (+ pixel-analysis.js, letterbox.js, color-utils.js)
 * Derlemek için: npm run build
 */
(() => {
  // src/letterbox.js
  var ZERO_CROP = Object.freeze({ top: 0, bottom: 0, left: 0, right: 0 });
  var THRESHOLD = 18;
  var lumAt = (d, i) => 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
  function analyzeLetterbox(imgData, w, h, { checkLetterbox = true, checkPillarbox = true, isShorts = false } = {}) {
    const cx = Math.floor(w / 2);
    const cy = Math.floor(h / 2);
    let sum = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        sum += lumAt(imgData, ((cy + dy) * w + (cx + dx)) * 4);
      }
    }
    if (sum / 9 <= THRESHOLD) return { ...ZERO_CROP };
    const rowBlack = (y) => {
      for (let x = 4; x < w - 4; x += 2) if (lumAt(imgData, (y * w + x) * 4) > THRESHOLD) return false;
      return true;
    };
    const colBlack = (x) => {
      for (let y = 2; y < h - 2; y += 2) if (lumAt(imgData, (y * w + x) * 4) > THRESHOLD) return false;
      return true;
    };
    const topBlack = checkLetterbox && rowBlack(0);
    const bottomBlack = checkLetterbox && rowBlack(h - 1);
    const leftBlack = checkPillarbox && !isShorts && colBlack(0);
    const rightBlack = checkPillarbox && !isShorts && colBlack(w - 1);
    if (!topBlack && !bottomBlack && !leftBlack && !rightBlack) {
      return { ...ZERO_CROP };
    }
    const crop = { ...ZERO_CROP };
    if (checkLetterbox) {
      if (topBlack) {
        crop.top = 1 / h;
        for (let y = 1; y < Math.floor(h / 3); y++) {
          if (rowBlack(y)) crop.top = (y + 1) / h;
          else break;
        }
      }
      if (bottomBlack) {
        crop.bottom = 1 / h;
        for (let y = h - 2; y >= Math.floor(h * 0.66); y--) {
          if (rowBlack(y)) crop.bottom = (h - y) / h;
          else break;
        }
      }
    }
    if (checkPillarbox && !isShorts) {
      if (leftBlack) {
        crop.left = 1 / w;
        for (let x = 1; x < Math.floor(w / 3); x++) {
          if (colBlack(x)) crop.left = (x + 1) / w;
          else break;
        }
      }
      if (rightBlack) {
        crop.right = 1 / w;
        for (let x = w - 2; x >= Math.floor(w * 0.66); x--) {
          if (colBlack(x)) crop.right = (w - x) / w;
          else break;
        }
      }
    }
    return crop;
  }
  function checkDirtyFrame(prevData, currData, threshold = 1.5) {
    if (!prevData || !currData || prevData.length !== currData.length) {
      return { isDirty: true, diff: 100 };
    }
    let totalDiff = 0;
    let samples = 0;
    const step = 8;
    for (let i = 0; i < currData.length; i += step * 4) {
      const l1 = lumAt(prevData, i);
      const l2 = lumAt(currData, i);
      totalDiff += Math.abs(l1 - l2);
      samples++;
    }
    const avgDiff = samples > 0 ? totalDiff / samples : 100;
    return {
      isDirty: avgDiff >= threshold,
      diff: avgDiff
    };
  }

  // src/color-utils.js
  function extractDominantAccentColor(data, width, height) {
    if (!data || data.length < 4) {
      return { hex: "#ff0000", rgb: "rgb(255, 0, 0)", r: 255, g: 0, b: 0 };
    }
    let totalR = 0;
    let totalG = 0;
    let totalB = 0;
    let maxSaturation = -1;
    let bestR = 255, bestG = 0, bestB = 0;
    let count = 0;
    const totalPixels = Math.floor(data.length / 4);
    const step = Math.max(1, Math.floor(totalPixels / 100));
    for (let i = 0; i < data.length; i += step * 4) {
      const r2 = data[i];
      const g2 = data[i + 1];
      const b2 = data[i + 2];
      const max = Math.max(r2, g2, b2);
      const min = Math.min(r2, g2, b2);
      const lum = (max + min) / 2;
      if (lum < 25 || lum > 235) continue;
      const sat = max === 0 ? 0 : (max - min) / max;
      totalR += r2;
      totalG += g2;
      totalB += b2;
      count++;
      if (sat > maxSaturation) {
        maxSaturation = sat;
        bestR = r2;
        bestG = g2;
        bestB = b2;
      }
    }
    const r = count > 0 && maxSaturation > 0.2 ? bestR : count > 0 ? Math.round(totalR / count) : 255;
    const g = count > 0 && maxSaturation > 0.2 ? bestG : count > 0 ? Math.round(totalG / count) : 0;
    const b = count > 0 && maxSaturation > 0.2 ? bestB : count > 0 ? Math.round(totalB / count) : 0;
    const toHex = (c) => c.toString(16).padStart(2, "0");
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    return { hex, rgb: `rgb(${r}, ${g}, ${b})`, r, g, b };
  }

  // src/pixel-analysis.js
  var DIRTY_THRESHOLD = 1.2;
  function analyzeFrame(imgData, w, h, options = {}) {
    const {
      checkLetterbox = true,
      checkPillarbox = true,
      isShorts = false,
      checkDirty = false,
      extractColors = false,
      prevData = null,
      dirtyThreshold = DIRTY_THRESHOLD
    } = options;
    const crop = analyzeLetterbox(imgData, w, h, { checkLetterbox, checkPillarbox, isShorts });
    let isDirty = true;
    if (checkDirty && prevData && prevData.length === imgData.length) {
      isDirty = checkDirtyFrame(prevData, imgData, dirtyThreshold).isDirty;
    }
    let dominantColor = null;
    if (extractColors) {
      dominantColor = extractDominantAccentColor(imgData, w, h).hex;
    }
    return { crop, isDirty, dominantColor };
  }

  // src/render-worker-main.js
  var diffuseCanvas = null;
  var diffuseCtx = null;
  var tightCanvas = null;
  var tightCtx = null;
  var analysisCanvas = null;
  var analysisCtx = null;
  var prevAnalysisData = null;
  self.onmessage = function(e) {
    const { type, data } = e.data || {};
    switch (type) {
      case "INIT": {
        if (data && data.diffuseCanvas) {
          diffuseCanvas = data.diffuseCanvas;
          diffuseCtx = diffuseCanvas.getContext("2d", {
            alpha: false,
            desynchronized: true,
            willReadFrequently: false
          });
        }
        if (data && data.tightCanvas) {
          tightCanvas = data.tightCanvas;
          tightCtx = tightCanvas.getContext("2d", {
            alpha: false,
            desynchronized: true,
            willReadFrequently: false
          });
        }
        if (!analysisCanvas) {
          try {
            analysisCanvas = new OffscreenCanvas(32, 18);
            analysisCtx = analysisCanvas.getContext("2d", { willReadFrequently: true });
          } catch (err) {
          }
        }
        self.postMessage({ type: "READY" });
        break;
      }
      case "DRAW_FRAME": {
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
          if (bitmap && typeof bitmap.close === "function") {
            bitmap.close();
          }
        }
        break;
      }
      case "RESET": {
        prevAnalysisData = null;
        analysisCanvas = null;
        analysisCtx = null;
        break;
      }
      case "ANALYZE_PIXELS": {
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
            analysisCtx = analysisCanvas.getContext("2d", { willReadFrequently: true });
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
          if (bitmap && typeof bitmap.close === "function") {
            bitmap.close();
          }
        }
        self.postMessage({ type: "ANALYSIS_RESULT", crop, isDirty, dominantColor });
        break;
      }
      case "DRAW_BIAS": {
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
})();
