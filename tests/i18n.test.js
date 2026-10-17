import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { translations, I18nManager } from '../src/i18n.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('tr ve en sözlükleri aynı anahtar kümesine sahip', () => {
  const tr = Object.keys(translations.tr);
  const en = Object.keys(translations.en);
  const missingInEn = tr.filter((k) => !(k in translations.en));
  const missingInTr = en.filter((k) => !(k in translations.tr));
  assert.deepEqual(missingInEn, [], `İngilizce eksik anahtarlar: ${missingInEn.join(', ')}`);
  assert.deepEqual(missingInTr, [], `Türkçe eksik anahtarlar: ${missingInTr.join(', ')}`);
});

test('t() aktif dilde, yoksa İngilizce, yoksa anahtarın kendisini döner', () => {
  const mgr = new I18nManager('tr');
  assert.equal(mgr.t('statusActive'), translations.tr.statusActive);

  mgr.setLanguage('en');
  assert.equal(mgr.t('statusActive'), translations.en.statusActive);

  assert.equal(mgr.t('__tanimsiz_anahtar__'), '__tanimsiz_anahtar__');
});

test('setLanguage bilinmeyen dili yok sayar', () => {
  const mgr = new I18nManager('tr');
  mgr.setLanguage('de');
  assert.equal(mgr.getLanguage(), 'tr');
});

test('kaynakta kullanılan tüm çeviri anahtarları sözlükte tanımlı', () => {
  const dir = path.join(root, 'src');
  const files = fs.readdirSync(dir)
    .filter((f) => f.endsWith('.js') && f !== 'content.js' && f !== 'render-worker.js')
    .map((f) => path.join(dir, f));
  files.push(path.join(root, 'popup', 'popup.js'));

  const keys = new Set();
  const patterns = [
    /i18n\.t\(\s*['"]([A-Za-z0-9_]+)['"]\s*\)/g,   // i18n.t('key')
    /(?<![\w.])t\(\s*'([A-Za-z0-9_]+)'\s*\)/g        // t('key') (menu-content)
  ];

  for (const file of files) {
    const src = fs.readFileSync(file, 'utf8');
    for (const re of patterns) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(src))) keys.add(m[1]);
    }
  }

  const missing = [...keys].filter((k) => !(k in translations.tr) || !(k in translations.en));
  assert.deepEqual(missing, [], `Tanımsız çeviri anahtarları: ${missing.join(', ')}`);
});
