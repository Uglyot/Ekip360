/**
 * Referans gallery dizilerinde _key'i eksik öğelere benzersiz anahtar atar (2026-09-16).
 * Eski import (import-referanslar-full.mjs) galeri öğelerini _key'siz yazmıştı; Studio bu yüzden
 * "Missing keys" uyarısı gösteriyor. Öğelerin sırası ve içeriği değişmez, yalnızca _key eklenir.
 *
 *   DRY_RUN=1 SANITY_WRITE_TOKEN=... node backfill-gallery-keys.mjs
 *   SANITY_WRITE_TOKEN=... node backfill-gallery-keys.mjs
 * Yazmadan önce tüm referansların yedeğini aynı klasöre alır; her doküman ifRevisionId kilidiyle yazılır.
 */
import { createClient } from '@sanity/client'
import { randomUUID } from 'crypto'
import fs from 'fs'
import path from 'path'

const DIR = path.dirname(new URL(import.meta.url).pathname)
const DRY_RUN = process.env.DRY_RUN === '1'
const client = createClient({ projectId: '1gjnai7w', dataset: 'production', apiVersion: '2024-01-01', token: process.env.SANITY_WRITE_TOKEN, useCdn: false })
const newKey = () => randomUUID().replace(/-/g, '').slice(0, 12)

const docs = await client.fetch(`*[_type == "referans"]`)
const drafts = docs.filter(d => d._id.startsWith('drafts.'))
if (drafts.length) throw new Error(`Taslak var: ${drafts.map(d => d._id).join(', ')}`)

const plan = []
for (const d of docs) {
  const g = d.gallery || []
  const missing = g.filter(it => !it._key).length
  if (!missing) continue
  const used = new Set(g.map(it => it._key).filter(Boolean))
  const gallery = g.map(it => {
    if (it._key) return it
    let k; do { k = newKey() } while (used.has(k)); used.add(k)
    return { _key: k, ...it }
  })
  plan.push({ d, missing, gallery })
}
const items = plan.reduce((a, p) => a + p.missing, 0)
const withGallery = docs.filter(d => (d.gallery || []).length).length
console.log(`Referans: ${docs.length} | galerisi olan: ${withGallery} | _key eksik doküman: ${plan.length} | eksik öğe: ${items}`)
if (DRY_RUN) { plan.forEach(p => console.log(`  [DRY RUN] ${p.d._id} | ${p.d.title} | ${p.missing}/${p.d.gallery.length}`)); process.exit(0) }

const backup = path.join(DIR, 'referans-backup-before-gallery-keys.json')
fs.writeFileSync(backup, JSON.stringify(docs, null, 2))
console.log(`Yedek: ${path.basename(backup)}`)
let ok = 0; const failed = []
for (const { d, gallery } of plan) {
  try { await client.patch(d._id).ifRevisionId(d._rev).set({ gallery }).commit(); ok++ }
  catch (e) { failed.push(`${d.title}: ${e.message}`) }
}
console.log(`Yazıldı: ${ok}/${plan.length} | hata: ${failed.length}`); failed.forEach(f => console.log('  ❌', f))
if (failed.length) process.exit(1)
