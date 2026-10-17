/**
 * LumaBorder - Saf Bas/Ritim (Beat) Tespit Matematiği
 * Web Audio API'den bağımsız, test edilebilir nabız (pulse) hesaplama.
 * audio-reactive.js tarafından tüketilir; tests/beat-detect.test.js ile doğrulanır.
 */

export const BASS_BIN_COUNT = 6;

/**
 * Alt frekans bantlarının (bas) ortalama enerjisi (0 - 255)
 */
export function computeBassEnergy(dataArray, binCount = BASS_BIN_COUNT) {
  const bins = Math.min(binCount, dataArray?.length || 0);
  if (bins <= 0) return 0;
  let sum = 0;
  for (let i = 0; i < bins; i++) sum += dataArray[i];
  return sum / bins;
}

/**
 * Hassasiyet çarpanı (1.1 - 1.55): düşük hassasiyet = yüksek eşik
 */
export function sensitivityFactor(sensitivity) {
  return 1.1 + (100 - sensitivity) * 0.005;
}

/**
 * Tek bir kare için nabız değerini günceller.
 * @param {{ currentPulse: number, bassAverage: number }} state
 * @param {Uint8Array|number[]} dataArray analyser.getByteFrequencyData() çıktısı
 * @param {number} sensitivity 10 - 100
 * @returns {{ currentPulse: number, bassAverage: number, bassEnergy: number, threshold: number }}
 */
export function computePulse(state, dataArray, sensitivity) {
  const bassEnergy = computeBassEnergy(dataArray);
  const bassAverage = state.bassAverage * 0.92 + bassEnergy * 0.08;
  const threshold = Math.max(35, bassAverage * sensitivityFactor(sensitivity));

  let currentPulse;
  if (bassEnergy > threshold && bassEnergy > 45) {
    // Vuruş (Beat detected)
    const punch = Math.min(0.25, ((bassEnergy - threshold) / 255) * (sensitivity / 50) * 0.35);
    currentPulse = Math.max(state.currentPulse, 1.0 + punch);
  } else {
    // Yumuşak sönümleme (Exponential decay)
    currentPulse = Math.max(1.0, state.currentPulse * 0.94);
  }

  return { currentPulse, bassAverage, bassEnergy, threshold };
}
