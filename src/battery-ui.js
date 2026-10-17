/**
 * LumaBorder - Saf Pil Durumu Görünüm Modeli (Popup)
 * Popup ve oynatıcı menüsündeki pil kartının metin/ikon/eko kararını
 * DOM'dan bağımsız hesaplar. testler: tests/popup.test.js
 */

/**
 * @param {{ supported: boolean, charging?: boolean, level?: number }} info level 0-100
 * @param {boolean} autoBatteryEco
 * @param {(key: string) => string} t çeviri fonksiyonu
 */
export function computePopupBatteryView(info, autoBatteryEco, t) {
  if (!info || !info.supported) {
    return {
      supported: false,
      charging: false,
      level: 0,
      ecoActive: false,
      icon: '🔌',
      text: `${t('batteryStatusTitle')}: ${t('batteryNotSupported')}`
    };
  }

  const charging = Boolean(info.charging);
  const level = Number(info.level) || 0;
  const ecoActive = Boolean(autoBatteryEco) && !charging && level <= 20;

  let text;
  if (ecoActive) {
    text = `%${level} • ${t('batteryEcoActiveBadge')}`;
  } else if (charging) {
    text = `%${level} (${t('batteryCharging')})`;
  } else {
    text = `%${level} (${t('batteryDischarging')})`;
  }

  return {
    supported: true,
    charging,
    level,
    ecoActive,
    icon: charging ? '⚡' : (level <= 20 ? '🪫' : '🔋'),
    text
  };
}

/**
 * Master switch durum metni ve gösterge sınıfı.
 */
export function computeStatusView(enabled, t) {
  return {
    text: t(enabled ? 'statusActive' : 'statusInactive'),
    inactive: !enabled
  };
}
