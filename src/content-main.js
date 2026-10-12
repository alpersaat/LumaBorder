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

        this.checkAndBootstrap();
      } catch (err) {
        console.warn('[LumaBorder] Başlatma hatası:', err);
      }
    }

    bindEvents() {
      window.addEventListener('yt-navigate-finish', () => this.scheduleBootstrap());
      window.addEventListener('spfdone', () => this.scheduleBootstrap());
      window.addEventListener('popstate', () => this.scheduleBootstrap());

      // Shorts video geçişleri için scroll dinleyicisi
      window.addEventListener('wheel', () => {
        if (location.pathname.startsWith('/shorts')) {
          this.scheduleBootstrap(200);
        }
      }, { passive: true });
    }

    scheduleBootstrap(delay = 300) {
      if (this.initTimeout) clearTimeout(this.initTimeout);
      this.initTimeout = setTimeout(() => this.checkAndBootstrap(), delay);
    }

    observeDOM() {
      try {
        const observer = new MutationObserver(() => {
          const isShorts = location.pathname.startsWith('/shorts');
          if (isShorts) {
            const activeReel = document.querySelector('ytd-reel-video-renderer[is-active]');
            const video = activeReel ? activeReel.querySelector('video') : document.querySelector('ytd-shorts video');
            if (video && (video !== this.currentVideo || activeReel !== this.currentReel)) {
              this.scheduleBootstrap(150);
            }
          } else {
            const video = document.querySelector('video.html5-main-video') || document.querySelector('video');
            if (video && video !== this.currentVideo) {
              this.scheduleBootstrap(150);
            }
          }
        });

        const target = document.body || document.documentElement;
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
        const reelSelectors = [
          'ytd-reel-video-renderer[is-active]',
          'ytd-reel-video-renderer',
          'ytd-shorts [is-active]',
          '#shorts-player'
        ];

        for (const sel of reelSelectors) {
          try {
            const el = document.querySelector(sel);
            if (el) {
              activeReel = el;
              break;
            }
          } catch (e) {}
        }

        if (activeReel) {
          video = activeReel.querySelector('video.html5-main-video') ||
                  activeReel.querySelector('video');
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

    checkAndBootstrap() {
      const isWatch = location.pathname.startsWith('/watch') || location.pathname.startsWith('/embed/');
      const isShorts = location.pathname.startsWith('/shorts');

      if (!isWatch && !isShorts) {
        this.teardown();
        return;
      }

      const { video, player, activeReel } = this.findTargetVideoAndPlayer(isShorts);

      if (!video || !player) {
        setTimeout(() => {
          this.retryBootstrap(isShorts);
        }, 400);
        return;
      }

      if (this.currentVideo === video && this.currentPlayer === player && this.ambientEngine && (isShorts ? this.currentReel === activeReel : true)) {
        return;
      }

      this.currentReel = activeReel;
      this.setup(video, player);
    }

    retryBootstrap(isShorts) {
      const { video, player } = this.findTargetVideoAndPlayer(isShorts);
      if (video && player && (video !== this.currentVideo || player !== this.currentPlayer)) {
        this.setup(video, player);
      }
    }

    setup(video, player) {
      this.teardown();
      this.currentVideo = video;
      this.currentPlayer = player;

      try {
        this.ambientEngine = new AmbientEngine(video, player, settingsManager.current);
        this.playerUI = new PlayerUI(player, settingsManager, this.ambientEngine);
      } catch (err) {
        console.warn('[LumaBorder] Kurulum hatası:', err);
      }
    }

    teardown() {
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

