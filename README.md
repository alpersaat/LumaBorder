<div align="center">

# ✨ LumaBorder

**Videoları ekranınızın dışına taşıyan, modern ve ultra akıcı dinamik glow & ışık efekti eklentisi.**

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-success?style=for-the-badge&logo=google-chrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Language](https://img.shields.io/badge/Languages-Türkçe%20%7C%20English-orange?style=for-the-badge)](#-dil-desteği--languages)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0%20(Vanilla%20JS)-brightgreen?style=for-the-badge)](#)

</div>

---

## 🌟 Öne Çıkan Özellikler (Features)

- **⚡ Donanım Hızlandırmalı Render (GPU Acceleration):**
  - Modern `requestVideoFrameCallback` API ile video kareleriyle sıfır gecikmeli senkronizasyon.
  - Optimize edilmiş donanım hızlandırmalı Canvas mimarisi (Düşük CPU ve GPU kullanımı, akıcı 60+ FPS).

- **🎨 Modern Glassmorphic & Dark UI:**
  - Koyu akrilik/cam efektli şık kontrol paneli.
  - Video oynatıcısının alt kontrol çubuğuna entegre LumaBorder butonu.
  - Tarayıcı araç çubuğundan tek tıkla ulaşılabilen bağımsız **Hızlı Kontrol Paneli (Popup Dashboard)**.

- **🇹🇷 Çift Dil Desteği (Türkçe & English):**
  - Tam Türkçe ve İngilizce dil desteği.
  - Panelden tek tıkla anında dil değiştirme imkanı (`TR 🇹🇷 / EN 🇬🇧`).

- **🎬 Akıllı Siyah Şerit Algılama (Letterbox Detection):**
  - Sinemaskop (21:9) filmlerdeki ve videolardaki siyah üst/alt şeritleri otomatik tespit eder ve kırpar. Işık sadece gerçek video görüntüsünden üretilir.

- **🎛️ Geniş Özelleştirme Yelpazesi:**
  - **Parlaklık (Brightness):** %20 - %250
  - **Işık Yayılması (Spread):** %5 - %100
  - **Yumuşaklık / Bulanıklık (Blur):** 10px - 120px
  - **Renk Canlılığı (Saturation):** %50 - %220
  - **Kontrast (Contrast):** %60 - %160
  - **Kare Yumuşatma (Smoothing):** Ani ışık patlamalarında gözü yormayan yumuşak geçişler.

- **🌈 Hazır Profiller (Presets):**
  - ⚖️ **Dengeli (Varsayılan):** Günlük izleme için en ideal ayarlar.
  - 🎬 **Sinema:** Geniş ve yumuşak ışık yayılımı ile sinema salonu atmosferi.
  - ⚡ **Canlı & Parlak:** Maksimum doygunluk ve yüksek parlaklık.
  - 🌙 **Gece Modu:** Karanlık odalarda gözü yormayan loş ve dinlendirici ışık.
  - 🎮 **Dinamik Oyun:** Hızlı tempolu videolar için yüksek tepkisel ve canlı profil.

- **🔋 Eko Güç Tasarrufu (Eco Mode):**
  - Sekme arka plana alındığında veya video duraklatıldığında çizim döngüsü derhal uyku moduna geçer, pil ve GPU tüketimi sıfırlanır.

- **⌨️ Kısayol Tuşları:**
  - `Alt + A` (Mac: `Option + A`): Işık efektini tek tuşla anında açıp kapatın.

---

## 🚀 Kurulum (Installation)

Herhangi bir derleme (build/npm) adımına ihtiyaç duymadan **1 dakika içinde** kurabilirsiniz:

1. Bu depoyu indirin:
   - Sağ üstteki yeşil **Code** butonuna tıklayıp **Download ZIP** seçeneğini seçin ve zip dosyasını bir klasöre çıkartın, ya da terminalden klonlayın:
   ```bash
   git clone https://github.com/alpersaat/LumaBorder.git
   ```
2. Tarayıcınızı açın ve uzantılar sayfasına gidin:
   - **Google Chrome:** `chrome://extensions/`
   - **Microsoft Edge:** `edge://extensions/`
   - **Brave Browser:** `brave://extensions/`
   - **Opera:** `opera://extensions/`
3. Sağ üst köşedeki **"Geliştirici Modu" (Developer Mode)** seçeneğini aktif edin.
4. Sol üstteki **"Paketlenmemiş Öğe Yükle" (Load Unpacked)** butonuna tıklayın.
5. Proje klasörünü seçin.
6. Tebrikler! Eklenti yüklendi. Artık herhangi bir video açtığınızda dinamik glow efektinin keyfini çıkarabilirsiniz!

---

## 📂 Proje Yapısı (Architecture)

```text
LumaBorder/
├── manifest.json              # Chrome Manifest V3 konfigürasyonu
├── background.js              # Service Worker (Arka plan yönetimi ve kısayollar)
├── icons/                     # Yüksek çözünürlüklü modern neon ikonlar
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── popup/                     # Tarayıcı araç çubuğu kontrol merkezi
│   ├── popup.html             # Popup arayüzü
│   ├── popup.css              # Glassmorphic koyu neon tasarım
│   └── popup.js               # Anlık ayar senkronizasyonu
├── src/                       # Çekirdek motor ve entegrasyon
│   ├── content.js             # Tek başına çalışan (standalone) içerik betiği
│   ├── ambient-engine.js      # GPU/Canvas tabanlı glow render motoru
│   ├── player-ui.js           # Video oynatıcı buton ve menü kontrolcüsü
│   ├── settings.js            # Ayarlar ve hazır profiller yöneticisi
│   ├── i18n.js                # Türkçe & English dil motoru
│   └── styles/
│       ├── ambient.css        # Glow tuval ve katman stilleri
│       └── menu.css           # Oynatıcı içi modern ayarlar menüsü stilleri
├── LICENSE                    # MIT Lisansı
└── README.md                  # Proje dokümantasyonu
```

---

## 🎯 Kullanım Rehberi (Usage)

- **Video İçinden Kontrol:**
  - Bir video açtığınızda, oynatıcının sağ altındaki ayarlar çarkının yanında beliren **LumaBorder (Işık)** simgesine tıklayarak doğrudan video üzerinden ayarlarınızı yapabilirsiniz.
- **Uzantı Simgesinden Kontrol:**
  - Tarayıcınızın araç çubuğundaki LumaBorder simgesine tıklayarak hızlı kontrol panelini açabilir, hazır profiller arasında geçiş yapabilir veya efekti tek tıkla açıp kapatabilirsiniz.
- **Dil Değiştirme:**
  - Paneldeki `TR 🇹🇷` / `EN 🇬🇧` butonuna basarak arayüz dilini anında değiştirebilirsiniz.

---

## 📄 Lisans (License)

Bu proje [MIT Lisansı](LICENSE) kapsamında açık kaynak olarak lisanslanmıştır. Dilediğiniz gibi kullanabilir, özelleştirebilir ve geliştirebilirsiniz.
