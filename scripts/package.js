/**
 * LumaBorder - Extension Packaging Script
 * Uzantıyı derler ve dağıtım için temiz bir .zip arşivi üretir.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('[LumaBorder] 📦 Paketleme başlatılıyor...');

// Önce projeyi derle
console.log('[LumaBorder] 🔨 Güncel kaynak kod derleniyor...');
execSync('node scripts/build.js', { stdio: 'inherit' });

const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
const version = manifest.version || '2.2.0';
const zipName = `LumaBorder-v${version}.zip`;

console.log(`[LumaBorder] 📁 Arşiv oluşturuluyor: ${zipName}`);

// PowerShell Compress-Archive kullanarak paketle
const filesToInclude = [
  'manifest.json',
  'background.js',
  'LICENSE',
  'README.md',
  'icons',
  'popup',
  'src/content.js',
  'src/render-worker.js',
  'src/settings.js',
  'src/i18n.js',
  'src/styles'
];

try {
  // Varsa eski zipi kaldır
  if (fs.existsSync(zipName)) {
    fs.unlinkSync(zipName);
  }

  // Geçici paketleme klasörü
  const tempDir = path.join('.tmp-package', 'LumaBorder');
  if (fs.existsSync('.tmp-package')) {
    fs.rmSync('.tmp-package', { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });

  // Dosyaları kopyala
  for (const item of filesToInclude) {
    const dest = path.join(tempDir, item);
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.cpSync(item, dest, { recursive: true });
  }

  // ZIP'le
  const psCmd = `powershell -Command "Compress-Archive -Path '${tempDir}\\*' -DestinationPath '${zipName}' -Force"`;
  execSync(psCmd, { stdio: 'inherit' });

  // Temizlik
  fs.rmSync('.tmp-package', { recursive: true, force: true });

  const stats = fs.statSync(zipName);
  const sizeKb = (stats.size / 1024).toFixed(1);
  console.log(`[LumaBorder] ✅ Başarıyla paketlendi: ${zipName} (${sizeKb} KB)`);
} catch (err) {
  console.error('[LumaBorder] ❌ Paketleme hatası:', err);
  process.exit(1);
}

