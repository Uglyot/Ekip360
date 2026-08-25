<!-- BEGIN:nextjs-agent-rules -->

# Next.js Proje Kuralları

Bu projedeki Next.js sürümü eğitim verilerindeki sürümlerden farklı davranabilir. API, convention ve dosya yapısı için kod yazmadan önce `node_modules/next/dist/docs/` altındaki ilgili kılavuzu okuyun; deprecation uyarılarını dikkate alın.
<!-- END:nextjs-agent-rules -->

# Ekip360 Agent Politikası

Bu depo, geçişi tamamlanmış Ekip360 Next.js uygulamasının geliştirme ve işletme kaynağıdır. Agent çalışırken aşağıdaki yetki ve sınırları izlemelidir.

## İzin Verilen Eylemler

- İstenen davranışla doğrudan ilgili tek dosya veya sınırlı kapsamlı dosya grubunda cerrahi değişiklikler yapmak.
- Mevcut Next.js route, component, Sanity şeması, GROQ sorgusu, API route ve CSS kurallarını küçük ölçekte güncellemek.
- Gerekli dokümantasyonu, özellikle `CONTRIBUTING.md`, `DEPLOYMENT.md` ve proje belleğini güncellemek.
- Değişiklikleri yerelde lint, test veya build ile doğrulamak; uygun olduğunda tarayıcı ve responsive kontrolleri yapmak.
- Kullanıcı açıkça istediğinde branch, commit veya PR hazırlamak; aksi halde commit ve deploy yapmamak.

## Sınırlar ve İnsan Onayı

- Gizli anahtarları, parolaları, token'ları veya kişisel verileri okumaya, yazmaya, loglamaya ya da uzak sisteme göndermeye çalışma.
- `.env.local`, cPanel ortam değişkenleri, canlı Sanity verisi, sunucu yapılandırması veya deployment üzerinde riskli değişiklik yapmadan önce insan onayı al.
- Geniş kapsamlı refaktör, framework/CSS sistemi değişikliği, yeni harici servis veya birden fazla bağımsız alanı etkileyen değişiklikleri kapsam dışı bırak ya da açık onay iste.
- Veritabanı bağlantısı veya public authentication ekleme; runtime içerik kaynağı Sanity'dir.
- Canlı üretim ortamında doğrudan değişiklik yapma. Yayınlama adımları için `DEPLOYMENT.md` izlenmeli ve insan tarafından onaylanmalıdır.
- Sorun istenen değişiklikle ilgili değilse mevcut kullanıcı değişikliklerini geri alma veya üzerine yazma.

## Çalışma ve Doğrulama

1. `CLAUDE.md`, `MEMORY.md`, `CONTRIBUTING.md` ve ilgili kodu oku.
2. En küçük değişikliği yap; ilgisiz biçimlendirme veya refaktörden kaçın.
3. Kullanıcı girdilerini server tarafında doğrula ve hassas verileri hata mesajlarına/loglara koyma.
4. Önce en dar kapsamlı kontrolü, sonra uygunsa `npm run build` komutunu çalıştır.
5. Görsel veya responsive değişikliklerde Console, Network, masaüstü ve mobil görünümleri kontrol et.
6. Doğrulanamayan harici servis, eksik ortam değişkeni veya yapılamayan canlı kontrolü açıkça raporla.

## Dağıtım Gerçekleri

- Build yerel Mac'te alınır; cPanel/LiteSpeed sunucusunda `next build` çalıştırılmaz.
- Uygulama kökü `/home/ekipnet/nextapp` ve başlangıç dosyası kökteki `server.js` dosyasıdır.
- `app/page.js` başlangıç dosyası değildir.
- Sanity yazma anahtarı `SANITY_WRITE_TOKEN` ortam değişkenidir.
