# 🚀 LumaBorder — Geliştirilebilir Özellikler ve Performans Optimizasyonları Raporu

> **Durum:** Araştırma ve Fizibilite Raporu  
> **Hedef Sürüm Aralığı:** v2.4.0 — v3.0.0  
> **Kapsam:** GPU/CPU Performans İyileştirmeleri, Yeni Görsel Işık Efektleri, Akıllı UX ve Donanım Entegrasyonları  

---

## 📌 Yönetici Özeti (Executive Summary)

LumaBorder (v2.3.0), donanım hızlandırmalı Canvas 2D mimarisi, çift katmanlı glow (Tight + Diffuse), akıllı letterbox analizi, YouTube Shorts adaptasyonu ve Pil Durumu (Battery Status) API entegrasyonu ile son derece kararlı ve akıcı bir ortam ışığı motoruna sahiptir.

Ancak günümüz modern web standartları (WebGL 2.0, WebGPU, OffscreenCanvas, Web Audio API, Display P3 Wide Gamut) ve kullanıcıların sinematik beklentileri göz önüne alındığında, eklentinin hem **performans tüketimini %50-%70 oranında azaltabilecek** hem de **izleme deneyimini standart bir glow efektinden profesyonel bir Ambilight/Ev Sineması seviyesine taşıyabilecek** kritik fırsatlar bulunmaktadır.

Bu doküman, projeye kazandırılabilecek yeni özellikleri ve performans güncellemelerini detaylı teknik açıklamaları, mimari fizibiliteleri ve etki/zorluk dereceleriyle birlikte sunar.

---

## ⚡ BÖLÜM 1: Performans Güncellemeleri ve GPU/CPU Optimizasyonları

### 1.1. WebGL 2.0 Tabanlı Render Motoru & Dual-Kawase Shader Blurring
* **Mevcut Durum:** Şu anki sistemde iki adet `2D Canvas` (`canvasDiffuse` ve `canvasTight`) oluşturulmakta ve bulanıklık CSS `filter: blur(45px)` ile tarayıcı kompozitörüne (Compositor) bırakılmaktadır. 
* **Darboğaz:** CSS `filter: blur()` büyük piksellerde (40px-120px) Chromium katman motorunda ağır Gauss matris çarpanları çalıştırır. Özellikle 144Hz/240Hz monitörlerde veya entegre GPU'lu dizüstü bilgisayarlarda yüksek GPU gücü ve termal yük üretir.
* **Önerilen Güncelleme:**
  - İsteğe bağlı (opt-in veya donanım destekliyse varsayılan) **WebGL 2.0 Render Pipeline** entegrasyonu.
  - Video karesini doğrudan GPU dokusu (`gl.texImage2D` veya `gl.copyExternalImageToTexture`) olarak içeri alma.
  - Bulanıklaştırma işlemini ağır Gauss yerine endüstri standardı **Dual-Kawase Blur** (aşağı/yukarı örneklemeli piramit filtreleme) parçacık gölgelendiricisi (fragment shader) ile gerçekleştirmek.
* **Kazanım:**
  - GPU tüketiminde **%40 - %60 düşüş**.
  - 4K ve 8K videolarda sıfır kare kaybı (0 dropped frames).
  - CSS compositor gecikmesinin ortadan kalkması.

---

### 1.2. Statik Sahne / Duraklatma Dondurucu (Dirty Frame & Freeze Detection)
* **Mevcut Durum:** Video oynatılırken `requestVideoFrameCallback` her yeni video karesinde (24, 30 veya 60 FPS) tuvali yeniden çizer.
* **Darboğaz:** Podcast'ler, slayt içeren eğitim videoları, müzik kapak resimleri veya uzun diyalog sahnelerinde pikseller neredeyse hiç değişmezken motor saniyede 30-60 kez tam render çalıştırmaya devam eder.
* **Önerilen Güncelleme:**
  - Küçük analiz tuvali üzerinden düşük maliyetli geçici kare farkı (Temporal Frame Difference / Luminance Hash) kontrolü.
  - Eğer önceki kare ile mevcut kare arasındaki piksel farkı %1'in altındaysa render döngüsünü 1 FPS'e düşürmek veya çizimi tamamen dondurmak.
  - Sahne değiştiği anda (Scene Change Detection) normal kare hızına anında geri dönmek.
