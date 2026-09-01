# Katkı Rehberi

Bu belge, Ekip360 Next.js uygulamasına katkı yapan geliştiriciler ve otomasyon/agent araçları için çalışma kurallarını açıklar. Uygulama geçiş aşamasını tamamlamıştır; yeni geliştirmeler mevcut Next.js kod tabanı üzerinden yapılır.

## Proje Özeti

Ekip360, Google Street View sanal tur hizmeti sunan ve ASP.NET MVC 5'ten Next.js App Router'a geçirilmiş bir kurumsal web sitesidir.

- Framework: Next.js 16.2.10, App Router ve React 19
- Dil: JavaScript; TypeScript kullanılmaz
- İçerik yönetimi: Sanity
- Stil: `public/css/` altındaki özgün CSS dosyaları
- E-posta: Resend üzerinden `app/api/contact/route.js`
- Yönetim paneli: `app/yonetim/[[...tool]]/` altındaki Sanity Studio
- Canlı site: https://ekip360.net

## Başlamadan Önce

1. `CLAUDE.md`, `MEMORY.md` ve `AGENTS.md` dosyalarını okuyun.
2. İlgili route, component, Sanity şeması/sorgusu ve CSS dosyasını inceleyin.
3. Değişiklik kapsamını netleştirin; geçişi yeniden yapmaya veya ilgisiz alanları refaktör etmeye çalışmayın.
4. Ortam değişkenlerini `.env.local` içinde tanımlayın. Gizli değerleri commit etmeyin.

Gerekli temel değişkenler:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=
```

## Geliştirme Akışı

Yerel Node sürümü deployment ortamıyla uyumlu olmalıdır. Geliştirme sunucusunu başlatmak için:

```bash
npm ci
npm run dev
```

Değişiklikleri mümkün olduğunca küçük ve tek bir kullanıcı akışına odaklı tutun. Mevcut route'ları, legacy URL'leri, hash tabanlı referans filtrelerini, özgün HTML yapısını ve responsive davranışı bozmayın.

Sanity değişikliklerinde şema, GROQ sorgusu, boş içerik durumu ve Studio kullanımını birlikte kontrol edin. Eksik içerik sayfanın çökmesine neden olmamalıdır.

## Doğrulama Listesi

Değişiklikten sonra uygun olan kontrolleri çalıştırın:

```bash
npm run build
```

Tarayıcıda ayrıca şunları kontrol edin:

- Etkilenen route masaüstü ve mobil görünümlerde doğru açılıyor mu?
- Browser Console'da yeni hata var mı?
- Network çağrıları beklenen URL'lere gidiyor ve başarılı HTTP durumu dönüyor mu?
- Sanity görselleri ve içerikleri eksik veri durumunda güvenli davranıyor mu?
- Form varsa başarı, doğrulama ve hata akışları çalışıyor mu?
- Navigasyon, metin, görsel ve kontroller üst üste binmiyor mu?

Otomatik test bulunmayan değişikliklerde manuel doğrulama adımlarını PR açıklamasına yazın. Görsel bir değişiklikte mümkünse ilgili canlı route'u https://ekip360.net ile karşılaştırın.

## Güvenlik ve Gizlilik

- API anahtarlarını, token'ları, parolaları ve kişisel verileri kaynak koda, loglara veya commit'lere koymayın.
- Kullanıcı girdilerini server route'larında doğrulayın; HTML çıktısını güvenli biçimde üretin.
- Hassas form verilerini test çıktılarında veya PR açıklamalarında paylaşmayın.
- Sanity yazma işlemlerinde `SANITY_WRITE_TOKEN` kullanın ve token kapsamını mümkün olduğunca sınırlı tutun.
- Üretim ayarlarını veya canlı veriyi değiştiren işlemlerden önce insan onayı alın.

## Commit ve Pull Request

- Her iş için anlamlı bir branch kullanın. Öneri: `feature/kisa-aciklama`, `fix/kisa-aciklama` veya `chore/kisa-aciklama`.
- `AGENTS.md`'deki korunan branch listesi (örn. `docs/playbook-migration-framework`) origin'e push edilmez; bu yasak ayrıca `.git/hooks/pre-push` ile mekanik olarak uygulanır. Kapsam dışı kalır: korunan dalları remote'a iletmek, adını değiştirmeden yeniden adlandırmak veya kuralı tek taraflı (yalnızca AGENTS.md veya yalnızca hook) güncellemek.
- Commit mesajı kısa ve açıklayıcı olsun. Örnek: `Fix: iletişim formu doğrulamasını düzelt`.
- Bir commit mümkünse tek bir mantıksal değişikliği içersin.
- PR açıklamasında neyin değiştiğini, neden değiştiğini, nasıl doğrulandığını ve bilinen riskleri belirtin.
- Görsel değişikliklerde masaüstü/mobil ekran görüntüsü veya karşılaştırma notu ekleyin.
- Agent tarafından yapılan değişiklikler insan incelemesi olmadan üretime alınmamalıdır.

## Yayınlama

Üretim yayınlama adımları ve cPanel/LiteSpeed ayarları için [`DEPLOYMENT.md`](DEPLOYMENT.md) dosyasını izleyin.

Önemli kısıtlar:

- `npm run build` yerel Mac ortamında çalıştırılır; sunucuda `next build` çalıştırılmaz.
- cPanel Application root `/home/ekipnet/nextapp`, belge kökü `/home/ekipnet/public_html` dışındadır.
- Başlangıç dosyası kökteki `server.js` dosyasıdır; `app/page.js` başlangıç dosyası değildir.
- `NEXT_PUBLIC_*` değerleri build sırasında koda gömüldüğü için değişkenler eksikken build almayın.
- Canlı deployment sonrası ana sayfa, etkilenen route, Sanity içeriği ve HTTP durumları kontrol edilmelidir.

## Kapsam Dışı

- ASP.NET MVC uygulamasını yeniden migrate etmek
- Çalışma zamanında SQL Server bağlantısı eklemek
- Gereksiz bir framework, CSS sistemi veya üçüncü taraf paket eklemek
- Özgün sitede bulunmayan özellikleri talep yokken eklemek
- İlgisiz dosyaları biçimlendirmek veya geniş kapsamlı refaktör yapmak
