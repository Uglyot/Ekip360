/**
 * Sanity'deki referansların title, sector, address, description alanlarındaki
 * HTML entity'lerini düzeltir ve BW Eresin İstanbul'u ekler.
 *
 * Çalıştır:
 *   SANITY_WRITE_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2) node scripts/fix-html-entities.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'

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

function decodeEntities(str) {
  if (!str) return str
  return str
    // büyük harf varyantları ÖNCE, case-insensitive olmadan
    .replace(/&Ccedil;/g, 'Ç')
    .replace(/&Uuml;/g,  'Ü')
    .replace(/&Ouml;/g,  'Ö')
    // küçük harf varyantları
    .replace(/&ccedil;/g, 'ç')
    .replace(/&uuml;/g,  'ü')
    .replace(/&ouml;/g,  'ö')
    // tırnak/noktalama
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    // birim
    .replace(/&sup2;/g, '²')
    .trim()
}

function stripHtml(html) {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#[0-9]+;/g, m => {
      const code = parseInt(m.slice(2, -1))
      return String.fromCharCode(code)
    })
    .replace(/\s+/g, ' ').trim()
}

function extractUUID(url) {
  const match = url.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i)
  return match?.[1] || null
}

async function uploadFromFile(filePath) {
  const { createReadStream } = await import('fs')
  const path = await import('path')
  const ext = path.default.extname(filePath).slice(1).toLowerCase()
  const contentType = ext === 'png' ? 'image/png' : 'image/jpeg'
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename: path.default.basename(filePath), contentType,
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function uploadFromUrl(url) {
  const path = await import('path')
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const filename = path.default.basename(new URL(url).pathname)
  const ext = path.default.extname(filename).slice(1).toLowerCase()
  const contentType = ext === 'png' ? 'image/png' : 'image/jpeg'
  const asset = await client.assets.upload('image', buffer, { filename, contentType })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function resolveImage(url) {
  const path = await import('path')
  const uuid = extractUUID(url)
  if (uuid) {
    const candidates = [
      path.default.join(THUMB_DIR, `${uuid}.jpg`),
      path.default.join(THUMB_DIR, `thmb_${uuid}.jpg`),
      path.default.join(CONTENT_DIR, `${uuid}.jpg`),
    ]
    for (const p of candidates) {
      if (fs.existsSync(p)) return uploadFromFile(p)
    }
  }
  return uploadFromUrl(url)
}

function parseHtml(html, category) {
  const iframeMatch = html.match(/<iframe[^>]+src="([^"]*google[^"]*)"/i)
  const streetViewUrl = iframeMatch?.[1] || ''
  const titleMatch = html.match(/<span class="Title">([^<]+)<\/span>/)
  const title = decodeEntities(titleMatch?.[1]?.trim() || '')
  const sectorMatch = html.match(/<span class="Text01">([^<]+)<\/span>/)
  const sector = decodeEntities(sectorMatch?.[1]?.trim() || '')
  const phoneMatch = html.match(/<span class="Phone">([^<]+)<\/span>/)
  const telephoneNumber = decodeEntities(phoneMatch?.[1]?.trim() || '')
  const addrMatch = html.match(/<span class="Adress">([\s\S]*?)<\/span>/)
  const address = addrMatch ? decodeEntities(stripHtml(addrMatch[1])) : ''
  const descMatch = html.match(/<div class="TextContent">([\s\S]*?)<\/div>\s*<\/div>/)
  const description = descMatch ? decodeEntities(stripHtml(descMatch[1])) : ''
  const galleryUrls = []
  const galleryRe = /href="((?:https?:\/\/ekip360\.net)?\/Content\/[^"]+\.jpg)"/gi
  let m
  while ((m = galleryRe.exec(html)) !== null) {
    const url = m[1].startsWith('http') ? m[1] : `${BASE_URL}${m[1]}`
    if (!galleryUrls.includes(url)) galleryUrls.push(url)
  }
  const thumbMatch = html.match(/<img[^>]+src="(\/Content\/[^"]+(?:thumb|Thumb|thumbnail)[^"]*\.(?:jpg|png))"/i)
  const thumbnailUrl = thumbMatch ? `${BASE_URL}${thumbMatch[1]}` : (galleryUrls[0] || null)
  return { title, category, streetViewUrl, sector, telephoneNumber, address, description, galleryUrls, thumbnailUrl }
}

async function run() {
  // 1. Mevcut tüm referansların entity'lerini düzelt
  console.log('🔧 HTML entity\'ler düzeltiliyor...')
  // DRY_RUN=1 → yazma yok, eski/yeni değerleri basar. ONLY_TITLE="..." → tek kayıt.
  const DRY_RUN = process.env.DRY_RUN === '1'
  const ONLY_TITLE = process.env.ONLY_TITLE
  const docs = await client.fetch(
    `*[_type == "referans" ${ONLY_TITLE ? '&& title == $title' : ''}]{ _id, title, sector, address, description }`,
    ONLY_TITLE ? { title: ONLY_TITLE } : {}
  )

  let fixed = 0
  for (const doc of docs) {
    const newTitle   = decodeEntities(doc.title || '')
    const newSector  = decodeEntities(doc.sector || '')
    const newAddress = decodeEntities(doc.address || '')
    const newDesc    = decodeEntities(doc.description || '')

    if (newTitle !== doc.title || newSector !== doc.sector || newAddress !== doc.address || newDesc !== doc.description) {
      if (DRY_RUN) {
        fixed++
        console.log(`\n  [DRY RUN] ${doc._id} | ${doc.title}`)
        for (const [f, oldV, newV] of [['title', doc.title, newTitle], ['sector', doc.sector, newSector], ['address', doc.address, newAddress], ['description', doc.description, newDesc]]) {
          if (oldV !== newV) console.log(`    ${f} ESKİ: ${JSON.stringify(oldV)}\n    ${f} YENİ: ${JSON.stringify(newV)}`)
        }
        continue
      }
      await client.patch(doc._id).set({
        title: newTitle,
        sector: newSector,
        address: newAddress,
        description: newDesc,
      }).commit()
      fixed++
      console.log(`  ✅ Düzeltildi: ${newTitle}`)
    }
  }
  console.log(`  ${fixed} belge ${DRY_RUN ? 'düzeltilecek (dry run)' : 'düzeltildi'}.\n`)
  if (DRY_RUN || ONLY_TITLE) return

  // 2. BW Eresin İstanbul'u ekle (network hatasıyla atlanmıştı)
  console.log('➕ BW Eresin İstanbul ekleniyor...')
  const exists = await client.fetch(`*[_type == "referans" && title == "BW Eresin İstanbul"][0]{ _id }`)
  if (exists) {
    console.log('  Zaten mevcut, atlanıyor.\n')
  } else {
    const res = await fetch(`${BASE_URL}/ReferansDetay/bw-eresin-istanbul/2084`)
    const html = await res.text()
    const data = parseHtml(html, 'Hotels')

    let thumbnail = null
    if (data.thumbnailUrl) {
      try { thumbnail = await resolveImage(data.thumbnailUrl) } catch (e) { console.warn('  ⚠️  Thumbnail yüklenemedi') }
    }
    const gallery = []
    for (const url of data.galleryUrls.filter(u => u !== data.thumbnailUrl).slice(0, 12)) {
      try { gallery.push(await resolveImage(url)) } catch {}
    }

    await client.create({
      _type: 'referans',
      title: data.title || 'BW Eresin İstanbul',
      category: 'Hotels',
      sector: data.sector,
      telephoneNumber: data.telephoneNumber,
      address: data.address,
      streetViewUrl: data.streetViewUrl,
      description: data.description,
      order: 12,
      ...(thumbnail && { thumbnail }),
      ...(gallery.length && { gallery }),
    })
    console.log(`  ✅ BW Eresin İstanbul oluşturuldu (${gallery.length} galeri görseli)\n`)
  }

  console.log('🎉 Tamamlandı!')
}

run()
