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

### 5. public/ klasörünü senkronize et (CSS/JS/görsel değiştiyse)

`.next` arşivi **yalnızca derlenen kodu** taşır; `public/` altındaki CSS, JS ve görseller
sunucuya ayrıca yüklenmez. Bu adım atlanırsa yerelde düzelmiş bir sorun canlıda eski
dosyalarla devam eder (25.08.2026'da CLS düzeltmesi bu yüzden canlıya gitmemişti).

Önce yerelde değişen var mı bak:

```bash
git status --short public
```

**Seçenek A — az sayıda dosya (tercih edilen):** Değişen dosyaları FileZilla / cPanel
File Manager ile sunucuda **aynı göreli yola** yükle. Örn. `public/css/Ekip360_style.css`
değiştiyse hedef `/home/ekipnet/nextapp/public/css/Ekip360_style.css` olmalı. Bu durumda
aşağıdaki tar komutlarına **gerek yoktur**.

**Seçenek B — çok sayıda dosya:** Tüm `public/` içeriğini tek arşivle taşı.

Yerelde paketle:

```bash
tar -czf ~/Desktop/ekip360-public.tar.gz -C public .
```

Arşivi FileZilla ile **önce** `/home/ekipnet/` altına yükle, sonra sunucuda aç:

```bash
cd /home/ekipnet/nextapp/public && tar -xzf ~/ekip360-public.tar.gz && rm -f ~/ekip360-public.tar.gz
```

> ⚠️ tar komutu arşivi `/home/ekipnet/` altında arar. Arşiv yüklenmeden komut
> çalıştırılırsa `Cannot open: No such file or directory` hatası alırsın — bu hata
> dosyalarının bozuk olduğu anlamına gelmez, sadece arşiv rotasının kullanılmadığını
> gösterir. Seçenek A kullanıldıysan bu adımı tamamen atla.
>
> Arşivi **asla `public/` klasörünün içine yükleme** — o klasördeki her dosya web'den
> indirilebilir durumdadır (`https://ekip360.net/<dosya>`). Yanlışlığa oraya düştüyse
> açıp hemen sil. (25.08.2026'da başımıza geldi.)

Sunucuda dosyanın gerçekten güncel olduğunu diskten doğrula (örnek):

```bash
grep -c "100dvh" /home/ekipnet/nextapp/public/css/Ekip360_style.css
```

### 6. Doğrula

```bash
cat /home/ekipnet/nextapp/.next/BUILD_ID
```

Yerel `.next/BUILD_ID` ile aynı değeri vermelidir.

> ⚠️ Diskteki `BUILD_ID` doğru olmak, **çalışan sürecin** yeni build'i kullandığını
> garanti etmez — eski süreç belleğindeki sayfaları servis etmeye devam edebilir.
> Kesin kanıt, restart sonrası aşağıdaki "Doğrulama > Canlı içerik kontrolü"dür.

Önce yerel terminalde sorgula:
```bash
cat .next/BUILD_ID
```
Sonra hosting terminalinde:
```bash
cat /home/ekipnet/nextapp/.next/BUILD_ID
```



### 7. Yeniden başlat

```bash
mkdir -p /home/ekipnet/nextapp/tmp && touch /home/ekipnet/nextapp/tmp/restart.txt
```

cPanel'deki RESTART düğmesi de aynı işi yapar ama bazen sessizce başarısız olur.

Restart sonrası canlı içerik hâlâ eski geliyorsa (aşağıdaki "Doğrulama > Canlı içerik
kontrolü" hâlâ eskiyi gösteriyorsa) RESTART düğmesini kullan ve sürecin başlangıç
zamanını deploy saatinden sonra olduğunu doğrula:

```bash
ps -eo pid,lstart,cmd | grep "node server.js" | grep -v grep
```

### 8. Temizle

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

Canlı içerik kontrolü (2026-08 sonrası build için). İki tuzak yaşandı: `grep -c` satır
sayar, eşleşme değil — tek satıra sıkışmış HTML'de her arama "1" döner; üstelik eski HTML
bir önbellekten geliyor olabilir. Bu yüzden **occurrence sayımı** (`grep -o | wc -l`) ve
**önbellek atlatan sorgu parametresi** (`?cb=...`) birlikte kullanılır:

```bash
# Eski build işareti — 0 olmalı:
curl -s "https://ekip360.net/?cb=$(date +%s)" | grep -o "_next/image?url=" | wc -l

# Yeni build işaretleri — her biri ≥ 1 olmalı:
curl -s "https://ekip360.net/?cb=$(date +%s)" | grep -o "auto=format" | wc -l
# og:title/description/image/url — 4 beklenir:
curl -s "https://ekip360.net/?cb=$(date +%s)" | grep -o 'property="og:' | wc -l
# 26.08.2026 CSS uyumluluk düzeltmesi işareti:
curl -s "https://ekip360.net/css/Ekip360_style.css?v=$(date +%s)" | grep -o "margin-block-start" | wc -l
```

> `fetchpriority="high"` işareti listeden çıkarıldı (26.08.2026): hero görseli artık
> `next/image` yerine doğrudan CDN'den geldiği için bu öznitelik ana sayfada hiç
> üretilmiyor — canlıda da taze yerel build'de de 0'dır. Ölçüt olarak kullanmayın.

Hepsi tutuyorsa build yayındır. `url=` sayısı 0'dan büyükse ya `.next` eski yüklenmiş ya
da süreç restart almadı — BUILD_ID ve yeniden başlatma adımlarına dön.

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
| Build yüklü (`BUILD_ID` doğru) ama canlı içerik eski | Süreç restart almadı veya HTML önbellekte | `?cb=$(date +%s)` ile occurrence testi yap; RESTART düğmesi + `ps ... lstart` kontrolü |
| `grep -c "_next/image"` hep "1" dönüyor | `grep -c` satır sayar; minified HTML tek satırdır | `grep -o "_next/image?url=" \| wc -l` kullan |
| Site açılıyor ama Sanity içeriği boş | `NEXT_PUBLIC_*` build'e girmemiş | `.env.local` ekle, `rm -rf .next`, yeniden derle ve yükle |
| Yerelde düzelen sorun canlıda sürüyor | `public/` yüklenmedi (adım 5) | Değişen `public` dosyalarını yükle; tarayıcı önbelleğini devre dışı alıp test et |
| `/yonetim` curl'ü boş HTML veya 302 Cloudflare sayfası dönüyor | Yol Cloudflare Access ile korunuyor; kimlik doğrulamamış istek (curl/bot dahil) login'e yönelir | Beklenen davranış. `robots noindex` meta'sını görmek için Access kimliğiyle gir; ya da sunucuda `NODE_ENV=production PORT=3999 node server.js` başlatıp `curl -s localhost:3999/yonetim \| grep robots` |
| `www.` üzerinden yapılan ölçüm 0/eksik | www, apex'e 308 ile yönlendirir; `curl -L` olmadan yönlendirme gövdesi alınır | `curl -sL ...` kullan; ölçümleri daima apex (`https://ekip360.net`) üzerinden yap |

## Uygulama logu

```bash
cat /home/ekipnet/nextapp/stderr.log
```
