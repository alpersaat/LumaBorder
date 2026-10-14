/**
 * LumaBorder - Color & Mathematics Utilities
 * Kelvin White Balance, Dynamic Accent Color Extraction, Multi-Zone Ambilight Sampling
 */

/**
 * Kelvin renk sıcaklığını RGB çarpanlarına (0.0 - 1.0 veya 0 - 255) dönüştürür.
 * Tanner Helland algoritması (Blackbody radiation approximation).
 * @param {number} kelvin (2200 - 9300)
 * @returns {{ r: number, g: number, b: number, cssRgb: string }}
 */
export function kelvinToRGB(kelvin) {
  const temp = Math.max(2200, Math.min(9300, Number(kelvin) || 6500)) / 100;
  let red, green, blue;

  // Kırmızı (Red)
  if (temp <= 66) {
    red = 255;
  } else {
    red = temp - 60;
    red = 329.698727446 * Math.pow(red, -0.1332047592);
    red = Math.max(0, Math.min(255, red));
  }

  // Yeşil (Green)
  if (temp <= 66) {
    green = temp;
    green = 99.4708025861 * Math.log(green) - 161.1195681661;
    green = Math.max(0, Math.min(255, green));
  } else {
    green = temp - 60;
    green = 288.1221695283 * Math.pow(green, -0.0755148492);
    green = Math.max(0, Math.min(255, green));
  }

  // Mavi (Blue)
  if (temp >= 66) {
    blue = 255;
  } else if (temp <= 19) {
    blue = 0;
  } else {
    blue = temp - 10;
    blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
    blue = Math.max(0, Math.min(255, blue));
  }

  const r = Math.round(red);
  const g = Math.round(green);
  const b = Math.round(blue);

  return {
    r,
    g,
    b,
    rNorm: r / 255,
    gNorm: g / 255,
    bNorm: b / 255,
    cssRgb: `rgb(${r}, ${g}, ${b})`
  };
}

/**
 * Belirli bir zamanın (HH:mm) zaman aralığında olup olmadığını doğrular.
 * Gece yarısını aşan aralıkları (örn. 22:00 - 07:00) doğru işler.
 * @param {Date} date
 * @param {string} startStr "HH:mm"
 * @param {string} endStr "HH:mm"
 * @returns {boolean}
 */
export function isTimeInWindow(date, startStr = '22:00', endStr = '07:00') {
  if (!date || !(date instanceof Date)) date = new Date();
  
  const parseMinutes = (str) => {
    if (!str || typeof str !== 'string') return 0;
    const parts = str.split(':');
    const h = parseInt(parts[0], 10) || 0;
    const m = parseInt(parts[1], 10) || 0;
    return h * 60 + m;
  };

  const currentMinutes = date.getHours() * 60 + date.getMinutes();
  const startMinutes = parseMinutes(startStr);
  const endMinutes = parseMinutes(endStr);

  if (startMinutes <= endMinutes) {
    // Aynı gün içinde (Örn: 09:00 - 17:00)
    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  } else {
    // Gece yarısını aşıyor (Örn: 22:00 - 07:00)
    return currentMinutes >= startMinutes || currentMinutes < endMinutes;
  }
}

/**
 * Piksel verisinden (Uint8ClampedArray) baskın ve doygun rengi çıkarır (Dynamic Accent Tinting için).
 * @param {Uint8ClampedArray} data 
 * @param {number} width 
 * @param {number} height 
 * @returns {{ hex: string, rgb: string, r: number, g: number, b: number }}
 */
export function extractDominantAccentColor(data, width, height) {
  if (!data || data.length < 4) {
    return { hex: '#ff0000', rgb: 'rgb(255, 0, 0)', r: 255, g: 0, b: 0 };
  }

  let totalR = 0;
  let totalG = 0;
  let totalB = 0;
  let maxSaturation = -1;
  let bestR = 255, bestG = 0, bestB = 0;
  let count = 0;

  const totalPixels = Math.floor(data.length / 4);
  const step = Math.max(1, Math.floor(totalPixels / 100)); // Hızlı 100 nokta örneklemesi

  for (let i = 0; i < data.length; i += step * 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const lum = (max + min) / 2;

    // Çok koyu (<25) veya çok açık (>235) pikselleri atla
    if (lum < 25 || lum > 235) continue;

    const sat = max === 0 ? 0 : (max - min) / max;

    totalR += r;
    totalG += g;
    totalB += b;
    count++;

    if (sat > maxSaturation) {
      maxSaturation = sat;
      bestR = r;
      bestG = g;
      bestB = b;
    }
  }

  // Doygun renk bulunamadıysa ortalama rengi kullan
  const r = count > 0 && maxSaturation > 0.2 ? bestR : (count > 0 ? Math.round(totalR / count) : 255);
  const g = count > 0 && maxSaturation > 0.2 ? bestG : (count > 0 ? Math.round(totalG / count) : 0);
  const b = count > 0 && maxSaturation > 0.2 ? bestB : (count > 0 ? Math.round(totalB / count) : 0);

  const toHex = (c) => c.toString(16).padStart(2, '0');
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  return { hex, rgb: `rgb(${r}, ${g}, ${b})`, r, g, b };
}

