# CLAUDE.md — ekip360.net Next.js Migration

## Proje Özeti
ekip360.net adresindeki **ASP.NET MVC 5** kurumsal web sitesinin **Next.js App Router**'a taşınması.
**Hedef:** Orijinal siteyle görsel ve işlevsel olarak birebir aynı olmak. Tasarım kararı yok — referans site kaynak kod ve canlı sitedir.

- Canlı site: https://ekip360.net
- Kaynak kod: `/Users/tolgabalikci/Claude_Code_Workspace/Projects/COWORK-OS/ekip360-website-backup/`
- Eski BackOffice: https://ekip360.net/BackOffice/Login/Index → **Sanity Studio** ile ikame edilecek
- Yeni proje klasörü: `/Users/tolgabalikci/Claude_Code_Workspace/Projects/COWORK-OS/Ekip-360-Next-js/`

---

## Kaynak Kodun Gerçek Yapısı
> Not: Başlangıçta ASP.NET Core sanılıyordu. Kaynak kod incelemesinde **ASP.NET MVC 5** olduğu doğrulandı.

- **Framework:** ASP.NET MVC 5 (`System.Web.Mvc.dll`, `Global.asax`, Entity Framework 6)
- **Veritabanı:** SQL Server (`httpdocs/DATABASE/Ekip360db.sql`)
- **CSS:** Tamamen özel (Bootstrap yok) — `Ekip360_style.css` (64KB) + `Ekip360_responsive.css` (17KB)
- **JavaScript:** jQuery 1.8.2, CarouFredSel (carousel), FancyBox (lightbox), özel `ekip360_app.js`
- **View dosyaları:** `httpdocs/Views/Home/` — ~40 `.cshtml` dosyası, toplamda ~5100 satır
- **Dil desteği:** Hem Türkçe hem İngilizce view'lar mevcut (EN versiyonu ikincil öncelik)

---

## Veritabanı Tabloları (SQL Server)
### Sanity'e taşınacaklar
| SQL Tablosu | Sanity Document Type |
|---|---|
| `Blog` | `blogPost` |
| `BlogCategory` | `blogCategory` |
| `References` | `reference` |
| `FAQ` | `faq` |
| `Services` | `service` |
| `WhoCanBenefit` | `whoCanBenefit` |
| `VirtualTourAdvantage` | `virtualTourAdvantage` |
| `Teams` | `teamMember` |
| `HomePageTitle` | `homePageTitle` (singleton) |
| `Sliders` | `slider` |

### Taşınmayacaklar (eski site artıfaktları)
`Event`, `News`, `Bulletins`, `Campuses`, `Popup`, `Menus`, `Pages`, `PageTypes`, `PhotoGalleries`, `VideoGalleries`

### References tablosu şeması (SQL'den)
```
PKReferenceId, CategoryName, Name, Sector, Services,
Thumbnail, Url, TelephoneNumber, Address, CategoryId
```

---

## Teknik Yığın (Next.js)
| Katman | Seçim |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Dil | JavaScript (TypeScript kesinlikle yok) |
| CMS | Sanity |
| CSS | Orijinal CSS dosyaları olduğu gibi `public/css/`'e taşınacak |
| Slider/Carousel | CarouFredSel yerine `embla-carousel-react` veya `swiper` |
| Lightbox | FancyBox yerine `yet-another-react-lightbox` |
| İletişim Formu | Resend |
| Deployment | TBD |

---

## Sayfa Haritası

### Statik Sayfalar
| Kaynak `.cshtml` | Orijinal URL | Next.js Route |
|---|---|---|
| `Index.cshtml` | `/` | `app/page.js` |
| `Hakkimizda.cshtml` | `/Hakkimizda` | `app/hakkimizda/page.js` |
| `Ekibimiz.cshtml` | `/Ekip360` | `app/ekip360/page.js` |
| `SikcaSorulanSorular.cshtml` | `/Sikca-Sorulan-Sorular` | `app/sss/page.js` |
| `SanalTurAvantajlari.cshtml` | `/Google-Sanal-Tur-Avantajlari-Nelerdir` | `app/google-sanal-tur-avantajlari/page.js` |
| `HizmetlereNelerDahildir.cshtml` | `/Hizmetlere-Neler-Dahildir` | `app/hizmetlere-neler-dahildir/page.js` |
| `NasilBaslamaliyim.cshtml` | `/Nasil-Baslamaliyim` | `app/nasil-baslamaliyim/page.js` |
| `Fiyatlandirma.cshtml` | `/Fiyatlandirma-Nasil-Yapilir` | `app/fiyatlandirma/page.js` |
| `Hizmetler.cshtml` | `/Hizmetlerimiz` | `app/hizmetlerimiz/page.js` |
| `KimlerYararlanabilir.cshtml` | `/Kimler-Yararlanabilir` | `app/kimler-yararlanabilir/page.js` |
| `WebSitesineEkle.cshtml` | `/360-Sanal-Turunuzu-Web-Sitenize-Ekleyin` | `app/web-sitenize-ekleyin/page.js` |
| `FacebookaEkle.cshtml` | `/360-Sanal-Turunuzu-Facebooka-Ekleyin` | `app/facebooka-ekleyin/page.js` |
| `Ekip360Iletisim.cshtml` | `/Iletisim` | `app/iletisim/page.js` |
| `ErrorPage404.cshtml` | — | `app/not-found.js` |