* **Kazanım:**
  - Podcast ve konuşma videolarında GPU tüketimi **%85'e kadar azalır**.
  - Dizüstü bilgisayarlarda pil ömrü belirgin şekilde uzar.

---

### 1.3. OffscreenCanvas ile Tam Çizim Ayrımı (Main Thread Decoupling)
* **Mevcut Durum:** Analiz kısmı Worker'da denenmektedir; ancak asıl tuval çizimi (`drawImage`) hâlâ ana DOM iş parçacığında (UI Thread) yapılmaktadır.
* **Önerilen Güncelleme:**
  - DOM'daki `<canvas>` elemanını `canvas.transferControlToOffscreen()` ile arka plan Web Worker'ına aktarmak.
  - Hem piksel analizini hem de tuval render döngüsünü tamamen Worker içinde koşturmak.
* **Kazanım:**
  - YouTube'un ağır yorum yüklemeleri, canlı sohbet akışı veya oynatıcı kontrolleri açılıp kapandığında ortam ışığında oluşan mikro takılmalar (micro-stutter) **tamamen sıfırlanır**.

---

### 1.4. Letterbox Analizinde GPU Senkronizasyon Tıkanmasını Sıfırlama
* **Mevcut Durum:** Letterbox/Pillarbox tespiti için ana iş parçacığında `analysisCtx.getImageData()` çağrılmaktadır.
* **Darboğaz:** `getImageData()`, CPU'yu GPU'nun o anki çizimini tamamlayıp belleği ana belleğe (RAM) kopyalamasını beklemeye zorlar (GPU Pipeline Readback Stall).
* **Önerilen Güncelleme:**
  - Sadece kenar şeritlerinin (üstten 4 satır, alttan 4 satır) taranması için dar şerit pencereleri (Partial Readback) kullanmak.
  - WebGL modunda analiz için 1x1 piksel parlaklık indirgeme (Hardware Mipmapping) tekniği uygulamak.
* **Kazanım:**
  - CPU tepe noktası sıçramaları (CPU spike) önlenir.

---

### 1.5. HDR (High Dynamic Range) & Geniş Renk Uzayı (Display P3) Desteği
* **Mevcut Durum:** Tuval varsayılan sRGB uzayında 8-bit çalışır.
* **Darboğaz:** YouTube HDR (BT.2020 / PQ / HLG) videolarında ortam ışığı tuvali patlayabilir (clipping) ya da renk tonu videodan daha soluk görünebilir.
* **Önerilen Güncelleme:**
  - Canvas 2D / WebGL başlatılırken `colorSpace: 'display-p3'` seçeneğini aktif etmek.
  - Parlaklık doygunluk haritasında dinamik ton eşleme (Tonemapping: Reinhard veya ACES filmik eğrisi) kullanarak patlayan beyazları doğal bir parlaklığa dönüştürmek.
* **Kazanım:**
  - HDR ve MacBook Liquid Retina / OLED ekranlarda mükemmel renk doğruluğu.

---

## 🎨 BÖLÜM 2: Yeni Görsel ve Sinematik Işık Efekti Özellikleri

### 2.1. 4-Bölge Bağımsız Kenar Kontrolü (Independent 4-Direction Edge Controls)
* **Açıklama:** Kullanıcıların **Üst, Sağ, Alt, Sol** yönlerindeki ışık yayılımını ve yoğunluğunu birbirinden bağımsız kontrol edebilmesi.
* **Kullanım Senaryoları:**
  - **Altyazı ve Yorum Odaklı:** Alt ışığı tamamen kapatıp sadece üst ve yanlara ışık vermek (özellikle yorumları okuyan veya karanlık odada altyazı takip eden kullanıcılar için).
  - **Ultrawide & Geniş Ekran:** 21:9 monitörlerde sağ ve sol yayılımı %150 yaparken üst ve alt yayılımı minimumda tutmak.
