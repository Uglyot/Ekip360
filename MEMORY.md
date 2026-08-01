# MEMORY.md — ekip360 Migration Projesi

## Proje Bağlamı
ekip360.net (Google Street View sanal tur hizmeti veren kurumsal site) ASP.NET MVC 5'ten Next.js App Router'a taşınıyor.

> Başlangıçta ASP.NET Core sanılıyordu. Kaynak kod incelemesinde **ASP.NET MVC 5** olduğu doğrulandı.

---

## Teknik Kararlar
| Konu | Karar |
|---|---|
| Dil | JavaScript (TypeScript yok) |
| Router | Next.js App Router |
| CMS | Sanity |
| E-posta | Resend |
| CSS | Orijinal dosyalar olduğu gibi taşınacak |
| Carousel | CarouFredSel → embla-carousel-react veya swiper |
| Lightbox | FancyBox → yet-another-react-lightbox |
| Veritabanı | Yok (SQL Server → Sanity'e taşınacak) |
| Public auth | Yok (sadece Sanity Studio) |
| EN sayfaları | TR tamamlanmadan bekleyecek |

---

## Klasör Yapısı

**Çalışma alanı kökü:** `/Users/tolgabalikci/Claude_Code_Workspace/Projects/COWORK-OS/`

> Proje `~/Documents/Projects/COWORK-OS/` altından buraya taşındı (01.08.2026).
> Eski yol artık diskte yok — belgelerdeki referanslar güncellendi.

| Klasör / Dosya | Açıklama |
|---|---|
| `CLAUDE.md` | Proje talimatları ve detaylı belgeleme |
| `MEMORY.md` | Bu dosya |
| `Ekip-360-Next-js/` | Yeni Next.js projesi buraya kurulacak |
| `ekip360-website-backup/httpdocs/` | ASP.NET MVC 5 kaynak kodu |
| `ekip360-website-backup/httpdocs/Views/Home/` | ~40 .cshtml view dosyası |
| `ekip360-website-backup/httpdocs/css/` | Orijinal CSS dosyaları |
| `ekip360-website-backup/httpdocs/DATABASE/Ekip360db.sql` | SQL Server şeması |

---

## Sanity'e Taşınacak SQL Tabloları
`Blog` · `BlogCategory` · `References` · `FAQ` · `Services` · `WhoCanBenefit` · `VirtualTourAdvantage` · `Teams` · `HomePageTitle` · `Sliders`

---

## Dağıtım — cPanel / LiteSpeed (guzel.net.tr)

Hosting hesabı LiteSpeed `lsnode` üzerinden Node.js uygulaması çalıştırıyor.
Sunucu yolu: `/home/ekipnet/public_html/`

**01.08.2026'da alınan hata ve nedeni:** Hosting, "Application startup file" olarak
`app/page.js`'i ayarlamıştı. O dosya bir Next.js sunucu bileşeni kaynağıdır —
Next derleyicisinden geçer, Node doğrudan çalıştıramaz. CJS olarak yüklenince
ESM `import` sözdizimi `SyntaxError: Unexpected token {` verdi. Kodda hata yoktu.

| Konu | Gereken |
|---|---|
| Başlangıç dosyası | `server.js` (kök dizin, CommonJS) — **asla** `app/` altındaki bir dosya değil |
| Node sürümü | >= 20.9 (Next 16 şartı; hostta Node < 16 çalışıyordu) |
| Application root | `public_html` |
| Application mode | Production |
| Ortam değişkenleri | cPanel > Setup Node.js App ekranından girilir (`.env*` git'te yoksayılı) |
| Derleme | Sunucuda `npm ci && npm run build`; `.next/` repoda yok |

> `NEXT_PUBLIC_*` değişkenleri derleme anında koda gömülür — `npm run build`'den
> **önce** tanımlı olmalılar, yoksa site açılır ama Sanity içerikleri boş gelir.

Ayrıntı: `DEPLOYMENT.md`

---

## Belgelerle Kod Arasındaki Farklar (doğrulanmış)

CLAUDE.md planlama sırasında yazıldı; uygulama bazı noktalarda ondan ayrıldı.
Geçerli olan koddur:

| Konu | CLAUDE.md | Gerçek |
|---|---|---|
| Next sürümü | 14+ | 16.2.10 (React 19.2.4) |
| Studio route | `app/studio/[[...tool]]/` | `app/yonetim/[[...tool]]/` |
| Sanity token | `SANITY_API_TOKEN` | `SANITY_WRITE_TOKEN` |

---

## Git Durumu (01.08.2026)

- `fix/cpanel-node-deployment` dalı `origin`'e push edildi (commit `724f6eb`).
- `main` yerelde bu commit'e fast-forward edildi ama **push edilemedi** —
  GitHub kimlik doğrulaması (keychain'de kayıtlı parola) reddediliyor.
  Kimlik bilgisi yenilendikten sonra `git push origin main` çalıştırılmalı.

---

## Referanslar
- Canlı site: https://ekip360.net
- Eski BackOffice: https://ekip360.net/BackOffice/Login/Index
- Git deposu: https://github.com/Uglyot/Ekip360
- Hosting desteği: guzel.net.tr
