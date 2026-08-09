# Kurulum — cPanel / LiteSpeed (guzel.net.tr)

Canlı: https://ekip360.net — 2026-08-03 itibarıyla yayında.

## Sunucudaki yerleşim

| Yol | İçerik |
|---|---|
| `/home/ekipnet/nextapp/` | Uygulamanın tamamı: `app/`, `components/`, `lib/`, `sanity/`, `scripts/`, `public/`, `server.js`, `package.json`, `.env.local`, `.next/`, `node_modules/` |
| `/home/ekipnet/public_html/` | Yalnızca `.htaccess` (cPanel yönetir), `php.ini`, `.user.ini` |
| `/home/ekipnet/nodevenv/nextapp/24/` | cPanel'in oluşturduğu Node sanal ortamı |

Uygulama kökü **bilerek `public_html` dışında**. Aksi halde `.env.local`, `package.json`, `lib/sanity.js` gibi dosyalar tarayıcıdan indirilebilir hale gelir. cPanel, Application URL'e karşılık gelen belge kökine (`public_html`) proxy `.htaccess`'ini kendisi yazar; oraya elle dokunma.

## cPanel > Setup Node.js App ayarları

| Alan | Değer |
|---|---|
| Node.js version | `24.18.0` |
| Application mode | `Production` |
| Application root | `nextapp` |
| Application URL | `ekip360.net` (yol kısmı boş) |
| Application startup file | `server.js` |

`app/page.js` **kesinlikle** başlangıç dosyası olarak verilmemelidir — bir Next.js sunucu bileşeni kaynağıdır, Node tarafından doğrudan çalıştırılamaz. Depodaki `server.js`, LiteSpeed'in beklediği CommonJS giriş noktasıdır.

Sanal ortama girmek için:

```bash
source /home/ekipnet/nodevenv/nextapp/24/bin/activate && cd /home/ekipnet/nextapp
```

> cPanel'in web terminali satır sonundaki `\` ile bölünmüş komutları düzgün işlemiyor — komutları daima **tek satır** halinde çalıştır.

## Ortam değişkenleri

**`/home/ekipnet/nextapp/.env.local` dosyası zorunludur.** cPanel'in Environment variables bölümüne girilen değişkenler yalnızca uygulama çalışırken enjekte edilir; terminalden alınan `next build` onları görmez.

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=
```

```bash
chmod 600 /home/ekipnet/nextapp/.env.local
```

`NEXT_PUBLIC_*` ile başlayanlar **derleme anında** koda gömülür. Eksikken build alınırsa site açılır ama tüm Sanity içerikleri boş gelir; dosyayı sonradan eklemek yetmez, yeniden build gerekir.

Aynı değişkenleri cPanel'in Environment variables bölümüne de girmek iyi olur (`NODE_ENV=production` ile birlikte) — `.env.local` bir güncellemede kaybolursa yedek görevi görür.

## Sunucuda `next build` çalışmıyor

Denenirse şu hatayla düşer:

```
Error: kill EPERM
    at cleanupWorkers (node_modules/next/dist/lib/worker.js:31:85)
  errno: -1, code: 'EPERM', syscall: 'kill'
