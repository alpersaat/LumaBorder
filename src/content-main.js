/**
 * LumaBorder - Dynamic Video Glow & Border Engine
 * Content Script Modular Entry Point
 * Bundled into src/content.js via esbuild
 * Standart YouTube ve YouTube Shorts tam destekli
 */

import { i18n } from './i18n.js';
import { settingsManager } from './settings.js';
import { AmbientEngine } from './ambient-engine.js';
import { PlayerUI } from './player-ui.js';

(() => {
  if (window.__LUMABORDER_LOADED__) return;
  window.__LUMABORDER_LOADED__ = true;

  class LumaBorderApp {
    constructor() {
      this.ambientEngine = null;
      this.playerUI = null;
      this.currentVideo = null;
      this.currentPlayer = null;
      this.currentReel = null;
      this.initTimeout = null;
      this.retryTimeout = null;
      this.observer = null;

      this.init();
    }

    async init() {
      try {
        await settingsManager.load();
        i18n.setLanguage(settingsManager.current.language || 'tr');

        this.bindEvents();
        this.observeDOM();

        settingsManager.onChange((newSettings) => {
          i18n.setLanguage(newSettings.language || 'tr');
          if (this.ambientEngine) this.ambientEngine.applySettings(newSettings);
          if (this.playerUI) this.playerUI.updateButtonState();
        });

        // Popup veya arka plandan gelen doğrudan mesajları dinle
        if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
          chrome.runtime.onMessage.addListener((msg) => {
            if (msg && msg.action === 'SETTINGS_UPDATED') {
              settingsManager.load().then((updated) => {
                i18n.setLanguage(updated.language || 'tr');
                if (this.ambientEngine) this.ambientEngine.applySettings(updated);
                if (this.playerUI) this.playerUI.updateButtonState();
              });
            }
          });
        }

        this.checkAndBootstrap();
      } catch (err) {
        console.warn('[LumaBorder] Başlatma hatası:', err);
      }
    }

    bindEvents() {
      window.addEventListener('yt-navigate-finish', () => this.scheduleBootstrap(150));
      window.addEventListener('spfdone', () => this.scheduleBootstrap(150));
      window.addEventListener('popstate', () => this.scheduleBootstrap(150));

      // Video çözünürlük veya kaynak değişimleri (Oynatma listesi / SPA geçişleri)
      document.addEventListener('loadedmetadata', (e) => {
        if (e.target && e.target.tagName === 'VIDEO') {
          this.scheduleBootstrap(100);
        }
      }, true);

      // Shorts video geçişleri için scroll ve yön tuşları dinleyicileri
      window.addEventListener('wheel', () => {
        if (location.pathname.startsWith('/shorts')) {
          this.scheduleBootstrap(100);
        }
      }, { passive: true });

      window.addEventListener('keydown', (e) => {
        if (location.pathname.startsWith('/shorts') && ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'j', 'k'].includes(e.key)) {
          this.scheduleBootstrap(100);
        }
      }, { passive: true });

      window.addEventListener('click', (e) => {
        if (location.pathname.startsWith('/shorts')) {
          if (e.target && e.target.closest && e.target.closest('#navigation-button-down, #navigation-button-up, ytd-reel-video-renderer')) {
            this.scheduleBootstrap(100);
          }
        }
      }, { passive: true });

      // Video oynatılmaya başlandığı an (Shorts ve Standart video geçişlerinde en kesin tetikleyici)
      document.addEventListener('play', (e) => {
        if (e.target && e.target.tagName === 'VIDEO') {
          if (location.pathname.startsWith('/shorts')) {
            this.handleShortsVideoPlay(e.target);
          } else {
            this.scheduleBootstrap(100);
          }
        }
      }, true);
    }

    handleShortsVideoPlay(video) {
      if (!video) return;
      const activeReel = video.closest('ytd-reel-video-renderer');
      const player = activeReel?.querySelector('#player-container') ||
                     activeReel?.querySelector('.player-container') ||
                     activeReel?.querySelector('#shorts-player') ||
                     video.parentElement;

      if (video !== this.currentVideo || player !== this.currentPlayer || activeReel !== this.currentReel) {
        this.currentReel = activeReel;
        this.setup(video, player);
      }
    }

    scheduleBootstrap(delay = 300) {
      if (this.initTimeout) clearTimeout(this.initTimeout);
      this.initTimeout = setTimeout(() => this.checkAndBootstrap(), delay);
    }

    observeDOM() {
      try {
        let observerDebounce = null;
        const observer = new MutationObserver(() => {
          if (observerDebounce) return;
          observerDebounce = setTimeout(() => {
            observerDebounce = null;
            const isShorts = location.pathname.startsWith('/shorts');
            if (isShorts) {
              const activeReel = document.querySelector('ytd-reel-video-renderer[is-active]');
              const video = activeReel ? activeReel.querySelector('video') : document.querySelector('ytd-shorts video');
              if (video && (video !== this.currentVideo || activeReel !== this.currentReel)) {
                this.scheduleBootstrap(100);
              }
            } else {
              const video = document.querySelector('video.html5-main-video') || document.querySelector('video');
              if (video && video !== this.currentVideo) {
                this.scheduleBootstrap(150);
              }
            }
          }, 150);
        });

        const target = document.querySelector('ytd-page-manager') || document.body || document.documentElement;
        this.observer = observer;
        if (target) {
          observer.observe(target, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['is-active', 'src']
          });
        }
      } catch (err) {
        console.warn('[LumaBorder] DOM Observer kurulum hatası:', err);
      }
    }

    /**
     * YouTube A/B testleri, Shorts ve yeni UI düzenlerine karşı çok katmanlı video & player bulucu
     */
    findTargetVideoAndPlayer(isShorts) {
      let video = null;
      let player = null;
      let activeReel = null;

      if (isShorts) {
        // 1. is-active özniteliğine sahip aktif reel
        activeReel = document.querySelector('ytd-reel-video-renderer[is-active]');

        // 2. Bulunamazsa oynatılmakta olan videonun reel'i
        if (!activeReel) {
          const videos = Array.from(document.querySelectorAll('ytd-reel-video-renderer video'));
          const playingVideo = videos.find(v => !v.paused && v.readyState >= 2) || videos.find(v => !v.paused);
          if (playingVideo) {
            activeReel = playingVideo.closest('ytd-reel-video-renderer');
            video = playingVideo;
          }
        }

        // 3. Bulunamazsa görünüm alanının merkezine en yakın reel
        if (!activeReel) {
          const reels = Array.from(document.querySelectorAll('ytd-reel-video-renderer'));
          if (reels.length > 0) {
            const centerY = window.innerHeight / 2;
            let closestReel = null;
            let minDistance = Infinity;
            for (const r of reels) {
              const rect = r.getBoundingClientRect();
              const dist = Math.abs((rect.top + rect.height / 2) - centerY);
              if (dist < minDistance) {
                minDistance = dist;
                closestReel = r;
              }
            }
            activeReel = closestReel;
          }
        }

        if (activeReel) {
          if (!video) {
            video = activeReel.querySelector('video.html5-main-video') ||
                    activeReel.querySelector('video');
          }
          player = activeReel.querySelector('#player-container') ||
                   activeReel.querySelector('.player-container') ||
                   activeReel.querySelector('#shorts-player') ||
                   activeReel;
        }

        if (!video) {
          video = document.querySelector('#shorts-player video') ||
                  document.querySelector('ytd-shorts video') ||
                  document.querySelector('video');
          player = document.querySelector('#shorts-player') ||
                   (video ? video.parentElement : null);
        }
      } else {
        const playerSelectors = [
          '#movie_player',
          '.html5-video-player',
          '#player .html5-video-player',
          'ytd-watch-flexy #movie_player',
          'ytd-player #movie_player',
          '#player-container',
          '#ytd-player'
        ];

        for (const sel of playerSelectors) {
          try {
            const el = document.querySelector(sel);
            if (el) {
              player = el;
              break;
            }
          } catch (e) {}
        }

        const videoSelectors = [
          'video.html5-main-video',
          '#movie_player video',
          '.html5-video-player video',
          'ytd-watch-flexy video',
          'video'
        ];

        if (player) {
          for (const sel of videoSelectors) {
            try {
              const el = player.querySelector(sel);
              if (el) {
                video = el;
                break;
              }
            } catch (e) {}
          }
        }

        if (!video) {
          for (const sel of videoSelectors) {
            try {
              const el = document.querySelector(sel);
              if (el) {
                video = el;
                break;
              }
            } catch (e) {}
          }
        }

        if (video && !player) {
          player = video.closest('.html5-video-player') ||
                   video.closest('#movie_player') ||
                   video.parentElement;
        }
      }

      return { video, player, activeReel };
    }

    checkAndBootstrap(attempt = 0) {
      const isWatch = location.pathname.startsWith('/watch') || location.pathname.startsWith('/embed/');
      const isShorts = location.pathname.startsWith('/shorts');

      if (!isWatch && !isShorts) {
        this.teardown();
        return;
      }

      const { video, player, activeReel } = this.findTargetVideoAndPlayer(isShorts);

      if (!video || !player) {
        // Player henüz hazır değil: yol kontrolü yapılan, takip edilen sınırlı yeniden deneme
        if (attempt < 10) {
          clearTimeout(this.retryTimeout);
          this.retryTimeout = setTimeout(() => this.checkAndBootstrap(attempt + 1), 300);
        }
        return;
      }

      if (this.currentVideo === video && this.currentPlayer === player && this.ambientEngine && (isShorts ? this.currentReel === activeReel : true)) {
        return;
      }

      this.currentReel = activeReel;
      this.setup(video, player);
    }

    setup(video, player) {
      if (!video || !player) return;

      this.currentVideo = video;
      this.currentPlayer = player;

      try {
        if (this.ambientEngine && this.playerUI) {
          // Varolan motoru ve arayüzü yeni videoya pürüzsüz taşı
          this.ambientEngine.updateTarget(video, player);
          this.playerUI.updateTarget(player, this.ambientEngine);
        } else {
          this.teardown();
          this.currentVideo = video;
          this.currentPlayer = player;
          this.ambientEngine = new AmbientEngine(video, player, settingsManager.current);
          this.playerUI = new PlayerUI(player, settingsManager, this.ambientEngine);
        }
      } catch (err) {
        console.warn('[LumaBorder] Kurulum hatası:', err);
      }
    }

    teardown() {
      clearTimeout(this.retryTimeout);
      clearTimeout(this.initTimeout);
      this.retryTimeout = null;
      this.initTimeout = null;
      if (this.ambientEngine) {
        try {
          this.ambientEngine.destroy();
        } catch (e) {}
        this.ambientEngine = null;
      }
      if (this.playerUI) {
        try {
          this.playerUI.destroy();
        } catch (e) {}
        this.playerUI = null;
      }
      this.currentVideo = null;
      this.currentPlayer = null;
      this.currentReel = null;
    }
  }

  // Uygulamayı başlat
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new LumaBorderApp());
  } else {
    new LumaBorderApp();
  }
})();

