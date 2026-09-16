/**
 * Blog kategorilerini ve yazılarını (inline görseller dahil) Sanity'e aktarır.
 *
 * Çalıştır:
 *   SANITY_WRITE_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2) node scripts/import-blog.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '1gjnai7w',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const BASE_URL = 'https://ekip360.net'

// ---- Kategoriler ----
const CATEGORIES = [
  { _id: 'blogCat-10', title: 'Google İşletme Görünümü', slug: 'google-isletme-gorunumu' },
  { _id: 'blogCat-11', title: 'Google Haritalar',         slug: 'google-haritalar' },
  { _id: 'blogCat-14', title: 'Google Street View',       slug: 'google-street-view' },
  { _id: 'blogCat-15', title: 'Google Benim İşletmem',   slug: 'google-benim-isletmem' },
]

// ---- Blog yazıları ----
const POSTS = [
  {
    id: 31, catId: 'blogCat-14', publishedAt: '2017-06-12',
    slug: 'google-street-view-guvenilir-profesyoneli-secerken-nelere-dikkat-etmelisiniz',
    title: 'Google Street View Güvenilir – Profesyoneli (Fotoğrafçısı) seçerken nelere dikkat etmelisiniz?',
    imageFile: 'bab10c5a-877e-42ca-af27-dc7261d51ad1.png',
    detailPath: '/Blog-Detay/Google-Street-View-Guvenilir-%E2%80%93-Profesyoneli-(Fotografcisi)-secerken-nelere-dikkat-etmelisiniz_/31',
  },
  {
    id: 30, catId: 'blogCat-15', publishedAt: '2017-06-11',
    slug: 'google-my-business-aramalarda-ve-haritalarda-yerinizi-360-derece-sanal-tur-ile-alin',
    title: "Google My Business – Aramalar'da ve Haritalar'da Yerinizi 360 Derece Sanal Tur ile Alın !",
    imageFile: 'fa93cc91-8d75-48bf-b4c1-92ff4021a6b0.png',
    detailPath: '/Blog-Detay/Google-My-Business-%E2%80%93-Aramalar%E2%80%99da-ve-Haritalar%E2%80%99da-Yerinizi-360-Derece-Sanal-Tur-ile-Alin-!/30',
  },
  {
    id: 29, catId: 'blogCat-15', publishedAt: '2017-05-25',
    slug: 'google-my-business-girisinizi-360-derece-sanal-tur-ile-yapin',
    title: 'Google My Business Girişinizi 360 Derece Sanal Tur ile yapın !',
    imageFile: 'a2f66c22-fafc-4065-a9da-43d27904f4ac.jpg',
    detailPath: '/Blog-Detay/Google-My-Business-Girisinizi-360-Derece-Sanal-Tur-ile-yapin-!/29',
  },
  {
    id: 27, catId: 'blogCat-11', publishedAt: '2017-05-22',
    slug: 'google-haritalarda-isletme-girisinizi-gelistirin',
    title: 'Google Haritalarda İşletme Girişinizi Geliştirin !',
    imageFile: '3755cee1-d3a0-4dfb-9ac5-e775f3151abb.png',
    detailPath: '/Blog-Detay/Google-Haritalarda-%C4%B0sletme-Girisinizi-Gelistirin-!-/27',
  },
  {
    id: 28, catId: 'blogCat-15', publishedAt: '2017-05-22',
    slug: 'google-benim-isletmem-360-derece-ic-mekan-cekimleri',
    title: 'Google Benim İşletmem - 360 Derece İç Mekan Çekimleri',
    imageFile: 'b422092c-45a9-4e72-be8b-0bf1f15d8d60.jpg',
    detailPath: '/Blog-Detay/Google-Benim-%C4%B0sletmem---360-Derece-%C4%B0c-Mekan-%C3%87ekimleri/28',
  },
  {
    id: 26, catId: 'blogCat-11', publishedAt: '2017-05-10',
    slug: 'google-haritalar-360-derece-sanal-tur-ile-tanisin',
    title: 'Google Haritalar 360 Derece Sanal Tur ile Tanışın !',
    imageFile: 'cf217012-3ef4-4b00-8b5c-148aaf004802.png',
    detailPath: '/Blog-Detay/Google-Haritalar-360-Derece-Sanal-Tur-ile-Tanisin-!/26',
  },
  {
    id: 25, catId: 'blogCat-10', publishedAt: '2017-02-26',
    slug: 'google-360-derece-gorunum-ile-tanitim',
    title: 'Google 360 Derece Görünüm ile Tanıtım',
    imageFile: '599ee6b2-05db-48a9-9504-d343c1917212.jpg',
    detailPath: '/Blog-Detay/Google-360-Derece-Gorunum-ile-Tanitim/25',
  },
  {
    id: 24, catId: 'blogCat-15', publishedAt: '2017-02-19',
    slug: 'google-360-derece-fotograflarinizi-cektirdiniz-mi',
    title: 'Google 360 Derece Fotoğraflarınızı çektirdiniz mi?',
    imageFile: '45145112-50f3-4387-b6b2-689b291d97f7.png',
    detailPath: '/Blog-Detay/Google-360-Derece-Fotograflarinizi-cektirdiniz-mi_/24',
  },
  {
    id: 23, catId: 'blogCat-15', publishedAt: '2017-02-16',
    slug: 'google-isletme-kaydiniz-var-mi-google-360-derece-fotograflar',
    title: 'Google İşletme Kaydınız Var mı? – Google 360 Derece Fotoğraflar',
    imageFile: '3b87df90-1b22-4aa3-b9a6-5a929969328d.png',
    detailPath: '/Blog-Detay/Google-%C4%B0sletme-Kaydiniz-Var-mi_-%E2%80%93-Google-360-Derece-Fotograflar-/23',
  },
  {
    id: 22, catId: 'blogCat-14', publishedAt: '2017-02-03',
    slug: 'google-street-view-trusted-guvenilir',
    title: 'Google Street View | Trusted – Güvenilir',
    imageFile: '387dc234-5590-4d7e-81bc-a7a34c9fbad8.png',
    detailPath: '/Blog-Detay/Google-Street-View-%7C-Trusted-%E2%80%93-Guvenilir/22',
  },
  {
    id: 21, catId: 'blogCat-14', publishedAt: '2017-01-27',
    slug: 'google-street-view-icini-gorun',
    title: 'Google Street View – İÇİNİ GÖRÜN',
    imageFile: 'e834a470-ce06-4fb3-bb14-f6f3191aaf1f.jpg',
    detailPath: '/Blog-Detay/Google-Street-View-%E2%80%93-%C4%B0%C3%87%C4%B0N%C4%B0-G%C3%96R%C3%9CN/21',
  },
  {
    id: 20, catId: 'blogCat-10', publishedAt: '2017-01-19',
    slug: 'google-sanal-tur-hizmeti-ile-isletmenizi-one-gecirin',
    title: 'Google Sanal Tur Hizmeti ile İşletmenizi Öne Geçirin',
    imageFile: '798725e0-9b05-4e45-8f14-f6ea46e60160.jpg',
    detailPath: '/Blog-Detay/Google-Sanal-Tur-Hizmeti-ile-%C4%B0sletmenizi-%C3%96ne-Gecirin/20',
  },
  {
    id: 19, catId: 'blogCat-11', publishedAt: '2017-01-12',
    slug: 'google-haritalara-isletmenizin-360-derece-sanal-turunu-ekleyin',
    title: 'Google Haritalara işletmenizin 360 Derece Sanal Turunu ekleyin !',
    imageFile: 'e1704d70-ef65-4d5f-b4ea-95576e75a154.png',
    detailPath: '/Blog-Detay/Google-Haritalara-isletmenizin-360-Derece-Sanal-Turunu-ekleyin-!/19',
  },
  {
    id: 18, catId: 'blogCat-10', publishedAt: '2016-12-28',
    slug: 'google-isletme-gorunumu-business-view-hizmeti-satin-almak-icin-10-iyi-sebep',
    title: 'Google İşletme Görünümü (Business View) hizmeti satın almak için 10 iyi sebep',
    imageFile: '6f2a68ef-2792-49e1-9882-cb3e84d9d2de.jpg',
    detailPath: '/Blog-Detay/Google-%C4%B0sletme-Gorunumu-(Business-View)-hizmeti-satin-almak-icin-10-iyi-sebep/18',
  },
]

// ---- Yardımcı fonksiyonlar ----

let keyCounter = 0
function genKey() {
  return (++keyCounter).toString(36) + Math.random().toString(36).slice(2, 6)
}

function decodeEntities(str) {
  if (!str) return ''
  return str
    // büyük harf varyantları ÖNCE, case-sensitive (/gi küçük harf kuralı &Ccedil; vb.'yi küçültüyordu —
    // 2026-09-16'da blog verisinde 29 kelime bu yüzden düzeltildi)
    .replace(/&Ouml;/g, 'Ö').replace(/&Uuml;/g, 'Ü')
    .replace(/&Ccedil;/g, 'Ç').replace(/&Iuml;/g, 'İ')
    .replace(/&Gbreve;/g, 'Ğ').replace(/&Scedil;/g, 'Ş')
    // küçük harf varyantları
    .replace(/&ouml;/g, 'ö').replace(/&uuml;/g, 'ü')
    .replace(/&ccedil;/g, 'ç').replace(/&iuml;/g, 'ı')
    .replace(/&gbreve;/g, 'ğ').replace(/&scedil;/g, 'ş')
    .replace(/&#199;/g, 'Ç').replace(/&#231;/g, 'ç')
    .replace(/&#220;/g, 'Ü').replace(/&#252;/g, 'ü')
    .replace(/&#214;/g, 'Ö').replace(/&#246;/g, 'ö')
    .replace(/&#304;/g, 'İ').replace(/&#305;/g, 'ı')
    .replace(/&#286;/g, 'Ğ').replace(/&#287;/g, 'ğ')
    .replace(/&#350;/g, 'Ş').replace(/&#351;/g, 'ş')
    .replace(/&#39;/g,  "'").replace(/&amp;/g,  '&')
    .replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;/g, "'").replace(/&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"')
    .replace(/&ndash;/g, '–').replace(/&mdash;/g, '—')
    .replace(/&#[0-9]+;/g, m => String.fromCharCode(parseInt(m.slice(2, -1))))
    .trim()
}

function stripInlineHtml(html) {
  return decodeEntities(html.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim()
}

async function uploadImageFromUrl(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const filename = decodeURIComponent(url.split('/').pop().split('?')[0])
  const ext = filename.split('.').pop().toLowerCase()
  const contentType = ext === 'png' ? 'image/png' : 'image/jpeg'
  const asset = await client.assets.upload('image', buffer, { filename, contentType })
  return { _type: 'image', _key: genKey(), asset: { _type: 'reference', _ref: asset._id } }
}

// HTML içeriğini Portable Text bloklarına (paragraf + inline görsel) dönüştürür
async function htmlToBlocks(bodyHtml) {
  const blocks = []

  // Başlık ve meta bilgisini temizle
  let html = bodyHtml
    .replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, '')
    .replace(/<span[^>]+class="BlogCategoryDate"[^>]*>[\s\S]*?<\/span>/gi, '')
    .replace(/<div[^>]+class="SocialShare"[^>]*>[\s\S]*/i, '')

  // <img> etiketlerini belirteç olarak bırakarak parçalara ayır
  // TOKEN: |||IMG:url|||
  html = html.replace(/<img[^>]+src="([^"]+)"[^>]*\/?>/gi, (_, src) => `|||IMG:${src}|||`)

  // Liste elemanlarını düzleştir: <li> içeriğini paragraf gibi işle
  html = html.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, content) => `<p>${content}</p>`)

  // Şimdi tüm içeriği <p>...</p> segmentlerine ve IMG tokenlarına böl
  const segments = html.split(/(<<<|\|\|\|IMG:[^|]+\|\|\|)/g)

  for (const seg of html.split(/(\|\|\|IMG:[^|]+\|\|\|)/g)) {
    const imgMatch = seg.match(/^\|\|\|IMG:(.+)\|\|\|$/)
    if (imgMatch) {
      // Görsel bloğu
      let src = imgMatch[1].trim()
      if (src.startsWith('/')) src = `${BASE_URL}${src}`
      try {
        const imgBlock = await uploadImageFromUrl(src)
        blocks.push(imgBlock)
        console.log(`    🖼️  İnline görsel: ${src.split('/').pop()}`)
      } catch (e) {
        console.warn(`    ⚠️  Görsel yüklenemedi: ${src.split('/').pop()} — ${e.message}`)
      }
    } else {
      // Metin segmenti: içindeki <p> etiketlerini çıkar
      const pRe = /<p[^>]*>([\s\S]*?)<\/p>/gi
      let m
      while ((m = pRe.exec(seg)) !== null) {
        const text = stripInlineHtml(m[1])
        if (text.length > 2) {
          blocks.push({
            _type: 'block',
            _key: genKey(),
            style: 'normal',
            markDefs: [],
            children: [{ _type: 'span', _key: genKey(), text, marks: [] }],
          })
        }
      }
    }
  }

  return blocks
}

