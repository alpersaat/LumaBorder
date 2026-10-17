/**
 * LumaBorder - Modern & Ultra-fast esbuild Script
 * Modüler kaynak kodları tek dosyalık çıktılara paketler:
 *   1. src/content-main.js      -> src/content.js        (içerik betiği, IIFE)
 *   2. src/render-worker-main.js -> src/render-worker.js  (arka plan worker'ı)
 */

import esbuild from 'esbuild';
import fs from 'node:fs';
import process from 'process';

const isWatch = process.argv.includes('--watch') || process.argv.includes('-w');
const isRelease = process.argv.includes('--release');

const TARGETS = [
  {
    entryPoints: ['src/content-main.js'],
    outfile: 'src/content.js',
    banner: {
      js: `/**
 * LumaBorder - Dynamic Video Glow & Border Engine
 * [OTOMATIK DERLENMİŞ DOSYA - DO NOT EDIT DIRECTLY]
 * Kaynak dosyalar src/ dizinindedir (ambient-engine.js, player-ui.js, settings.js, i18n.js, content-main.js).
 * Derlemek için: npm run build | Canlı izleme için: npm run dev
 */`,
    },
  },
  {
    entryPoints: ['src/render-worker-main.js'],
    outfile: 'src/render-worker.js',
    banner: {
      js: `/**
 * LumaBorder - Background Render & Pixel Analysis Worker
 * [OTOMATIK DERLENMİŞ DOSYA - DO NOT EDIT DIRECTLY]
 * Kaynak: src/render-worker-main.js (+ pixel-analysis.js, letterbox.js, color-utils.js)
 * Derlemek için: npm run build
 */`,
    },
  },
];

function optionsFor(target) {
  return {
    entryPoints: target.entryPoints,
    bundle: true,
    outfile: target.outfile,
    format: 'iife',
    target: ['chrome100', 'firefox100', 'safari15'],
    banner: target.banner,
    minify: isRelease, // --release ile küçültülür; geliştirmede okunabilir
    sourcemap: false,
  };
}

function readExisting(outfile) {
  try {
    return fs.readFileSync(outfile, 'utf8');
  } catch {
    return null;
  }
}

async function freshBundle(options) {
  const result = await esbuild.build({ ...options, write: false });
  return Buffer.from(result.outputFiles[0].contents).toString('utf8');
}

function warnManualEdits(outfile) {
  console.warn(`[LumaBorder] ⚠️  ${outfile} dosyasinda kaynaktan farkli (manuel) degisiklikler algilandi.`);
  console.warn('[LumaBorder]     `npm run build` bu degisiklikleri uzerine yazip silecek.');
  console.warn('[LumaBorder]     Duzenlemeleri kaynaktaki src/ *.js dosyalara tasiyip tekrar derleyin.');
}

async function buildOnce(target) {
  const options = optionsFor(target);
  const existing = readExisting(target.outfile);
  const fresh = await freshBundle(options);
  if (existing !== null && existing !== fresh) {
    warnManualEdits(target.outfile);
  }
  const startTime = Date.now();
  await esbuild.build(options);
  const duration = Date.now() - startTime;
  console.log(`[LumaBorder] ✨ ${target.outfile} başarıyla oluşturuldu (${duration}ms)`);
}

async function run() {
  if (isWatch) {
    const contexts = await Promise.all(
      TARGETS.map((target) => esbuild.context(optionsFor(target)))
    );
    await Promise.all(contexts.map((ctx) => ctx.watch()));
    console.log('[LumaBorder] 🚀 Watch modu devrede. Dosya değişiklikleri anlık olarak derlenecek...');
  } else {
    for (const target of TARGETS) {
      await buildOnce(target);
    }
  }
}

run().catch((err) => {
  console.error('[LumaBorder] ❌ Derleme hatası:', err);
  process.exit(1);
});
