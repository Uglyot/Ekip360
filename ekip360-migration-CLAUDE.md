# CLAUDE.md — ekip360.net Next.js Migration

## Proje Özeti
ekip360.net adresindeki ASP.NET Core kurumsal web sitesinin Next.js'e taşınması.
**Hedef:** Orijinal siteyle görsel ve işlevsel olarak birebir aynı olmak. Tasarım kararı yok — referans site kaynak koddur ve canlı sitedir.

- Canlı site: https://ekip360.net
- Orijinal kaynak kod mevcut (ASP.NET Core)
- Eski BackOffice: https://ekip360.net/BackOffice/Login/Index (Sanity Studio ile ikame edilecek)

---

## Teknik Yığın
| Katman | Seçim |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Dil | JavaScript (TypeScript yok) |
| CMS | Sanity (blog yazıları ve referanslar için) |
| Stil | Orijinal sitenin CSS yapısına bağlı kal |
| İletişim Formu | Resend (e-posta gönderimi için) |
| Deployment | TBD |

---

## Sayfa Haritası
Orijinal siteden çekilen tüm sayfalardır. Next.js route yapısı bunlara göre kurulacak.

### Statik Sayfalar
| Orijinal URL | Next.js Route | Açıklama |
|---|---|---|
| `/` | `app/page.js` | Ana sayfa |
| `/Hakkimizda` | `app/hakkimizda/page.js` | Hakkımızda |
| `/Ekip360` | `app/ekip360/page.js` | Ekip 360 tanıtım sayfası |
| `/Sikca-Sorulan-Sorular` | `app/sss/page.js` | SSS |
| `/Google-Sanal-Tur-Avantajlari-Nelerdir` | `app/google-sanal-tur-avantajlari/page.js` | Google Sanal Tur Avantajları |
| `/Hizmetlere-Neler-Dahildir` | `app/hizmetlere-neler-dahildir/page.js` | Hizmet kapsamı |
| `/Nasil-Baslamaliyim` | `app/nasil-baslamaliyim/page.js` | Başlangıç rehberi |
| `/Fiyatlandirma-Nasil-Yapilir` | `app/fiyatlandirma/page.js` | Fiyatlandırma |
| `/Hizmetlerimiz` | `app/hizmetlerimiz/page.js` | Hizmetlerimiz |
| `/Kimler-Yararlanabilir` | `app/kimler-yararlanabilir/page.js` | Hedef kitle |
| `/360-Sanal-Turunuzu-Web-Sitenize-Ekleyin` | `app/web-sitenize-ekleyin/page.js` | Web sitesine ekleme rehberi |
| `/360-Sanal-Turunuzu-Facebooka-Ekleyin` | `app/facebooka-ekleyin/page.js` | Facebook'a ekleme rehberi |
| `/Iletisim` | `app/iletisim/page.js` | İletişim |

### Dinamik Sayfalar (Sanity'den beslenir)
| Orijinal URL | Next.js Route | Açıklama |
|---|---|---|
| `/Blog` | `app/blog/page.js` | Blog listesi |
| `/Blog/[slug]` | `app/blog/[slug]/page.js` | Tekil blog yazısı |
| `/Referanslar` | `app/referanslar/page.js` | Referanslar (filtreli) |

### Referans Kategorileri (hash tabanlı filtreleme)
Orijinal site hash fragment kullanıyor (`/Referanslar#/Hotels` gibi).
Next.js'te client-side state ile kategoriye göre filtreleme yapılacak, URL yapısı korunacak.

| Kategori | Hash |
|---|---|
| Tüm Kategoriler | `#/All` |
| Oteller | `#/Hotels` |
| Otomotiv | `#/Automotive` |
| Kafe-Pastaneler | `#/CafeBakeries` |
| Restoran-Bar | `#/RestaurantBar` |
| Spor Salonları | `#/Gyms` |
| Hastaneler | `#/Hospitals` |
| Kişisel Bakım | `#/PersonalCare` |
| Showroomlar | `#/Showrooms` |
| Sanat Galerileri | `#/ArtGalleries` |
| Küçük İşletmeler | `#/SmallBusiness` |
| Diğer | `#/Other` |

### Diğer
| URL | Açıklama |
|---|---|
| `/Home` | İngilizce ana sayfa (opsiyonel, öncelik düşük) |
| `/studio` | Sanity Studio (admin paneli) |

---

## Klasör Yapısı

```
ekip360/
├── app/
│   ├── layout.js
│   ├── page.js
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
│   ├── referanslar/page.js
│   ├── studio/
│   │   └── [[...tool]]/page.js
│   └── api/
│       └── contact/route.js
├── components/
├── lib/
│   └── sanity.js
├── sanity/
│   ├── schemaTypes/
│   │   ├── blogPost.js
│   │   └── reference.js
│   └── schema.js
├── public/
├── sanity.config.js
└── next.config.js
```

---

## Sanity İçerik Şemaları

### Blog Yazısı (`blogPost`)
```js
title        // string — zorunlu
slug         // slug — zorunlu
publishedAt  // datetime — zorunlu
excerpt      // text — kısa özet
body         // block content — zengin metin
coverImage   // image — opsiyonel
```

### Referans (`reference`)
```js
companyName  // string — zorunlu
logo         // image — zorunlu
category     // string (Hotels, Automotive, CafeBakeries, RestaurantBar, Gyms,
             //         Hospitals, PersonalCare, Showrooms, ArtGalleries,
             //         SmallBusiness, Other) — zorunlu
order        // number — sıralama
url          // url — opsiyonel (sanal tur linki)
description  // text — opsiyonel
```

---

## Göç (Migration) Yaklaşımı

1. **Kaynak kodu analizi:** ASP.NET Core `.cshtml` view dosyalarından sayfa yapısını ve içerik modelini çıkar.
2. **Sanity kurulumu:** Schema'ları oluştur, mevcut içerikleri (blog yazıları, referanslar) aktar.
3. **Layout:** Header ve footer'ı orijinalden birebir çevir (`app/layout.js`).
4. **Statik sayfalar:** Her sayfayı orijinal tasarıma sadık kalarak yaz.
5. **Dinamik sayfalar:** Blog ve referanslar sayfalarını Sanity'den besle.
6. **İletişim formu:** Resend ile e-posta gönderimini bağla.
7. **Test:** Her sayfayı canlı siteyle görsel olarak karşılaştır.

---

## Kesin Kurallar

- **TypeScript kullanma.** Her şey `.js` dosyalarında olacak.
- **Tasarımı değiştirme.** Orijinal siteyle görsel fark olmaması birincil önceliktir.
- **Gereksiz paket ekleme.** Sadece işin gerektirdiği bağımlılıkları kur.
- **Soyutlama yapma.** Tek kullanımlık işlemler için helper/utility üretme.
- **Yorum satırı ekleme.** Sadece mantık açık değilse ekle.
- **Orijinal sitede olmayan özellik ekleme.**

---

## Ortam Değişkenleri (`.env.local`)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=          # Formdan gelen e-postaların gideceği adres
```
