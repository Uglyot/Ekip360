/**
 * Slider görsellerini backup'tan Sanity'e aktarır.
 *
 * Çalıştır:
 *   SANITY_WRITE_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2) node scripts/import-sliders.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
  projectId: '1gjnai7w',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const CONTENT_DIR = '/Users/tolgabalikci/Documents/Projects/COWORK-OS/ekip360-website-backup/httpdocs/Content'

// SQL backup'taki slider kayıtları (SliderOrder'a göre sıralandı)
const SLIDERS = [
  { file: 'Sanal-Gerçeklik-1920_1080.jpg',       title: 'Sanal Gerçeklik',                    alt: null,                                                                          order: 1 },
  { file: 'IMG_3556-HDR-Panorama-1920px-3.jpg',   title: 'DAHA GÖRÜNÜR OL',                    alt: 'Google Sanal Tur ile İş Yerini 360 Gezdir, Google Aramada daha görünür ol.',  order: 2 },
  { file: 'Aura-IMG_0830-HDR-Panorama-1920px.jpg',title: 'SANAL TURLAR İLGİYİ İKİYE KATLAR',  alt: '18-34 yaş arası potansiyel müşterilerin rezervasyon yaptırma ihtimali %130 daha fazla.', order: 3 },
  { file: 'istiklal.jpg',                          title: 'KALABALIKLARI KENDİNİZE ÇEKİN',     alt: "Google'a göre üç kullanıcıdan ikisi daha çok Sanal Tur istiyor.",              order: 4 },
  { file: 'Lexus-giris-panorama-1920px.jpg',       title: 'İŞLETMENİZ 7/24 AÇIK KALSIN',      alt: 'Saat kaç olursa olsun işletmeniz müşterileriniz tarafından gezilmeye devam etsin.', order: 5 },
  { file: 'Lexus-web-slider6.jpg',                 title: 'Lexus Maslak Showroom',              alt: 'Lüks hibrit otomobillerin öncü markası Lexus\'un Maslak Showroom çekimleri.',  order: 6 },
  { file: 'Engin-Aksoy-Dental-Klinik1920x1080.jpg',title: 'Engin Aksoy Dental Klinik',         alt: null,                                                                          order: 7 },
  { file: 'IMG_0093-HDR-Panorama-slider.jpg',      title: 'BW Cappadocia Premier 1',           alt: 'Best Western Hotels — BW Cappadocia Premier',                                 order: 8 },
  { file: 'Kapakokaya-slider-02.jpg',              title: 'BW Cappadocia Premier 2',            alt: 'Best Western Hotels — BW Cappadocia Premier',                                 order: 9 },
  { file: 'Kapakokaya-slider-03.jpg',              title: 'BW Cappadocia Premier 3',            alt: 'Best Western Hotels — BW Cappadocia Premier',                                 order: 10 },
  { file: 'Kapakokaya-slider-05.jpg',              title: 'BW Cappadocia Premier 4',            alt: 'Best Western Hotels — BW Cappadocia Premier',                                 order: 11 },
  { file: 'Kapakokaya-slider-06.jpg',              title: 'BW Cappadocia Premier 5',            alt: 'Best Western Hotels — BW Cappadocia Premier',                                 order: 12 },
]

async function run() {
  // Mevcut slider belgelerini sil
  console.log('🗑️  Mevcut sliderlar siliniyor...')
  const existing = await client.fetch(`*[_type == "slider"]{ _id }`)
  for (const doc of existing) await client.delete(doc._id)
  console.log(`  ${existing.length} belge silindi.\n`)

  // Her slider görselini yükle
  for (const slide of SLIDERS) {
    const filePath = path.join(CONTENT_DIR, slide.file)
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Dosya bulunamadı: ${slide.file}`)
      continue
    }

    console.log(`🖼️  [${slide.order}] ${slide.title}`)
    const ext = path.extname(slide.file).slice(1).toLowerCase()
    const contentType = ext === 'png' ? 'image/png' : 'image/jpeg'

    const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: slide.file,
      contentType,
    })

    await client.create({
      _type: 'slider',
      title: slide.title,
      alt: slide.alt || undefined,
      order: slide.order,
      image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
    })

    console.log(`  ✅ Yüklendi`)
  }

  console.log('\n🎉 Slider aktarımı tamamlandı!')
}

run().catch(console.error)
