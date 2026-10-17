/**
 * LumaBorder - Saf Render Konfigürasyonu & Karar Mantığı
 * DOM, WebGL veya chrome API'sine dokunmayan, test edilebilir saf fonksiyonlar.
 * ambient-engine.js tarafından tüketilir; burada yapılan değişiklikler
 * doğrudan testlerle doğrulanır (tests/render-config.test.js).
 */

import { isTimeInWindow } from './color-utils.js';

/**
 * Ultra-Eco çözünürlük geçişine göre tuval boyutlarını hesaplar.
 * Standart: 192x108 (Eco: 96x54) | Shorts: 108x192 (Eco: 54x96)
 */
export function getCanvasDimensions(isShorts, ultraEco) {
  const isEco = Boolean(ultraEco);
  return {
    width: isShorts ? (isEco ? 54 : 108) : (isEco ? 96 : 192),
    height: isShorts ? (isEco ? 96 : 192) : (isEco ? 54 : 108)
  };
}

/**
 * Piksel analiz tuvali boyutu (Shorts 9:16 = 18x32, Standart 16:9 = 32x18)
 */
export function getAnalysisCanvasSize(isShorts) {
  return isShorts ? { width: 18, height: 32 } : { width: 32, height: 18 };
}

/**
 * Gece karartması + CSS katman geometrisi (yayılma, bulanıklık, ton) hesaplar.
 * @param {object} settings sanitize edilmiş ayarlar
 * @param {{ isShorts?: boolean, now?: Date }} ctx
 */
export function computeLayerStyles(settings, { isShorts = false, now = new Date() } = {}) {
  let effectiveBrightness = settings.brightness;
  let effectiveKelvin = settings.colorTemperature || 6500;
  let isNight = false;

  if (settings.nightShiftEnabled) {
    isNight = isTimeInWindow(now, settings.nightShiftStart, settings.nightShiftEnd);
    if (isNight) {
      effectiveBrightness = Math.round(effectiveBrightness * 0.65);
      effectiveKelvin = Math.min(3200, effectiveKelvin);
    }
  }

  const blur = Math.max(10, settings.blur);

  let scaleX, scaleY, tightScaleX, tightScaleY;
  if (isShorts) {
    const spreadRatio = settings.spread / 100;
    scaleX = (1.30 + (spreadRatio * 0.40)).toFixed(2);
    scaleY = (1.02 + (spreadRatio * 0.05)).toFixed(2);
    tightScaleX = (1.10 + (spreadRatio * 0.15)).toFixed(2);
    tightScaleY = (1.01 + (spreadRatio * 0.02)).toFixed(2);
  } else {
    const spreadMultiplier = 1 + (settings.spread / 100);
    scaleX = spreadMultiplier.toFixed(2);
    scaleY = spreadMultiplier.toFixed(2);
    const tightScale = Math.min(1.15, 1 + (settings.spread / 400)).toFixed(2);
    tightScaleX = tightScale;
    tightScaleY = tightScale;
  }

  return {
    isNight,
    effectiveBrightness,
    effectiveKelvin,
    blur,
    tightBlur: Math.max(8, Math.round(blur * 0.35)),
    smoothingSec: (settings.smoothing / 100) * 0.25,
    scaleX,
    scaleY,
    tightScaleX,
    tightScaleY,
    brightness: (effectiveBrightness / 100).toFixed(2),
    contrast: (settings.contrast / 100).toFixed(2),
    saturate: (settings.saturation / 100).toFixed(2)
  };
}

/**
 * 4-Bölge kenar ağırlıkları (WebGL uniform sırası: top, right, bottom, left)
 */
export function computeEdgeWeights(settings) {
  return [
    settings.edgeTop ? (settings.edgeTopSpread / 100) : 0.0,
    settings.edgeRight ? (settings.edgeRightSpread / 100) : 0.0,
    settings.edgeBottom ? (settings.edgeBottomSpread / 100) : 0.0,
    settings.edgeLeft ? (settings.edgeLeftSpread / 100) : 0.0
  ];
}

/**
 * Alt maske gradyanı. Aktif değilse 'none' döner.
 * Altyazı aktifken (%75 kısma) manuel bottomFade ayarını geçersiz kılar.
 */
export function computeBottomMask(settings, isSubtitleVisible) {
  const isSubActive = Boolean(settings.autoSubtitleDim) && Boolean(isSubtitleVisible);
  const isBottomFadeActive = Boolean(settings.bottomFade) || isSubActive;
  if (!isBottomFadeActive) return 'none';

  const strength = isSubActive ? 75 : Number(settings.bottomFadeStrength || 60);
  const bottomAlpha = Math.max(0, (1 - (strength / 100))).toFixed(2);
  return `linear-gradient(to bottom, #000 0%, #000 65%, rgba(0,0,0,${bottomAlpha}) 100%)`;
}