* **Arayüz:** Menüde 4 yön için basit aç/kapat toggle'ları ve bağımsız yoğunluk kaydırıcıları.

---

### 2.2. Çok Bölgeli Ambilight / LED Şerit Simülasyonu (Multi-Zone Edge Color Sampling)
* **Açıklama:** Şu anki sistem tüm video karesini homojen olarak genişletip bulanıklaştırmaktadır. Eğer videonun sol tarafı parlak mavi gökyüzü, sağ tarafı ise yeşil çimenlik ise, merkezdeki renkler birbirine karışabilir.
* **Önerilen Özellik:**
  - Ekran çevresini 8, 16 veya 24 bağımsız bölgeye (zones) ayırmak.
  - Gerçek Philips Ambilight televizyonlarda olduğu gibi, her kenar bölgesinin tam hizasındaki videonun rengini bağımsız olarak yaymasını sağlayan çok parçalı gradyan (Mesh Gradient) mimarisi.
* **Görsel Fark:** Çok daha gerçekçi, dinamik ve videonun kenarlarındaki aksiyonla birebir örtüşen stüdyo seviyesi sinematik atmosfer.

---

### 2.3. Siyah Şerit Doldurucu (Ultrawide Letterbox & Pillarbox Black Bar Fill)
* **Açıklama:** 
  - 21:9 bir monitörde 16:9 standart video izlendiğinde sağda ve solda devasa siyah şeritler kalır.
  - 16:9 bir monitörde sinemaskop (2.39:1) film izlendiğinde üstte ve altta siyah şeritler kalır.
* **Önerilen Özellik:**
  - Siyah şeritlerin üzerini videonun kenarlarından türetilen yumuşak ve dinamik ambient aydınlatma ile doldurma modu ("Seamless Bar Fill").
  - Siyah boşlukların rahatsız ediciliğini ortadan kaldırarak ekranın tamamını organik bir parçaya dönüştürür.

---

### 2.4. Banding Önleme ve Dithering (Debanding Noise Filter)
* **Açıklama:** Karanlık odalarda veya OLED panellerde çok geniş bulanıklık uygulandığında renk tonları arasında basamaklanma (Color Banding) ve halka halka çizgiler görülebilir.
* **Önerilen Özellik:**
  - Glow katmanına çok hafif, gözü yormayan donanım hızlandırmalı bir "Blue Noise / Dither" katmanı eklemek.
* **Kazanım:**
  - Renk geçişleri ipeksi ve pürüzsüz hale gelir; özellikle karanlık gri ve siyah arka planlarda kusursuz görüntü sunar.

---

### 2.5. Sinematik D65 & Renk Sıcaklığı Ayarı (Kelvin White Balance)
* **Açıklama:** Kullanıcının odasındaki fiziksel ışığa uyum sağlayan renk sıcaklığı kaydırıcısı (Kelvin: 2200K - 9300K).
* **Fayda:**
  - Sıcak aydınlatmalı bir odada izlerken (2700K) ortam ışığının aşırı soğuk kalmasını önler; göz yorgunluğunu minimize eder.

---

### 2.6. Akıllı Altyazı Maskeleme (Smart Dynamic Subtitle Dimmer)
* **Mevcut Durum:** Statik bir alt karartma (`bottomFade`) bulunmaktadır.
* **Önerilen Geliştirme:**
  - YouTube'un `.ytp-caption-window-container` elemanını `MutationObserver` ile izlemek.
  - Altyazı ekranda belirdiği anda alt glow'u otomatik olarak %30 seviyesine kısıp, altyazı kaybolduğunda yumuşakça (fade) eski haline getirmek.

---

## 🎛️ BÖLÜM 3: Akıllı Kullanıcı Deneyimi ve İnteraktif Özellikler

