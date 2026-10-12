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

- **📱 YouTube Shorts Tam Desteği:**
  - YouTube Shorts (`/shorts/*`) masaüstünde sağda ve solda oluşan devasa siyah boşlukları dinamik ambient ışıkla doldurur. Shorts kontrol çubuğuna özel buton entegrasyonu.

- **✨ Çift Katmanlı Glow (Dual-Layer: Tight + Diffuse):**
  - Videonun hemen arkasında canlı ve keskin bir çekirdek ışık (Tight Glow) ile dışarıya yayılan geniş ve puslu bir atmosfer (Diffuse Ambient) sunarak 2 kat daha derin ve sinematik bir OLED/Ambilight deneyimi sunar.

- **🎬 Akıllı Siyah Şerit Tespiti (Letterbox & Pillarbox):**
  - 21:9 sinemaskop filmlerdeki üst/alt şeritleri (Letterbox) ve 4:3 veya dikey videolardaki sağ/sol şeritleri (Pillarbox) otomatik tespit eder ve kırpar. Işık sadece saf video görüntüsünden üretilir.

- **💬 Altyazı Koruması (Subtitle / Bottom Fade):**
  - Altyazı açıkken ya da parlak beyaz altyazı patlamaları olduğunda alt glow'un parlayarak gözü yormasını engelleyen donanım hızlandırmalı yumuşatma / karartma filtresi.

- **💡 Sabit Arka Işık (Bias Lighting) Modu:**
  - Video duraklatıldığında veya kullanıcı istediğinde gözü dinlendiren 2700K sıcak beyaz, 4000K doğal beyaz, 6500K D65 sinema veya neon renkli sabit arka aydınlatma modu.

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

- **🔋 Performans & Pil Optimizasyonları:**
  - **Kullanıcı Tanımlı FPS Limiti (30 / 60 / Eşzamanlı):** Yüksek yenileme hızına sahip (144Hz / 240Hz) ekranlarda veya dizüstü bilgisayarlarda GPU tüketimini minimize etmek için kullanıcı tanımlı hedef FPS (Eşzamanlı, 60 FPS, 30 FPS Eko).
  - **OffscreenCanvas & Worker Render Denemesi:** Donanım hızlandırmalı OffscreenCanvas ve arka plan Web Worker entegrasyonu ile piksel analizini (`getImageData`) ana UI iş parçacığından ayırarak takılmaları sıfırlar.
  - **Pil Durumu API'si (Battery Status Integration):** Tarayıcının Battery Status API'si ile entegre çalışır; cihaz pildeyken şarj seviyesi %20'nin altına indiğinde otomatik 30 FPS Eko modu devreye girer, cihaz şarja takıldığında ise normal ayarlara sorunsuz döner.
  - **Eko Güç Tasarrufu:** Sekme arka plana alındığında veya video duraklatıldığında çizim döngüsü derhal uyku moduna geçer, pil ve GPU tüketimi sıfırlanır.

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
├── scripts/                   # Geliştirici ve derleme araçları
│   ├── build.js               # Ultra hafif esbuild paketleme ve izleme betiği
│   └── package.js             # Dağıtım ve mağaza için temiz .zip üretici
├── package.json               # Bağımlılıklar (esbuild) ve npm komutları
├── popup/                     # Tarayıcı araç çubuğu kontrol merkezi
│   ├── popup.html             # Popup arayüzü (FPS limitleri, pil durumu, ayarlar)
│   ├── popup.css              # Glassmorphic koyu neon tasarım
│   └── popup.js               # Anlık ayar senkronizasyonu ve pil takipçisi
├── src/                       # Modüler kaynak kodlar (Zero-duplication)
│   ├── content-main.js        # Modüler giriş noktası (Entry point)
│   ├── content.js             # Otomatik derlenen (bundled) içerik betiği
│   ├── render-worker.js       # OffscreenCanvas & piksel analiz Web Worker'ı
│   ├── ambient-engine.js      # GPU/Canvas tabanlı glow render ve pil motoru
│   ├── player-ui.js           # YouTube A/B test korumalı buton & modern menü kontrolcüsü
│   ├── settings.js            # Ayarlar ve hazır profiller yöneticisi
│   ├── i18n.js                # Türkçe & English dil motoru
│   └── styles/
│       ├── ambient.css        # Glow tuval, katman ve yüzen buton stilleri
│       └── menu.css           # Oynatıcı içi modern ayarlar menüsü stilleri
├── LICENSE                    # MIT Lisansı
└── README.md                  # Proje dokümantasyonu
```

---

## 🛠️ Geliştirici Deneyimi & Derleme Adımları (Developer Guide)

LumaBorder, geliştirme sürecinde tam modüler ES modüllerini kullanır ve **esbuild** ile milisaniyeler içinde tek bir dağıtım dosyasına (`src/content.js`) derlenir. `ambient-engine.js` veya diğer sınıflarda yapılan değişiklikler anında derlenir; manuel kod kopyalama ihtiyacı tamamen ortadan kaldırılmıştır.

### 📦 Geliştirici Komutları

```bash
# 1. Geliştirici paketlerini yükleyin
npm install

# 2. Kaynak kodları anında tek dosya content.js'e derleyin (<20ms)
npm run build

# 3. Canlı geliştirme / dosya izleme modu (Watch Mode)
npm run dev
# veya
npm run watch

# 4. Chrome Web Store veya dağıtım için temiz ZIP arşivi üretin
npm run package
```

### 🛡️ Kapsamlı Hata Yönetimi & YouTube DOM Güncelleme Koruması

YouTube'un sık sık yaptığı A/B testleri, arayüz denemeleri ve dinamik DOM güncellemelerine karşı sistem şu koruma katmanlarına sahiptir:

1. **Çok Kademeli Seçici Hiyerarşisi (Multi-tier Selector Cascade):**
   - Menü butonu yerleştirilirken öncelikle `.ytp-right-controls`, `.ytp-chrome-bottom .ytp-right-controls`, `.ytp-chrome-controls .ytp-right-controls` kontrol edilir.
   - YouTube'un yeni tasarım testlerinde bu hedefler bulunamazsa `.ytp-chrome-bottom`, `.ytp-left-controls` veya `.ytp-chrome-top-buttons` aranır.
   - Oynatıcı kontrolleri tamamen özel ya da kapalıysa video oynatıcısının üzerine şık bir **Yüzen Menü Butonu (Floating HUD - `.lumaborder-floating-btn`)** yerleştirilerek kullanıcının ayarlara erişimi daima garanti altına alınır.
2. **Akıllı Buton Hizalama:**
   - Kontrol çubuğunda buton eklenirken `.ytp-settings-button`, `.ytp-subtitles-button`, `.ytp-miniplayer-button`, `.ytp-size-button`, `.ytp-fullscreen-button` sırasıyla aranarak en uygun pozisyona yerleştirilir.
3. **DOM Mutation & Lazy-Load Watchdog:**
   - YouTube reklam geçişlerinde (`.ad-showing`), kalite veya tam ekran değişikliklerinde kontrolleri yok edip yeniden oluşturduğunda `MutationObserver` butonu otomatik olarak yeniden ekler.
   - Fare oynatıcı üzerine geldiğinde (`mouseenter`/`mousemove`) tembel yüklenen (lazy controls) arayüzler yakalanır.
4. **Klavye & Olay Yalıtımı:**
   - Menü içindeki tıklama ve tuş vuruşları yalıtılarak (`stopPropagation`), YouTube'un `Space`, `K`, `F`, `M` gibi video kısayollarının yanlışlıkla tetiklenmesi önlenmiştir.

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

