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

## Push Politikası ve Korunan Branch'ler

Aşağıdaki branch'ler **origin'e asla push edilmez**; içerikleri yalnızca yerel geliştirme ve inceleme içindir:

- `docs/playbook-migration-framework` — Migration playbook çerçeve çalışması (01.09.2026'da Copilot tarafından yanlışlıkla push denendi; işlem yarım kaldı ve bu kurala bağlandı).

Koruma iki katmanlıdır: bu kural dokümantasyon katmanıdır, `git` seviyesindeki mekanik engel ise `.githooks/pre-push` hook'udur (KURAL 1). Kural ile hook birlikte güncellenmelidir; listeye branch eklerken/çıkarırken ikisi senkron tutulur.

Bu dallardaki çalışmanın paylaşılması gerektiğinde içerik, `CONTRIBUTING.md`'deki adlandırma kuralına uyan yeni bir branch'e taşınır ve korunan dalın adı listelerden çıkarılır.

## Oturum linki koruması (Claude-Session)

Bu depo **public**. Claude Code'un commit mesajlarına ve PR açıklamalarına otomatik eklediği `Claude-Session: https://claude.ai/code/session_...` satırı, o commit'le ilgisiz her şeye — başka projelerin stratejik detaylarına, iç tartışmalara — işaret eden bir oturum kaydına bağlanır. 08–10.09.2026 arasında bu satır **üç kez** public depoya girdi ve üçünde de geçmiş yeniden yazılarak (`cherry-pick` + `--force-with-lease`) temizlendi. Koruma bu yüzden iki kancaya bölünmüştür:

- **`.githooks/commit-msg`** — satırı commit oluşurken **siler** (reddetmez; reddetmek yazılmış mesajı kaybettirir) ve ne yaptığını bildirir.
- **`.githooks/pre-push`** KURAL 2 — push edilecek her commit'in mesajını tarar, satırı taşıyan varsa push'u **reddeder**.

**İkisi birden gereklidir, biri yetmez:** `commit-msg` `git commit --no-verify` ile atlanabilir ve `cherry-pick`/`rebase` yeniden kullanılan mesajlarda hiç çağrılmaz. `pre-push` bu iki boşluğu kapatır ve içeriğin public'e çıkmadan önceki son kapısıdır. Buna karşılık `pre-push` tek başına yetersizdir: satırın geçmişe yazılmasını engellemez, yalnızca yayımını durdurur — temizlik yine geçmiş yeniden yazmayı gerektirir.

**Kancalar `.githooks/` altında versiyonlanır**, `.git/hooks/` altında değil; böylece klonla birlikte gelirler ve incelemeye tabidirler. Etkinleşmeleri `core.hooksPath` ayarına bağlıdır ve **bu ayar versiyonlanmaz**: yeni bir klonda `npm install` çalıştırmak yeterlidir (`package.json` > `prepare` betiği ayarı kurar), çalıştırılmıyorsa elle

```sh
git config core.hooksPath .githooks
```

Ayar kurulmadıkça kancalar dosya olarak mevcut ama **etkisizdir**; klon sonrası ilk kontrol budur.

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