### 3.1. Müzik ve Bas Reaktif Ritim Modu (Audio-Reactive Beat Pulsing)
* **Açıklama:** Web Audio API (`AudioContext` ve `AnalyserNode`) yardımıyla video sesinin düşük frekanslarını (bas vuruşları, beat'ler) yakalamak.
* **Davranış:**
  - Müzik kliplerinde veya aksiyon sahnelerinde bas vuruşlarına göre ışık yayılmasının (spread) ve parlaklığın hafifçe nabız gibi atması (pulse).
  - Kullanıcı isteğe bağlı olarak bu efekti sadece ritmik videolarda açabilir.

---

### 3.2. Kanal ve Kategori Bazlı Otomatik Profil Eşleme (Smart Auto-Presets)
* **Açıklama:** Kullanıcının farklı kanallar için farklı ayarlar tercih edebilmesi.
* **Örnekler:**
  - Müzik kanallarında (Örn: Lofi Girl) -> Otomatik **Gece / Loş** profili.
  - Sinema/Fragman kanallarında -> Otomatik **Sinema** profili.
  - Oyun kanallarında -> Otomatik **Dinamik Oyun** profili.
* **Yöntem:** Eklenti mevcut kanalın adını algılar ve son kullanılan profili o kanal için hafızada tutar (`chrome.storage.local`).

---

### 3.3. Sirkadiyen Ritim & Zaman Ayarlı Gece Karartması (Scheduled Night Shift)
* **Açıklama:** Kullanıcının belirlediği saat aralığında (Örn: 22:30 - 07:00) LumaBorder'ın otomatik olarak Gece Modu'na geçmesi, parlaklığı %50 azaltması ve renk sıcaklığını sıcak beyaza çekmesi.

---

### 3.4. YouTube Oynatıcı UI Akıllı Renklendirme (Dynamic Accent Tinting)
* **Açıklama:** Videodaki baskın rengi çıkararak YouTube'un kırmızı oynatma çubuğunu (scrubber), ses seviyesi barını ve LumaBorder butonunu videonun o anki temasına göre dinamik olarak renklendirme.

---

### 3.5. Özel Profil Yöneticisi (Custom Presets & Import/Export)
* **Açıklama:** Kullanıcıların kendi profillerini (Örn: "Benim OLED Ayarım", "Anime Modu") kaydedebilmesi, JSON formatında dışa ve içe aktarabilmesi (toplulukla paylaşabilmesi).

---

### 3.6. Mini Player & Picture-in-Picture (PiP) Desteği
* **Açıklama:** YouTube içinde sayfa aşağı kaydırıldığında açılan mini oynatıcıda (Miniplayer) veya desteklenen tarayıcılarda PiP modunda minik bir glow çerçevesi sağlamak.

---

## 💡 BÖLÜM 4: Harici Donanım & Akıllı Ev Entegrasyonları

### 4.1. Philips Hue & Home Assistant Yerel API Entegrasyonu (Smart Room Sync)
* **Açıklama:** LumaBorder'ın hesapladığı 4 kenar ortalama RGB renk değerlerini yerel ağdaki (LAN) akıllı lamba sistemlerine aktarması:
  - **Philips Hue Bridge API** (Entertainment API / Local HTTP).
  - **Home Assistant Webhook / WebSocket**.
  - **Nanoleaf / LIFX Yerel Ağ Protokolü**.
* **Kazanım:** Kullanıcının sadece monitör etrafı değil, tüm odasındaki ışıklar YouTube videosuyla senkronize yanar.

---

### 4.2. Razer Chroma / OpenRGB Entegrasyonu
* **Açıklama:** Oyuncu klavye, mousepad ve kasa aydınlatmalarını LumaBorder renkleriyle senkronize etme imkanı.

---

## 🛠️ BÖLÜM 5: Geliştirici & Teşhis Araçları (Diagnostic HUD)

### 5.1. Canlı Performans HUD Paneli (In-Player Diagnostic Overlay)
* **Açıklama:** Oyuncular ve performans meraklıları için oynatıcı üzerinde minik bir bilgi kartı:
  - Anlık Render FPS (Örn: 59.8 FPS).
  - Kare Çizim Süresi (Frame Time: 1.2 ms).
  - Atlanan Kare Sayısı (Dropped Frames: 0).
  - Aktif GPU Modu (WebGL 2.0 / Canvas 2D).
  - Pil Tasarruf Durumu (Eco: Normal / Aktif).

---

## 📊 BÖLÜM 6: Önceliklendirme Matrisi ve Yol Haritası (Roadmap)

Aşağıdaki tablo, önerilen tüm geliştirmeleri **Kullanıcı Etkisi**, **Geliştirme Zorluğu** ve **Öncelik Seviyesine** göre derecelendirir:

| Geliştirme / Özellik | Kategori | Beklenen Etki | Teknik Zorluk | Tavsiye Edilen Sürüm |
| :--- | :--- | :--- | :--- | :--- |
| **Statik Sahne Algılama (Dirty Frame Freeze)** | Performans | ⭐⭐⭐⭐⭐ (Çok Yüksek Pil Tasarrufu) | 🟢 Kolay (Düşük) | **v2.4.0** |
| **4-Bölge Bağımsız Kenar Kontrolü** | Özellik | ⭐⭐⭐⭐⭐ (Kullanıcı Talebi Yüksek) | 🟢 Kolay (Düşük) | **v2.4.0** |
| **Dinamik Altyazı Maskeleme (Auto-Dim)** | Özellik | ⭐⭐⭐⭐ (Göz Konforu) | 🟢 Kolay (Düşük) | **v2.4.0** |
| **Özel Profil Kaydetme & JSON Import/Export** | UX | ⭐⭐⭐⭐ (Topluluk Paylaşımı) | 🟢 Kolay (Düşük) | **v2.4.0** |
| **Canlı Performans HUD (FPS / ms Monitörü)** | Teşhis | ⭐⭐⭐ (Geliştirici/Güvenilirlik) | 🟢 Kolay (Düşük) | **v2.4.0** |
| **Banding Önleme & Dithering (Debanding)** | Görsel Kalite | ⭐⭐⭐⭐ (OLED Ekranlar İçin) | 🟡 Orta | **v2.5.0** |
| **Siyah Şerit Doldurucu (Ultrawide Bar Fill)** | Görsel Kalite | ⭐⭐⭐⭐⭐ (21:9 Ekranlar İçin) | 🟡 Orta | **v2.5.0** |
| **Kanal / Kategori Bazlı Akıllı Profiller** | UX | ⭐⭐⭐⭐ (Otomasyon) | 🟡 Orta | **v2.5.0** |
| **WebGL 2.0 & Dual-Kawase Shader Motoru** | Performans | ⭐⭐⭐⭐⭐ (Devasa GPU/CPU Tasarrufu) | 🔴 Yüksek (GLSL Shader) | **v3.0.0** |
| **Çok Bölgeli Ambilight (Multi-Zone LEDs)** | Görsel Kalite | ⭐⭐⭐⭐⭐ (Gerçek Ambilight Deneyimi) | 🔴 Yüksek | **v3.0.0** |
| **Audio-Reactive Müzik Ritim Modu** | Eğlence | ⭐⭐⭐⭐ (Müzik/Oyun Severler) | 🟡 Orta | **v3.0.0** |
| **Philips Hue / Home Assistant Sync** | Donanım | ⭐⭐⭐⭐⭐ (Akıllı Ev Severler) | 🔴 Yüksek (Yerel Ağ API) | **v3.1.0** |

---

## 🎯 Sonuç ve İlk Adım Tavsiyesi

LumaBorder projesinin bir sonraki sürümünde (**v2.4.0**) en yüksek faydayı en hızlı şekilde sağlamak için:
1. **Statik Sahne Dondurma (Dirty Frame Check)** ile podcast ve konuşma videolarında sıfır enerji sarfiyatı sağlanması,
2. **4-Bölge Bağımsız Kenar Kontrolü** ile altyazı ve yorum bölgesi şikayetlerinin tamamen çözülmesi,
3. **Canlı Performans HUD** eklenerek kullanıcılara eklentinin ne kadar hafif çalıştığının gösterilmesi önerilir.

Bunu takiben ana sürüm (**v3.0.0**) için **WebGL 2.0 Dual-Kawase Shader** ve **Çok Bölgeli Ambilight** geliştirmelerine odaklanılması projenin tarayıcı mağazalarındaki en gelişmiş video ortam ışığı eklentisi olmasını sağlayacaktır.

