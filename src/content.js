/**
 * LumaBorder - Dynamic Video Glow & Border Engine
 * [OTOMATIK DERLENMİŞ DOSYA - DO NOT EDIT DIRECTLY]
 * Kaynak dosyalar src/ dizinindedir (ambient-engine.js, player-ui.js, settings.js, i18n.js, content-main.js).
 * Derlemek için: npm run build | Canlı izleme için: npm run dev
 */
(()=>{var z={tr:{appName:"LumaBorder",appTagline:"Dinamik Glow & I\u015F\u0131k Efekti",statusActive:"Aktif",statusInactive:"Pasif",masterToggle:"Glow Efektini Etkinle\u015Ftir",masterToggleDesc:"Video etraf\u0131ndaki dinamik \u0131\u015F\u0131k halesini a\xE7ar/kapat\u0131r",tabGeneral:"Genel",tabEffects:"I\u015F\u0131k & Renk",tabPerformance:"Performans",tabPresets:"Profiller",tabAmbilight:"Ambilight & Donan\u0131m",brightness:"Parlakl\u0131k",brightnessDesc:"I\u015F\u0131k halesinin parlakl\u0131k seviyesi",spread:"I\u015F\u0131k Yay\u0131lmas\u0131",spreadDesc:"I\u015F\u0131\u011F\u0131n video kenarlar\u0131ndan ne kadar uza\u011Fa yay\u0131laca\u011F\u0131",blur:"Yumu\u015Fakl\u0131k (Bulan\u0131kl\u0131k)",blurDesc:"I\u015F\u0131k halesinin yumu\u015Fakl\u0131k ve yay\u0131lma derecesi",saturation:"Renk Canl\u0131l\u0131\u011F\u0131",saturationDesc:"Renklerin doygunlu\u011Fu ve canl\u0131l\u0131k seviyesi",contrast:"Kontrast",contrastDesc:"Renk kontrast\u0131",smoothing:"Kare Yumu\u015Fatma",smoothingDesc:"Kareler aras\u0131 ani \u0131\u015F\u0131k patlamalar\u0131n\u0131 yumu\u015Fat\u0131r",dualLayerGlow:"\xC7ift Katmanl\u0131 Glow",dualLayerDesc:"Videonun ard\u0131nda keskin & canl\u0131, d\u0131\u015Fta ise yumu\u015Fak 2 katmanl\u0131 sinematik derinlik",bottomFade:"Altyaz\u0131 Korumas\u0131 (Alt Karartma)",bottomFadeDesc:"Parlak altyaz\u0131lar\u0131n alt k\u0131s\u0131mda ani beyaz parlama yapmas\u0131n\u0131 engeller",bottomFadeStrength:"Altyaz\u0131 Karartma Oran\u0131",autoSubtitleDim:"Ak\u0131ll\u0131 Dinamik Altyaz\u0131 K\u0131sma",autoSubtitleDimDesc:"Ekranda altyaz\u0131 g\xF6r\xFCnd\xFC\u011F\xFC anda alt \u0131\u015F\u0131\u011F\u0131 yumu\u015Fak\xE7a k\u0131sar",biasLighting:"Sabit Arka I\u015F\u0131k (Bias Lighting)",biasLightingDesc:"G\xF6z yormayan s\u0131cak veya neon tonlu sabit arka ayd\u0131nlatma",biasLightingMode:"Arka I\u015F\u0131k Modu",biasModeOff:"Kapal\u0131 (Dinamik Video)",biasModePause:"Video Duraklat\u0131ld\u0131\u011F\u0131nda",biasModeAlways:"Her Zaman Sabit I\u015F\u0131k",biasLightingColor:"I\u015F\u0131k Rengi / S\u0131cakl\u0131k",biasColorWarm:"2700K S\u0131cak Beyaz",biasColorNeutral:"4000K Do\u011Fal Beyaz",biasColorCinema:"6500K Sinema D65",biasColorCyber:"Neon Siber Mavi",biasColorSunset:"Neon G\xFCnbat\u0131m\u0131",biasColorPurple:"Neon Mor",biasColorCustom:"\xD6zel Renk",renderEngine:"Render Motoru",renderEngineDesc:"WebGL 2.0 Dual-Kawase Shader ile %60'a varan GPU tasarrufu",engineWebGL:"WebGL 2.0 (Shader)",engineCanvas2D:"Canvas 2D (Standart)",freezeDetection:"Statik Sahne Dondurucu (Dirty Frame)",freezeDetectionDesc:"Dura\u011Fan sahnelerde render'\u0131 dondurarak GPU ve pil tasarrufu sa\u011Flar",colorSpace:"Renk Uzay\u0131 & HDR",colorSpaceDesc:"Display P3 geni\u015F renk gamutu ve HDR OLED ekran do\u011Frulu\u011Fu",hdrTonemap:"HDR Ton E\u015Fleme (Reinhard)",hdrTonemapDesc:"Patlayan HDR beyazlar\u0131n\u0131 p\xFCr\xFCzs\xFCz sinematik par\u0131lt\u0131ya d\xF6n\xFC\u015Ft\xFCr\xFCr",edgeControls:"4-B\xF6lge Ba\u011F\u0131ms\u0131z Kenar Kontrol\xFC",edgeControlsDesc:"\xDCst, Sa\u011F, Alt ve Sol y\xF6nlerindeki \u0131\u015F\u0131k yay\u0131l\u0131m\u0131n\u0131 ba\u011F\u0131ms\u0131z kontrol edin",edgeTop:"\xDCst Kenar",edgeRight:"Sa\u011F Kenar",edgeBottom:"Alt Kenar",edgeLeft:"Sol Kenar",multiZone:"\xC7ok B\xF6lgeli Ambilight (LED Strip)",multiZoneDesc:"Ekran kenarlar\u0131n\u0131 b\xF6lgelere ay\u0131r\u0131p ba\u011F\u0131ms\u0131z renk yay\u0131l\u0131m\u0131 sa\u011Flar",zoneCount:"B\xF6lge Say\u0131s\u0131",barFill:"Siyah \u015Eerit Doldurucu (Bar Fill)",barFillDesc:"Letterbox ve Pillarbox siyah bo\u015Fluklar\u0131 yumu\u015Fak \u0131\u015F\u0131kla doldurur",debanding:"Banding \xD6nleme (Dithering)",debandingDesc:"Karanl\u0131k sahnelerde renk basamaklanmas\u0131n\u0131 p\xFCr\xFCzs\xFCzle\u015Ftirir",colorTemperature:"Renk S\u0131cakl\u0131\u011F\u0131 (Kelvin)",colorTemperatureDesc:"Oda ayd\u0131nlatmas\u0131na uygun beyaz dengesi (2200K - 9300K)",audioReactive:"M\xFCzik & Bas Reaktif Ritim",audioReactiveDesc:"Web Audio API ile bas vuru\u015Flar\u0131nda \u0131\u015F\u0131\u011F\u0131n ritmik nab\u0131z atmas\u0131",audioSensitivity:"Bas Alg\u0131lama Hassasiyeti",nightShift:"Zaman Ayarl\u0131 Gece Karartmas\u0131",nightShiftDesc:"Gece saatlerinde parlakl\u0131\u011F\u0131 otomatik azalt\u0131r ve s\u0131cak tona ge\xE7er",nightShiftActive:"\u{1F319} Gece Modu Devrede",dynamicAccent:"Oynat\u0131c\u0131 UI Ak\u0131ll\u0131 Renklendirme",dynamicAccentDesc:"YouTube ilerleme \xE7ubu\u011Funu videonun tematik rengine g\xF6re boyar",targetFps:"Hedef Kare H\u0131z\u0131 (FPS)",targetFpsDesc:"Y\xFCksek Hz ekranlarda GPU ve pil tasarrufu i\xE7in kare h\u0131z\u0131n\u0131 s\u0131n\u0131rlar",fpsSync:"E\u015Fzamanl\u0131 (Video)",fps60:"60 FPS",fps30:"30 FPS (Eko)",workerRender:"OffscreenCanvas / Worker Render",workerRenderDesc:"\xC7izim ve piksel analizini arka plana ta\u015F\u0131yarak UI tak\u0131lmalar\u0131n\u0131 s\u0131f\u0131rlar",autoBatteryEco:"Ak\u0131ll\u0131 Pil Tasarrufu (%20 Alt\u0131)",autoBatteryEcoDesc:"Cihaz pildeyken %20'nin alt\u0131na indi\u011Finde otomatik 30 FPS Eko moduna ge\xE7er",batteryStatusTitle:"Pil Durumu",batteryCharging:"\u015Earj Ediliyor",batteryDischarging:"Pilde",batteryEcoActiveBadge:"\u{1F50B} Pil Tasarrufu Devrede (30 FPS Eko)",batteryEcoDisabledBadge:"\u26A1 Normal Performans",batteryNotSupported:"Pil API Desteklenmiyor",letterboxDetection:"\xDCst/Alt \u015Eeritleri K\u0131rp (Letterbox)",letterboxDesc:"Sinemaskop filmlerdeki yatay siyah \u015Feritleri yok sayar",pillarboxDetection:"Yan \u015Eeritleri K\u0131rp (Pillarbox)",pillarboxDesc:"4:3 ve dikey videolardaki sa\u011F/sol siyah \u015Feritleri yok sayar",ecoMode:"G\xFC\xE7 Tasarrufu (Eco)",ecoModeDesc:"Dura\u011Fan sahnelerde GPU ve pil kullan\u0131m\u0131n\u0131 d\xFC\u015F\xFCr\xFCr",theaterModeSync:"Geli\u015Fmi\u015F Sinema Modu",theaterModeSyncDesc:"Sinema modunda \u0131\u015F\u0131\u011F\u0131 sinematik olarak geni\u015Fletir",fullScreenSync:"Tam Ekran Uyumu",fullScreenSyncDesc:"Tam ekran modunda ak\u0131c\u0131 ve optimize ambilight",shortsActive:"Shorts Glow Aktif",presetCinema:"Sinema",presetVibrant:"Canl\u0131 & Parlak",presetNight:"Gece Modu",presetGaming:"Dinamik Oyun",presetDefault:"Dengeli (Varsay\u0131lan)",resetDefaults:"Varsay\u0131lana S\u0131f\u0131rla",resetConfirm:"T\xFCm ayarlar varsay\u0131lana d\xF6nd\xFCr\xFCls\xFCn m\xFC?",language:"Dil",langTr:"T\xFCrk\xE7e",langEn:"English",close:"Kapat",settingsTitle:"LumaBorder Ayarlar\u0131",quickControls:"H\u0131zl\u0131 Kontroller",notOnYoutube:"Video sayfas\u0131nda de\u011Filsiniz",openYoutubeTip:"Bir video veya Shorts a\xE7t\u0131\u011F\u0131n\u0131zda efekt otomatik ba\u015Flayacakt\u0131r."},en:{appName:"LumaBorder",appTagline:"Dynamic Glow Experience",statusActive:"Active",statusInactive:"Inactive",masterToggle:"Enable Glow Effect",masterToggleDesc:"Toggles the dynamic glow aura around video",tabGeneral:"General",tabEffects:"Light & Color",tabPerformance:"Performance",tabPresets:"Presets",tabAmbilight:"Ambilight & Hardware",brightness:"Brightness",brightnessDesc:"Brightness level of the glow aura",spread:"Light Spread",spreadDesc:"How far the light aura spreads beyond video edges",blur:"Softness (Blur)",blurDesc:"Smoothness and dispersion of the glow aura",saturation:"Color Vibrance",saturationDesc:"Vibrance and color saturation level",contrast:"Contrast",contrastDesc:"Contrast of glow colors",smoothing:"Frame Smoothing",smoothingDesc:"Smooths abrupt color changes between frames",dualLayerGlow:"Dual-Layer Glow",dualLayerDesc:"Tight vibrant core + soft diffuse ambient for 2x cinematic depth",bottomFade:"Subtitle Protection (Bottom Fade)",bottomFadeDesc:"Dims bottom glow to prevent blinding flashes from white subtitles",bottomFadeStrength:"Bottom Dimming Level",autoSubtitleDim:"Smart Dynamic Subtitle Dimmer",autoSubtitleDimDesc:"Automatically dims bottom glow whenever subtitles are detected on screen",biasLighting:"Bias Lighting (Static Aura)",biasLightingDesc:"Comfortable static backlighting to reduce eye strain",biasLightingMode:"Bias Lighting Mode",biasModeOff:"Off (Dynamic Video)",biasModePause:"When Video Paused",biasModeAlways:"Always Static Light",biasLightingColor:"Light Color / Temperature",biasColorWarm:"2700K Warm White",biasColorNeutral:"4000K Neutral White",biasColorCinema:"6500K Cinema D65",biasColorCyber:"Cyber Blue",biasColorSunset:"Sunset Orange",biasColorPurple:"Deep Purple",biasColorCustom:"Custom Color",renderEngine:"Render Engine",renderEngineDesc:"WebGL 2.0 Dual-Kawase Shader delivers up to 60% GPU power savings",engineWebGL:"WebGL 2.0 (Shader)",engineCanvas2D:"Canvas 2D (Standard)",freezeDetection:"Dirty Frame & Freeze Detection",freezeDetectionDesc:"Freezes rendering on static scenes (podcasts, slides) to save GPU and battery",colorSpace:"Color Space & HDR",colorSpaceDesc:"Display P3 wide gamut and HDR OLED color precision",hdrTonemap:"HDR Tone Mapping (Reinhard)",hdrTonemapDesc:"Prevents highlight clipping by converting peak whites to a smooth cinematic glow",edgeControls:"4-Zone Independent Edge Controls",edgeControlsDesc:"Independently adjust spread and visibility for Top, Right, Bottom, and Left",edgeTop:"Top Edge",edgeRight:"Right Edge",edgeBottom:"Bottom Edge",edgeLeft:"Left Edge",multiZone:"Multi-Zone Ambilight (LED Strip)",multiZoneDesc:"Samples screen periphery into discrete zones for authentic Ambilight effect",zoneCount:"Zone Count",barFill:"Black Bar Fill (Seamless Ambient)",barFillDesc:"Fills letterbox and pillarbox black bars with blurred dynamic ambient light",debanding:"Debanding & Dithering",debandingDesc:"Eliminates gradient banding steps on dark backgrounds and OLED screens",colorTemperature:"Color Temperature (Kelvin)",colorTemperatureDesc:"Adjust white balance (2200K - 9300K) to match your physical room lighting",audioReactive:"Audio-Reactive Beat Pulsing",audioReactiveDesc:"Web Audio API pulses ambient spread and brightness with the music bass beat",audioSensitivity:"Bass Sensitivity",nightShift:"Scheduled Night Shift",nightShiftDesc:"Automatically dims brightness and shifts to warm white during night hours",nightShiftActive:"\u{1F319} Night Shift Active",dynamicAccent:"Dynamic Player Accent Tinting",dynamicAccentDesc:"Tints YouTube progress bar and controls to match the video's dominant hue",targetFps:"Target Frame Rate (FPS)",targetFpsDesc:"Limits FPS to reduce GPU usage and save laptop battery on high-Hz displays",fpsSync:"Sync (Video)",fps60:"60 FPS",fps30:"30 FPS (Eco)",workerRender:"OffscreenCanvas / Worker Render",workerRenderDesc:"Offloads canvas drawing and pixel analysis to background worker to prevent UI lag",autoBatteryEco:"Smart Battery Saver (<20%)",autoBatteryEcoDesc:"Automatically activates 30 FPS Eco mode when unplugged and battery drops below 20%",batteryStatusTitle:"Battery Status",batteryCharging:"Charging",batteryDischarging:"On Battery",batteryEcoActiveBadge:"\u{1F50B} Battery Saver Active (30 FPS Eco)",batteryEcoDisabledBadge:"\u26A1 Normal Performance",batteryNotSupported:"Battery API Not Supported",letterboxDetection:"Crop Top/Bottom Bars (Letterbox)",letterboxDesc:"Auto-detects and crops letterbox bars in movies",pillarboxDetection:"Crop Side Bars (Pillarbox)",pillarboxDesc:"Auto-detects and crops pillarbox bars in 4:3 or vertical videos",ecoMode:"Power Saver (Eco)",ecoModeDesc:"Reduces GPU & battery usage on still/static scenes",theaterModeSync:"Enhanced Theater Mode",theaterModeSyncDesc:"Cinematically widens ambient aura in theater mode",fullScreenSync:"Fullscreen Sync",fullScreenSyncDesc:"Fluid and optimized glow during fullscreen",shortsActive:"Shorts Glow Active",presetCinema:"Cinema",presetVibrant:"Vibrant & Bright",presetNight:"Night Light",presetGaming:"Gaming Dynamic",presetDefault:"Balanced (Default)",resetDefaults:"Reset to Defaults",resetConfirm:"Reset all settings to default values?",language:"Language",langTr:"T\xFCrk\xE7e",langEn:"English",close:"Close",settingsTitle:"LumaBorder Settings",quickControls:"Quick Controls",notOnYoutube:"Not on a video page",openYoutubeTip:"Glow effect activates automatically when watching a video or Shorts."}},I=class{constructor(e="tr"){this.currentLang=e}setLanguage(e){z[e]&&(this.currentLang=e)}getLanguage(){return this.currentLang}t(e){return z[this.currentLang]?.[e]||z.en?.[e]||e}},r=new I("tr");var H={default:{brightness:100,spread:25,blur:45,saturation:120,contrast:105,smoothing:60,letterboxDetection:!0,pillarboxDetection:!0,dualLayerGlow:!0,bottomFade:!1,bottomFadeStrength:60,biasLightingMode:"off",biasLightingColor:"#ffe4b5",ecoMode:!0,targetFps:30,workerRender:!0,autoBatteryEco:!0,renderEngine:"webgl",freezeDetection:!0,colorSpace:"display-p3",hdrTonemap:!0,edgeTop:!0,edgeRight:!0,edgeBottom:!0,edgeLeft:!0,edgeTopSpread:100,edgeRightSpread:100,edgeBottomSpread:100,edgeLeftSpread:100,multiZone:!1,zoneCount:12,barFill:!1,debanding:!0,colorTemperature:6500,autoSubtitleDim:!0,audioReactive:!1,audioSensitivity:50,nightShiftEnabled:!1,nightShiftStart:"22:00",nightShiftEnd:"07:00",dynamicAccent:!1},cinema:{brightness:85,spread:40,blur:65,saturation:110,contrast:100,smoothing:75,letterboxDetection:!0,pillarboxDetection:!0,dualLayerGlow:!0,bottomFade:!0,bottomFadeStrength:65,biasLightingMode:"off",biasLightingColor:"#ffe4b5",ecoMode:!0,targetFps:30,workerRender:!0,autoBatteryEco:!0,renderEngine:"webgl",freezeDetection:!0,colorSpace:"display-p3",hdrTonemap:!0,edgeTop:!0,edgeRight:!0,edgeBottom:!0,edgeLeft:!0,edgeTopSpread:100,edgeRightSpread:100,edgeBottomSpread:70,edgeLeftSpread:100,multiZone:!1,zoneCount:12,barFill:!0,debanding:!0,colorTemperature:6500,autoSubtitleDim:!0,audioReactive:!1,audioSensitivity:50,nightShiftEnabled:!1,nightShiftStart:"22:00",nightShiftEnd:"07:00",dynamicAccent:!1},vibrant:{brightness:130,spread:32,blur:40,saturation:160,contrast:115,smoothing:40,letterboxDetection:!0,pillarboxDetection:!0,dualLayerGlow:!0,bottomFade:!1,bottomFadeStrength:60,biasLightingMode:"off",biasLightingColor:"#ffe4b5",ecoMode:!1,targetFps:"sync",workerRender:!0,autoBatteryEco:!1,renderEngine:"webgl",freezeDetection:!0,colorSpace:"display-p3",hdrTonemap:!0,edgeTop:!0,edgeRight:!0,edgeBottom:!0,edgeLeft:!0,edgeTopSpread:100,edgeRightSpread:100,edgeBottomSpread:100,edgeLeftSpread:100,multiZone:!0,zoneCount:16,barFill:!1,debanding:!0,colorTemperature:6500,autoSubtitleDim:!0,audioReactive:!1,audioSensitivity:50,nightShiftEnabled:!1,nightShiftStart:"22:00",nightShiftEnd:"07:00",dynamicAccent:!0},night:{brightness:60,spread:18,blur:50,saturation:90,contrast:90,smoothing:80,letterboxDetection:!0,pillarboxDetection:!0,dualLayerGlow:!1,bottomFade:!0,bottomFadeStrength:75,biasLightingMode:"pause",biasLightingColor:"#ffe4b5",ecoMode:!0,targetFps:30,workerRender:!0,autoBatteryEco:!0,renderEngine:"webgl",freezeDetection:!0,colorSpace:"srgb",hdrTonemap:!0,edgeTop:!0,edgeRight:!0,edgeBottom:!1,edgeLeft:!0,edgeTopSpread:100,edgeRightSpread:100,edgeBottomSpread:50,edgeLeftSpread:100,multiZone:!1,zoneCount:12,barFill:!0,debanding:!0,colorTemperature:3200,autoSubtitleDim:!0,audioReactive:!1,audioSensitivity:50,nightShiftEnabled:!1,nightShiftStart:"22:00",nightShiftEnd:"07:00",dynamicAccent:!1},gaming:{brightness:115,spread:28,blur:35,saturation:140,contrast:110,smoothing:25,letterboxDetection:!0,pillarboxDetection:!0,dualLayerGlow:!0,bottomFade:!1,bottomFadeStrength:60,biasLightingMode:"off",biasLightingColor:"#00e5ff",ecoMode:!1,targetFps:"sync",workerRender:!0,autoBatteryEco:!1,renderEngine:"webgl",freezeDetection:!0,colorSpace:"display-p3",hdrTonemap:!0,edgeTop:!0,edgeRight:!0,edgeBottom:!0,edgeLeft:!0,edgeTopSpread:100,edgeRightSpread:100,edgeBottomSpread:100,edgeLeftSpread:100,multiZone:!0,zoneCount:12,barFill:!1,debanding:!0,colorTemperature:7500,autoSubtitleDim:!0,audioReactive:!0,audioSensitivity:65,nightShiftEnabled:!1,nightShiftStart:"22:00",nightShiftEnd:"07:00",dynamicAccent:!0}},x={enabled:!0,brightness:100,spread:25,blur:45,saturation:120,contrast:105,smoothing:60,letterboxDetection:!0,pillarboxDetection:!0,dualLayerGlow:!0,bottomFade:!1,bottomFadeStrength:60,biasLightingMode:"off",biasLightingColor:"#ffe4b5",ecoMode:!0,targetFps:30,workerRender:!0,autoBatteryEco:!0,theaterModeSync:!0,fullScreenSync:!0,activePreset:"default",language:"tr",renderEngine:"webgl",freezeDetection:!0,colorSpace:"display-p3",hdrTonemap:!0,edgeTop:!0,edgeRight:!0,edgeBottom:!0,edgeLeft:!0,edgeTopSpread:100,edgeRightSpread:100,edgeBottomSpread:100,edgeLeftSpread:100,multiZone:!1,zoneCount:12,barFill:!1,debanding:!0,colorTemperature:6500,autoSubtitleDim:!0,audioReactive:!1,audioSensitivity:50,nightShiftEnabled:!1,nightShiftStart:"22:00",nightShiftEnd:"07:00",dynamicAccent:!1};function U(b,e){if(e==null)return x[b];switch(b){case"brightness":case"spread":case"blur":case"saturation":case"contrast":case"smoothing":case"bottomFadeStrength":{let t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(500,Math.round(t))):x[b]}case"colorTemperature":{let t=Number(e);return Number.isFinite(t)?Math.max(2200,Math.min(9300,Math.round(t))):x.colorTemperature}case"edgeTopSpread":case"edgeRightSpread":case"edgeBottomSpread":case"edgeLeftSpread":{let t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(200,Math.round(t))):100}case"zoneCount":{let t=Number(e);return[8,12,16].includes(t)?t:x.zoneCount}case"audioSensitivity":{let t=Number(e);return Number.isFinite(t)?Math.max(10,Math.min(100,Math.round(t))):x.audioSensitivity}case"renderEngine":return["webgl","canvas2d"].includes(e)?e:x.renderEngine;case"colorSpace":return["display-p3","srgb"].includes(e)?e:x.colorSpace;case"nightShiftStart":case"nightShiftEnd":return typeof e=="string"&&/^\d{2}:\d{2}$/.test(e.trim())?e.trim():x[b];case"targetFps":return e==="sync"||e===60||e===30||e==="60"||e==="30"?e==="sync"?"sync":Number(e):x.targetFps;case"biasLightingColor":return typeof e=="string"&&/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e.trim())?e.trim():x.biasLightingColor;case"biasLightingMode":return["off","pause","always"].includes(e)?e:"off";case"language":return e==="en"?"en":"tr";case"activePreset":return typeof e=="string"?e.slice(0,30):"default";default:return typeof x[b]=="boolean"?!!e:e}}var N=class{constructor(){this.current={...x},this.listeners=new Set,this.pendingDelta={},this.saveTimeout=null,this.saveResolvers=[],this.initStorageListener()}async load(){return new Promise(e=>{if(typeof chrome<"u"&&chrome.storage&&chrome.storage.sync){let t=(i,a)=>new Promise(s=>{try{chrome.storage[i].get(a,n=>s(chrome.runtime.lastError?{}:n||{}))}catch{s({})}});Promise.all([t("sync",x),t("local",{})]).then(([i,a])=>{this.current=this.sanitizeAll({...x,...i,...a}),e(this.current)})}else{try{let t=localStorage.getItem("lumaborder_settings");t&&(this.current=this.sanitizeAll({...x,...JSON.parse(t)}))}catch{}e(this.current)}})}sanitizeAll(e){let t={};for(let i of Object.keys(x))t[i]=U(i,e[i]);return t}async save(e){for(let[t,i]of Object.entries(e)){let a=U(t,i);this.current[t]=a,this.pendingDelta[t]=a}return new Promise(t=>{this.saveResolvers.push(t),this.saveTimeout&&clearTimeout(this.saveTimeout),this.saveTimeout=setTimeout(()=>{let i={...this.pendingDelta};this.pendingDelta={};let a=[...this.saveResolvers];this.saveResolvers=[];let s=()=>a.forEach(n=>n(this.current));try{if(typeof chrome<"u"&&chrome.storage?.sync){if(!chrome.runtime?.id)return s();chrome.storage.sync.set(i,()=>{chrome.runtime.lastError?chrome.storage.local.set(i,s):chrome.storage.local.remove(Object.keys(i),s)})}else{try{localStorage.setItem("lumaborder_settings",JSON.stringify(this.current))}catch{}s()}}catch(n){console.warn("[LumaBorder] Ayarlar kaydedilemedi:",n),s()}},100)})}applyPreset(e){if(H[e]){let t=H[e];return this.save({...t,activePreset:e})}return Promise.resolve(this.current)}async reset(){let e=this.current.language;return this.save({...x,language:e})}initStorageListener(){typeof chrome<"u"&&chrome.storage&&chrome.storage.onChanged&&chrome.storage.onChanged.addListener((e,t)=>{if(t==="sync"||t==="local"){let i=!1;for(let a of Object.keys(e)){if(!(a in x)||e[a].newValue===void 0&&t==="local")continue;let s=e[a].newValue,n=U(a,s!==void 0?s:x[a]);this.current[a]!==n&&(this.current[a]=n,i=!0)}i&&this.notifyListeners(this.current)}})}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notifyListeners(e){for(let t of this.listeners)try{t(e)}catch(i){console.error("Settings notify error:",i)}}},D=new N;var V=Object.freeze({top:0,bottom:0,left:0,right:0}),q=18,T=(b,e)=>.299*b[e]+.587*b[e+1]+.114*b[e+2];function K(b,e,t,{checkLetterbox:i=!0,checkPillarbox:a=!0,isShorts:s=!1}={}){let n=Math.floor(e/2),o=Math.floor(t/2),c=0;for(let h=-1;h<=1;h++)for(let d=-1;d<=1;d++)c+=T(b,((o+h)*e+(n+d))*4);if(c/9<=q)return{...V};let m=h=>{for(let d=4;d<e-4;d+=2)if(T(b,(h*e+d)*4)>q)return!1;return!0},f=h=>{for(let d=2;d<t-2;d+=2)if(T(b,(d*e+h)*4)>q)return!1;return!0},g={...V};if(i){for(let h=0;h<Math.floor(t/3)&&m(h);h++)g.top=(h+1)/t;for(let h=t-1;h>=Math.floor(t*.66)&&m(h);h--)g.bottom=(t-h)/t}if(a&&!s){for(let h=0;h<Math.floor(e/3)&&f(h);h++)g.left=(h+1)/e;for(let h=e-1;h>=Math.floor(e*.66)&&f(h);h--)g.right=(e-h)/e}return g}function Z(b,e,t=1.5){if(!b||!e||b.length!==e.length)return{isDirty:!0,diff:100};let i=0,a=0,s=8;for(let o=0;o<e.length;o+=s*4){let c=T(b,o),m=T(e,o);i+=Math.abs(c-m),a++}let n=a>0?i/a:100;return{isDirty:n>=t,diff:n}}function X(b){let e=Math.max(2200,Math.min(9300,Number(b)||6500))/100,t,i,a;e<=66?t=255:(t=e-60,t=329.698727446*Math.pow(t,-.1332047592),t=Math.max(0,Math.min(255,t))),e<=66?(i=e,i=99.4708025861*Math.log(i)-161.1195681661,i=Math.max(0,Math.min(255,i))):(i=e-60,i=288.1221695283*Math.pow(i,-.0755148492),i=Math.max(0,Math.min(255,i))),e>=66?a=255:e<=19?a=0:(a=e-10,a=138.5177312231*Math.log(a)-305.0447927307,a=Math.max(0,Math.min(255,a)));let s=Math.round(t),n=Math.round(i),o=Math.round(a);return{r:s,g:n,b:o,rNorm:s/255,gNorm:n/255,bNorm:o/255,cssRgb:`rgb(${s}, ${n}, ${o})`}}function Y(b,e="22:00",t="07:00"){(!b||!(b instanceof Date))&&(b=new Date);let i=o=>{if(!o||typeof o!="string")return 0;let c=o.split(":"),m=parseInt(c[0],10)||0,f=parseInt(c[1],10)||0;return m*60+f},a=b.getHours()*60+b.getMinutes(),s=i(e),n=i(t);return s<=n?a>=s&&a<n:a>=s||a<n}function j(b,e,t){if(!b||b.length<4)return{hex:"#ff0000",rgb:"rgb(255, 0, 0)",r:255,g:0,b:0};let i=0,a=0,s=0,n=-1,o=255,c=0,m=0,f=0,g=Math.floor(b.length/4),h=Math.max(1,Math.floor(g/100));for(let v=0;v<b.length;v+=h*4){let S=b[v],E=b[v+1],L=b[v+2],k=Math.max(S,E,L),A=Math.min(S,E,L),B=(k+A)/2;if(B<25||B>235)continue;let w=k===0?0:(k-A)/k;i+=S,a+=E,s+=L,f++,w>n&&(n=w,o=S,c=E,m=L)}let d=f>0&&n>.2?o:f>0?Math.round(i/f):255,p=f>0&&n>.2?c:f>0?Math.round(a/f):0,l=f>0&&n>.2?m:f>0?Math.round(s/f):0,u=v=>v.toString(16).padStart(2,"0");return{hex:`#${u(d)}${u(p)}${u(l)}`,rgb:`rgb(${d}, ${p}, ${l})`,r:d,g:p,b:l}}function J(b,e,t,i=8){let a=[];if(!b||e<=0||t<=0)return a;let s,n,o;i>=16?(s=5,n=3,o=5):i>=12?(s=4,n=2,o=4):(s=3,n=1,o=3);let c=(d,p,l,u)=>{let y=0,v=0,S=0,E=0,L=Math.max(0,Math.min(e-1,Math.floor(d))),k=Math.max(0,Math.min(e,Math.floor(l))),A=Math.max(0,Math.min(t-1,Math.floor(p))),B=Math.max(0,Math.min(t,Math.floor(u)));for(let C=A;C<B;C+=2)for(let O=L;O<k;O+=2){let _=(C*e+O)*4;y+=b[_],v+=b[_+1],S+=b[_+2],E++}let w=E>0?Math.round(y/E):0,W=E>0?Math.round(v/E):0,G=E>0?Math.round(S/E):0,$=C=>C.toString(16).padStart(2,"0");return{r:w,g:W,b:G,hex:`#${$(w)}${$(W)}${$(G)}`}},m=Math.max(2,Math.floor(t*.25)),f=Math.max(2,Math.floor(e*.25)),g=e/s;for(let d=0;d<s;d++){let p=c(d*g,0,(d+1)*g,m);a.push({edge:"top",index:d,...p})}let h=t/(n+1);for(let d=1;d<=n;d++){let p=c(e-f,(d-.5)*h,e,(d+.5)*h);a.push({edge:"right",index:d-1,...p})}for(let d=o-1;d>=0;d--){let p=c(d*g,t-m,(d+1)*g,t);a.push({edge:"bottom",index:d,...p})}for(let d=n;d>=1;d--){let p=c(0,(d-.5)*h,f,(d+.5)*h);a.push({edge:"left",index:d-1,...p})}return a}var M=class{constructor(e,t={}){this.canvas=e,this.options=t,this.gl=null,this.isReady=!1,this.lostContext=!1,this.programs={},this.textures={},this.fboPyramid=[],this.quadVAO=null,this.quadVBO=null,this.init()}static isSupported(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}init(){try{let e=this.canvas.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1,desynchronized:!0,preserveDrawingBuffer:!1,powerPreference:"high-performance"});if(!e)return;this.gl=e,this.options.colorSpace==="display-p3"&&"drawingBufferColorSpace"in e&&(e.drawingBufferColorSpace="display-p3"),this.initContextLossHandling(),this.initShaders(),this.initBuffers(),this.setupFramebuffers(),this.isReady=!0}catch(e){console.warn("[LumaBorder] WebGL 2.0 ba\u015Flat\u0131lamad\u0131, Canvas2D fallback devreye giriyor:",e),this.destroy()}}initContextLossHandling(){this.canvas.addEventListener("webglcontextlost",e=>{e.preventDefault(),this.lostContext=!0,this.isReady=!1},!1),this.canvas.addEventListener("webglcontextrestored",()=>{this.lostContext=!1,this.init()},!1)}compileShader(e,t){let i=this.gl,a=i.createShader(e);if(i.shaderSource(a,t),i.compileShader(a),!i.getShaderParameter(a,i.COMPILE_STATUS)){let s=i.getShaderInfoLog(a);throw i.deleteShader(a),new Error(`Shader compile failed: ${s}`)}return a}createProgram(e,t){let i=this.gl,a=this.compileShader(i.VERTEX_SHADER,e),s=this.compileShader(i.FRAGMENT_SHADER,t),n=i.createProgram();if(i.attachShader(n,a),i.attachShader(n,s),i.linkProgram(n),!i.getProgramParameter(n,i.LINK_STATUS)){let o=i.getProgramInfoLog(n);throw i.deleteProgram(n),new Error(`Program link failed: ${o}`)}return n}initShaders(){let e=`#version 300 es
      precision highp float;
      layout(location = 0) in vec2 a_pos;
      out vec2 v_uv;
      void main() {
        v_uv = (a_pos + 1.0) * 0.5;
        // Video dokusu OpenGL koordinatlar\u0131na g\xF6re dikey \xE7evrilir
        v_uv.y = 1.0 - v_uv.y;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `,t=`#version 300 es
      precision highp float;
      uniform sampler2D u_image;
      uniform vec2 u_halfpixel;
      uniform vec4 u_crop; // top, bottom, left, right
      in vec2 v_uv;
      out vec4 fragColor;

      void main() {
        vec2 uv = v_uv;
        // Letterbox / Pillarbox k\u0131rpmas\u0131
        vec2 croppedUV = vec2(
          mix(u_crop.z, 1.0 - u_crop.w, uv.x),
          mix(u_crop.x, 1.0 - u_crop.y, uv.y)
        );

        vec2 d = u_halfpixel * 1.5;
        vec4 sum = texture(u_image, croppedUV) * 4.0;
        sum += texture(u_image, croppedUV - d);
        sum += texture(u_image, croppedUV + d);
        sum += texture(u_image, croppedUV + vec2(d.x, -d.y));
        sum += texture(u_image, croppedUV + vec2(-d.x, d.y));

        fragColor = sum / 8.0;
      }
    `,i=`#version 300 es
      precision highp float;
      uniform sampler2D u_image;
      uniform vec2 u_halfpixel;
      in vec2 v_uv;
      out vec4 fragColor;

      void main() {
        vec2 d = u_halfpixel * 1.5;
        vec4 sum = vec4(0.0);
        sum += texture(u_image, v_uv + vec2(-d.x * 2.0, 0.0));
        sum += texture(u_image, v_uv + vec2(-d.x, d.y)) * 2.0;
        sum += texture(u_image, v_uv + vec2(0.0, d.y * 2.0));
        sum += texture(u_image, v_uv + vec2(d.x, d.y)) * 2.0;
        sum += texture(u_image, v_uv + vec2(d.x * 2.0, 0.0));
        sum += texture(u_image, v_uv + vec2(d.x, -d.y)) * 2.0;
        sum += texture(u_image, v_uv + vec2(0.0, -d.y * 2.0));
        sum += texture(u_image, v_uv + vec2(-d.x, -d.y)) * 2.0;

        fragColor = sum / 12.0;
      }
    `,a=`#version 300 es
      precision highp float;
      uniform sampler2D u_image;
      uniform float u_brightness;
      uniform float u_contrast;
      uniform float u_saturation;
      uniform vec3 u_kelvinRGB;
      uniform bool u_debanding;
      uniform vec4 u_edgeWeights; // top, right, bottom, left [0.0 - 1.0]
      uniform bool u_hdrTonemap;
      in vec2 v_uv;
      out vec4 fragColor;

      // Triangular Dithering (Banding ve basamaklanmay\u0131 \xF6nler)
      float ditherNoise(vec2 uv) {
        return (fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
      }

      // Reinhard Tonemapping (HDR patlayan beyazlar\u0131 yumu\u015Fak sinematik par\u0131lt\u0131ya d\xF6n\xFC\u015Ft\xFCr\xFCr)
      vec3 tonemap(vec3 color) {
        return color / (color + vec3(1.0));
      }

      void main() {
        vec4 base = texture(u_image, v_uv);
        vec3 color = base.rgb;

        // 1. Kelvin Renk S\u0131cakl\u0131\u011F\u0131 \xC7arpan\u0131
        color *= u_kelvinRGB;

        // 2. Doygunluk (Saturation)
        float lum = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(lum), color, u_saturation);

        // 3. Kontrast
        color = (color - 0.5) * u_contrast + 0.5;

        // 4. Parlakl\u0131k
        color *= u_brightness;

        // 5. HDR Tonemapping
        if (u_hdrTonemap) {
          color = tonemap(color);
        }

        // 6. 4-B\xF6lge Kenar Kontrol A\u011F\u0131rl\u0131kland\u0131rmas\u0131
        // v_uv: (0,0) sol \xFCst, (1,1) sa\u011F alt
        float edgeFactor = 1.0;
        if (v_uv.y < 0.25) edgeFactor *= mix(u_edgeWeights.x, 1.0, v_uv.y * 4.0); // \xDCst
        if (v_uv.x > 0.75) edgeFactor *= mix(1.0, u_edgeWeights.y, (v_uv.x - 0.75) * 4.0); // Sa\u011F
        if (v_uv.y > 0.75) edgeFactor *= mix(1.0, u_edgeWeights.z, (v_uv.y - 0.75) * 4.0); // Alt
        if (v_uv.x < 0.25) edgeFactor *= mix(u_edgeWeights.w, 1.0, v_uv.x * 4.0); // Sol
        color *= clamp(edgeFactor, 0.0, 1.0);

        // 7. Debanding Dithering
        if (u_debanding) {
          color += vec3(ditherNoise(gl_FragCoord.xy));
        }

        fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
      }
    `;this.programs.downsample=this.createProgram(e,t),this.programs.upsample=this.createProgram(e,i),this.programs.final=this.createProgram(e,a)}initBuffers(){let e=this.gl;this.quadVAO=e.createVertexArray(),e.bindVertexArray(this.quadVAO),this.quadVBO=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.quadVBO);let t=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),this.textures.video=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.textures.video),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR)}setupFramebuffers(){let e=this.gl;this.destroyFramebuffers();let t=this.canvas.width,i=this.canvas.height;for(let a=0;a<3;a++){t=Math.max(8,Math.floor(t/2)),i=Math.max(8,Math.floor(i/2));let s=e.createTexture();e.bindTexture(e.TEXTURE_2D,s),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t,i,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR);let n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,s,0),this.fboPyramid.push({fbo:n,tex:s,width:t,height:i})}e.bindFramebuffer(e.FRAMEBUFFER,null)}destroyFramebuffers(){let e=this.gl;if(e){for(let t of this.fboPyramid)t.fbo&&e.deleteFramebuffer(t.fbo),t.tex&&e.deleteTexture(t.tex);this.fboPyramid=[]}}render(e,t={}){if(!this.isReady||this.lostContext||!e||e.readyState<2)return;let i=this.gl,{crop:a={top:0,bottom:0,left:0,right:0},brightness:s=1,contrast:n=1,saturation:o=1.2,kelvin:c=6500,debanding:m=!0,hdrTonemap:f=!0,edgeWeights:g=[1,1,1,1]}=t;i.bindTexture(i.TEXTURE_2D,this.textures.video),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,e),i.bindVertexArray(this.quadVAO);let h=this.textures.video;for(let p=0;p<this.fboPyramid.length;p++){let l=this.fboPyramid[p];i.bindFramebuffer(i.FRAMEBUFFER,l.fbo),i.viewport(0,0,l.width,l.height),i.useProgram(this.programs.downsample),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,h),i.uniform1i(i.getUniformLocation(this.programs.downsample,"u_image"),0),i.uniform2f(i.getUniformLocation(this.programs.downsample,"u_halfpixel"),.5/l.width,.5/l.height),p===0?i.uniform4f(i.getUniformLocation(this.programs.downsample,"u_crop"),a.top,a.bottom,a.left,a.right):i.uniform4f(i.getUniformLocation(this.programs.downsample,"u_crop"),0,0,0,0),i.drawArrays(i.TRIANGLES,0,6),h=l.tex}for(let p=this.fboPyramid.length-2;p>=0;p--){let l=this.fboPyramid[p];i.bindFramebuffer(i.FRAMEBUFFER,l.fbo),i.viewport(0,0,l.width,l.height),i.useProgram(this.programs.upsample),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,h),i.uniform1i(i.getUniformLocation(this.programs.upsample,"u_image"),0),i.uniform2f(i.getUniformLocation(this.programs.upsample,"u_halfpixel"),.5/l.width,.5/l.height),i.drawArrays(i.TRIANGLES,0,6),h=l.tex}i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,this.canvas.width,this.canvas.height);let d=X(c);i.useProgram(this.programs.final),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,h),i.uniform1i(i.getUniformLocation(this.programs.final,"u_image"),0),i.uniform1f(i.getUniformLocation(this.programs.final,"u_brightness"),s),i.uniform1f(i.getUniformLocation(this.programs.final,"u_contrast"),n),i.uniform1f(i.getUniformLocation(this.programs.final,"u_saturation"),o),i.uniform3f(i.getUniformLocation(this.programs.final,"u_kelvinRGB"),d.rNorm,d.gNorm,d.bNorm),i.uniform1i(i.getUniformLocation(this.programs.final,"u_debanding"),m?1:0),i.uniform1i(i.getUniformLocation(this.programs.final,"u_hdrTonemap"),f?1:0),i.uniform4f(i.getUniformLocation(this.programs.final,"u_edgeWeights"),g[0],g[1],g[2],g[3]),i.drawArrays(i.TRIANGLES,0,6),i.bindVertexArray(null)}resize(e,t){this.gl&&(this.canvas.width=e,this.canvas.height=t,this.setupFramebuffers())}destroy(){let e=this.gl;if(e){this.destroyFramebuffers(),this.quadVBO&&e.deleteBuffer(this.quadVBO),this.quadVAO&&e.deleteVertexArray(this.quadVAO),this.textures.video&&e.deleteTexture(this.textures.video);for(let t of Object.values(this.programs))t&&e.deleteProgram(t)}this.gl=null,this.isReady=!1}};var R=class{constructor(e,t={}){this.video=e,this.sensitivity=t.sensitivity||50,this.enabled=!!t.enabled,this.audioCtx=null,this.analyser=null,this.sourceNode=null,this.dataArray=null,this.currentPulse=1,this.bassAverage=0,this.isAttached=!1,this.isDestroyed=!1,this.enabled&&this.init()}init(){if(!(this.isAttached||this.isDestroyed||!this.video))try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.audioCtx=new e,this.analyser=this.audioCtx.createAnalyser(),this.analyser.fftSize=128,this.analyser.smoothingTimeConstant=.8,this.dataArray=new Uint8Array(this.analyser.frequencyBinCount);let t=null;if(typeof this.video.captureStream=="function")try{t=this.video.captureStream()}catch{}else if(typeof this.video.mozCaptureStream=="function")try{t=this.video.mozCaptureStream()}catch{}if(t&&t.getAudioTracks().length>0)this.sourceNode=this.audioCtx.createMediaStreamSource(t),this.sourceNode.connect(this.analyser),this.isAttached=!0;else try{this.sourceNode=this.audioCtx.createMediaElementSource(this.video),this.sourceNode.connect(this.analyser),this.sourceNode.connect(this.audioCtx.destination),this.isAttached=!0}catch{}}catch{this.isAttached=!1}}setEnabled(e){this.enabled=!!e,this.enabled&&!this.isAttached&&this.init()}setSensitivity(e){this.sensitivity=Math.max(10,Math.min(100,Number(e)||50))}update(){if(!this.enabled||!this.isAttached||!this.analyser||!this.dataArray)return this.currentPulse=1,1;if(this.audioCtx&&this.audioCtx.state==="suspended")try{this.audioCtx.resume()}catch{}try{this.analyser.getByteFrequencyData(this.dataArray);let e=Math.min(6,this.dataArray.length),t=0;for(let s=0;s<e;s++)t+=this.dataArray[s];t=t/e,this.bassAverage=this.bassAverage*.92+t*.08;let i=1.1+(100-this.sensitivity)*.005,a=Math.max(35,this.bassAverage*i);if(t>a&&t>45){let s=Math.min(.25,(t-a)/255*(this.sensitivity/50)*.35);this.currentPulse=Math.max(this.currentPulse,1+s)}else this.currentPulse=Math.max(1,this.currentPulse*.94)}catch{this.currentPulse=1}return this.currentPulse}getPulse(){return this.currentPulse}destroy(){if(this.isDestroyed=!0,this.audioCtx)try{this.audioCtx.close()}catch{}this.audioCtx=null,this.analyser=null,this.sourceNode=null,this.isAttached=!1}};var P=class{constructor(e,t,i){this.video=e,this.player=t,this.settings=i,this.container=null,this.canvasDiffuse=null,this.canvasTight=null,this.canvasMultiZone=null,this.canvas=null,this.ctx=null,this.ctxTight=null,this.ctxMultiZone=null,this.webglEngine=null,this.isWebGLActive=!1,this.audioEngine=null,this.ditherOverlay=null,this.barFillContainer=null,this.barFillElements={},this.analysisCanvas=null,this.analysisCtx=null,this.letterboxCrop={top:0,bottom:0,left:0,right:0},this.lastAnalysisTime=0,this.prevAnalysisPixels=null,this.isFrameFrozen=!1,this.consecutiveCleanFrames=0,this.subtitleObserver=null,this.isSubtitleVisible=!1,this.isRunning=!1,this.animationFrameId=null,this.videoCallbackId=null,this.lastRenderTime=0,this.destroyed=!1,this.workerBlobUrl=null,this.worker=null,this.isWorkerReady=!1,this.isAnalyzingInWorker=!1,this.battery=null,this.batteryUpdateHandler=null,this.isBatteryEcoActive=!1,this.batteryInfo={supported:!1,charging:!0,level:100,isLowBattery:!1,ecoActive:!1},this.batteryCallbacks=new Set,this.currentAccentColor="#ff9100",this.isShorts=location.pathname.startsWith("/shorts")||!!this.player.closest("ytd-shorts, ytd-reel-video-renderer, #shorts-player"),this.canvasWidth=this.isShorts?108:192,this.canvasHeight=this.isShorts?192:108,this.initDOM(),this.initEngines(),this.initWorker(),this.initBattery(),this.initSubtitleObserver(),this.applySettings(this.settings),this.bindEvents()}initDOM(){document.querySelectorAll(".lumaborder-ambient-container").forEach(a=>a.remove()),this.container=document.createElement("div"),this.container.className="lumaborder-ambient-container",this.container.setAttribute("aria-hidden","true"),this.canvasDiffuse=document.createElement("canvas"),this.canvasDiffuse.className="lumaborder-canvas lumaborder-canvas-diffuse",this.canvasDiffuse.width=this.canvasWidth,this.canvasDiffuse.height=this.canvasHeight,this.canvas=this.canvasDiffuse,this.canvasTight=document.createElement("canvas"),this.canvasTight.className="lumaborder-canvas lumaborder-canvas-tight",this.canvasTight.width=this.canvasWidth,this.canvasTight.height=this.canvasHeight,this.canvasMultiZone=document.createElement("canvas"),this.canvasMultiZone.className="lumaborder-canvas lumaborder-canvas-multizone",this.canvasMultiZone.width=this.canvasWidth,this.canvasMultiZone.height=this.canvasHeight,this.canvasMultiZone.style.display="none",this.ditherOverlay=document.createElement("div"),this.ditherOverlay.className="lumaborder-dither-overlay",this.ditherOverlay.setAttribute("aria-hidden","true"),this.barFillContainer=document.createElement("div"),this.barFillContainer.className="lumaborder-bar-fill-container",this.barFillContainer.style.display="none",["top","bottom","left","right"].forEach(a=>{let s=document.createElement("div");s.className=`lumaborder-bar-fill lumaborder-bar-fill-${a}`,this.barFillContainer.appendChild(s),this.barFillElements[a]=s}),this.container.appendChild(this.canvasDiffuse),this.container.appendChild(this.canvasTight),this.container.appendChild(this.canvasMultiZone),this.container.appendChild(this.ditherOverlay),this.container.appendChild(this.barFillContainer),this.player.firstChild?this.player.insertBefore(this.container,this.player.firstChild):this.player.appendChild(this.container);let e=this.settings.colorSpace==="display-p3"?"display-p3":"srgb";if(this.settings.renderEngine==="webgl"&&M.isSupported())try{this.webglEngine=new M(this.canvasDiffuse,{colorSpace:e}),this.webglEngine.isReady&&(this.isWebGLActive=!0)}catch{this.isWebGLActive=!1}if(!this.isWebGLActive){let a={alpha:!1,desynchronized:!0,willReadFrequently:!1,colorSpace:e};try{this.ctx=this.canvasDiffuse.getContext("2d",a)}catch{this.ctx=this.canvasDiffuse.getContext("2d")}}try{this.ctxTight=this.canvasTight.getContext("2d",{alpha:!1,desynchronized:!0,willReadFrequently:!1})}catch{}try{this.ctxMultiZone=this.canvasMultiZone.getContext("2d",{alpha:!0,desynchronized:!0,willReadFrequently:!1})}catch{}let t=this.isShorts?18:32,i=this.isShorts?32:18;if(typeof OffscreenCanvas<"u")try{this.analysisCanvas=new OffscreenCanvas(t,i),this.analysisCtx=this.analysisCanvas.getContext("2d",{willReadFrequently:!0})}catch{this.analysisCanvas=null}this.analysisCanvas||(this.analysisCanvas=document.createElement("canvas"),this.analysisCanvas.width=t,this.analysisCanvas.height=i,this.analysisCtx=this.analysisCanvas.getContext("2d",{willReadFrequently:!0}))}initEngines(){try{this.audioEngine=new R(this.video,{enabled:this.settings.audioReactive,sensitivity:this.settings.audioSensitivity||50})}catch{}}initSubtitleObserver(){this.subtitleObserver&&(this.subtitleObserver.disconnect(),this.subtitleObserver=null);try{let e=this.player?.querySelector?.(".ytp-caption-window-container")||document.querySelector(".ytp-caption-window-container"),t=()=>{if(!this.settings.autoSubtitleDim){this.isSubtitleVisible=!1;return}let i=!!(e&&e.childElementCount>0&&e.textContent.trim().length>0&&e.style.display!=="none");this.isSubtitleVisible!==i&&(this.isSubtitleVisible=i,this.updateEdgeMaskStyles())};e&&(this.subtitleObserver=new MutationObserver(t),this.subtitleObserver.observe(e,{childList:!0,subtree:!0,characterData:!0}))}catch{}}async initWorker(){if(!(!this.settings.workerRender||typeof Worker>"u"))try{if(typeof chrome>"u"||!chrome.runtime?.getURL)return;let t=await(await fetch(chrome.runtime.getURL("src/render-worker.js"))).text();if(this.destroyed)return;this.workerBlobUrl=URL.createObjectURL(new Blob([t],{type:"text/javascript"})),this.worker=new Worker(this.workerBlobUrl),this.worker.onmessage=i=>{let{type:a,crop:s,isDirty:n,dominantColor:o}=i.data||{};a==="READY"?this.isWorkerReady=!0:a==="ANALYSIS_RESULT"&&(s&&(this.letterboxCrop=s),typeof n=="boolean"&&(this.isFrameFrozen=!n),o&&this.settings.dynamicAccent&&this.applyDynamicAccent(o),this.isAnalyzingInWorker=!1)},this.worker.onerror=i=>{this.warnOnce("worker",i&&i.message),this.disposeWorker()},this.worker.postMessage({type:"INIT",data:{}})}catch(e){this.warnOnce("worker-init",e),this.disposeWorker()}}disposeWorker(){if(this.worker)try{this.worker.terminate()}catch{}if(this.workerBlobUrl)try{URL.revokeObjectURL(this.workerBlobUrl)}catch{}this.worker=null,this.workerBlobUrl=null,this.isWorkerReady=!1,this.isAnalyzingInWorker=!1}initBattery(){typeof navigator<"u"&&"getBattery"in navigator&&navigator.getBattery().then(e=>{if(this.destroyed)return;this.battery=e;let t=()=>{let i=e.charging,a=Math.round(e.level*100),s=!i&&e.level<=.2;this.isBatteryEcoActive=s,this.batteryInfo={supported:!0,charging:i,level:a,isLowBattery:s,ecoActive:!!(this.settings.autoBatteryEco&&s)},this.notifyBatteryListeners()};this.batteryUpdateHandler=t,e.addEventListener("chargingchange",t),e.addEventListener("levelchange",t),t()}).catch(()=>{this.batteryInfo.supported=!1})}onBatteryChange(e){return this.batteryCallbacks.add(e),this.batteryInfo.supported&&e(this.batteryInfo),()=>this.batteryCallbacks.delete(e)}notifyBatteryListeners(){for(let e of this.batteryCallbacks)try{e(this.batteryInfo)}catch{}}unbindVideoEvents(){this.video&&(this.onPlay&&this.video.removeEventListener("play",this.onPlay),this.onPause&&this.video.removeEventListener("pause",this.onPause),this.onEnded&&this.video.removeEventListener("ended",this.onEnded),this.onLoadedMetadata&&this.video.removeEventListener("loadedmetadata",this.onLoadedMetadata),this.onEmptied&&this.video.removeEventListener("emptied",this.onEmptied)),this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=null),this.onVisibilityChange&&(document.removeEventListener("visibilitychange",this.onVisibilityChange),this.onVisibilityChange=null)}warnOnce(e,t){this._warned=this._warned||{},!this._warned[e]&&(this._warned[e]=!0,console.warn(`[LumaBorder] ${e} hatas\u0131:`,t))}bindEvents(){this.unbindVideoEvents(),this.onPlay=()=>this.start(),this.onPause=()=>{this.settings.biasLightingMode==="pause"&&this.drawBiasLighting(),this.stop()},this.onEnded=()=>this.stop(),this.onLoadedMetadata=()=>{this.letterboxCrop={top:0,bottom:0,left:0,right:0},this.initSubtitleObserver(),!this.video.paused&&!this.video.ended&&this.video.readyState>=2&&this.start()},this.onEmptied=()=>{this.letterboxCrop={top:0,bottom:0,left:0,right:0}},this.onVisibilityChange=()=>{document.hidden?this.stop():!this.video.paused&&!this.video.ended&&this.start()},this.video.addEventListener("play",this.onPlay),this.video.addEventListener("pause",this.onPause),this.video.addEventListener("ended",this.onEnded),this.video.addEventListener("loadedmetadata",this.onLoadedMetadata),this.video.addEventListener("emptied",this.onEmptied),document.addEventListener("visibilitychange",this.onVisibilityChange),typeof IntersectionObserver<"u"&&this.player&&(this.intersectionObserver=new IntersectionObserver(e=>{let t=e[e.length-1];t&&(t.isIntersecting?!document.hidden&&this.video&&!this.video.paused&&!this.video.ended&&this.start():this.stop())}),this.intersectionObserver.observe(this.player)),!this.video.paused&&!this.video.ended&&this.video.readyState>=2?this.start():(this.settings.biasLightingMode==="pause"||this.settings.biasLightingMode==="always")&&this.drawBiasLighting()}applySettings(e){if(this.settings={...this.settings,...e},!this.container)return;if(!this.settings.enabled){this.container.style.display="none",this.player&&this.player.classList.remove("lumaborder-tint-active"),this.stop();return}this.container.style.display="block",this.canvasTight&&(this.canvasTight.style.display=this.settings.dualLayerGlow?"block":"none"),this.canvasMultiZone&&(this.canvasMultiZone.style.display=this.settings.multiZone?"block":"none"),this.ditherOverlay&&(this.ditherOverlay.style.display=this.settings.debanding?"block":"none"),this.barFillContainer&&(this.barFillContainer.style.display=this.settings.barFill?"block":"none"),this.audioEngine&&(this.audioEngine.setEnabled(this.settings.audioReactive),this.audioEngine.setSensitivity(this.settings.audioSensitivity||50));let t=this.settings.brightness,i=this.settings.colorTemperature||6500;this.settings.nightShiftEnabled&&Y(new Date,this.settings.nightShiftStart,this.settings.nightShiftEnd)&&(t=Math.round(t*.65),i=Math.min(3200,i)),this.effectiveBrightness=t,this.effectiveKelvin=i;let a=(t/100).toFixed(2),s=(this.settings.contrast/100).toFixed(2),n=(this.settings.saturation/100).toFixed(2),o=Math.max(10,this.settings.blur),c,m,f,g;if(this.isShorts){let p=this.settings.spread/100;c=(1.3+p*.4).toFixed(2),m=(1.02+p*.05).toFixed(2),f=(1.1+p*.15).toFixed(2),g=(1.01+p*.02).toFixed(2)}else{let p=1+this.settings.spread/100;c=p.toFixed(2),m=p.toFixed(2);let l=Math.min(1.15,1+this.settings.spread/400).toFixed(2);f=l,g=l}let h=Math.max(8,Math.round(o*.35)),d=this.settings.smoothing/100*.25;if(this.container.style.setProperty("--lumaborder-blur",`${o}px`),this.container.style.setProperty("--lumaborder-scale",c),this.container.style.setProperty("--lumaborder-scale-x",c),this.container.style.setProperty("--lumaborder-scale-y",m),this.container.style.setProperty("--lumaborder-tight-scale",f),this.container.style.setProperty("--lumaborder-tight-scale-x",f),this.container.style.setProperty("--lumaborder-tight-scale-y",g),this.container.style.setProperty("--lumaborder-tight-blur",`${h}px`),this.container.style.setProperty("--lumaborder-brightness",a),this.container.style.setProperty("--lumaborder-contrast",s),this.container.style.setProperty("--lumaborder-saturate",n),this.container.style.setProperty("--lumaborder-transition",`${d.toFixed(2)}s`),this.updateEdgeMaskStyles(),this.settings.biasLightingMode==="always"){this.drawBiasLighting();return}else if(this.settings.biasLightingMode==="pause"&&this.video.paused){this.drawBiasLighting();return}this.settings.enabled&&!this.isRunning&&!this.video.paused&&this.start()}updateEdgeMaskStyles(){if(!this.container)return;this.container.classList.toggle("edge-top-off",!this.settings.edgeTop),this.container.classList.toggle("edge-right-off",!this.settings.edgeRight),this.container.classList.toggle("edge-left-off",!this.settings.edgeLeft),this.container.classList.toggle("edge-bottom-off",!this.settings.edgeBottom);let e=this.settings.autoSubtitleDim&&this.isSubtitleVisible;if(this.settings.bottomFade||e){let i=e?75:Number(this.settings.bottomFadeStrength||60),s=`linear-gradient(to bottom, #000 0%, #000 65%, rgba(0,0,0,${Math.max(0,1-i/100).toFixed(2)}) 100%)`;this.container.style.setProperty("--lumaborder-bottom-mask",s)}else this.container.style.setProperty("--lumaborder-bottom-mask","none")}applyDynamicAccent(e){!this.player||!e||(this.currentAccentColor=e,this.player.style.setProperty("--lumaborder-accent-color",e),this.player.classList.toggle("lumaborder-tint-active",!!this.settings.dynamicAccent))}drawBiasLighting(){if(!this.settings.enabled)return;let e=this.settings.biasLightingColor||"#ffe4b5";this.isWebGLActive&&this.webglEngine;let t=i=>{i&&(i.save(),i.fillStyle=e,i.fillRect(0,0,this.canvasWidth,this.canvasHeight),i.restore())};t(this.ctx),this.settings.dualLayerGlow&&this.ctxTight&&t(this.ctxTight)}start(){if(!(this.destroyed||this.isRunning||!this.settings.enabled)){if(this.settings.biasLightingMode==="always"){this.drawBiasLighting();return}this.isRunning=!0,this.renderLoop()}}stop(){this.isRunning=!1,this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.videoCallbackId&&"cancelVideoFrameCallback"in this.video&&(this.video.cancelVideoFrameCallback(this.videoCallbackId),this.videoCallbackId=null)}renderLoop(){if(this.destroyed||!this.isRunning||!this.settings.enabled)return;if(this.settings.biasLightingMode==="always"){this.drawBiasLighting(),this.stop();return}let e=()=>{!this.isRunning||!this.settings.enabled||("requestVideoFrameCallback"in this.video?this.videoCallbackId=this.video.requestVideoFrameCallback(()=>{this.renderLoop()}):this.animationFrameId=requestAnimationFrame(()=>{this.renderLoop()}))},t=this.isBatteryEcoActive&&this.settings.autoBatteryEco?30:this.settings.targetFps,i=this.isFrameFrozen&&this.settings.freezeDetection?1:t&&t!=="sync"?Number(t)||60:null;if(i){let a=1e3/i,s=performance.now();if(s-this.lastRenderTime<a-2){e();return}this.lastRenderTime=s}try{this.drawFrame()}catch(a){this.warnOnce("renderLoop",a)}e()}detectLetterbox(){let e=!!this.settings.letterboxDetection,t=!!this.settings.pillarboxDetection;if(!this.video||this.video.videoWidth<=0||this.video.videoHeight<=0)return;let i=performance.now(),a=this.isBatteryEcoActive&&this.settings.autoBatteryEco?4e3:this.settings.ecoMode?2e3:1200;if(!(i-this.lastAnalysisTime<a)){if(this.lastAnalysisTime=i,this.settings.workerRender&&this.worker&&this.isWorkerReady&&!this.isAnalyzingInWorker&&typeof createImageBitmap=="function"){this.isAnalyzingInWorker=!0;let s=this.isShorts?18:32,n=this.isShorts?32:18;try{createImageBitmap(this.video,{resizeWidth:s,resizeHeight:n,resizeQuality:"low"}).then(o=>{if(!this.worker||!this.isWorkerReady){o&&typeof o.close=="function"&&o.close(),this.isAnalyzingInWorker=!1;return}this.worker.postMessage({type:"ANALYZE_PIXELS",data:{bitmap:o,checkLetterbox:e,checkPillarbox:t,isShorts:this.isShorts,checkDirty:!!this.settings.freezeDetection,extractColors:!!(this.settings.dynamicAccent||this.settings.multiZone)}},[o])}).catch(()=>{this.isAnalyzingInWorker=!1,this.detectLetterboxMainThread(e,t)})}catch{this.isAnalyzingInWorker=!1,this.detectLetterboxMainThread(e,t)}return}this.detectLetterboxMainThread(e,t)}}detectLetterboxMainThread(e,t){if(!(!this.analysisCtx||!this.video||this.video.videoWidth<=0||this.video.videoHeight<=0))try{let i=this.analysisCanvas.width,a=this.analysisCanvas.height;this.analysisCtx.drawImage(this.video,0,0,i,a);let n=this.analysisCtx.getImageData(0,0,i,a).data;if(this.settings.freezeDetection&&this.prevAnalysisPixels){let{isDirty:o}=Z(this.prevAnalysisPixels,n,1.2);this.isFrameFrozen=!o}if(this.prevAnalysisPixels=new Uint8ClampedArray(n),this.letterboxCrop=K(n,i,a,{checkLetterbox:e,checkPillarbox:t,isShorts:this.isShorts}),this.settings.dynamicAccent){let o=j(n,i,a);this.applyDynamicAccent(o.hex)}this.settings.multiZone&&this.ctxMultiZone&&this.renderMultiZoneLEDs(n,i,a),this.settings.barFill&&this.updateBarFillDOM()}catch{this.letterboxCrop={top:0,bottom:0,left:0,right:0}}}renderMultiZoneLEDs(e,t,i){let a=J(e,t,i,this.settings.zoneCount||12);if(!a.length||!this.ctxMultiZone)return;let s=this.ctxMultiZone;s.clearRect(0,0,this.canvasWidth,this.canvasHeight);let n=a.filter(g=>g.edge==="top"),o=a.filter(g=>g.edge==="bottom"),c=a.filter(g=>g.edge==="left"),m=a.filter(g=>g.edge==="right"),f=(g,h,d,p,l)=>{if(!g.length)return;let u=s.createLinearGradient(h,d,p,l),y=1/Math.max(1,g.length-1);g.forEach((v,S)=>{u.addColorStop(Math.min(1,S*y),v.hex)}),s.fillStyle=u,s.fillRect(Math.min(h,p),Math.min(d,l),Math.max(1,Math.abs(p-h)||this.canvasWidth),Math.max(1,Math.abs(l-d)||this.canvasHeight))};f(n,0,0,this.canvasWidth,0),f(o,0,this.canvasHeight,this.canvasWidth,this.canvasHeight),f(c,0,0,0,this.canvasHeight),f(m,this.canvasWidth,0,this.canvasWidth,this.canvasHeight)}updateBarFillDOM(){if(!this.barFillContainer)return;let e=this.player?.getBoundingClientRect();if(!e)return;let t=Math.round(e.height*this.letterboxCrop.top),i=Math.round(e.height*this.letterboxCrop.bottom),a=Math.round(e.width*this.letterboxCrop.left),s=Math.round(e.width*this.letterboxCrop.right);this.container.style.setProperty("--lumaborder-letterbox-top",`${t}px`),this.container.style.setProperty("--lumaborder-letterbox-bottom",`${i}px`),this.container.style.setProperty("--lumaborder-pillarbox-left",`${a}px`),this.container.style.setProperty("--lumaborder-pillarbox-right",`${s}px`)}drawFrame(){if(!this.video||this.video.readyState<2)return;this.detectLetterbox();let e=this.video.videoWidth||this.canvasWidth,t=this.video.videoHeight||this.canvasHeight,i=Math.max(0,Math.min(.4,this.letterboxCrop.left)),a=Math.max(0,Math.min(.4,this.letterboxCrop.right)),s=Math.max(0,Math.min(.4,this.letterboxCrop.top)),n=Math.max(0,Math.min(.4,this.letterboxCrop.bottom)),o=Math.max(0,Math.floor(e*i)),c=Math.max(0,Math.floor(t*s)),m=Math.min(e-o,Math.max(10,Math.floor(e*(1-i-a)))),f=Math.min(t-c,Math.max(10,Math.floor(t*(1-s-n)))),g=1;if(this.audioEngine&&this.settings.audioReactive&&(g=this.audioEngine.update(),g>1.02)){let d=(1+this.settings.spread/100)*g;this.container.style.setProperty("--lumaborder-scale",d.toFixed(2))}let h=[this.settings.edgeTop?this.settings.edgeTopSpread/100:0,this.settings.edgeRight?this.settings.edgeRightSpread/100:0,this.settings.edgeBottom?this.settings.edgeBottomSpread/100:0,this.settings.edgeLeft?this.settings.edgeLeftSpread/100:0];try{this.isWebGLActive&&this.webglEngine&&this.webglEngine.isReady?this.webglEngine.render(this.video,{crop:{top:s,bottom:n,left:i,right:a},brightness:this.effectiveBrightness/100*g,contrast:this.settings.contrast/100,saturation:this.settings.saturation/100,kelvin:this.effectiveKelvin,debanding:!!this.settings.debanding,hdrTonemap:!!this.settings.hdrTonemap,edgeWeights:h}):this.ctx&&this.ctx.drawImage(this.video,o,c,m,f,0,0,this.canvasWidth,this.canvasHeight),this.settings.dualLayerGlow&&this.ctxTight&&this.ctxTight.drawImage(this.canvasDiffuse,0,0)}catch(d){this.warnOnce("drawFrame",d)}}updateTarget(e,t){if(this.video===e&&this.player===t&&this.container?.isConnected)return;this.stop(),this.unbindVideoEvents(),this.video=e,this.player=t,this.isShorts=location.pathname.startsWith("/shorts")||!!this.player.closest("ytd-shorts, ytd-reel-video-renderer, #shorts-player"),this.canvasWidth=this.isShorts?108:192,this.canvasHeight=this.isShorts?192:108,this.canvasDiffuse&&(this.canvasDiffuse.width=this.canvasWidth,this.canvasDiffuse.height=this.canvasHeight,this.webglEngine&&this.webglEngine.resize(this.canvasWidth,this.canvasHeight)),this.canvasTight&&(this.canvasTight.width=this.canvasWidth,this.canvasTight.height=this.canvasHeight),this.canvasMultiZone&&(this.canvasMultiZone.width=this.canvasWidth,this.canvasMultiZone.height=this.canvasHeight);let i=this.isShorts?18:32,a=this.isShorts?32:18;this.analysisCanvas&&(this.analysisCanvas.width=i,this.analysisCanvas.height=a),this.container&&this.player&&(this.player.firstChild?this.player.insertBefore(this.container,this.player.firstChild):this.player.appendChild(this.container)),document.querySelectorAll(".lumaborder-ambient-container").forEach(s=>{s!==this.container&&s.remove()}),this.initSubtitleObserver(),this.applySettings(this.settings),this.bindEvents(),!this.video.paused&&!this.video.ended&&this.video.readyState>=2&&this.start()}destroy(){if(this.destroyed=!0,this.stop(),this.unbindVideoEvents(),this.disposeWorker(),this.webglEngine&&(this.webglEngine.destroy(),this.webglEngine=null),this.audioEngine&&(this.audioEngine.destroy(),this.audioEngine=null),this.subtitleObserver&&(this.subtitleObserver.disconnect(),this.subtitleObserver=null),this.battery&&this.batteryUpdateHandler){try{this.battery.removeEventListener("chargingchange",this.batteryUpdateHandler),this.battery.removeEventListener("levelchange",this.batteryUpdateHandler)}catch{}this.battery=null,this.batteryUpdateHandler=null}this.batteryCallbacks.clear(),this.player&&this.player.classList.remove("lumaborder-tint-active"),this.container&&(this.container.remove(),this.container=null)}};var F=class{constructor(e,t,i){this.player=e,this.settingsManager=t,this.ambientEngine=i,this.button=null,this.menuOverlay=null,this.isOpen=!1,this.activeTab="general",this.observer=null,this.mountRetryTimeout=null,this.onPlayerHover=null,this.onDocumentClick=null,this.onDocumentKeyDown=null,this.ambientEngine?.onBatteryChange&&(this.batteryUnsub=this.ambientEngine.onBatteryChange(a=>{this.isOpen&&this.activeTab==="performance"&&this.updateBatteryCard(a)})),this.initButton()}initButton(){this.mountButton(),this.setupObserver(),this.setupEventListeners()}resolveControlsTarget(){if(location.pathname.startsWith("/shorts")||!!this.player?.closest?.("ytd-shorts, ytd-reel-video-renderer, #shorts-player")){let o=this.player?.closest?.("ytd-reel-video-renderer")||document.querySelector("ytd-reel-video-renderer[is-active]");if(!o){let g=Array.from(document.querySelectorAll("ytd-reel-video-renderer video")),h=g.find(d=>!d.paused&&d.readyState>=2)||g.find(d=>!d.paused);h&&(o=h.closest("ytd-reel-video-renderer"))}if(!o){let g=Array.from(document.querySelectorAll("ytd-reel-video-renderer"));if(g.length>0){let h=window.innerHeight/2,d=1/0;for(let p of g){let l=p.getBoundingClientRect(),u=Math.abs(l.top+l.height/2-h);u<d&&(d=u,o=p)}}}let c=["#actions","ytd-reel-player-overlay-renderer #actions","#actions.ytd-reel-player-overlay-renderer",".ytd-reel-player-overlay-renderer #actions","#overlay #actions",".ytd-reel-player-overlay-renderer"],m=null;if(o)for(let g of c)try{if(m=o.querySelector(g),m)break}catch{}if(!m)for(let g of c)try{if(m=document.querySelector(g),m)break}catch{}return m?{container:m,type:"shorts",anchor:null,isFallback:!1}:{container:o?.querySelector?.("#player-container")||this.player||document.body,type:"shorts-floating",anchor:null,isFallback:!0}}let t=[".ytp-right-controls",".ytp-chrome-bottom .ytp-right-controls",".ytp-chrome-controls .ytp-right-controls",".ytp-controls-right","#movie_player .ytp-right-controls",".html5-video-player .ytp-right-controls"],i=null;for(let o of t)try{if(i=this.player?.querySelector?.(o)||document.querySelector(o),i)break}catch{}if(i){let o=[".ytp-settings-button",".ytp-subtitles-button",".ytp-miniplayer-button",".ytp-size-button",".ytp-fullscreen-button",".ytp-remote-button"],c=null;for(let m of o)try{if(c=i.querySelector(m),c)break}catch{}return{container:i,type:"standard",anchor:c,isFallback:!1}}let a=this.player?.querySelector?.(".ytp-chrome-bottom")||this.player?.querySelector?.(".ytp-chrome-controls")||document.querySelector(".ytp-chrome-bottom");if(a)return{container:a,type:"standard-alt",anchor:null,isFallback:!1};let s=this.player?.querySelector?.(".ytp-left-controls")||document.querySelector(".ytp-left-controls");if(s)return{container:s,type:"standard-left",anchor:null,isFallback:!1};let n=this.player?.querySelector?.(".ytp-chrome-top-buttons")||this.player?.querySelector?.(".ytp-chrome-top");return n?{container:n,type:"standard-top",anchor:null,isFallback:!1}:{container:this.player||document.querySelector("#movie_player")||document.body,type:"floating",anchor:null,isFallback:!0}}mountButton(){try{let e=this.resolveControlsTarget();if(!e||!e.container){this.scheduleMountRetry();return}if(this.button&&this.button.isConnected&&this.button.parentElement===e.container)return;document.querySelectorAll(".lumaborder-player-btn, .lumaborder-shorts-btn, .lumaborder-floating-btn").forEach(i=>{i!==this.button&&i.remove()}),this.button||(this.button=document.createElement("button"),this.button.setAttribute("aria-haspopup","true"),this.button.setAttribute("aria-label",r.t("appName")),this.button.innerHTML=`
          <svg viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 19c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h-4v1zm2-17c2.76 0 5 2.24 5 5 0 1.95-1.12 3.63-2.76 4.46L14 11.6V16h-4v-4.4l-.24-.14C8.12 10.63 7 8.95 7 7c0-2.76 2.24-5 5-5z"/>
          </svg>
        `,this.button.addEventListener("click",i=>{i.stopPropagation(),i.preventDefault(),this.toggleMenu()})),e.type==="shorts"?(this.button.className="lumaborder-shorts-btn",this.button.title=`${r.t("appName")} - Shorts Ambient`):e.isFallback||e.type==="floating"||e.type==="shorts-floating"?(this.button.className="lumaborder-floating-btn",this.button.title=`${r.t("appName")} - ${r.t("appTagline")}`):(this.button.className="ytp-button lumaborder-player-btn",this.button.title=`${r.t("appName")} - ${r.t("appTagline")}`),e.anchor&&e.anchor.parentNode===e.container?e.container.insertBefore(this.button,e.anchor):e.container.appendChild(this.button),this.updateButtonState()}catch(e){console.warn("[LumaBorder] Buton yerle\u015Ftirme hatas\u0131:",e)}}scheduleMountRetry(e=200){this.mountRetryTimeout&&clearTimeout(this.mountRetryTimeout),this.mountRetryTimeout=setTimeout(()=>{this.mountButton()},e)}setupObserver(){try{this.observer=new MutationObserver(()=>{(!this.button||!this.button.isConnected)&&this.mountButton()});let e=this.player||document.body;this.observer.observe(e,{childList:!0,subtree:!0})}catch(e){console.warn("[LumaBorder] DOM Observer hatas\u0131:",e)}}setupEventListeners(){let e=null;this.onPlayerHover=()=>{this.button&&this.button.isConnected||e||(e=requestAnimationFrame(()=>{e=null,(!this.button||!this.button.isConnected)&&this.mountButton()}))},this.player&&(this.player.addEventListener("mouseenter",this.onPlayerHover,{passive:!0}),this.player.addEventListener("mousemove",this.onPlayerHover,{passive:!0})),this.onDocumentClick=t=>{this.isOpen&&this.menuOverlay&&!this.menuOverlay.contains(t.target)&&this.button&&!this.button.contains(t.target)&&this.closeMenu()},document.addEventListener("click",this.onDocumentClick),this.onDocumentKeyDown=t=>{t.key==="Escape"&&this.isOpen&&this.closeMenu()},document.addEventListener("keydown",this.onDocumentKeyDown)}updateButtonState(){if(!this.button)return;let e=this.settingsManager.current.enabled;this.button.classList.toggle("active",e)}toggleMenu(){this.isOpen?this.closeMenu():this.openMenu()}openMenu(){this.isOpen||(this.renderMenu(),this.isOpen=!0)}closeMenu(){this.isOpen&&(this.tabAbortController&&(this.tabAbortController.abort(),this.tabAbortController=null),this.menuOverlay&&(this.menuOverlay.remove(),this.menuOverlay=null),this.isOpen=!1)}renderMenu(){this.menuOverlay&&this.menuOverlay.remove();let e=this.settingsManager.current;r.setLanguage(e.language||"tr"),this.menuOverlay=document.createElement("div"),this.menuOverlay.className="lumaborder-menu-overlay";let t=document.createElement("div");t.className="lumaborder-menu-header",t.innerHTML=`
      <div class="lumaborder-menu-title">
        <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/></svg>
        <span>${r.t("appName")}</span>
      </div>
      <div class="lumaborder-header-actions">
        <button class="lumaborder-lang-btn" id="lumaborder-lang-toggle">
          ${e.language==="en"?"TR \u{1F1F9}\u{1F1F7}":"EN \u{1F1EC}\u{1F1E7}"}
        </button>
        <button class="lumaborder-close-btn" id="lumaborder-close-menu">&times;</button>
      </div>
    `;let i=document.createElement("div");i.className="lumaborder-tabs",i.innerHTML=`
      <button class="lumaborder-tab ${this.activeTab==="general"?"active":""}" data-tab="general">${r.t("tabGeneral")}</button>
      <button class="lumaborder-tab ${this.activeTab==="effects"?"active":""}" data-tab="effects">${r.t("tabEffects")}</button>
      <button class="lumaborder-tab ${this.activeTab==="ambilight"?"active":""}" data-tab="ambilight">${r.t("tabAmbilight")}</button>
      <button class="lumaborder-tab ${this.activeTab==="presets"?"active":""}" data-tab="presets">${r.t("tabPresets")}</button>
      <button class="lumaborder-tab ${this.activeTab==="performance"?"active":""}" data-tab="performance">${r.t("tabPerformance")}</button>
    `;let a=document.createElement("div");a.className="lumaborder-tab-content",a.innerHTML=this.getTabContentHTML(this.activeTab);let s=document.createElement("div");s.className="lumaborder-menu-footer",s.innerHTML=`
      <button class="lumaborder-reset-btn" id="lumaborder-reset-all">${r.t("resetDefaults")}</button>
      <span class="lumaborder-badge">v3.0 \u2022 LumaBorder Ultra</span>
    `,this.menuOverlay.appendChild(t),this.menuOverlay.appendChild(i),this.menuOverlay.appendChild(a),this.menuOverlay.appendChild(s),this.menuOverlay.addEventListener("click",c=>c.stopPropagation()),this.menuOverlay.addEventListener("mousedown",c=>c.stopPropagation()),this.menuOverlay.addEventListener("keydown",c=>c.stopPropagation()),this.menuOverlay.addEventListener("keyup",c=>c.stopPropagation());let n=location.pathname.startsWith("/shorts")||!!this.player?.closest?.("ytd-shorts, ytd-reel-video-renderer, #shorts-player"),o=document.fullscreenElement;o?o.appendChild(this.menuOverlay):n?(this.menuOverlay.classList.add("lumaborder-shorts-menu"),document.body.appendChild(this.menuOverlay)):(this.player||document.querySelector("#movie_player")||document.body).appendChild(this.menuOverlay),this.bindMenuEvents()}getTabContentHTML(e){let t=this.settingsManager.current;if(e==="general")return`
        <!-- Master Switch -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("masterToggle")}</span>
            <span class="lumaborder-master-sub">${r.t("masterToggleDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="lumaborder-master-toggle" ${t.enabled?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- \xC7ift Katmanl\u0131 Glow (Dual-Layer) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("dualLayerGlow")}</span>
            <span class="lumaborder-master-sub">${r.t("dualLayerDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-duallayer" ${t.dualLayerGlow?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Parlakl\u0131k -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${r.t("brightness")}</span>
            <span class="lumaborder-control-value" id="val-brightness">${t.brightness}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-brightness" min="20" max="250" value="${t.brightness}">
        </div>

        <!-- Yay\u0131lma -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${r.t("spread")}</span>
            <span class="lumaborder-control-value" id="val-spread">${t.spread}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-spread" min="5" max="100" value="${t.spread}">
        </div>

        <!-- Bulan\u0131kl\u0131k / Yumu\u015Fakl\u0131k -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${r.t("blur")}</span>
            <span class="lumaborder-control-value" id="val-blur">${t.blur}px</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-blur" min="10" max="120" value="${t.blur}">
        </div>

        <!-- 4-B\xF6lge Ba\u011F\u0131ms\u0131z Kenar Kontrol\xFC (Item 2.1) -->
        <div class="lumaborder-section-divider"></div>
        <div class="lumaborder-control-header" style="margin-top: 8px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${r.t("edgeControls")}</span>
        </div>
        <div class="lumaborder-hint-text">${r.t("edgeControlsDesc")}</div>
        <div class="lumaborder-edge-grid">
          <div class="lumaborder-edge-item">
            <div class="lumaborder-edge-header">
              <span>${r.t("edgeTop")}</span>
              <input type="checkbox" id="chk-edge-top" ${t.edgeTop?"checked":""}>
            </div>
            <input type="range" class="lumaborder-range" id="rng-edge-top" min="0" max="200" value="${t.edgeTopSpread}">
          </div>
          <div class="lumaborder-edge-item">
            <div class="lumaborder-edge-header">
              <span>${r.t("edgeRight")}</span>
              <input type="checkbox" id="chk-edge-right" ${t.edgeRight?"checked":""}>
            </div>
            <input type="range" class="lumaborder-range" id="rng-edge-right" min="0" max="200" value="${t.edgeRightSpread}">
          </div>
          <div class="lumaborder-edge-item">
            <div class="lumaborder-edge-header">
              <span>${r.t("edgeBottom")}</span>
              <input type="checkbox" id="chk-edge-bottom" ${t.edgeBottom?"checked":""}>
            </div>
            <input type="range" class="lumaborder-range" id="rng-edge-bottom" min="0" max="200" value="${t.edgeBottomSpread}">
          </div>
          <div class="lumaborder-edge-item">
            <div class="lumaborder-edge-header">
              <span>${r.t("edgeLeft")}</span>
              <input type="checkbox" id="chk-edge-left" ${t.edgeLeft?"checked":""}>
            </div>
            <input type="range" class="lumaborder-range" id="rng-edge-left" min="0" max="200" value="${t.edgeLeftSpread}">
          </div>
        </div>
      `;if(e==="effects"){let i=t.biasLightingMode==="off";return`
        <!-- Doygunluk -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${r.t("saturation")}</span>
            <span class="lumaborder-control-value" id="val-saturation">${t.saturation}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-saturation" min="50" max="220" value="${t.saturation}">
        </div>

        <!-- Kontrast -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${r.t("contrast")}</span>
            <span class="lumaborder-control-value" id="val-contrast">${t.contrast}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-contrast" min="60" max="160" value="${t.contrast}">
        </div>

        <!-- Kare Yumu\u015Fatma -->
        <div class="lumaborder-control-row">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${r.t("smoothing")}</span>
            <span class="lumaborder-control-value" id="val-smoothing">${t.smoothing}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-smoothing" min="0" max="100" value="${t.smoothing}">
        </div>

        <!-- Kelvin Renk S\u0131cakl\u0131\u011F\u0131 (Item 2.5) -->
        <div class="lumaborder-control-row" style="margin-top: 10px;">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${r.t("colorTemperature")}</span>
            <span class="lumaborder-control-value" id="val-kelvin">${t.colorTemperature||6500}K</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-kelvin" min="2200" max="9300" step="50" value="${t.colorTemperature||6500}">
          <div class="lumaborder-hint-text">${r.t("colorTemperatureDesc")}</div>
        </div>

        <!-- Dynamic Accent Tinting (Item 3.4) -->
        <div class="lumaborder-master-card" style="margin-top: 10px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("dynamicAccent")}</span>
            <span class="lumaborder-master-sub">${r.t("dynamicAccentDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-dynamic-accent" ${t.dynamicAccent?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Dinamik Altyaz\u0131 K\u0131sma (Item 2.6) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("autoSubtitleDim")}</span>
            <span class="lumaborder-master-sub">${r.t("autoSubtitleDimDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-auto-sub-dim" ${t.autoSubtitleDim?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Sabit Arka I\u015F\u0131k (Bias Lighting) -->
        <div class="lumaborder-section-divider"></div>
        <div class="lumaborder-control-header" style="margin-top: 10px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${r.t("biasLighting")}</span>
        </div>
        <div class="lumaborder-bias-modes">
          <button class="lumaborder-mode-pill ${t.biasLightingMode==="off"?"active":""}" data-biasmode="off">${r.t("biasModeOff")}</button>
          <button class="lumaborder-mode-pill ${t.biasLightingMode==="pause"?"active":""}" data-biasmode="pause">${r.t("biasModePause")}</button>
          <button class="lumaborder-mode-pill ${t.biasLightingMode==="always"?"active":""}" data-biasmode="always">${r.t("biasModeAlways")}</button>
        </div>

        <div class="lumaborder-color-palette" id="bias-color-palette" style="${i?"display:none;":""}">
          <span class="lumaborder-control-label" style="font-size: 11px;">${r.t("biasLightingColor")}:</span>
          <div class="lumaborder-color-dots">
            <button class="lumaborder-color-dot ${t.biasLightingColor==="#ffe4b5"?"active":""}" data-color="#ffe4b5" title="${r.t("biasColorWarm")}" style="background: #ffe4b5;"></button>
            <button class="lumaborder-color-dot ${t.biasLightingColor==="#fff4e8"?"active":""}" data-color="#fff4e8" title="${r.t("biasColorNeutral")}" style="background: #fff4e8;"></button>
            <button class="lumaborder-color-dot ${t.biasLightingColor==="#ffffff"?"active":""}" data-color="#ffffff" title="${r.t("biasColorCinema")}" style="background: #ffffff;"></button>
            <button class="lumaborder-color-dot ${t.biasLightingColor==="#00e5ff"?"active":""}" data-color="#00e5ff" title="${r.t("biasColorCyber")}" style="background: #00e5ff;"></button>
            <button class="lumaborder-color-dot ${t.biasLightingColor==="#ff5e00"?"active":""}" data-color="#ff5e00" title="${r.t("biasColorSunset")}" style="background: #ff5e00;"></button>
            <button class="lumaborder-color-dot ${t.biasLightingColor==="#bd00ff"?"active":""}" data-color="#bd00ff" title="${r.t("biasColorPurple")}" style="background: #bd00ff;"></button>
            <input type="color" id="bias-custom-color" class="lumaborder-color-picker" value="${typeof t.biasLightingColor=="string"&&/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t.biasLightingColor.trim())?t.biasLightingColor.trim():"#ffe4b5"}" title="${r.t("biasColorCustom")}">
          </div>
        </div>
      `}if(e==="ambilight")return`
        <!-- \xC7ok B\xF6lgeli Ambilight (Item 2.2) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("multiZone")}</span>
            <span class="lumaborder-master-sub">${r.t("multiZoneDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-multizone" ${t.multiZone?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>
        <div class="lumaborder-zone-modes">
          <button class="lumaborder-mode-pill ${t.zoneCount===8?"active":""}" data-zones="8">8 ${r.t("zoneCount")}</button>
          <button class="lumaborder-mode-pill ${t.zoneCount===12?"active":""}" data-zones="12">12 ${r.t("zoneCount")}</button>
          <button class="lumaborder-mode-pill ${t.zoneCount===16?"active":""}" data-zones="16">16 ${r.t("zoneCount")}</button>
        </div>

        <!-- Siyah \u015Eerit Doldurucu (Bar Fill - Item 2.3) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("barFill")}</span>
            <span class="lumaborder-master-sub">${r.t("barFillDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-barfill" ${t.barFill?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Banding \xD6nleme (Dithering - Item 2.4) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("debanding")}</span>
            <span class="lumaborder-master-sub">${r.t("debandingDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-debanding" ${t.debanding?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- M\xFCzik & Bas Reaktif Ritim Modu (Item 3.1) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("audioReactive")}</span>
            <span class="lumaborder-master-sub">${r.t("audioReactiveDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-audio-reactive" ${t.audioReactive?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>
        <div class="lumaborder-control-row" id="row-audio-sens" style="${t.audioReactive?"":"display:none;"}">
          <div class="lumaborder-control-header">
            <span class="lumaborder-control-label">${r.t("audioSensitivity")}</span>
            <span class="lumaborder-control-value" id="val-audio-sens">${t.audioSensitivity||50}%</span>
          </div>
          <input type="range" class="lumaborder-range" id="rng-audio-sens" min="10" max="100" value="${t.audioSensitivity||50}">
        </div>

        <!-- Zaman Ayarl\u0131 Gece Karartmas\u0131 (Item 3.3) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("nightShift")}</span>
            <span class="lumaborder-master-sub">${r.t("nightShiftDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-night-shift" ${t.nightShiftEnabled?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>
        <div class="lumaborder-time-row" id="row-night-shift-time" style="${t.nightShiftEnabled?"":"display:none;"}">
          <span>Saat:</span>
          <input type="text" class="lumaborder-time-input" id="inp-night-start" value="${t.nightShiftStart||"22:00"}" style="width: 55px;">
          <span>\u2014</span>
          <input type="text" class="lumaborder-time-input" id="inp-night-end" value="${t.nightShiftEnd||"07:00"}" style="width: 55px;">
        </div>
      `;if(e==="presets")return`
        <div class="lumaborder-presets-grid">
          <button class="lumaborder-preset-btn ${t.activePreset==="default"?"active":""}" data-preset="default">
            <span class="lumaborder-preset-icon">\u2696\uFE0F</span>
            <span>${r.t("presetDefault")}</span>
          </button>
          <button class="lumaborder-preset-btn ${t.activePreset==="cinema"?"active":""}" data-preset="cinema">
            <span class="lumaborder-preset-icon">\u{1F3AC}</span>
            <span>${r.t("presetCinema")}</span>
          </button>
          <button class="lumaborder-preset-btn ${t.activePreset==="vibrant"?"active":""}" data-preset="vibrant">
            <span class="lumaborder-preset-icon">\u26A1</span>
            <span>${r.t("presetVibrant")}</span>
          </button>
          <button class="lumaborder-preset-btn ${t.activePreset==="night"?"active":""}" data-preset="night">
            <span class="lumaborder-preset-icon">\u{1F319}</span>
            <span>${r.t("presetNight")}</span>
          </button>
          <button class="lumaborder-preset-btn ${t.activePreset==="gaming"?"active":""}" data-preset="gaming">
            <span class="lumaborder-preset-icon">\u{1F3AE}</span>
            <span>${r.t("presetGaming")}</span>
          </button>
        </div>
      `;if(e==="performance"){let i=t.targetFps==="sync"?r.t("fpsSync"):`${t.targetFps} FPS`;return`
        <!-- Render Motoru (Item 1.1) -->
        <div class="lumaborder-control-header" style="margin-top: 4px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${r.t("renderEngine")}</span>
        </div>
        <div class="lumaborder-engine-modes">
          <button class="lumaborder-mode-pill ${t.renderEngine==="webgl"?"active":""}" data-engine="webgl">${r.t("engineWebGL")}</button>
          <button class="lumaborder-mode-pill ${t.renderEngine==="canvas2d"?"active":""}" data-engine="canvas2d">${r.t("engineCanvas2D")}</button>
        </div>
        <div class="lumaborder-hint-text">${r.t("renderEngineDesc")}</div>

        <!-- Renk Uzay\u0131 & HDR Tonemapping (Item 1.5) -->
        <div class="lumaborder-control-header" style="margin-top: 10px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${r.t("colorSpace")}</span>
        </div>
        <div class="lumaborder-engine-modes">
          <button class="lumaborder-mode-pill ${t.colorSpace==="display-p3"?"active":""}" data-cspace="display-p3">Display P3 (HDR)</button>
          <button class="lumaborder-mode-pill ${t.colorSpace==="srgb"?"active":""}" data-cspace="srgb">sRGB (Standart)</button>
        </div>

        <div class="lumaborder-master-card" style="margin-top: 8px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("hdrTonemap")}</span>
            <span class="lumaborder-master-sub">${r.t("hdrTonemapDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-hdr-tonemap" ${t.hdrTonemap?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Statik Sahne Dondurucu (Dirty Frame Freeze - Item 1.2) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("freezeDetection")}</span>
            <span class="lumaborder-master-sub">${r.t("freezeDetectionDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-freeze" ${t.freezeDetection?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Hedef Kare H\u0131z\u0131 (FPS Limiti) -->
        <div class="lumaborder-control-header" style="margin-top: 12px;">
          <span class="lumaborder-control-label" style="font-weight: 700; color: #ff9d2e;">${r.t("targetFps")}</span>
          <span class="lumaborder-control-value" id="val-target-fps">${i}</span>
        </div>
        <div class="lumaborder-fps-modes">
          <button class="lumaborder-mode-pill ${t.targetFps==="sync"?"active":""}" data-fps="sync">${r.t("fpsSync")}</button>
          <button class="lumaborder-mode-pill ${String(t.targetFps)==="60"?"active":""}" data-fps="60">${r.t("fps60")}</button>
          <button class="lumaborder-mode-pill ${String(t.targetFps)==="30"?"active":""}" data-fps="30">${r.t("fps30")}</button>
        </div>

        <!-- Ak\u0131ll\u0131 Pil Tasarrufu (%20 Alt\u0131 Otomatik 30 FPS) -->
        <div class="lumaborder-master-card" style="margin-top: 14px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("autoBatteryEco")}</span>
            <span class="lumaborder-master-sub">${r.t("autoBatteryEcoDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-battery-eco" ${t.autoBatteryEco?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Canl\u0131 Pil Durumu Kart\u0131 -->
        <div class="lumaborder-battery-card" id="lumaborder-battery-card">
          <div class="lumaborder-battery-info">
            <span class="lumaborder-battery-icon" id="lumaborder-battery-icon">\u{1F50B}</span>
            <div class="lumaborder-battery-text">
              <span class="lumaborder-battery-title" id="lumaborder-battery-title">${r.t("batteryStatusTitle")}</span>
              <span class="lumaborder-battery-sub" id="lumaborder-battery-sub">Kontrol ediliyor...</span>
            </div>
          </div>
          <span class="lumaborder-battery-tag" id="lumaborder-battery-tag">--</span>
        </div>

        <!-- OffscreenCanvas & Worker Render (Item 1.3) -->
        <div class="lumaborder-master-card" style="margin-top: 12px;">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("workerRender")}</span>
            <span class="lumaborder-master-sub">${r.t("workerRenderDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-worker" ${t.workerRender?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <!-- Siyah \u015Eerit Alg\u0131lama (Item 1.4) -->
        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("letterboxDetection")}</span>
            <span class="lumaborder-master-sub">${r.t("letterboxDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-letterbox" ${t.letterboxDetection?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>

        <div class="lumaborder-master-card">
          <div class="lumaborder-master-text">
            <span class="lumaborder-master-title">${r.t("pillarboxDetection")}</span>
            <span class="lumaborder-master-sub">${r.t("pillarboxDesc")}</span>
          </div>
          <label class="lumaborder-switch">
            <input type="checkbox" id="chk-pillarbox" ${t.pillarboxDetection?"checked":""}>
            <span class="lumaborder-slider-round"></span>
          </label>
        </div>
      `}return""}bindMenuEvents(){if(!this.menuOverlay)return;let e=this.menuOverlay.querySelector("#lumaborder-close-menu");e&&e.addEventListener("click",()=>this.closeMenu());let t=this.menuOverlay.querySelector("#lumaborder-lang-toggle");t&&t.addEventListener("click",async()=>{let s=this.settingsManager.current.language==="en"?"tr":"en";await this.settingsManager.save({language:s}),r.setLanguage(s),this.renderMenu()});let i=this.menuOverlay.querySelector("#lumaborder-reset-all");i&&i.addEventListener("click",async()=>{confirm(r.t("resetConfirm"))&&(await this.settingsManager.reset(),this.ambientEngine.applySettings(this.settingsManager.current),this.updateButtonState(),this.renderMenu())});let a=this.menuOverlay.querySelectorAll(".lumaborder-tab");a.forEach(s=>{s.addEventListener("click",()=>{this.activeTab=s.dataset.tab,a.forEach(o=>o.classList.toggle("active",o===s));let n=this.menuOverlay.querySelector(".lumaborder-tab-content");n&&(n.innerHTML=this.getTabContentHTML(this.activeTab),this.bindTabContentEvents())})}),this.bindTabContentEvents()}bindTabContentEvents(){if(!this.menuOverlay)return;this.tabAbortController&&this.tabAbortController.abort(),this.tabAbortController=new AbortController;let{signal:e}=this.tabAbortController,t=this.menuOverlay.querySelector("#lumaborder-master-toggle");t&&t.addEventListener("change",async l=>{let u=l.target.checked;await this.settingsManager.save({enabled:u}),this.ambientEngine.applySettings({enabled:u}),this.updateButtonState()},{signal:e});let i=(l,u,y="%",v=!1)=>{let S=this.menuOverlay.querySelector(`#rng-${l}`),E=this.menuOverlay.querySelector(`#val-${l}`);S&&E&&(S.addEventListener("input",L=>{let k=parseInt(L.target.value,10);E.textContent=`${k}${y}`,this.ambientEngine.applySettings({[u]:k})},{signal:e}),S.addEventListener("change",async L=>{let k=parseInt(L.target.value,10);await this.settingsManager.save({[u]:k,activePreset:"custom"})},{signal:e}))};i("brightness","brightness","%"),i("spread","spread","%"),i("blur","blur","px"),i("saturation","saturation","%"),i("contrast","contrast","%"),i("smoothing","smoothing","%"),i("kelvin","colorTemperature","K"),i("audio-sens","audioSensitivity","%"),["top","right","bottom","left"].forEach(l=>{let u=l.charAt(0).toUpperCase()+l.slice(1),y=this.menuOverlay.querySelector(`#chk-edge-${l}`);y&&y.addEventListener("change",async S=>{await this.settingsManager.save({[`edge${u}`]:S.target.checked}),this.ambientEngine.applySettings({[`edge${u}`]:S.target.checked})},{signal:e});let v=this.menuOverlay.querySelector(`#rng-edge-${l}`);v&&(v.addEventListener("input",S=>{let E=parseInt(S.target.value,10);this.ambientEngine.applySettings({[`edge${u}Spread`]:E})},{signal:e}),v.addEventListener("change",async S=>{let E=parseInt(S.target.value,10);await this.settingsManager.save({[`edge${u}Spread`]:E})},{signal:e}))});let a=(l,u,y)=>{let v=this.menuOverlay.querySelector(`#chk-${l}`);v&&v.addEventListener("change",async S=>{await this.settingsManager.save({[u]:S.target.checked}),this.ambientEngine.applySettings({[u]:S.target.checked}),y&&y(S.target.checked)},{signal:e})};a("duallayer","dualLayerGlow"),a("letterbox","letterboxDetection"),a("pillarbox","pillarboxDetection"),a("battery-eco","autoBatteryEco",()=>{this.updateBatteryCard(this.ambientEngine?.batteryInfo)}),a("worker","workerRender"),a("freeze","freezeDetection"),a("hdr-tonemap","hdrTonemap"),a("dynamic-accent","dynamicAccent"),a("auto-sub-dim","autoSubtitleDim"),a("multizone","multiZone"),a("barfill","barFill"),a("debanding","debanding"),a("audio-reactive","audioReactive",l=>{let u=this.menuOverlay.querySelector("#row-audio-sens");u&&(u.style.display=l?"block":"none")}),a("night-shift","nightShiftEnabled",l=>{let u=this.menuOverlay.querySelector("#row-night-shift-time");u&&(u.style.display=l?"flex":"none")});let s=this.menuOverlay.querySelector("#inp-night-start"),n=this.menuOverlay.querySelector("#inp-night-end");s&&s.addEventListener("change",async l=>{await this.settingsManager.save({nightShiftStart:l.target.value}),this.ambientEngine.applySettings({nightShiftStart:l.target.value})},{signal:e}),n&&n.addEventListener("change",async l=>{await this.settingsManager.save({nightShiftEnd:l.target.value}),this.ambientEngine.applySettings({nightShiftEnd:l.target.value})},{signal:e});let o=this.menuOverlay.querySelectorAll(".lumaborder-engine-modes .lumaborder-mode-pill[data-engine]");o.forEach(l=>{l.addEventListener("click",async()=>{let u=l.dataset.engine;o.forEach(y=>y.classList.toggle("active",y===l)),await this.settingsManager.save({renderEngine:u}),this.ambientEngine.applySettings({renderEngine:u})},{signal:e})});let c=this.menuOverlay.querySelectorAll(".lumaborder-engine-modes .lumaborder-mode-pill[data-cspace]");c.forEach(l=>{l.addEventListener("click",async()=>{let u=l.dataset.cspace;c.forEach(y=>y.classList.toggle("active",y===l)),await this.settingsManager.save({colorSpace:u}),this.ambientEngine.applySettings({colorSpace:u})},{signal:e})});let m=this.menuOverlay.querySelectorAll(".lumaborder-zone-modes .lumaborder-mode-pill");m.forEach(l=>{l.addEventListener("click",async()=>{let u=parseInt(l.dataset.zones,10);m.forEach(y=>y.classList.toggle("active",y===l)),await this.settingsManager.save({zoneCount:u}),this.ambientEngine.applySettings({zoneCount:u})},{signal:e})});let f=this.menuOverlay.querySelectorAll(".lumaborder-fps-modes .lumaborder-mode-pill");f.forEach(l=>{l.addEventListener("click",async()=>{let u=l.dataset.fps;f.forEach(v=>v.classList.toggle("active",v===l));let y=this.menuOverlay.querySelector("#val-target-fps");y&&(y.textContent=u==="sync"?r.t("fpsSync"):`${u} FPS`),await this.settingsManager.save({targetFps:u,activePreset:"custom"}),this.ambientEngine.applySettings({targetFps:u})},{signal:e})}),this.menuOverlay.querySelectorAll(".lumaborder-preset-btn").forEach(l=>{l.addEventListener("click",async()=>{let u=l.dataset.preset;await this.settingsManager.applyPreset(u),this.ambientEngine.applySettings(this.settingsManager.current),this.renderMenu()},{signal:e})}),this.updateBatteryCard(this.ambientEngine?.batteryInfo);let h=this.menuOverlay.querySelectorAll(".lumaborder-bias-modes .lumaborder-mode-pill");h.forEach(l=>{l.addEventListener("click",async()=>{let u=l.dataset.biasmode;h.forEach(v=>v.classList.toggle("active",v===l)),await this.settingsManager.save({biasLightingMode:u}),this.ambientEngine.applySettings({biasLightingMode:u});let y=this.menuOverlay.querySelector("#bias-color-palette");y&&(y.style.display=u==="off"?"none":"block")},{signal:e})});let d=this.menuOverlay.querySelectorAll(".lumaborder-color-dot");d.forEach(l=>{l.addEventListener("click",async()=>{let u=l.dataset.color;d.forEach(v=>v.classList.toggle("active",v===l)),await this.settingsManager.save({biasLightingColor:u}),this.ambientEngine.applySettings({biasLightingColor:u});let y=this.menuOverlay.querySelector("#bias-custom-color");y&&(y.value=u)},{signal:e})});let p=this.menuOverlay.querySelector("#bias-custom-color");p&&(p.addEventListener("input",l=>{this.ambientEngine.applySettings({biasLightingColor:l.target.value})},{signal:e}),p.addEventListener("change",async l=>{await this.settingsManager.save({biasLightingColor:l.target.value}),d.forEach(u=>u.classList.remove("active"))},{signal:e}))}updateBatteryCard(e){if(!this.menuOverlay)return;let t=this.menuOverlay.querySelector("#lumaborder-battery-card"),i=this.menuOverlay.querySelector("#lumaborder-battery-title"),a=this.menuOverlay.querySelector("#lumaborder-battery-sub"),s=this.menuOverlay.querySelector("#lumaborder-battery-tag"),n=this.menuOverlay.querySelector("#lumaborder-battery-icon");if(!t||!i||!a||!s||!n)return;if(!e||!e.supported){n.textContent="\u{1F50C}",i.textContent=r.t("batteryStatusTitle"),a.textContent=r.t("batteryNotSupported"),s.textContent="Masa\xFCst\xFC/Harici",s.className="lumaborder-battery-tag desktop";return}let o=e.charging,c=e.level,m=this.settingsManager.current.autoBatteryEco&&!o&&c<=20;n.textContent=o?"\u26A1":c<=20?"\u{1FAAB}":"\u{1F50B}",i.textContent=`${r.t("batteryStatusTitle")}: %${c} (${o?r.t("batteryCharging"):r.t("batteryDischarging")})`,m?(a.textContent=r.t("batteryEcoActiveBadge"),s.textContent="30 FPS Eko",s.className="lumaborder-battery-tag eco"):o?(a.textContent=r.t("batteryEcoDisabledBadge"),s.textContent=`%${c} \u015Earjda`,s.className="lumaborder-battery-tag charging"):(a.textContent=r.t("batteryEcoDisabledBadge"),s.textContent=`%${c} Pilde`,s.className="lumaborder-battery-tag normal")}updateTarget(e,t){if(this.player&&this.onPlayerHover&&(this.player.removeEventListener("mouseenter",this.onPlayerHover),this.player.removeEventListener("mousemove",this.onPlayerHover)),this.player=e,this.ambientEngine=t,this.player&&this.onPlayerHover&&(this.player.addEventListener("mouseenter",this.onPlayerHover,{passive:!0}),this.player.addEventListener("mousemove",this.onPlayerHover,{passive:!0})),this.mountButton(),this.isOpen&&this.menuOverlay){let i=location.pathname.startsWith("/shorts")||!!this.player?.closest?.("ytd-shorts, ytd-reel-video-renderer, #shorts-player");this.menuOverlay.classList.toggle("lumaborder-shorts-menu",i),this.activeTab==="performance"&&this.updateBatteryCard(this.ambientEngine?.batteryInfo)}}destroy(){this.closeMenu(),this.mountRetryTimeout&&(clearTimeout(this.mountRetryTimeout),this.mountRetryTimeout=null),this.observer&&(this.observer.disconnect(),this.observer=null),this.player&&this.onPlayerHover&&(this.player.removeEventListener("mouseenter",this.onPlayerHover),this.player.removeEventListener("mousemove",this.onPlayerHover),this.onPlayerHover=null),this.onDocumentClick&&(document.removeEventListener("click",this.onDocumentClick),this.onDocumentClick=null),this.onDocumentKeyDown&&(document.removeEventListener("keydown",this.onDocumentKeyDown),this.onDocumentKeyDown=null),this.batteryUnsub&&(this.batteryUnsub(),this.batteryUnsub=null),this.button&&(this.button.remove(),this.button=null)}};(()=>{if(window.__LUMABORDER_LOADED__)return;window.__LUMABORDER_LOADED__=!0;class b{constructor(){this.ambientEngine=null,this.playerUI=null,this.currentVideo=null,this.currentPlayer=null,this.currentReel=null,this.initTimeout=null,this.retryTimeout=null,this.observer=null,this.init()}async init(){try{await D.load(),r.setLanguage(D.current.language||"tr"),this.bindEvents(),this.observeDOM(),D.onChange(t=>{r.setLanguage(t.language||"tr"),this.ambientEngine&&this.ambientEngine.applySettings(t),this.playerUI&&this.playerUI.updateButtonState()}),typeof chrome<"u"&&chrome.runtime?.onMessage&&chrome.runtime.onMessage.addListener(t=>{t&&t.action==="SETTINGS_UPDATED"&&D.load().then(i=>{r.setLanguage(i.language||"tr"),this.ambientEngine&&this.ambientEngine.applySettings(i),this.playerUI&&this.playerUI.updateButtonState()})}),this.checkAndBootstrap()}catch(t){console.warn("[LumaBorder] Ba\u015Flatma hatas\u0131:",t)}}bindEvents(){window.addEventListener("yt-navigate-finish",()=>this.scheduleBootstrap(150)),window.addEventListener("spfdone",()=>this.scheduleBootstrap(150)),window.addEventListener("popstate",()=>this.scheduleBootstrap(150)),document.addEventListener("loadedmetadata",t=>{t.target&&t.target.tagName==="VIDEO"&&this.scheduleBootstrap(100)},!0),window.addEventListener("wheel",()=>{location.pathname.startsWith("/shorts")&&this.scheduleBootstrap(100)},{passive:!0}),window.addEventListener("keydown",t=>{location.pathname.startsWith("/shorts")&&["ArrowUp","ArrowDown","PageUp","PageDown","j","k"].includes(t.key)&&this.scheduleBootstrap(100)},{passive:!0}),window.addEventListener("click",t=>{location.pathname.startsWith("/shorts")&&t.target&&t.target.closest&&t.target.closest("#navigation-button-down, #navigation-button-up, ytd-reel-video-renderer")&&this.scheduleBootstrap(100)},{passive:!0}),document.addEventListener("play",t=>{t.target&&t.target.tagName==="VIDEO"&&(location.pathname.startsWith("/shorts")?this.handleShortsVideoPlay(t.target):this.scheduleBootstrap(100))},!0)}handleShortsVideoPlay(t){if(!t)return;let i=t.closest("ytd-reel-video-renderer"),a=i?.querySelector("#player-container")||i?.querySelector(".player-container")||i?.querySelector("#shorts-player")||t.parentElement;(t!==this.currentVideo||a!==this.currentPlayer||i!==this.currentReel)&&(this.currentReel=i,this.setup(t,a))}scheduleBootstrap(t=300){this.initTimeout&&clearTimeout(this.initTimeout),this.initTimeout=setTimeout(()=>this.checkAndBootstrap(),t)}observeDOM(){try{let t=null,i=new MutationObserver(()=>{t||(t=setTimeout(()=>{if(t=null,location.pathname.startsWith("/shorts")){let n=document.querySelector("ytd-reel-video-renderer[is-active]"),o=n?n.querySelector("video"):document.querySelector("ytd-shorts video");o&&(o!==this.currentVideo||n!==this.currentReel)&&this.scheduleBootstrap(100)}else{let n=document.querySelector("video.html5-main-video")||document.querySelector("video");n&&n!==this.currentVideo&&this.scheduleBootstrap(150)}},150))}),a=document.querySelector("ytd-page-manager")||document.body||document.documentElement;this.observer=i,a&&i.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["is-active","src"]})}catch(t){console.warn("[LumaBorder] DOM Observer kurulum hatas\u0131:",t)}}findTargetVideoAndPlayer(t){let i=null,a=null,s=null;if(t){if(s=document.querySelector("ytd-reel-video-renderer[is-active]"),!s){let n=Array.from(document.querySelectorAll("ytd-reel-video-renderer video")),o=n.find(c=>!c.paused&&c.readyState>=2)||n.find(c=>!c.paused);o&&(s=o.closest("ytd-reel-video-renderer"),i=o)}if(!s){let n=Array.from(document.querySelectorAll("ytd-reel-video-renderer"));if(n.length>0){let o=window.innerHeight/2,c=null,m=1/0;for(let f of n){let g=f.getBoundingClientRect(),h=Math.abs(g.top+g.height/2-o);h<m&&(m=h,c=f)}s=c}}s&&(i||(i=s.querySelector("video.html5-main-video")||s.querySelector("video")),a=s.querySelector("#player-container")||s.querySelector(".player-container")||s.querySelector("#shorts-player")||s),i||(i=document.querySelector("#shorts-player video")||document.querySelector("ytd-shorts video")||document.querySelector("video"),a=document.querySelector("#shorts-player")||(i?i.parentElement:null))}else{let n=["#movie_player",".html5-video-player","#player .html5-video-player","ytd-watch-flexy #movie_player","ytd-player #movie_player","#player-container","#ytd-player"];for(let c of n)try{let m=document.querySelector(c);if(m){a=m;break}}catch{}let o=["video.html5-main-video","#movie_player video",".html5-video-player video","ytd-watch-flexy video","video"];if(a)for(let c of o)try{let m=a.querySelector(c);if(m){i=m;break}}catch{}if(!i)for(let c of o)try{let m=document.querySelector(c);if(m){i=m;break}}catch{}i&&!a&&(a=i.closest(".html5-video-player")||i.closest("#movie_player")||i.parentElement)}return{video:i,player:a,activeReel:s}}checkAndBootstrap(t=0){let i=location.pathname.startsWith("/watch")||location.pathname.startsWith("/embed/"),a=location.pathname.startsWith("/shorts");if(!i&&!a){this.teardown();return}let{video:s,player:n,activeReel:o}=this.findTargetVideoAndPlayer(a);if(!s||!n){t<10&&(clearTimeout(this.retryTimeout),this.retryTimeout=setTimeout(()=>this.checkAndBootstrap(t+1),300));return}this.currentVideo===s&&this.currentPlayer===n&&this.ambientEngine&&(!a||this.currentReel===o)||(this.currentReel=o,this.setup(s,n))}setup(t,i){if(!(!t||!i)){this.currentVideo=t,this.currentPlayer=i;try{this.ambientEngine&&this.playerUI?(this.ambientEngine.updateTarget(t,i),this.playerUI.updateTarget(i,this.ambientEngine)):(this.teardown(),this.currentVideo=t,this.currentPlayer=i,this.ambientEngine=new P(t,i,D.current),this.playerUI=new F(i,D,this.ambientEngine))}catch(a){console.warn("[LumaBorder] Kurulum hatas\u0131:",a)}}}teardown(){if(clearTimeout(this.retryTimeout),clearTimeout(this.initTimeout),this.retryTimeout=null,this.initTimeout=null,this.ambientEngine){try{this.ambientEngine.destroy()}catch{}this.ambientEngine=null}if(this.playerUI){try{this.playerUI.destroy()}catch{}this.playerUI=null}this.currentVideo=null,this.currentPlayer=null,this.currentReel=null}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>new b):new b})();})();
