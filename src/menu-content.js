/**
 * LumaBorder - Oynatıcı Menüsü Tab İçeriği (Saf HTML Üretici)
 * Ayarlara göre sekmelerin içerik HTML'ini üretir. DOM veya state tutmaz,
 * bu yüzden tests/menu-content.test.js ile doğrudan doğrulanabilir.
 */

export function getTabContentHTML(tab, s, t) {

    if (tab === 'general') {
      return `
        <!-- Master Switch -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('masterToggle')}</span>
            <span class="lumaborder-master-sub">${t('masterToggleDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="lumaborder-master-toggle" ${s.enabled ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Oynatıcı Buton Konumu (Sol / Sağ) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('buttonPosition')}</span>
            <span class="lumaborder-master-sub">${t('buttonPositionDesc')}</span>
          </div>
          <div class="lumaborder-engine-modes">
            <button class="lumaborder-mode-pill ${s.buttonPosition !== 'right' ? 'active' : ''}" data-btnpos="left" id="btn-pos-left">${t('btnPosLeft')}</button>
            <button class="lumaborder-mode-pill ${s.buttonPosition === 'right' ? 'active' : ''}" data-btnpos="right" id="btn-pos-right">${t('btnPosRight')}</button>
          </div>
        </div>

        <!-- Çift Katmanlı Glow (Dual-Layer) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('dualLayerGlow')}</span>
            <span class="lumaborder-master-sub">${t('dualLayerDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-duallayer" ${s.dualLayerGlow ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Parlaklık -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t('brightness')}</span>
            <span class="lumaborder-control-value" id="val-brightness">${s.brightness}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-brightness" min="20" max="250" value="${s.brightness}">
        </div>

        <!-- Yayılma -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t('spread')}</span>
            <span class="lumaborder-control-value" id="val-spread">${s.spread}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-spread" min="5" max="100" value="${s.spread}">
        </div>

        <!-- Bulanıklık / Yumuşaklık -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t('blur')}</span>
            <span class="lumaborder-control-value" id="val-blur">${s.blur}px</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-blur" min="10" max="120" value="${s.blur}">
        </div>

        <!-- 4-Bölge Bağımsız Kenar Kontrolü (Item 2.1) -->
        <div class="lumaborder-section-divider"></div>
        <div class="lumaborder-control-header" style="margin-top: 8px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${t('edgeControls')}</span>
        </div>
        <div class="lumaborder-hint-text">${t('edgeControlsDesc')}</div>
        <div class="lumaborder-edge-grid">
          <div class="lumaborder-edge-item">
            <div class="lumaborder-edge-header">
              <span>${t('edgeTop')}</span>
              <input type="checkbox" id="chk-edge-top" ${s.edgeTop ? 'checked' : ''}>
            </div>
            <input type="range" class="lumaborder-range" id="rng-edge-top" min="0" max="200" value="${s.edgeTopSpread}">
          </div>
          <div class="lumaborder-edge-item">
            <div class="lumaborder-edge-header">
              <span>${t('edgeRight')}</span>
              <input type="checkbox" id="chk-edge-right" ${s.edgeRight ? 'checked' : ''}>
            </div>
            <input type="range" class="lumaborder-range" id="rng-edge-right" min="0" max="200" value="${s.edgeRightSpread}">
          </div>
          <div class="lumaborder-edge-item">
            <div class="lumaborder-edge-header">
              <span>${t('edgeBottom')}</span>
              <input type="checkbox" id="chk-edge-bottom" ${s.edgeBottom ? 'checked' : ''}>
            </div>
            <input type="range" class="lumaborder-range" id="rng-edge-bottom" min="0" max="200" value="${s.edgeBottomSpread}">
          </div>
          <div class="lumaborder-edge-item">
            <div class="lumaborder-edge-header">
              <span>${t('edgeLeft')}</span>
              <input type="checkbox" id="chk-edge-left" ${s.edgeLeft ? 'checked' : ''}>
            </div>
            <input type="range" class="lumaborder-range" id="rng-edge-left" min="0" max="200" value="${s.edgeLeftSpread}">
          </div>
        </div>
      `;
    }

    if (tab === 'effects') {
      const isBiasOff = s.biasLightingMode === 'off';
      return `
        <!-- Doygunluk -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t('saturation')}</span>
            <span class="lumaborder-control-value" id="val-saturation">${s.saturation}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-saturation" min="50" max="220" value="${s.saturation}">
        </div>

        <!-- Kontrast -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t('contrast')}</span>
            <span class="lumaborder-control-value" id="val-contrast">${s.contrast}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-contrast" min="60" max="160" value="${s.contrast}">
        </div>

        <!-- Kare Yumuşatma -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t('smoothing')}</span>
            <span class="lumaborder-control-value" id="val-smoothing">${s.smoothing}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-smoothing" min="0" max="100" value="${s.smoothing}">
        </div>

        <!-- Kelvin Renk Sıcaklığı (Item 2.5) -->
        <div class="lumaborder-control-row" style="margin-top: 10px;">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t('colorTemperature')}</span>
            <span class="lumaborder-control-value" id="val-kelvin">${s.colorTemperature || 6500}K</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-kelvin" min="2200" max="9300" step="50" value="${s.colorTemperature || 6500}">
          <div class="lumaborder-hint-text">${t('colorTemperatureDesc')}</div>
        </div>

        <!-- Dynamic Accent Tinting (Item 3.4) -->
        <div class="lumaborder-master-card" style="margin-top: 10px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('dynamicAccent')}</span>
            <span class="lumaborder-master-sub">${t('dynamicAccentDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-dynamic-accent" ${s.dynamicAccent ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Dinamik Altyazı Kısma (Item 2.6) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('autoSubtitleDim')}</span>
            <span class="lumaborder-master-sub">${t('autoSubtitleDimDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-auto-sub-dim" ${s.autoSubtitleDim ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Sabit Arka Işık (Bias Lighting) -->
        <div class="lumaborder-section-divider"></div>
        <div class="lumaborder-control-header" style="margin-top: 10px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${t('biasLighting')}</span>
        </div>
        <div class="lumaborder-bias-modes">
          <button class="lumaborder-mode-pill ${s.biasLightingMode === 'off' ? 'active' : ''}" data-biasmode="off">${t('biasModeOff')}</button>
          <button class="lumaborder-mode-pill ${s.biasLightingMode === 'pause' ? 'active' : ''}" data-biasmode="pause">${t('biasModePause')}</button>
          <button class="lumaborder-mode-pill ${s.biasLightingMode === 'always' ? 'active' : ''}" data-biasmode="always">${t('biasModeAlways')}</button>
        </div>

        <div class="lumaborder-color-palette" id="bias-color-palette" style="${isBiasOff ? 'display:none;' : ''}">
          <span class="lumaborder-control-label" style="font-size: 11px;">${t('biasLightingColor')}:</span>
          <div class="lumaborder-color-dots">
            <button class="lumaborder-color-dot ${s.biasLightingColor === '#ffe4b5' ? 'active' : ''}" data-color="#ffe4b5" title="${t('biasColorWarm')}" style="background: #ffe4b5;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === '#fff4e8' ? 'active' : ''}" data-color="#fff4e8" title="${t('biasColorNeutral')}" style="background: #fff4e8;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === '#ffffff' ? 'active' : ''}" data-color="#ffffff" title="${t('biasColorCinema')}" style="background: #ffffff;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === '#00e5ff' ? 'active' : ''}" data-color="#00e5ff" title="${t('biasColorCyber')}" style="background: #00e5ff;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === '#ff5e00' ? 'active' : ''}" data-color="#ff5e00" title="${t('biasColorSunset')}" style="background: #ff5e00;"></button>
            <button class="lumaborder-color-dot ${s.biasLightingColor === '#bd00ff' ? 'active' : ''}" data-color="#bd00ff" title="${t('biasColorPurple')}" style="background: #bd00ff;"></button>
            <input type="color" id="bias-custom-color" class="lumaborder-color-picker" value="${(typeof s.biasLightingColor === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(s.biasLightingColor.trim())) ? s.biasLightingColor.trim() : '#ffe4b5'}" title="${t('biasColorCustom')}">
          </div>
        </div>
      `;
    }

    if (tab === 'ambilight') {
      return `
        <!-- Çok Bölgeli Ambilight (Item 2.2) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('multiZone')}</span>
            <span class="lumaborder-master-sub">${t('multiZoneDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-multizone" ${s.multiZone ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>
        <div class="lumaborder-zone-modes">
          <button class="lumaborder-mode-pill ${s.zoneCount === 8 ? 'active' : ''}" data-zones="8">8 ${t('zoneCount')}</button>
          <button class="lumaborder-mode-pill ${s.zoneCount === 12 ? 'active' : ''}" data-zones="12">12 ${t('zoneCount')}</button>
          <button class="lumaborder-mode-pill ${s.zoneCount === 16 ? 'active' : ''}" data-zones="16">16 ${t('zoneCount')}</button>
        </div>

        <!-- Siyah Şerit Doldurucu (Bar Fill - Item 2.3) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('barFill')}</span>
            <span class="lumaborder-master-sub">${t('barFillDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-barfill" ${s.barFill ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Banding Önleme (Dithering - Item 2.4) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('debanding')}</span>
            <span class="lumaborder-master-sub">${t('debandingDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-debanding" ${s.debanding ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Müzik & Bas Reaktif Ritim Modu (Item 3.1) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('audioReactive')}</span>
            <span class="lumaborder-master-sub">${t('audioReactiveDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-audio-reactive" ${s.audioReactive ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>
        <div class="lumaborder-control-row" id="row-audio-sens" style="${s.audioReactive ? '' : 'display:none;'}">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${t('audioSensitivity')}</span>
            <span class="lumaborder-control-value" id="val-audio-sens">${s.audioSensitivity || 50}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-audio-sens" min="10" max="100" value="${s.audioSensitivity || 50}">
        </div>

        <!-- Zaman Ayarlı Gece Karartması (Item 3.3) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('nightShift')}</span>
            <span class="lumaborder-master-sub">${t('nightShiftDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-night-shift" ${s.nightShiftEnabled ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>
        <div class="lumaborder-time-row" id="row-night-shift-time" style="${s.nightShiftEnabled ? '' : 'display:none;'}">
          <span>Saat:</span>
          <input type="text" class="lumaborder-time-input" id="inp-night-start" value="${s.nightShiftStart || '22:00'}" style="width: 55px;">
          <span>—</span>
          <input type="text" class="lumaborder-time-input" id="inp-night-end" value="${s.nightShiftEnd || '07:00'}" style="width: 55px;">
        </div>
      `;
    }

    if (tab === 'presets') {
      return `
        <div class="lumaborder-presets-grid">
          <button class="lumaborder-preset-btn ${s.activePreset === 'default' ? 'active' : ''}" data-preset="default">
            <span class="lumaborder-preset-icon">⚖️</span>
            <span>${t('presetDefault')}</span>
          </button>
          <button class="lumaborder-preset-btn ${s.activePreset === 'cinema' ? 'active' : ''}" data-preset="cinema">
            <span class="lumaborder-preset-icon">🎬</span>
            <span>${t('presetCinema')}</span>
          </button>
          <button class="lumaborder-preset-btn ${s.activePreset === 'vibrant' ? 'active' : ''}" data-preset="vibrant">
            <span class="lumaborder-preset-icon">⚡</span>
            <span>${t('presetVibrant')}</span>
          </button>
          <button class="lumaborder-preset-btn ${s.activePreset === 'night' ? 'active' : ''}" data-preset="night">
            <span class="lumaborder-preset-icon">🌙</span>
            <span>${t('presetNight')}</span>
          </button>
          <button class="lumaborder-preset-btn ${s.activePreset === 'gaming' ? 'active' : ''}" data-preset="gaming">
            <span class="lumaborder-preset-icon">🎮</span>
            <span>${t('presetGaming')}</span>
          </button>
        </div>
      `;
    }

    if (tab === 'performance') {
      const fpsLabel = s.targetFps === 'sync' ? t('fpsSync') : `${s.targetFps} FPS`;
      return `
        <!-- Render Motoru (Item 1.1) -->
        <div class="lumaborder-control-header" style="margin-top: 4px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${t('renderEngine')}</span>
        </div>
        <div class="lumaborder-engine-modes">
          <button class="lumaborder-mode-pill ${s.renderEngine === 'webgl' ? 'active' : ''}" data-engine="webgl">${t('engineWebGL')}</button>
          <button class="lumaborder-mode-pill ${s.renderEngine === 'canvas2d' ? 'active' : ''}" data-engine="canvas2d">${t('engineCanvas2D')}</button>
        </div>
        <div class="lumaborder-hint-text">${t('renderEngineDesc')}</div>

        <!-- Renk Uzayı & HDR Tonemapping (Item 1.5) -->
        <div class="lumaborder-control-header" style="margin-top: 10px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${t('colorSpace')}</span>
        </div>
        <div class="lumaborder-engine-modes">
          <button class="lumaborder-mode-pill ${s.colorSpace === 'display-p3' ? 'active' : ''}" data-cspace="display-p3">Display P3 (HDR)</button>
          <button class="lumaborder-mode-pill ${s.colorSpace === 'srgb' ? 'active' : ''}" data-cspace="srgb">sRGB (Standart)</button>
        </div>

        <div class="lumaborder-master-card" style="margin-top: 8px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('hdrTonemap')}</span>
            <span class="lumaborder-master-sub">${t('hdrTonemapDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-hdr-tonemap" ${s.hdrTonemap ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Statik Sahne Dondurucu (Dirty Frame Freeze - Item 1.2) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('freezeDetection')}</span>
            <span class="lumaborder-master-sub">${t('freezeDetectionDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-freeze" ${s.freezeDetection ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Kare Düşüşü Koruması (Drop Sentinel - Item 2) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('dropFrameSentinel')}</span>
            <span class="lumaborder-master-sub">${t('dropFrameSentinelDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-drop-sentinel" ${s.dropFrameSentinel ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Ultra-Eco Çözünürlük (96x54 / %75 GPU Tasarrufu - Item 6) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('ultraEco')}</span>
            <span class="lumaborder-master-sub">${t('ultraEcoDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-ultra-eco" ${s.ultraEco ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Hedef Kare Hızı (FPS Limiti) -->
        <div class="lumaborder-control-header" style="margin-top: 12px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${t('targetFps')}</span>
          <span class="lumaborder-control-value" id="val-target-fps">${fpsLabel}</span>
        </div>
        <div class="lumaborder-fps-modes">
          <button class="lumaborder-mode-pill ${s.targetFps === 'sync' ? 'active' : ''}" data-fps="sync">${t('fpsSync')}</button>
          <button class="lumaborder-mode-pill ${String(s.targetFps) === '60' ? 'active' : ''}" data-fps="60">${t('fps60')}</button>
          <button class="lumaborder-mode-pill ${String(s.targetFps) === '30' ? 'active' : ''}" data-fps="30">${t('fps30')}</button>
        </div>

        <!-- Akıllı Pil Tasarrufu (%20 Altı Otomatik 30 FPS) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('autoBatteryEco')}</span>
            <span class="lumaborder-master-sub">${t('autoBatteryEcoDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-battery-eco" ${s.autoBatteryEco ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Canlı Pil Durumu Kartı -->
        <div class="lumaborder-battery-card" id="lumaborder-battery-card">
          <div class="lumaborder-battery-info">
            <span class="lumaborder-battery-icon" id="lumaborder-battery-icon">🔋</span>
            <div class="lumaborder-battery-text">
              <span class="lumaborder-battery-title" id="lumaborder-battery-title">${t('batteryStatusTitle')}</span>
              <span class="lumaborder-battery-sub" id="lumaborder-battery-sub">Kontrol ediliyor...</span>
            </div>
          </div>
          <span class="lumaborder-battery-tag" id="lumaborder-battery-tag">--</span>
        </div>

        <!-- OffscreenCanvas & Worker Render (Item 1.3) -->
        <div class="lumaborder-master-card" style="margin-top: 12px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('workerRender')}</span>
            <span class="lumaborder-master-sub">${t('workerRenderDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-worker" ${s.workerRender ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Siyah Şerit Algılama (Item 1.4) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('letterboxDetection')}</span>
            <span class="lumaborder-master-sub">${t('letterboxDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-letterbox" ${s.letterboxDetection ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${t('pillarboxDetection')}</span>
            <span class="lumaborder-master-sub">${t('pillarboxDesc')}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-pillarbox" ${s.pillarboxDetection ? 'checked' : ''}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>
      `;
    }

    return '';
}
