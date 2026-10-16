/**
 * LumaBorder - Modern & Ultra-fast esbuild Script
 * Modüler kaynak kodları (ambient-engine, player-ui, settings, i18n, content-main)
 * bağımsız ve optimize tek bir src/content.js dosyasına paketler.
 */

import esbuild from 'esbuild';
import fs from 'node:fs';
import process from 'process';

const isWatch = process.argv.includes('--watch') || process.argv.includes('-w');
const BUILD_OUT = 'src/content.js';

const buildOptions = {
  entryPoints: ['src/content-main.js'],
  bundle: true,
  outfile: BUILD_OUT,
  format: 'iife',
  target: ['chrome100', 'firefox100', 'safari15'],
  banner: {
    js: `/**
 * LumaBorder - Dynamic Video Glow & Border Engine
 * [OTOMATIK DERLENMİŞ DOSYA - DO NOT EDIT DIRECTLY]
 * Kaynak dosyalar src/ dizinindedir (ambient-engine.js, player-ui.js, settings.js, i18n.js, content-main.js).
 * Derlemek için: npm run build | Canlı izleme için: npm run dev
 */`,
  },
  minify: process.argv.includes('--release'), // --release ile küçültülür; geliştirmede okunabilir
  sourcemap: false,
};

async function readExisting() {
  try {
    return fs.readFileSync(BUILD_OUT, 'utf8');
  } catch {
    return null;
  }
}

async function freshBundle() {
  const result = await esbuild.build({ ...buildOptions, write: false });
  return Buffer.from(result.outputFiles[0].contents).toString('utf8');
}

function warnManualEdits(existing, fresh) {
  console.warn(`[LumaBorder] ⚠️  ${BUILD_OUT} dosyasinda kaynaktan farkli (manuel) degisiklikler algilandi.`);
  console.warn('[LumaBorder]     `npm run build` bu degisiklikleri uzerine yazip silecek.');
  console.warn('[LumaBorder]     Duzenlemeleri kaynaktaki src/ *.js dosyalara tasiyip tekrar derleyin.');
}

async function run() {
  if (isWatch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log('[LumaBorder] 🚀 Watch modu devrede. Dosya değişiklikleri anlık olarak derlenecek...');
  } else {
    const existing = await readExisting();
    const fresh = await freshBundle();
    if (existing !== null && existing !== fresh) {
      warnManualEdits(existing, fresh);
    }
    const startTime = Date.now();
    await esbuild.build(buildOptions);
    const duration = Date.now() - startTime;
    console.log(`[LumaBorder] ✨ src/content.js başarıyla oluşturuldu (${duration}ms)`);
  }
}

run().catch((err) => {
  console.error('[LumaBorder] ❌ Derleme hatası:', err);
  process.exit(1);
});

