/**
 * Thumbnail eksik 5 referansı düzeltir.
 * SANITY_WRITE_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2) node scripts/fix-missing-thumbnails-v2.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
  projectId: '1gjnai7w', dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN, useCdn: false,
})

const BASE_URL = 'https://ekip360.net'
const THUMB_DIR = '/Users/tolgabalikci/Documents/Projects/COWORK-OS/ekip360-website-backup/httpdocs/Content/Thumb'
const CONTENT_DIR = '/Users/tolgabalikci/Documents/Projects/COWORK-OS/ekip360-website-backup/httpdocs/Content'

const TARGETS = [
  { title: 'BW President',         sitePath: '/ReferansDetay/bw-president/2079' },
  { title: 'Weavers Tekstil',      sitePath: '/ReferansDetay/weavers-tekstil/1058' },
  { title: 'Karadeniz Veteriner',  sitePath: '/ReferansDetay/karadeniz-veteriner/1053' },
  { title: 'Piramid Sanat',        sitePath: '/ReferansDetay/piramid-sanat/1078' },
  { title: 'Orman Bölge Müdürlüğü', sitePath: '/ReferansDetay/orman-bolge-mudurlugu/2115' },
]

function extractUUID(url) {
  return url.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i)?.[1] || null
}

async function uploadFromFile(filePath) {
  const ext = path.extname(filePath).slice(1).toLowerCase()
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: path.basename(filePath),
    contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function uploadFromUrl(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const filename = path.basename(new URL(url).pathname)
  const ext = path.extname(filename).slice(1).toLowerCase()
  const asset = await client.assets.upload('image', buffer, {
    filename, contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function resolveImage(url) {
  const uuid = extractUUID(url)
  if (uuid) {
    for (const p of [
      path.join(THUMB_DIR, `${uuid}.jpg`),
      path.join(THUMB_DIR, `thmb_${uuid}.jpg`),
      path.join(CONTENT_DIR, `${uuid}.jpg`),
    ]) {
      if (fs.existsSync(p)) return uploadFromFile(p)
    }
  }
  // Named files — check Content dir
  const filename = path.basename(new URL(url.startsWith('http') ? url : `http://x.com${url}`).pathname)
  const namedPath = path.join(CONTENT_DIR, filename)
  if (fs.existsSync(namedPath)) return uploadFromFile(namedPath)

  return uploadFromUrl(url.startsWith('http') ? url : `${BASE_URL}${url}`)
}

function extractImageUrls(html) {
  const urls = []
  // Named thumbnail (Content dir, not Thumb)
  const namedRe = /src="(\/Content\/(?!Thumb)[^"]+\.(?:jpg|png))"/gi
  let m
  while ((m = namedRe.exec(html)) !== null) urls.push(m[1])
  // Fancybox gallery links
  const galleryRe = /href="((?:https?:\/\/ekip360\.net)?\/Content\/[^"]+\.jpg)"/gi
  while ((m = galleryRe.exec(html)) !== null) {
    const u = m[1].startsWith('http') ? m[1] : `${BASE_URL}${m[1]}`
    if (!urls.includes(u)) urls.push(u)
  }
  return urls
}

async function run() {
  for (const target of TARGETS) {
    console.log(`\n🔍 ${target.title}`)

    // Sanity'de bul
    const doc = await client.fetch(
      `*[_type == "referans" && title == $title][0]{ _id, thumbnail }`,
      { title: target.title }
    )
    if (!doc) { console.warn('  ⚠️  Sanity\'de bulunamadı'); continue }
    if (doc.thumbnail) { console.log('  ✅ Zaten thumbnail var, atlanıyor'); continue }

    // Sayfayı çek
    const res = await fetch(`${BASE_URL}${target.sitePath}`)
    const html = await res.text()
    const imageUrls = extractImageUrls(html)

    if (!imageUrls.length) { console.warn('  ⚠️  Hiç görsel bulunamadı'); continue }

    // İlk yüklenebilen görseli thumbnail olarak kullan
    let uploaded = null
    for (const url of imageUrls) {
      try {
        uploaded = await resolveImage(url)
        console.log(`  🖼️  Thumbnail yüklendi: ${url.split('/').pop()}`)
        break
      } catch (e) {
        console.warn(`  ⚠️  ${url.split('/').pop()} yüklenemedi: ${e.message}`)
      }
    }

    if (uploaded) {
      await client.patch(doc._id).set({ thumbnail: uploaded }).commit()
      console.log('  ✅ Güncellendi')
    } else {
      console.warn('  ❌ Thumbnail yüklenemedi')
    }
  }
  console.log('\n🎉 Tamamlandı!')
}

run()
