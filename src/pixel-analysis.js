/**
 * LumaBorder - Saf Piksel Analizi (Kırpma, Statik Kare, Baskın Renk)
 * Hem arka plan Worker'ı (render-worker.js) hem de ana iş parçacığı fallback'i
 * aynı kodu paylaşsın diye tek yerde tutulur. Böylece worker açık/kapalı
 * durumlarda kırpma davranışı birbirinden sapamaz.
 * testler: tests/pixel-analysis.test.js
 */

import { analyzeLetterbox, checkDirtyFrame } from './letterbox.js';
import { extractDominantAccentColor } from './color-utils.js';

/** Ana iş parçacığı ve worker'ın ortak statik kare eşiği */
export const DIRTY_THRESHOLD = 1.2;

/**
 * Tek bir video karesini analiz eder.
 * @param {Uint8ClampedArray} imgData RGBA piksel verisi
 * @param {number} w
 * @param {number} h
 * @param {object} options
 * @returns {{ crop: {top:number,bottom:number,left:number,right:number}, isDirty: boolean, dominantColor: string|null }}
 */
export function analyzeFrame(imgData, w, h, options = {}) {
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