### Dinamik Sayfalar (Sanity'den beslenir)
| Kaynak `.cshtml` | Next.js Route |
|---|---|
| `Blog.cshtml` | `app/blog/page.js` |
| `BlogDetail.cshtml` | `app/blog/[slug]/page.js` |
| `Referanslar.cshtml` | `app/referanslar/page.js` |
| `ReferansDetay.cshtml` | `app/referanslar/[id]/page.js` |

### Referans Kategorileri (hash tabanlı filtreleme)
Orijinal site hash fragment kullanıyor (`/Referanslar#/Hotels`).
Next.js'te client-side state ile aynı davranış korunacak.

`All` / `Hotels` / `Automotive` / `CafeBakeries` / `RestaurantBar` / `Gyms` / `Hospitals` / `PersonalCare` / `Showrooms` / `ArtGalleries` / `SmallBusiness` / `Other`

### Admin
| Route | Açıklama |
|---|---|
| `app/studio/[[...tool]]/page.js` | Sanity Studio (admin paneli) |

### İngilizce (Düşük öncelik)
`EN.cshtml` ve diğer `*EN.cshtml` dosyaları mevcut. TR sürüm tamamlanmadan EN'e geçilmeyecek.

---

## Klasör Yapısı

```
Ekip-360-Next-js/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── not-found.js
│   ├── hakkimizda/page.js
│   ├── ekip360/page.js
│   ├── sss/page.js
│   ├── google-sanal-tur-avantajlari/page.js
│   ├── hizmetlere-neler-dahildir/page.js
│   ├── nasil-baslamaliyim/page.js
│   ├── fiyatlandirma/page.js
│   ├── hizmetlerimiz/page.js
│   ├── kimler-yararlanabilir/page.js
│   ├── web-sitenize-ekleyin/page.js
│   ├── facebooka-ekleyin/page.js
│   ├── iletisim/page.js
│   ├── blog/
│   │   ├── page.js
│   │   └── [slug]/page.js
│   ├── referanslar/
│   │   ├── page.js
│   │   └── [id]/page.js
│   ├── studio/[[...tool]]/page.js
│   └── api/contact/route.js
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── MainSlider.js
│   ├── ReferenceFilter.js       # Client component, hash filtreleme
│   └── ...
├── lib/
│   └── sanity.js                # Sanity client + GROQ sorguları
├── sanity/
│   └── schemaTypes/
│       ├── blogPost.js
│       ├── blogCategory.js
│       ├── reference.js
│       ├── faq.js
│       ├── service.js
│       ├── whoCanBenefit.js
│       ├── virtualTourAdvantage.js
│       ├── teamMember.js
│       ├── homePageTitle.js
│       └── slider.js
├── public/
│   ├── css/                     # Orijinal CSS dosyaları buraya taşınır
│   ├── images/
│   └── favicon.ico
├── sanity.config.js
├── next.config.js
└── .env.local
```

---

## Göç Yaklaşımı (ASP.NET MVC 5 → Next.js)

1. **Next.js projesi kur** — `Ekip-360-Next-js/` klasörüne `create-next-app` ile (JS, App Router, Tailwind yok)
2. **CSS taşı** — `httpdocs/css/` klasöründeki `Ekip360_style.css` ve `Ekip360_responsive.css` dosyalarını `public/css/`'e kopyala; `app/layout.js`'te `<link>` ile dahil et
3. **Layout** — `httpdocs/Views/_LayoutPage.cshtml`'i referans alarak header ve footer'ı Next.js'e çevir; menü yapısı hardcode edilecek (DB'den çekilmeyecek)
4. **Sanity kur** — `sanity init` ile projeye ekle, şemaları yukarıdaki tabloya göre oluştur
5. **Statik sayfalar** — `httpdocs/Views/Home/` altındaki her `.cshtml` dosyasını Razor syntax'ından temizleyerek Next.js page'e dönüştür (önce TR versiyonlar)
6. **Dinamik sayfalar** — Blog listesi, blog detay, referanslar ve referans detay sayfalarını GROQ sorguları ile Sanity'den besle
7. **İçerik taşıma** — Mevcut SQL verilerini Sanity'ye aktar (gerekirse migration script yazılacak)
8. **İletişim formu** — `api/contact/route.js` + Resend ile e-posta gönderimi
9. **Test** — Her sayfayı canlı site (https://ekip360.net) ile görsel olarak karşılaştır

---

## Kesin Kurallar

- **TypeScript kullanma.** Her şey `.js` uzantılı.
- **Tasarımı değiştirme.** Orijinal CSS ve HTML yapısı baz alınacak.
- **Gereksiz paket ekleme.** Sadece şart olan bağımlılıklar.
- **Soyutlama yapma.** Tek kullanımlık şeyler için helper üretme.
- **EN sayfaları şimdilik atlama.** TR tamamlanmadan EN'e geçme.
- **Orijinal sitede olmayan özellik ekleme.**

---

## Ortam Değişkenleri (`.env.local`)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=
```
