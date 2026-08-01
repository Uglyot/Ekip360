# Kurulum — cPanel / LiteSpeed (guzel.net.tr)

## Bildirilen hatanın nedeni

Destek kaydındaki log:

```
/home/ekipnet/public_html/app/page.js:1
import { getSliderImages } from '@/lib/sanity'
SyntaxError: Unexpected token {
  at startApplication (/usr/local/lsws/fcgi-bin/lsnode.js:51:15)
```

Bu bir yazılım hatası değil, **uygulama başlangıç dosyasının yanlış seçilmiş olmasıdır.**

`app/page.js` bir Next.js sunucu bileşeni kaynağıdır. Next.js derleyicisi tarafından
işlenir; Node.js tarafından doğrudan çalıştırılmaz. LiteSpeed bu dosyayı CommonJS
modülü olarak yüklemeye çalıştığı için ESM `import` sözdizimini tanımamış ve
`SyntaxError` vermiştir. Aynı hata `app/` altındaki herhangi bir dosya için de çıkardı.

Ayrıca stack izindeki çerçeveler `internal/modules/cjs/loader.js` biçiminde —
`node:` öneki taşımıyorlar. Bu, uygulamanın **Node.js 16'dan eski** bir sürümle
çalıştırıldığını gösterir.

## Yapılması gerekenler

### 1. Node.js sürümü: 20.9 veya üzeri

Next.js 16.2.10 en az Node.js 20.9 gerektirir (`package.json` > `engines`).
cPanel > **Setup Node.js App** > *Node.js version* alanından 20.x veya 22.x seçilmelidir.

### 2. Başlangıç dosyası: `server.js`

Depoya CommonJS formatında bir giriş dosyası eklendi: `server.js` (proje kök dizini).

cPanel > **Setup Node.js App** ayarları:

| Alan | Değer |
|---|---|
| Node.js version | 20.x veya üzeri |
| Application mode | Production |
| Application root | `public_html` (projenin `package.json`'ının bulunduğu dizin) |
| Application URL | `ekip360.net` |
| Application startup file | `server.js` |

`app/page.js` **kesinlikle** başlangıç dosyası olarak verilmemelidir.

### 3. Ortam değişkenleri

`.env*` dosyaları git deposuna dahil edilmez. Aşağıdaki değişkenler cPanel > Setup
Node.js App ekranındaki **Environment variables** bölümünden tanımlanmalıdır:

```
NODE_ENV=production
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=
```

> `NEXT_PUBLIC_*` ile başlayan değişkenler **derleme anında** koda gömülür.
> Bu yüzden `npm run build` çalıştırılmadan **önce** tanımlanmış olmaları gerekir.
> Eksik olurlarsa site açılır ama Sanity içerikleri boş gelir.

### 4. Kurulum sırası

```bash
npm ci --omit=dev      # veya: npm install
npm run build          # .next/ üretim çıktısını oluşturur
```

Ardından cPanel'den **Restart** edilir.

`.next/` dizini git deposunda yoksayılıdır; sunucuda `npm run build` çalıştırılmadan
uygulama ayağa kalkmaz.

## Paylaşımlı hostingte derleme belleği

`next build` paylaşımlı hesaplarda bellek limitine takılabilir. Takılırsa iki seçenek var:

1. Hesabın bellek limitini geçici olarak yükseltmek, veya
2. Derlemeyi yerelde yapıp `.next/` dizinini olduğu gibi sunucuya yüklemek
   (bu durumda `node_modules` yine sunucuda kurulmalıdır).

## Yerel doğrulama

Bu yapılandırma yerelde üretim modunda test edilmiştir:

```bash
npm run build
NODE_ENV=production PORT=3999 node server.js
```

`/`, `/hakkimizda`, `/referanslar`, `/iletisim`, `/blog`, `/yonetim` yollarının
tamamı HTTP 200 döndürmektedir.