```

Sebep: `next build` derleme için birden fazla alt süreç açıyor, paylaşımlı hesabın CloudLinux süreç limiti bunları öldürüyor. `kill EPERM` ikincil hatadır; asıl istisna daha önce oluşur ve `tail` ile görünmez, `head build.log` gerekir.

**Bu yüzden derleme yerelde yapılır, `.next` çıktısı sunucuya yüklenir.** Yerelde ve sunucuda aynı Node sürümü (`24.18.0`) kullanıldığı için çıktı taşınabilir.

## Dağıtım prosedürü

Kodda her değişiklikten sonra:

### 1. Yerelde derle

```bash
npm run build
```

### 2. Paketle

`dev/` (eski `next dev` artıkları, GB'larca olabilir) ve `cache/` hariç tutulur:

```bash
tar --exclude='./dev' --exclude='./cache' -czf ~/Desktop/ekip360-next-build.tar.gz -C .next .
```

Paket ~18 MB olur.

### 3. Sunucuya yükle

FileZilla veya cPanel File Manager ile `/home/ekipnet/nextapp/` altına.

### 4. Aç

File Manager'ın Extract özelliği izinleri bozabiliyor; terminalden aç:

```bash
cd /home/ekipnet/nextapp && rm -rf .next && mkdir .next && tar -xzf ekip360-next-build.tar.gz -C .next
```

İzin hatası çıkarsa:

```bash
chmod -R u+rwX,go+rX /home/ekipnet/nextapp/.next
```

### 5. Doğrula

```bash
cat /home/ekipnet/nextapp/.next/BUILD_ID
```

Yerel `.next/BUILD_ID` ile aynı değeri vermelidir.

### 6. Yeniden başlat

```bash
mkdir -p /home/ekipnet/nextapp/tmp && touch /home/ekipnet/nextapp/tmp/restart.txt
```

cPanel'deki RESTART düğmesi de aynı işi yapar ama bazen sessizce başarısız olur.

### 7. Temizle

```bash
rm -f /home/ekipnet/nextapp/ekip360-next-build.tar.gz
```

## Bağımlılıklar

`node_modules` sunucuda kurulur ve bu adım sorunsuz çalışır. Yalnızca `package.json` / `package-lock.json` değiştiğinde tekrarlanır:

```bash
source /home/ekipnet/nodevenv/nextapp/24/bin/activate && cd /home/ekipnet/nextapp && npm ci
```

Application root değiştirilirse cPanel sanal ortamı yeniden kurar; bu durumda `node_modules` de yeniden kurulmalıdır.

## Doğrulama

Dağıtım sonrası:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://ekip360.net/
curl -s https://ekip360.net/ | grep -o "cdn.sanity.io[^\"]*" | head -3
```

`200` **ve** `cdn.sanity.io/...` satırları bekleniyor. İkincisi boşsa `NEXT_PUBLIC_*` değerleri build'e girmemiş demektir.

Uygulamayı LiteSpeed olmadan elle test etmek:

```bash
source /home/ekipnet/nodevenv/nextapp/24/bin/activate && cd /home/ekipnet/nextapp && NODE_ENV=production PORT=3999 node server.js
```

`ekip360 ayakta: http://0.0.0.0:3999 (dev=false)` çıktısı beklenir.

## Sorun giderme

| Belirti | Sebep | Çözüm |
|---|---|---|
| `503 Service Unavailable` (LiteSpeed'in kendi sayfası) | Node süreci kalkamıyor | Elle `node server.js` çalıştırıp hatayı gör |
| `Could not find a production build in the '.next' directory` | `.next` yok veya eksik | Dağıtım prosedürünü baştan uygula |
| `Error: kill EPERM` | Sunucuda build denendi | Derlemeyi yerelde yap |
| `cat .next/BUILD_ID` → permission denied | File Manager Extract izinleri bozdu | `chmod -R u+rwX,go+rX .next` |
| `package.json file is required` | Application root yanlış | Root `nextapp` olmalı |
| `No such application... Unable to find app-root folder` | Kayıtlı app-root klasörü silinmiş | Klasörü `mkdir` ile geri oluştur, sayfayı yenile, root'u düzelt |
| `SyntaxError: Unexpected token {` (`app/page.js` yığın izinde) | Başlangıç dosyası yanlış | Startup file `server.js` olmalı |
| Site açılıyor ama Sanity içeriği boş | `NEXT_PUBLIC_*` build'e girmemiş | `.env.local` ekle, `rm -rf .next`, yeniden derle ve yükle |

## Uygulama logu

```bash
cat /home/ekipnet/nextapp/stderr.log
```
