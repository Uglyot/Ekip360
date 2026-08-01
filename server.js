// cPanel / LiteSpeed (lsnode) Node.js uygulama giriş dosyası.
//
// LiteSpeed bu dosyayı CommonJS olarak yükler, bu yüzden burada `import` YOK — sadece
// `require`. Uygulamanın geri kalanı (app/, lib/, components/) Next.js derleyicisinden
// geçer; o dosyalar Node tarafından doğrudan çalıştırılmaz.
//
// cPanel > Setup Node.js App > "Application startup file" bu dosyayı göstermelidir.

const { createServer } = require('http')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const hostname = process.env.HOSTNAME || '0.0.0.0'
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(port, () => {
      console.log(`ekip360 ayakta: http://${hostname}:${port} (dev=${dev})`)
    })
  })
  .catch((err) => {
    console.error('Next.js baslatilamadi:', err)
    process.exit(1)
  })