/**
 * Letterbox/pillarbox kırpmasından çizilecek video kaynak dikdörtgenini hesaplar.
 * Kırpma oranı %40 ile sınırlanır; kaynak en az `minSize` piksel kalır.
 */
export function computeSourceRect(videoWidth, videoHeight, crop = {}, minSize = 10) {
  const clamp = (v) => Math.max(0, Math.min(0.4, v || 0));
  const cropL = clamp(crop.left);
  const cropR = clamp(crop.right);
  const cropT = clamp(crop.top);
  const cropB = clamp(crop.bottom);

  const sx = Math.max(0, Math.floor(videoWidth * cropL));
  const sy = Math.max(0, Math.floor(videoHeight * cropT));
  const sw = Math.min(videoWidth - sx, Math.max(minSize, Math.round(videoWidth * (1 - cropL - cropR))));
  const sh = Math.min(videoHeight - sy, Math.max(minSize, Math.round(videoHeight * (1 - cropT - cropB))));

  return { sx, sy, sw, sh, cropL, cropR, cropT, cropB };
}

/**
 * Bar Fill katmanı için oynatıcı dikdörtgeninden piksel yükseklik/genişlikleri.
 */
export function computeBarFillPixels(playerRect, crop) {
  return {
    top: Math.round(playerRect.height * crop.top),
    bottom: Math.round(playerRect.height * crop.bottom),
    left: Math.round(playerRect.width * crop.left),
    right: Math.round(playerRect.width * crop.right)
  };
}

/**
 * Bu kare için geçerli hedef FPS'i çözer.
 * Öncelik: statik sahne (1 FPS) > pil eko / drop-sentinel (30) > kullanıcı seçimi.
 * @returns {number|null} null => video karesiyle eşzamanlı (FPS limiting yok)
 */
export function resolveEffectiveFps(settings, { isBatteryEcoActive = false, penaltyLevel = 0, isFrameFrozen = false } = {}) {
  if (isFrameFrozen && settings.freezeDetection) return 1;

  let effectiveFps = (isBatteryEcoActive && settings.autoBatteryEco) ? 30 : settings.targetFps;

  // Sentinel aktifse (video kare atlıyorsa) FPS'i 30'a sabitle
  if (penaltyLevel >= 1 && (effectiveFps === 'sync' || effectiveFps === 60)) {
    effectiveFps = 30;
  }

  return (effectiveFps && effectiveFps !== 'sync') ? (Number(effectiveFps) || 60) : null;
}

/**
 * Dual-Kawase bulanıklaştırma geçiş sayısı (penalty seviyesi 2'de tek geçişe düşer)
 */
export function getMaxBlurPasses(penaltyLevel) {
  return penaltyLevel >= 2 ? 1 : 3;
}

export function createDropSentinel() {
  return {
    lastCheckTime: 0,
    lastDroppedFrames: 0,
    lastTotalFrames: 0,
    penaltyLevel: 0,
    cleanWindowsCount: 0
  };
}

/**
 * Drop-Frame Sentinel durum makinesi. Verilen state'i yerinde günceller.
 * @param {object} state createDropSentinel() çıktısı
 * @param {{ dropped: number, total: number }} quality getVideoPlaybackQuality() değerleri
 */
export function stepDropSentinel(state, { dropped = 0, total = 0 } = {}) {
  const deltaDropped = dropped - state.lastDroppedFrames;
  const deltaTotal = total - state.lastTotalFrames;

  state.lastDroppedFrames = dropped;
  state.lastTotalFrames = total;

  if (deltaTotal <= 0) return state;

  const dropRatio = deltaDropped / deltaTotal;

  if (deltaDropped > 2 && dropRatio > 0.04) {
    // Sistem zorlanıyor: Kare atlama saptandı, sentinel seviyesini artır
    state.penaltyLevel = Math.min(2, state.penaltyLevel + 1);
    state.cleanWindowsCount = 0;
  } else if (deltaDropped === 0) {
    // Kare kaybı yok, sorunsuz pencere sayısını artır
    state.cleanWindowsCount++;
    if (state.cleanWindowsCount >= 3 && state.penaltyLevel > 0) {
      state.penaltyLevel--;
      state.cleanWindowsCount = 0;
    }
  } else if (deltaDropped > 0) {
    // Eşik altı kayıp bile temiz-pencere akışını bozar
    state.cleanWindowsCount = 0;
  }

  return state;
}
