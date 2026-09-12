# MEMORY.md — ekip360 Migration Projesi

## Proje Bağlamı

ekip360.net (Google Street View sanal tur hizmeti veren kurumsal site) ASP.NET MVC 5'ten Next.js App Router'a taşınıyor.

> Başlangıçta ASP.NET Core sanılıyordu. Kaynak kod incelemesinde **ASP.NET MVC 5** olduğu doğrulandı.

---

## Teknik Kararlar

| Konu         | Karar                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dil          | JavaScript (TypeScript yok)                                                                                                                                                                                                                                                                                                                                                                                         |
| Router       | Next.js App Router                                                                                                                                                                                                                                                                                                                                                                                                  |
| CMS          | Sanity                                                                                                                                                                                                                                                                                                                                                                                                              |
| E-posta      | Resend                                                                                                                                                                                                                                                                                                                                                                                                              |
| CSS          | Orijinal dosyalar olduğu gibi taşınacak                                                                                                                                                                                                                                                                                                                                                                             |
| Carousel     | CarouFredSel → embla-carousel-react veya swiper                                                                                                                                                                                                                                                                                                                                                                     |
| Lightbox     | FancyBox → yet-another-react-lightbox                                                                                                                                                                                                                                                                                                                                                                               |
| Veritabanı   | Yok (SQL Server → Sanity'e taşınacak)                                                                                                                                                                                                                                                                                                                                                                               |
| Public auth  | Yok (sadece Sanity Studio)                                                                                                                                                                                                                                                                                                                                                                                          |
| Eski URL'ler | ASP.NET URL'leri kalici yonlendirilir: path degisenler `next.config.mjs > redirects`, harf farklilari + EN sayfalar + www->apex `middleware.js`. Eski `/ReferansDetay/<slug>/<pk>` slug'lari `lib/referans-slug-map.json` ile ozel detaya eslenir (ureteci: `migration/import-scripts/generate-referans-slug-map.mjs`, Sanity basliklarindan). Kaynak envanter: yedek `sitemap.xml` (122 URL). Trailing slash Next varsayilani (308) |
| EN sayfaları | TR tamamlanmadan bekleyecek                                                                                                                                                                                                                                                                                                                                                                                         |

---

## Klasör Yapısı

**Çalışma alanı kökü:** `/Users/tolgabalikci/Claude_Code_Workspace/Projects/COWORK-OS/`

> Proje `~/Documents/Projects/COWORK-OS/` altından buraya taşındı (01.08.2026).
> Eski yol artık diskte yok — belgelerdeki referanslar güncellendi.

| Klasör / Dosya                                           | Açıklama                               |
| -------------------------------------------------------- | -------------------------------------- |
| `CLAUDE.md`                                              | Proje talimatları ve detaylı belgeleme |
| `MEMORY.md`                                              | Bu dosya                               |
| `Ekip-360-Next-js/`                                      | Yeni Next.js projesi buraya kurulacak  |
| `ekip360-website-backup/httpdocs/`                       | ASP.NET MVC 5 kaynak kodu              |
| `ekip360-website-backup/httpdocs/Views/Home/`            | ~40 .cshtml view dosyası               |
| `ekip360-website-backup/httpdocs/css/`                   | Orijinal CSS dosyaları                 |
| `ekip360-website-backup/httpdocs/DATABASE/Ekip360db.sql` | SQL Server şeması                      |

---

## Sanity'e Taşınacak SQL Tabloları

`Blog` · `BlogCategory` · `References` · `FAQ` · `Services` · `WhoCanBenefit` · `VirtualTourAdvantage` · `Teams` · `HomePageTitle` · `Sliders`

---

## Dağıtım — cPanel / LiteSpeed (guzel.net.tr)

**Site 03.08.2026 itibarıyla yayında.** Hosting hesabı LiteSpeed `lsnode` üzerinden
Node.js uygulaması çalıştırıyor.

| Konu               | Değer                                                                         |
| ------------------ | ----------------------------------------------------------------------------- |
| Application root   | `/home/ekipnet/nextapp` — **`public_html` dışında**                           |
| Belge kökü         | `/home/ekipnet/public_html` — yalnızca cPanel'in yazdığı `.htaccess`          |
| Node sürümü        | 24.18.0 (yerelde de aynı)                                                     |
| Başlangıç dosyası  | `server.js` (kök dizin, CommonJS) — **asla** `app/` altındaki bir dosya değil |
| Application mode   | Production                                                                    |
| Ortam değişkenleri | `/home/ekipnet/nextapp/.env.local` (zorunlu) + cPanel env vars (yedek)        |
| Derleme            | **Yerelde** (Mac); `.next` tar ile sunucuya yüklenir                          |

### Kurulum sırasında öğrenilen üç şey

**1. Sunucuda `next build` çalışmıyor.** `Error: kill EPERM` ile düşüyor — `next build`
derleme için birden fazla alt süreç açıyor, paylaşımlı hesabın CloudLinux süreç limiti
bunları öldürüyor. `kill EPERM` ikincil hatadır, asıl istisna `build.log`'un başındadır.
Bu yüzden derleme Mac'te yapılıp `.next` çıktısı sunucuya yükleniyor. Yerel ve sunucu
Node sürümleri aynı olduğu için çıktı taşınabilir.

**2. cPanel'in Environment variables bölümü build'e yetmiyor.** Oradaki değişkenler
yalnızca uygulama çalışırken enjekte ediliyor; terminalden alınan build onları görmüyor.
`.env.local` dosyası bu yüzden zorunlu. `NEXT_PUBLIC_*` değişkenleri derleme anında koda
gömülür — eksikken build alınırsa site açılır ama Sanity içerikleri boş gelir ve dosyayı
sonradan eklemek yetmez, yeniden build gerekir.

**3. Uygulama kökü belge kökünün dışında olmalı.** Kaynak `public_html` içindeyken
`.env.local`, `package.json`, `lib/sanity.js` tarayıcıdan indirilebilir durumdaydı.
`/home/ekipnet/nextapp` altına taşındı.

**01.08.2026'da alınan hata ve nedeni (çözüldü):** Hosting, "Application startup file"
olarak `app/page.js`'i ayarlamıştı. O dosya bir Next.js sunucu bileşeni kaynağıdır —
Next derleyicisinden geçer, Node doğrudan çalıştıramaz. CJS olarak yüklenince ESM
`import` sözdizimi `SyntaxError: Unexpected token {` verdi. Kodda hata yoktu.

### Yayına alma döngüsü

Mac'te `npm run build` → `tar --exclude='./dev' --exclude='./cache'` ile paketle (~18 MB)
→ FileZilla ile `/home/ekipnet/nextapp/` altına yükle → terminalden `tar -xzf` ile aç
→ `BUILD_ID` karşılaştır → `touch tmp/restart.txt`.

`npm run dev` ve `npm run build` **yalnızca Mac'te** çalıştırılır. Sunucuda sadece
`npm ci` (o da `package.json` değişince) çalışır.

> ⚠️ **Dağıtım tuzağı (25.08.2026'da yaşandı):** `.next` paketi `public/` klasörünü
> taşımaz. `public/css`, `public/js`, `public/images` altında yapılan değişiklikler
> ayrıca yüklenmezse canlı site eski dosyaları servis etmeye devam eder — CLS
> düzeltmesi bu yüzden canlıya gitmemişti. Yeni prosedür: DEPLOYMENT.md adım 5.

> 🔍 **Doğrulama dersi (25.08.2026):** Deploy sonrası üç şeyi ayrı ayrı doğrula:
> (1) diskteki `BUILD_ID`, (2) sürecin gerçekten restart aldığı (`touch tmp/restart.txt`
> sessizce başarısız olabilir → cPanel RESTART düğmesi), (3) canlı HTML'in yeni olduğu.
> Sonuncusunda `grep -c` yetmez — satır sayar, tek satırlık minified HTML'de her şey
> "1" döner. `grep -o ... | wc -l` ile occurrence say ve URL'ye `?cb=$(date +%s)`
> ekleyerek önbelleği atla. Ayrıca `BUILD_ID` doğru olsa bile eski süreç eski içerik
> servis edebilir; kesin kanıt canlı içerik testidir.

Adım adım komutlar ve sorun giderme tablosu: `DEPLOYMENT.md`

### Doğrulama (03.08.2026)

16 rotanın tamamı `200`, olmayan sayfa `404`. Sanity içeriği geliyor: referanslar 130
görsel, blog 56 görsel. `/ekip360` sayfasında Sanity görseli yok — normal, o sayfa kodda
sabit tanımlı, fotoğraflar `public/images/ekip/` altından geliyor.

---

## Belgelerle Kod Arasındaki Farklar (doğrulanmış)

CLAUDE.md planlama sırasında yazıldı; uygulama bazı noktalarda ondan ayrıldı.
Geçerli olan koddur:

| Konu         | CLAUDE.md                 | Gerçek                     |
| ------------ | ------------------------- | -------------------------- |
| Next sürümü  | 14+                       | 16.2.10 (React 19.2.4)     |
| Studio route | `app/studio/[[...tool]]/` | `app/yonetim/[[...tool]]/` |
| Sanity token | `SANITY_API_TOKEN`        | `SANITY_WRITE_TOKEN`       |

### robots.txt artık proje yönetiminde (08.09.2026)

Öncesinde `robots.txt` **tamamen Cloudflare'in managed content bloğuydu**; repoda karşılığı yoktu.
Teşhis yöntemi (tekrarlanabilir): canlı yanıt `# BEGIN Cloudflare Managed content` içeriyordu ve
origin'in `x-nextjs-*` başlıklarını taşıyordu, ama var olmayan bir yol origin'den **404 text/html**
dönüyordu — yani origin `/robots.txt` için de 404 veriyor, gövdeyi CDN yazıyordu.

- Kaynak artık **`app/robots.txt`** (Next.js statik metadata dosyası). `public/robots.txt` *seçilmedi*:
  o dosya `.next` tarball'ına girmez ve DEPLOYMENT.md Adım 5'i (ayrı `public/` yüklemesi) gerektirir —
  `llms.txt` bu tuzağın canlı kanıtı (sunucudaki kopya 25.08.2026, repodaki 07.09.2026).
- `app/robots.js` de *seçilmedi*: object API `Content-Signal:` satırını üretemez.
- Politika: 7 ajan `Disallow` (GPTBot, ClaudeBot, CCBot, Bytespider, Amazonbot, Applebot-Extended,
  meta-externalagent), 5 ajan açıkça `Allow` (Google-Extended, OAI-SearchBot, ChatGPT-User,
  Claude-User, PerplexityBot), `Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference`.
- **Cloudflare'de iki ayar kapalı kalmalı:** AI Crawl Control → managed robots.txt enjeksiyonu
  (açılırsa CF kendi bloğunu dosyanın sonuna ekler ve `Google-Extended` kararını tersine çevirir) ve
  Security → Bots → "Block AI bots" (açık kalırsa Allow verilen ajanlar edge'de 403 yer).
- Dosyada her ajan adı **tam 1 kez** geçer; AIS-04'ün `grep -o … | wc -l` sayımı bu sayede tek anlamlı.

**Canlı doğrulama (08.09.2026, deploy + CF kapatma sonrası):** `Cloudflare Managed` = 0 · dosya
imzası (`app/robots.txt`) = 1 · 12 ajanın her biri = 1 · `Disallow` = 7 · `Allow` = 6 ·
`Google-Extended → Allow: /` · yanıt `x-nextjs-cache: HIT` (origin servis ediyor). Edge katmanı için
UA testi: PerplexityBot / OAI-SearchBot / ChatGPT-User / Claude-User / Googlebot → hepsi 200.
*Testin sınırı:* Cloudflare botu IP+UA ile doğrular; normal bir IP'den taklit edilen UA'nın 200
alması "genel bir UA bloğu yok" demektir, gerçek crawler IP aralıklarını kanıtlamaz — asıl kanıt
panelde "Block AI bots" anahtarının kapalı olmasıdır.

**Security → Settings → "Cloudflare managed ruleset" (Always active) karıştırılmamalı:** o, Free
planda kapatılamayan temel WAF setidir (exploit / DDoS / kötücül bot imzaları / API abuse) ve AI
crawler politikasıyla ilgisi yoktur. AI tarafını yöneten anahtar Security → Bots altındadır.

**Düzeltme:** 08.09 ölçümünde `https://www.ekip360.net/` 520 dönüyordu ve CF enjeksiyonu kapanınca
www/robots.txt'in de 520 olacağı tahmin edilmişti. Gerçekleşmedi: www artık apex'e **308** veriyor
(`www/robots.txt` → apex 200, www kökü → apex 200). Önceki 520 geçiciydi.

---

## Git Durumu (01.08.2026)

- `fix/cpanel-node-deployment` dalı `origin`'e push edildi (commit `724f6eb`).
- `main` yerelde bu commit'e fast-forward edildi ama **push edilemedi** —
  GitHub kimlik doğrulaması (keychain'de kayıtlı parola) reddediliyor.
  Kimlik bilgisi yenilendikten sonra `git push origin main` çalıştırılmalı.

### Push koruması (01.09.2026)

- `docs/playbook-migration-framework` yerel bir çalışma dalıdır (commit `a28354e`).
  Copilot tarafından yanlışlıkla push denenmek istendi; işlem **tamamlanmadı** —
  GitHub API doğrulamasında bu dal remote'ta yok, açık/kapalı PR da yok.
  Engel `AGENTS.md` (`Push Politikası ve Korunan Branch'ler`) + `.git/hooks/pre-push`
  ile iki katmana alındı. Bu dal inceleme sonrası kalıcı bir isimle yeniden
  adlandırılarak paylaşılabilir; o zaman kara liste güncellenmelidir.

---

## Referanslar

- Canlı site: https://ekip360.net
- Eski BackOffice: https://ekip360.net/BackOffice/Login/Index
- Git deposu: https://github.com/Uglyot/Ekip360
- Hosting desteği: guzel.net.tr
- [Masaüstü dosyalarına erişim](masaustu-dosyalarina-erisim.md) — `ls ~/Desktop` EPERM verir; adları osascript/Finder ile al
