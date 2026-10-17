/**
 * LumaBorder - YouTube Oynatıcı Kontrol Hedefi Çözücü (Saf Katman)
 * YouTube'un A/B testleri, Shorts düzeni ve yeni UI varyantlarına karşı
 * çok kademeli seçici hiyerarşisi. DOM'a bağımlı ama enjekte edilebilir
 * (document + player duck-typed) olduğundan tests/ui-target.test.js ile
 * gerçek davranışı doğrulanır.
 */

export const SHORTS_ACTION_SELECTORS = [
  '#actions',
  'ytd-reel-player-overlay-renderer #actions',
  '#actions.ytd-reel-player-overlay-renderer',
  '.ytd-reel-player-overlay-renderer #actions',
  '#overlay #actions',
  '.ytd-reel-player-overlay-renderer'
];

export const LEFT_CONTROLS_SELECTORS = [
  '.ytp-left-controls',
  '.ytp-chrome-bottom .ytp-left-controls',
  '.ytp-chrome-controls .ytp-left-controls',
  '.ytp-controls-left',
  '#movie_player .ytp-left-controls',
  '.html5-video-player .ytp-left-controls'
];

export const RIGHT_CONTROLS_SELECTORS = [
  '.ytp-right-controls',
  '.ytp-chrome-bottom .ytp-right-controls',
  '.ytp-chrome-controls .ytp-right-controls',
  '.ytp-controls-right',
  '#movie_player .ytp-right-controls',
  '.html5-video-player .ytp-right-controls'
];

export const RIGHT_ANCHOR_SELECTORS = [
  '.ytp-subtitles-button',
  '.ytp-settings-button',
  '.ytp-miniplayer-button',
  '.ytp-size-button',
  '.ytp-fullscreen-button'
];

/**
 * Kısa devre çözümü: oynatıcı Shorts bağlamında mı?
 */
export function isShortsContext(player, pathname = '') {
  return Boolean(pathname && pathname.startsWith('/shorts')) ||
    Boolean(player?.closest?.('ytd-shorts, ytd-reel-video-renderer, #shorts-player'));
}

/**
 * Güvenli querySelector: geçersiz seçici veya eksik metot durumunda null döner.
 */
function safeQuery(scope, selector) {
  try {
    return scope?.querySelector?.(selector) || null;
  } catch (e) {
    return null;
  }
}

function firstMatch(scopes, selectors) {
  for (const selector of selectors) {
    for (const scope of scopes) {
      const el = safeQuery(scope, selector);
      if (el) return el;
    }
  }
  return null;
}

/**
 * Oynatıcı kontrol çubuğunda butonun yerleştirileceği hedefi çözer.
 * @param {Document|object} doc document benzeri nesne
 * @param {object} player oynatıcı elemanı
 * @param {{ isShorts?: boolean, buttonPosition?: 'left'|'right', innerHeight?: number }} options
 * @returns {{ container: object, type: string, anchor: object|null, isFallback: boolean }}
 */
export function resolveControlsTarget(doc, player, options = {}) {
  const { isShorts = false, buttonPosition = 'left', innerHeight = 0 } = options;

  if (isShorts) {
    let activeReel = player?.closest?.('ytd-reel-video-renderer') ||
      doc.querySelector('ytd-reel-video-renderer[is-active]');

    if (!activeReel) {
      const videos = Array.from(doc.querySelectorAll('ytd-reel-video-renderer video'));
      const playingVideo = videos.find(v => !v.paused && v.readyState >= 2) || videos.find(v => !v.paused);
      if (playingVideo) {
        activeReel = playingVideo.closest('ytd-reel-video-renderer');
      }
    }

    if (!activeReel) {
      const reels = Array.from(doc.querySelectorAll('ytd-reel-video-renderer'));
      if (reels.length > 0) {
        const centerY = innerHeight / 2;
        let minDistance = Infinity;
        for (const r of reels) {
          const rect = r.getBoundingClientRect();
          const dist = Math.abs((rect.top + rect.height / 2) - centerY);
          if (dist < minDistance) {
            minDistance = dist;
            activeReel = r;
          }
        }
      }
    }

    let target = null;
    if (activeReel) {
      target = firstMatch([activeReel], SHORTS_ACTION_SELECTORS);
    }
    if (!target) {
      target = firstMatch([doc], SHORTS_ACTION_SELECTORS);
    }

    if (target) {
      return { container: target, type: 'shorts', anchor: null, isFallback: false };
    }

    const shortsContainer = activeReel?.querySelector?.('#player-container') || player || doc.body;
    return { container: shortsContainer, type: 'shorts-floating', anchor: null, isFallback: true };
  }

  const preferredPos = buttonPosition || 'left';

  const leftControls = firstMatch([player, doc], LEFT_CONTROLS_SELECTORS);
  const rightControls = firstMatch([player, doc], RIGHT_CONTROLS_SELECTORS);

  const getRightAnchor = (rc) => {
    if (!rc) return null;
    for (const sel of RIGHT_ANCHOR_SELECTORS) {
      const el = safeQuery(rc, sel);
      if (el) return el;
    }
    return rc.firstElementChild || null;
  };

  // Tercihe göre önce sol veya sağ kontrolleri dene
  if (preferredPos === 'left' && leftControls) {
    return { container: leftControls, type: 'standard-left', anchor: null, isFallback: false };
  }

  if (preferredPos === 'right' && rightControls) {
    return { container: rightControls, type: 'standard-right', anchor: getRightAnchor(rightControls), isFallback: false };
  }

  // Tercih edilen bulunamazsa alternatif kontroller
  if (leftControls) {
    return { container: leftControls, type: 'standard-left', anchor: null, isFallback: false };
  }

  if (rightControls) {
    return { container: rightControls, type: 'standard-right', anchor: getRightAnchor(rightControls), isFallback: false };
  }

  const bottomControls = safeQuery(player, '.ytp-chrome-bottom') ||
    safeQuery(player, '.ytp-chrome-controls') ||
    safeQuery(doc, '.ytp-chrome-bottom');
  if (bottomControls) {
    return { container: bottomControls, type: 'standard-alt', anchor: null, isFallback: false };
  }

  const topControls = safeQuery(player, '.ytp-chrome-top-buttons') ||
    safeQuery(player, '.ytp-chrome-top');
  if (topControls) {
    return { container: topControls, type: 'standard-top', anchor: null, isFallback: false };
  }

  return {
    container: player || safeQuery(doc, '#movie_player') || doc.body,
    type: 'floating',
    anchor: null,
    isFallback: true
  };
}
