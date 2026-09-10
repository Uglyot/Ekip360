/**
 * Tam Referans Import Scripti
 * - Sanity'deki mevcut tüm referansları siler
 * - Canlı siteden tüm referansları çeker (HTML parse)
 * - Galeri ve thumbnail görsellerini backup'tan veya canlı siteden yükler
 *
 * Çalıştır:
 *   SANITY_WRITE_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2) node scripts/import-referanslar-full.mjs
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

const BASE_URL = 'https://ekip360.net'
const THUMB_DIR = '/Users/tolgabalikci/Documents/Projects/COWORK-OS/ekip360-website-backup/httpdocs/Content/Thumb'
const CONTENT_DIR = '/Users/tolgabalikci/Documents/Projects/COWORK-OS/ekip360-website-backup/httpdocs/Content'

// Canlı sitedeki tüm referanslar (Referanslar sayfasından alındı, "Test" hariç)
const ALL_REFS = [
  // OTELLER
  { path: '/ReferansDetay/anastasia-meziki-butik-otel/1068', category: 'Hotels', order: 1 },
  { path: '/ReferansDetay/bw-kapadokya-premier/1069',        category: 'Hotels', order: 2 },
  { path: '/ReferansDetay/bw-premier-karsiyaka-izmir/1070',  category: 'Hotels', order: 3 },
  { path: '/ReferansDetay/bw-vib-antalya/2076',              category: 'Hotels', order: 4 },
  { path: '/ReferansDetay/bw-premier-sakarya/2077',          category: 'Hotels', order: 5 },
  { path: '/ReferansDetay/bw-citadel/2078',                  category: 'Hotels', order: 6 },
  { path: '/ReferansDetay/bw-president/2079',                category: 'Hotels', order: 7 },
  { path: '/ReferansDetay/bw-plus-konak-/2080',              category: 'Hotels', order: 8 },
  { path: '/ReferansDetay/bw-cesme-plus-izmir/2081',         category: 'Hotels', order: 9 },
  { path: '/ReferansDetay/bw-otel2000-ankara/2082',          category: 'Hotels', order: 10 },
  { path: '/ReferansDetay/bw-plus-khan-antalya/2083',        category: 'Hotels', order: 11 },
  { path: '/ReferansDetay/bw-eresin-istanbul/2084',          category: 'Hotels', order: 12 },
  { path: '/ReferansDetay/bw-empire-palace-istanbul/2085',   category: 'Hotels', order: 13 },
  { path: '/ReferansDetay/bw-antea-palace/2086',             category: 'Hotels', order: 14 },
  { path: '/ReferansDetay/bw-ravanda-gaziantep/2087',        category: 'Hotels', order: 15 },
  { path: '/ReferansDetay/palivor-ciftligi/2088',            category: 'Hotels', order: 16 },
  { path: '/ReferansDetay/limnades-hotel-iznik/2089',        category: 'Hotels', order: 17 },
  { path: '/ReferansDetay/ayasoluk-butik-hotel/2101',        category: 'Hotels', order: 18 },
  { path: '/ReferansDetay/leyla-hanim-konagi/2107',          category: 'Hotels', order: 19 },
  { path: '/ReferansDetay/aura-suites/2111',                 category: 'Hotels', order: 20 },
  // OTOMOTİV
  { path: '/ReferansDetay/lexus-maslak/45',                  category: 'Automotive', order: 1 },
  // KAFE - PASTANELER
  { path: '/ReferansDetay/panayir-firin/27',                 category: 'CafeBakeries', order: 1 },
  { path: '/ReferansDetay/edward%27s-coffee/29',             category: 'CafeBakeries', order: 2 },
  { path: '/ReferansDetay/moda%27da-bir-yer/50',             category: 'CafeBakeries', order: 3 },
  // RESTORAN - BAR
  { path: '/ReferansDetay/kasibeyaz-atasehir/2090',          category: 'RestaurantBar', order: 1 },
  { path: '/ReferansDetay/qubbe-dedeman/2091',               category: 'RestaurantBar', order: 2 },
  { path: '/ReferansDetay/dardenia-caddebostan/2092',        category: 'RestaurantBar', order: 3 },
  { path: '/ReferansDetay/dardenia-gokturk/2093',            category: 'RestaurantBar', order: 4 },
  { path: '/ReferansDetay/dardenia-maslak/2094',             category: 'RestaurantBar', order: 5 },
  { path: '/ReferansDetay/dardenia-kozyatagi/2095',          category: 'RestaurantBar', order: 6 },
  { path: '/ReferansDetay/dardenia-capitol/2096',            category: 'RestaurantBar', order: 7 },
  { path: '/ReferansDetay/dardenia-canakkale/2097',          category: 'RestaurantBar', order: 8 },
  { path: '/ReferansDetay/dardenia-mecidiyekoy/2098',        category: 'RestaurantBar', order: 9 },
  { path: '/ReferansDetay/dardenia-buyaka/2099',             category: 'RestaurantBar', order: 10 },
  { path: '/ReferansDetay/dardenia-nisantasi/2100',          category: 'RestaurantBar', order: 11 },
  // SPOR SALONLARI
  { path: '/ReferansDetay/fitness-must/1071',                category: 'Gyms', order: 1 },
  { path: '/ReferansDetay/zorhane-spor-salonu/1072',         category: 'Gyms', order: 2 },
  // HASTANELER
  { path: '/ReferansDetay/koc-universitesi-hastanesi-kuttam/1073', category: 'Hospitals', order: 1 },
  { path: '/ReferansDetay/dr.-ali-kerim-diler-poliklinigi/1074',   category: 'Hospitals', order: 2 },
  { path: '/ReferansDetay/optimadent-dis-sagligi-poliklinigi/1075', category: 'Hospitals', order: 3 },
  { path: '/ReferansDetay/engin-aksoy-dental-klinik/1076',         category: 'Hospitals', order: 4 },
  { path: '/ReferansDetay/sembol-dis-klinigi/1077',                category: 'Hospitals', order: 5 },
  { path: '/ReferansDetay/tekdent-dis-poliklinigi/2102',           category: 'Hospitals', order: 6 },
  { path: '/ReferansDetay/ortodonti-klinigi-atasehir/2103',        category: 'Hospitals', order: 7 },
  { path: '/ReferansDetay/emrah-guvenenler-dental-klinik/2104',    category: 'Hospitals', order: 8 },
  { path: '/ReferansDetay/prof.-dr.-teoman-dal/2105',              category: 'Hospitals', order: 9 },
  { path: '/ReferansDetay/op.dr.-ozgur-aksan/2108',               category: 'Hospitals', order: 10 },
  { path: '/ReferansDetay/ultramed-goruntuleme-merkezi/2110',      category: 'Hospitals', order: 11 },
  // SHOWROOMLAR
  { path: '/ReferansDetay/sem-collections/1056',             category: 'Showrooms', order: 1 },
  { path: '/ReferansDetay/weavers-tekstil/1058',             category: 'Showrooms', order: 2 },
  { path: '/ReferansDetay/natural-decor/1059',               category: 'Showrooms', order: 3 },
  { path: '/ReferansDetay/eva-banyo/1060',                   category: 'Showrooms', order: 4 },
  { path: '/ReferansDetay/albero-ray-dolap/1061',            category: 'Showrooms', order: 5 },
  { path: '/ReferansDetay/taze-baski-merkezi/1062',          category: 'Showrooms', order: 6 },
  { path: '/ReferansDetay/starwood-yapi-market-izmir/1063',  category: 'Showrooms', order: 7 },
  { path: '/ReferansDetay/deniz-butik-altintepe/1064',       category: 'Showrooms', order: 8 },
  { path: '/ReferansDetay/murat-egitim-kurumlari-umraniye/1065', category: 'Showrooms', order: 9 },
  { path: '/ReferansDetay/akik-gumus/1066',                  category: 'Showrooms', order: 10 },
  { path: '/ReferansDetay/petzz-shop/1067',                  category: 'Showrooms', order: 11 },
  // KÜÇÜK İŞLETMELER
  { path: '/ReferansDetay/bizim-bahce-erenkoy/36',           category: 'SmallBusiness', order: 1 },
  { path: '/ReferansDetay/zafer---atilla-kuafor/41',         category: 'SmallBusiness', order: 2 },
  { path: '/ReferansDetay/ortodonti-klinigi-atasehir/46',    category: 'SmallBusiness', order: 3 },
  { path: '/ReferansDetay/saloon-locca/51',                  category: 'SmallBusiness', order: 4 },
  { path: '/ReferansDetay/karadeniz-veteriner/1053',         category: 'SmallBusiness', order: 5 },
  { path: '/ReferansDetay/san-kuafor-tuzla/2114',            category: 'SmallBusiness', order: 6 },
  // DİĞER
  { path: '/ReferansDetay/piramid-sanat/1078',               category: 'Other', order: 1 },
  { path: '/ReferansDetay/plures-air/2109',                  category: 'Other', order: 2 },
  { path: '/ReferansDetay/esin-baysal-beauty-center/2112',   category: 'Other', order: 3 },
  { path: '/ReferansDetay/emsal-dogan-atasehir/2113',        category: 'Other', order: 4 },
  { path: '/ReferansDetay/orman-bolge-mudurlugu/2115',       category: 'Other', order: 5 },
]

function stripHtml(html) {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#[0-9]+;/g, '')
    .replace(/\s+/g, ' ').trim()
}

function extractUUID(url) {
  const match = url.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i)
  return match?.[1] || null
}

function parseHtml(html, category) {
  // Street View iframe src
  const iframeMatch = html.match(/<iframe[^>]+src="([^"]*google[^"]*)"/i)
  const streetViewUrl = iframeMatch?.[1] || ''

  // Title
  const titleMatch = html.match(/<span class="Title">([^<]+)<\/span>/)
  const title = titleMatch?.[1]?.trim() || ''

  // Sector (Text01)
  const sectorMatch = html.match(/<span class="Text01">([^<]+)<\/span>/)
  const sector = sectorMatch?.[1]?.trim() || ''

  // Phone
  const phoneMatch = html.match(/<span class="Phone">([^<]+)<\/span>/)
  const telephoneNumber = phoneMatch?.[1]?.trim() || ''

  // Address (note: "Adress" is a typo in original)
  const addrMatch = html.match(/<span class="Adress">([\s\S]*?)<\/span>/)
  const address = addrMatch ? stripHtml(addrMatch[1]) : ''

  // Description (TextContent div)
  const descMatch = html.match(/<div class="TextContent">([\s\S]*?)<\/div>\s*<\/div>/)
  const description = descMatch ? stripHtml(descMatch[1]) : ''

  // Gallery: fancybox href links pointing to /Content/
  const galleryUrls = []
  const galleryRe = /href="((?:https?:\/\/ekip360\.net)?\/Content\/[^"]+\.jpg)"/gi
  let m
  while ((m = galleryRe.exec(html)) !== null) {
    const url = m[1].startsWith('http') ? m[1] : `${BASE_URL}${m[1]}`
    if (!galleryUrls.includes(url)) galleryUrls.push(url)
  }

  // Thumbnail: look for thumbnail img in ReferansListThumb or first gallery
  const thumbMatch = html.match(/<img[^>]+src="(\/Content\/[^"]+(?:thumb|Thumb|thumbnail)[^"]*\.(?:jpg|png))"/i)
  const thumbnailUrl = thumbMatch ? `${BASE_URL}${thumbMatch[1]}` : (galleryUrls[0] || null)

  return { title, category, streetViewUrl, sector, telephoneNumber, address, description, galleryUrls, thumbnailUrl }
}

async function uploadFromFile(filePath, filename) {
  const ext = path.extname(filePath).slice(1).toLowerCase()
  const contentType = ext === 'png' ? 'image/png' : 'image/jpeg'
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: filename || path.basename(filePath),
    contentType,
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function uploadFromUrl(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const filename = path.basename(new URL(url).pathname)
  const ext = path.extname(filename).slice(1).toLowerCase()
  const contentType = ext === 'png' ? 'image/png' : 'image/jpeg'
  const asset = await client.assets.upload('image', buffer, { filename, contentType })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function resolveImage(url) {
  const uuid = extractUUID(url)
  if (uuid) {
    // Try backup files first (faster, no network needed)
    const candidates = [
      path.join(THUMB_DIR, `${uuid}.jpg`),
      path.join(THUMB_DIR, `thmb_${uuid}.jpg`),
      path.join(CONTENT_DIR, `${uuid}.jpg`),
    ]
    for (const p of candidates) {
      if (fs.existsSync(p)) return uploadFromFile(p)
    }
  }
  // Fall back to live site download
  return uploadFromUrl(url)
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function run() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ SANITY_WRITE_TOKEN eksik.')
    process.exit(1)
  }

  // 1. Mevcut tüm referansları sil
  console.log('🗑️  Mevcut referanslar siliniyor...')
  const existing = await client.fetch(`*[_type == "referans"]{ _id }`)
  if (existing.length > 0) {
    const tx = client.transaction()
    existing.forEach(doc => tx.delete(doc._id))
    await tx.commit()
    console.log(`   ${existing.length} belge silindi.\n`)
  } else {
    console.log('   Silinecek belge yok.\n')
  }

  // 2. Her referansı canlı siteden çek ve Sanity'e yükle
  const total = ALL_REFS.length
  for (let i = 0; i < total; i++) {
    const ref = ALL_REFS[i]
    const prefix = `[${i + 1}/${total}]`

    console.log(`${prefix} Çekiliyor: ${BASE_URL}${ref.path}`)
    let html
    try {
      const res = await fetch(`${BASE_URL}${ref.path}`)
      if (!res.ok) { console.warn(`  ⚠️  HTTP ${res.status}, atlanıyor.\n`); continue }
      html = await res.text()
    } catch (e) {
      console.warn(`  ⚠️  Fetch hatası: ${e.message}, atlanıyor.\n`); continue
    }

    const data = parseHtml(html, ref.category)
    if (!data.title) {
      console.warn(`  ⚠️  Başlık bulunamadı, atlanıyor.\n`); continue
    }
    console.log(`  📌 ${data.title}`)

    // Thumbnail yükle
    let thumbnail = null
    if (data.thumbnailUrl) {
      try {
        thumbnail = await resolveImage(data.thumbnailUrl)
        console.log(`  🖼️  Thumbnail yüklendi`)
      } catch (e) {
        console.warn(`  ⚠️  Thumbnail yüklenemedi: ${e.message}`)
      }
    }

    // Galeri yükle (ilk 12 görsel, thumbnail hariç)
    const gallery = []
    const galleryUrls = data.galleryUrls.filter(u => u !== data.thumbnailUrl).slice(0, 12)
    for (const url of galleryUrls) {
      try {
        const img = await resolveImage(url)
        gallery.push(img)
      } catch (e) {
        console.warn(`  ⚠️  Galeri görseli yüklenemedi: ${path.basename(url)}`)
      }
    }
    if (gallery.length) console.log(`  🗂️  ${gallery.length} galeri görseli yüklendi`)

    // Sanity belgesi oluştur
    const doc = {
      _type: 'referans',
      title: data.title,
      category: data.category,
      sector: data.sector,
      telephoneNumber: data.telephoneNumber,
      address: data.address,
      streetViewUrl: data.streetViewUrl,
      description: data.description,
      order: ref.order,
      ...(thumbnail && { thumbnail }),
      ...(gallery.length && { gallery }),
    }

    try {
      await client.create(doc)
      console.log(`  ✅ Oluşturuldu\n`)
    } catch (e) {
      console.error(`  ❌ Oluşturma hatası: ${e.message}\n`)
    }

    // Rate limiting için kısa bekleme
    await new Promise(r => setTimeout(r, 300))
  }

  console.log('🎉 Import tamamlandı!')
}

run()