function extractBodyHtml(html) {
  // .TextContent içini al; BlogDetailText ve SocialShare'i sınır olarak kullan
  const m =
    html.match(/<div[^>]+class="TextContent"[^>]*>([\s\S]*?)<div[^>]+class="SocialShare"/i) ||
    html.match(/<div[^>]+class="TextContent"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<!--\/Left/i) ||
    html.match(/<div[^>]+class="TextContent"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<!--Page/i)
  return m ? m[1] : html
}

async function run() {
  // 1. Kategorileri oluştur
  console.log('📂 Kategoriler oluşturuluyor...')
  for (const cat of CATEGORIES) {
    await client.createOrReplace({
      _id: cat._id,
      _type: 'blogCategory',
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
    })
    console.log(`  ✅ ${cat.title}`)
  }

  // 2. Mevcut blog yazılarını sil
  console.log('\n🗑️  Mevcut blog yazıları siliniyor...')
  const existing = await client.fetch(`*[_type == "blogPost"]{ _id }`)
  for (const doc of existing) {
    await client.delete(doc._id)
  }
  console.log(`  ${existing.length} belge silindi.\n`)

  // 3. Her yazıyı içe aktar
  for (const post of POSTS) {
    console.log(`\n📝 [${post.id}] ${post.title}`)

    // Detay sayfasını çek
    let html = ''
    try {
      const res = await fetch(`${BASE_URL}${post.detailPath}`)
      html = await res.text()
    } catch (e) {
      console.warn(`  ⚠️  Sayfa çekilemedi: ${e.message}`)
    }

    // Ana thumbnail görseli yükle
    let mainImage = null
    const thumbUrl = `${BASE_URL}/uploadfiles/BlogImages/${post.imageFile}`
    try {
      mainImage = await uploadImageFromUrl(thumbUrl)
      console.log(`  🖼️  Ana görsel yüklendi`)
    } catch (e) {
      console.warn(`  ⚠️  Ana görsel yüklenemedi: ${e.message}`)
    }

    // Gövde HTML'ini çıkar ve bloklara dönüştür
    const bodyHtml = html ? extractBodyHtml(html) : ''
    const body = bodyHtml ? await htmlToBlocks(bodyHtml) : []
    const textBlocks = body.filter(b => b._type === 'block')
    const imgBlocks = body.filter(b => b._type === 'image')
    console.log(`  📄 ${textBlocks.length} metin bloğu, ${imgBlocks.length} görsel bloğu`)

    // Özet: ilk paragraftan al
    const firstText = textBlocks[0]
    const summary = firstText ? firstText.children[0].text.substring(0, 300) : ''

    // Sanity belgesi oluştur
    await client.create({
      _type: 'blogPost',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      category: { _type: 'reference', _ref: post.catId },
      publishedAt: new Date(post.publishedAt).toISOString(),
      ...(mainImage && { mainImage }),
      ...(summary && { summary }),
      ...(body.length > 0 && { body }),
    })
    console.log(`  ✅ Oluşturuldu`)

    await new Promise(r => setTimeout(r, 400))
  }

  console.log('\n🎉 Blog aktarımı tamamlandı!')
}

run().catch(console.error)
