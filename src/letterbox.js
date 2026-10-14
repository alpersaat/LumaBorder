/**
 * LumaBorder - Letterbox / Pillarbox piksel analizi (saf fonksiyon, test edilebilir)
 * NOT: render-worker.js Blob URL ile yüklendiği için import edemez; algoritmanın aynısı orada da bulunur.
 */

export const ZERO_CROP = Object.freeze({ top: 0, bottom: 0, left: 0, right: 0 });
const THRESHOLD = 18;

const lumAt = (d, i) => 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];

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

