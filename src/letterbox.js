/**
 * LumaBorder - Letterbox / Pillarbox piksel analizi & Statik Sahne (Dirty Frame) tespiti
 * Saf fonksiyonlar, test edilebilir ve hem ana iş parçacığında hem Worker içinde çalışabilir.
 */

export const ZERO_CROP = Object.freeze({ top: 0, bottom: 0, left: 0, right: 0 });
const THRESHOLD = 18;

export const lumAt = (d, i) => 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];

/**
 * Letterbox ve Pillarbox siyah şerit tespiti
 */
export function analyzeLetterbox(imgData, w, h, { checkLetterbox = true, checkPillarbox = true, isShorts = false } = {}) {
  // Merkez de karanlıksa sahne kararmasıdır; kırpma uygulanmaz
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

  const crop = { ...ZERO_CROP };
  if (checkLetterbox) {
    for (let y = 0; y < Math.floor(h / 3); y++) {
      if (rowBlack(y)) crop.top = (y + 1) / h; else break;
    }
    for (let y = h - 1; y >= Math.floor(h * 0.66); y--) {
      if (rowBlack(y)) crop.bottom = (h - y) / h; else break;
    }
  }
  if (checkPillarbox && !isShorts) {
    for (let x = 0; x < Math.floor(w / 3); x++) {
      if (colBlack(x)) crop.left = (x + 1) / w; else break;
    }
    for (let x = w - 1; x >= Math.floor(w * 0.66); x--) {
      if (colBlack(x)) crop.right = (w - x) / w; else break;
    }
  }
  return crop;
}

/**
 * İki kare arasındaki zamansal parlaklık farkını hesaplar (Temporal Frame Difference).
 * Podcast, durağan eğitim slaytları veya duraklatılmış sahnelerde gereksiz GPU render'ını durdurmak için kullanılır.
 * @param {Uint8ClampedArray} prevData
 * @param {Uint8ClampedArray} currData
 * @param {number} threshold (varsayılan 1.5)
 * @returns {{ isDirty: boolean, diff: number }}
 */
export function checkDirtyFrame(prevData, currData, threshold = 1.5) {
  if (!prevData || !currData || prevData.length !== currData.length) {
    return { isDirty: true, diff: 100 };
  }

  let totalDiff = 0;
  let samples = 0;
  const step = 8; // Her 8. pikseli örnekleyerek CPU yükünü sıfıra indir

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
