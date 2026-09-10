/**
 * Eksik thumbnail'leri Sanity'de günceller.
 * Çalıştır: SANITY_WRITE_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2) node scripts/fix-missing-thumbnails.mjs
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

async function uploadImage(filename) {
  const filePath = path.join(CONTENT_DIR, filename)
  const ext = path.extname(filename).slice(1).toLowerCase()
  const contentType = ext === 'png' ? 'image/png' : 'image/jpeg'
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename,
    contentType,
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

const fixes = [
  { title: 'RE/MAX Yıldız',              thumbnail: 'remax.png' },
  { title: 'Hasuran Grup Yetkili Beko Bayii', thumbnail: 'beko.png' },
]

async function run() {
  for (const fix of fixes) {
    console.log(`🔍 "${fix.title}" aranıyor...`)
    const docs = await client.fetch(`*[_type == "referans" && title == $title]{ _id }`, { title: fix.title })
    if (!docs.length) { console.warn(`  ⚠️  Bulunamadı\n`); continue }

    console.log(`  📷 Thumbnail yükleniyor: ${fix.thumbnail}`)
    const thumbnailAsset = await uploadImage(fix.thumbnail)

    await client.patch(docs[0]._id).set({ thumbnail: thumbnailAsset }).commit()
    console.log(`  ✅ Güncellendi\n`)
  }
  console.log('🎉 Tamamlandı!')
}

run()