/**
 * Ekran çevresini (Üst, Sağ, Alt, Sol) n adet bağımsız bölgeye ayırıp her bölgenin ortalama rengini hesaplar.
 * Philips Ambilight LED şerit simülasyonu için kullanılır (Multi-Zone sampling).
 * @param {Uint8ClampedArray} data 
 * @param {number} width 
 * @param {number} height 
 * @param {number} zoneCount (8, 12, veya 16)
 * @returns {Array<{ x: number, y: number, r: number, g: number, b: number, hex: string }>}
 */
export function sampleMultiZoneColors(data, width, height, zoneCount = 8) {
  const zones = [];
  if (!data || width <= 0 || height <= 0) return zones;

  // zoneCount: 8 -> Top: 3, Right: 1, Bottom: 3, Left: 1
  // zoneCount: 12 -> Top: 4, Right: 2, Bottom: 4, Left: 2
  // zoneCount: 16 -> Top: 5, Right: 3, Bottom: 5, Left: 3
  let topCount, sideCount, botCount;
  if (zoneCount >= 16) {
    topCount = 5; sideCount = 3; botCount = 5;
  } else if (zoneCount >= 12) {
    topCount = 4; sideCount = 2; botCount = 4;
  } else {
    topCount = 3; sideCount = 1; botCount = 3;
  }

  const sampleRect = (x0, y0, x1, y1) => {
    let rSum = 0, gSum = 0, bSum = 0, cnt = 0;
    const startX = Math.max(0, Math.min(width - 1, Math.floor(x0)));
    const endX = Math.max(0, Math.min(width, Math.floor(x1)));
    const startY = Math.max(0, Math.min(height - 1, Math.floor(y0)));
    const endY = Math.max(0, Math.min(height, Math.floor(y1)));

    for (let y = startY; y < endY; y += 2) {
      for (let x = startX; x < endX; x += 2) {
        const idx = (y * width + x) * 4;
        rSum += data[idx];
        gSum += data[idx + 1];
        bSum += data[idx + 2];
        cnt++;
      }
    }
    const r = cnt > 0 ? Math.round(rSum / cnt) : 0;
    const g = cnt > 0 ? Math.round(gSum / cnt) : 0;
    const b = cnt > 0 ? Math.round(bSum / cnt) : 0;
    const toHex = (c) => c.toString(16).padStart(2, '0');
    return { r, g, b, hex: `#${toHex(r)}${toHex(g)}${toHex(b)}` };
  };

  const edgeDepthY = Math.max(2, Math.floor(height * 0.25));
  const edgeDepthX = Math.max(2, Math.floor(width * 0.25));

  // 1. Üst Kenar Bölgeleri (Soldan Sağa)
  const topStep = width / topCount;
  for (let i = 0; i < topCount; i++) {
    const c = sampleRect(i * topStep, 0, (i + 1) * topStep, edgeDepthY);
    zones.push({ edge: 'top', index: i, ...c });
  }

  // 2. Sağ Kenar Bölgeleri (Yukarıdan Aşağıya)
  const sideStep = height / (sideCount + 1);
  for (let i = 1; i <= sideCount; i++) {
    const c = sampleRect(width - edgeDepthX, (i - 0.5) * sideStep, width, (i + 0.5) * sideStep);
    zones.push({ edge: 'right', index: i - 1, ...c });
  }

  // 3. Alt Kenar Bölgeleri (Sağdan Sola)
  for (let i = botCount - 1; i >= 0; i--) {
    const c = sampleRect(i * topStep, height - edgeDepthY, (i + 1) * topStep, height);
    zones.push({ edge: 'bottom', index: i, ...c });
  }

  // 4. Sol Kenar Bölgeleri (Aşağıdan Yukarıya)
  for (let i = sideCount; i >= 1; i--) {
    const c = sampleRect(0, (i - 0.5) * sideStep, edgeDepthX, (i + 0.5) * sideStep);
    zones.push({ edge: 'left', index: i - 1, ...c });
  }

  return zones;
}

