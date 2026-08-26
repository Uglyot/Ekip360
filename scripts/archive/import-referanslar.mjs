/**
 * Sanity Referans Import Script
 * Çalıştırmak için:
 *   1. sanity.io/manage → API → Tokens → "Add API Token" (Editor yetkisi)
 *   2. Token'ı .env.local'e ekle: SANITY_WRITE_TOKEN=sk...
 *   3. node scripts/import-referanslar.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const client = createClient({
  projectId: '1gjnai7w',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const CONTENT_DIR = '/Users/tolgabalikci/Documents/Projects/COWORK-OS/ekip360-website-backup/httpdocs/Content'

function stripHtml(html) {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&ouml;/g, 'ö').replace(/&Ouml;/g, 'Ö')
    .replace(/&uuml;/g, 'ü').replace(/&Uuml;/g, 'Ü')
    .replace(/&ccedil;/g, 'ç').replace(/&Ccedil;/g, 'Ç')
    .replace(/&iuml;/g, 'ı').replace(/&Iuml;/g, 'İ')
    .replace(/&atilde;/g, 'ğ').replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ')
    .trim()
}

const categoryMap = {
  'OTELLER': 'Hotels',
  'OTOMOTİV': 'Automotive',
  'KAFE - PASTANELER': 'CafeBakeries',
  'RESTORAN - BAR': 'RestaurantBar',
  'KÜÇÜK İŞLETMELER': 'SmallBusiness',
  'SHOWROOMLAR': 'Showrooms',
  'SPOR SALONLARI': 'Gyms',
  'HASTANELER': 'Hospitals',
  'KİŞİSEL BAKIM': 'PersonalCare',
  'SANAT GALERİLERİ': 'ArtGalleries',
  'DİĞER': 'Other',
}

// SQL'den çekilen referans verileri
const references = [
  {
    order: 1, category: 'KÜÇÜK İŞLETMELER',
    name: 'RE/MAX Yıldız', sector: 'Gayrimenkul',
    thumbnail: 'RemaxYildiz.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1461072936545!6m8!1m7!1snTOvauzbtGsAAAQvOssegw!2m2!1d40.9772322732388!2d29.09659184558313!3f355!4f0!5f0.7820865974627469',
    telephoneNumber: '0 216 380 17 17',
    address: 'İnönü Cad. Kadıköy / İstanbul',
  },
  {
    order: 2, category: 'SHOWROOMLAR',
    name: 'Hasuran Grup Yetkili Beko Bayii', sector: 'Beyaz Eşya, Televizyon',
    thumbnail: 'Beko-Hasuran-Alemdağ-Caddesi-thumb.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1462371103498!6m8!1m7!1s8TXkm0Rvx2QAAAQvOy7YCw!2m2!1d41.02555635521743!2d29.09415396509644!3f342.26958112738185!4f13.07188002756736!5f0.5330934429905652',
    telephoneNumber: '0 216 641 16 77',
    address: 'Recep Ayan Cad. Ümraniye / İstanbul',
  },
  {
    order: 3, category: 'KAFE - PASTANELER',
    name: 'PANAYIR FIRIN', sector: 'Fırın, Pastane',
    thumbnail: 'Panayır-Fırın-Erenköy-thumb-300x200px.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1469804974762!6m8!1m7!1sSUl5VQnZ47sAAAQvOpN6Sg!2m2!1d40.97150700405879!2d29.07708505990786!3f126.75314632005302!4f5.285338162783773!5f0.7820865974627469',
    telephoneNumber: '0216 688 4949',
    address: 'Erenköy, Erenköy İstasyon Cd., 34738',
  },
  {
    order: 4, category: 'KAFE - PASTANELER',
    name: "EDWARD'S COFFEE", sector: 'Kafe, Restoran',
    thumbnail: 'IMG_0045_6_7_fused-thumb-300x200px.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1469807413995!6m8!1m7!1sSU_jNPN374oAAAQvO0N_KQ!2m2!1d40.97561782061941!2d29.09792806484882!3f156.32879624523625!4f0.10505171487210418!5f0.7820865974627469',
    telephoneNumber: '0216 445 83 11',
    address: 'Kozyatağı, Saniye Ermutlu Sk. No:12, 34742 Kadıköy / İstanbul',
  },
  {
    order: 5, category: 'KÜÇÜK İŞLETMELER',
    name: 'Can Emlak Altıntepe', sector: 'Gayrimenkul',
    thumbnail: 'Can-Emlak-thumb-300x200px.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1469812649273!6m8!1m7!1stCAl2xSbmfMAAAQvOmMT4Q!2m2!1d40.95338213069066!2d29.10094490597249!3f141.8292240531176!4f-3.3406661620257125!5f0.7820865974627469',
    telephoneNumber: '0216 388 13 13',
    address: 'Cihadiye Cd. Cihadiye Apt. No: 6/B (Altıntepe Migros Karşı Sokağı)',
  },
  {
    order: 6, category: 'KÜÇÜK İŞLETMELER',
    name: 'Lightbox Altıntepe', sector: 'Fotoğraf Stüdyosu',
    thumbnail: 'Lightbox-Studio-Altıntepe-thumb-300x200px.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1469830094277!6m8!1m7!1s8pQ4mdk2oNoAAAQvOtYdDA!2m2!1d40.95354356727927!2d29.10125090815927!3f177.60703227062604!4f0.72736892426542!5f0.7820865974627469',
    telephoneNumber: '0216 388 24 95',
    address: 'Altıntepe, Cihadiye Cd. No:12, 34840 Maltepe / İstanbul',
  },
  {
    order: 7, category: 'KÜÇÜK İŞLETMELER',
    name: 'Coldwell Banker Lider', sector: 'Emlak',
    thumbnail: 'Coldwell-Banker-Lider-Gayrimenkul-Akatlar-thumb.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1469831519223!6m8!1m7!1sAczSYSvTOfUAAAQvPHbE-Q!2m2!1d41.07842595108173!2d29.02422005434699!3f105.7304957381531!4f-2.6538378774655484!5f0.4017245422133204',
    telephoneNumber: '0212 352 22 42',
    address: 'Akat Mah. Meydan Cad. Hayran Apt. No: 4 D: 3 Akatlar Beşiktaş / İstanbul',
  },
  {
    order: 8, category: 'KÜÇÜK İŞLETMELER',
    name: 'Bizim Bahçe Erenköy', sector: 'Şarküteri - Market',
    thumbnail: 'Bizim-bahce-erenkoy-thumb.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1470307838761!6m8!1m7!1sAqqcbPErZr8AAAQvPH4BcA!2m2!1d40.97234227376604!2d29.07640328869263!3f263.09141669047716!4f-11.839540782302706!5f0.7820865974627469',
    telephoneNumber: '0216 467 73 35',
    address: 'Erenköy Mh. Hatboyu Sk. No:26/a, Erenköy, Kadıköy, İstanbul',
  },
  {
    order: 9, category: 'RESTORAN - BAR',
    name: 'SMOKKIN RESTAURANT BAKERY LOUNGE', sector: 'Kafe Restoran',
    thumbnail: 'Smokkin-Restaurant-Thumbnail-300x200px.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1470475228183!6m8!1m7!1spjyBAC55gZUAAAQvOfknLg!2m2!1d40.96453809689153!2d29.07379252162878!3f35!4f0!5f0.7820865974627469',
    telephoneNumber: '0216 202 2020',
    address: 'Bağdat Cad. Kınayman Sitesi C Blok No:345/D:1, Erenköy, Kadıköy / İstanbul',
  },
  {
    order: 10, category: 'OTELLER',
    name: 'Aura Suites', sector: 'Otel',
    thumbnail: 'Aura-Suites-Thumbnail.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2s!4v1478272991358!6m8!1m7!1s_z09cqu-7FwAAAQvvqD8Bw!2m2!1d41.06132466484352!2d29.00920160691215!3f12.977113946938799!4f-11.177481275974571!5f0.7820865974627469',
    telephoneNumber: '+90 212 267 39 30',
    address: 'Beşiktaş / İstanbul',
  },
  {
    order: 11, category: 'KÜÇÜK İŞLETMELER',
    name: 'Damla Kartuş Denizli', sector: 'Kartuş Dolum Merkezi',
    thumbnail: 'Damla-Kartuş-thumb.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1478988027243!6m8!1m7!1sRFNwmY8K2cgAAAQvvo127w!2m2!1d37.78021233452495!2d29.07990101712312!3f189.80569062646987!4f-0.46944983265001383!5f0.4000000000000002',
    telephoneNumber: '0258 444 7 273',
    address: 'Denizli',
  },
  {
    order: 12, category: 'KÜÇÜK İŞLETMELER',
    name: 'Zafer - Atilla Kuaför', sector: 'Kuaför',
    thumbnail: 'Zafer-&-Atilla-Kuaför-thumb.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2s!4v1478991174937!6m8!1m7!1sVJ9A60vRU8EAAAQ7Lq5UxQ!2m2!1d41.06012275687702!2d29.03633321385792!3f144.06182316367332!4f-6.905082804729133!5f0.7820865974627469',
    telephoneNumber: '0212 259 39 59',
    address: 'Kuruçeşme, Kırbaç Sokağı No:5, 34345 Beşiktaş / İstanbul',
  },
  {
    order: 13, category: 'KÜÇÜK İŞLETMELER',
    name: 'Darmo Tattoo', sector: 'Dövme Stüdyosu',
    thumbnail: 'Darmo-Tattoo-thumb.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1478994885361!6m8!1m7!1sw4Z9V8i7MG4AAAQvvfzVHQ!2m2!1d38.45970540693251!2d27.21354809365016!3f172.65293207101593!4f-21.837994222367627!5f0.7820865974627469',
    telephoneNumber: '0232 342 91 80',
    address: 'Kazım Dirik Mah., 161. Sk. No:17, 35100 Bornova / İzmir',
  },
  {
    order: 14, category: 'KÜÇÜK İŞLETMELER',
    name: 'İbrahim - İbrahim Kuaför', sector: 'Kuaför',
    thumbnail: 'ibrahim450pxIMG_4438.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1478995496733!6m8!1m7!1sDX4ILCaSM5cAAAQvvfancg!2m2!1d38.46271651249123!2d27.21459711469948!3f227.89177359397326!4f-14.085051806716407!5f0.7820865974627469',
    telephoneNumber: '0232 347 12 36',
    address: 'Bornova / İzmir',
  },
  {
    order: 15, category: 'KÜÇÜK İŞLETMELER',
    name: 'Dentorion Ağız Ve Diş Sağlığı Polikliniği', sector: 'Sağlık',
    thumbnail: 'Dentorion-web-thumb.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1490650743553!6m8!1m7!1sll299wD_6RkAAAQvxcFANg!2m2!1d38.43311946392321!2d27.13936867476605!3f248.5011807142768!4f-18.787840837166016!5f0.7820865974627469',
    telephoneNumber: '0232 464 88 11',
    address: 'İzmir',
  },
  {
    order: 16, category: 'OTOMOTİV',
    name: 'Lexus Maslak', sector: 'Otomotiv',
    thumbnail: 'Lexus_thumb_3724-HDR-250px.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1491833735043!6m8!1m7!1sf-aNyVlwEzMAAAQ8sTbKRQ!2m2!1d41.10930185137975!2d29.01967362244852!3f320.44!4f-4.650000000000006!5f0.7820865974627469',
    telephoneNumber: '444 1 255',
    address: 'Orijin Maslak Plaza, Eski Büyükdere Cd. No:27, 34398 Şişli / İstanbul',
  },
  {
    order: 17, category: 'KÜÇÜK İŞLETMELER',
    name: 'Ortodonti Kliniği Ataşehir', sector: 'Sağlık',
    thumbnail: 'Ortodonti-Kliniği-Ataşehir-thumb_300px.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2s!4v1492093219759!6m8!1m7!1sISld5D6HkrIAAAQ3syWafQ!2m2!1d40.9917022188311!2d29.13198500237081!3f194.22465580616782!4f-8.721988247839022!5f0.7820865974627469',
    telephoneNumber: '+90 216 455 23 32',
    address: 'Ataşehir / İstanbul',
  },
  {
    order: 18, category: 'OTELLER',
    name: 'Palivor Çiftliği', sector: 'Konaklama',
    thumbnail: 'Palivor-Çiftliğ-thumb_300px.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2s!4v1492091267282!6m8!1m7!1spumeB4JtwVcAAAQ8sTh6XA!2m2!1d41.92959884972763!2d27.85134459981964!3f168.17394357132065!4f-0.10226903250419639!5f0.7820865974627469',
    telephoneNumber: '+90 532 637 80 09',
    address: 'Kırklareli',
  },
  {
    order: 19, category: 'KÜÇÜK İŞLETMELER',
    name: 'Engin Aksoy Diş Kliniği', sector: 'Sağlık',
    thumbnail: 'Engin-Aksoy-Thumb.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1495111956731!6m8!1m7!1sF%3A-9YJpNnbinMU%2FWRYdjK3AGHI%2FAAAAAAAAFyU%2Fuh0GE7UT0u0ilXtt6wQw46dVQ0AUqtPMACLIB!2m2!1d41.04246883770578!2d28.99657912552357!3f121.17078889843664!4f1.0593762754570122!5f0.7820865974627469',
    telephoneNumber: '(0212) 232 00 85',
    address: 'Şişli / İstanbul',
  },
  {
    order: 20, category: 'KÜÇÜK İŞLETMELER',
    name: 'Diş Hekimi Pelin Aktay Esen', sector: 'Sağlık',
    thumbnail: 'Pelin-Aktay-Esen-thumb.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2s!4v1495224200786!6m8!1m7!1stb1Yrwt_UV4AAAQ3mzDunw!2m2!1d39.8752566381908!2d32.8350666223879!3f75.0452987058291!4f-33.53007027895835!5f0.7820865974627469',
    telephoneNumber: '(0312) 481 21 20',
    address: 'Ankara',
  },
  {
    order: 21, category: 'KAFE - PASTANELER',
    name: "Moda'da Bir Yer", sector: 'Kafe',
    thumbnail: 'Modada-bir-yer_-thumb.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!4v1497908280333!6m8!1m7!1sF%3A-jk9ZSQdXdSA%2FWUgBgjHNlzI%2FAAAAAAAAGJU%2FlXqtxsNd_08mm9aik_Fwprk4AhGBAKpqgCLIBGAYYCw!2m2!1d40.98038870955221!2d29.02134297085809!3f29.077683160706783!4f-0.23267841874327644!5f0.7820865974627469',
    telephoneNumber: '0216 550 00 65',
    address: 'Moda, Kadıköy / İstanbul',
  },
  {
    order: 22, category: 'KÜÇÜK İŞLETMELER',
    name: 'Saloon Locca', sector: 'Kişisel Bakım',
    thumbnail: 'Saloon-Locca-thumb-300px.jpg',
    streetViewUrl: 'https://www.google.com/maps/embed?pb=!1m0!4v1501667109182!6m8!1m7!1sF%3A-JDPpoCmjuLY%2FWYIcElbpExI%2FAAAAAAAAGSU%2FKDiuHqq_YYQ-4JlY5ed69EAf1xlu1Dc0ACLIBGAYYCw!2m2!1d38.46324305009477!2d27.21159969386576!3f92.30282255045528!4f0.05970801842394735!5f0.7820865974627469',
    telephoneNumber: '0232 342 03 13',
    address: 'Bornova / İzmir',
  },
]

async function uploadImage(filename) {
  const filePath = path.join(CONTENT_DIR, filename)
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️  Dosya bulunamadı: ${filename}`)
    return null
  }
  const ext = path.extname(filename).slice(1).toLowerCase()
  const contentType = ext === 'png' ? 'image/png' : 'image/jpeg'
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename,
    contentType,
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function run() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ SANITY_WRITE_TOKEN bulunamadı. .env.local dosyasına ekleyin ve şöyle çalıştırın:')
    console.error('   SANITY_WRITE_TOKEN=sk... node scripts/import-referanslar.mjs')
    process.exit(1)
  }

  console.log(`🚀 ${references.length} referans yüklenecek...\n`)

  for (const ref of references) {
    console.log(`📦 [${ref.order}/${references.length}] ${ref.name}`)

    // Thumbnail yükle
    console.log(`  📷 Thumbnail yükleniyor: ${ref.thumbnail}`)
    const thumbnailAsset = await uploadImage(ref.thumbnail)

    const doc = {
      _type: 'referans',
      title: ref.name,
      category: categoryMap[ref.category] || 'Other',
      sector: ref.sector || '',
      telephoneNumber: ref.telephoneNumber?.trim() || '',
      address: ref.address || '',
      streetViewUrl: ref.streetViewUrl || '',
      order: ref.order,
      ...(thumbnailAsset && { thumbnail: thumbnailAsset }),
    }

    try {
      await client.create(doc)
      console.log(`  ✅ Oluşturuldu\n`)
    } catch (err) {
      console.error(`  ❌ Hata: ${err.message}\n`)
    }
  }

  console.log('🎉 Import tamamlandı!')
}

run()
