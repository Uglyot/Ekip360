/**
 * Mükerrer "Ortodonti Kliniği Ataşehir" kaydını birleştirir ve siler (2026-09-16, kullanıcı onaylı).
 *   Tutulan: 17ox3PpQLMa8F5kjsFkvVg  ← APlZ'den: yalnızca APlZ'de olan galeri görselleri, sector, address
 *   Silinen: APlZU7cpSt0Sg8o1ric82v
 * Yazmadan önce iki dokümanın tam yedeğini aynı klasöre alır. Birleştirme + silme tek transaction'da,
 * iki doküman için de ifRevisionId kilidiyle.
 *
 *   DRY_RUN=1 SANITY_WRITE_TOKEN=... node merge-ortodonti-duplicate.mjs
 *   SANITY_WRITE_TOKEN=... node merge-ortodonti-duplicate.mjs
 */
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const DIR = path.dirname(new URL(import.meta.url).pathname)
const KEEP = '17ox3PpQLMa8F5kjsFkvVg'
const DROP = 'APlZU7cpSt0Sg8o1ric82v'
const DRY_RUN = process.env.DRY_RUN === '1'
const client = createClient({ projectId: '1gjnai7w', dataset: 'production', apiVersion: '2024-01-01', token: process.env.SANITY_WRITE_TOKEN, useCdn: false })

const docs = await client.fetch(`*[_id in [$keep, $drop, "drafts." + $keep, "drafts." + $drop]]`, { keep: KEEP, drop: DROP })
const keep = docs.find(d => d._id === KEEP), drop = docs.find(d => d._id === DROP)
if (!keep || !drop) throw new Error('Dokümanlardan biri bulunamadı')
if (docs.some(d => d._id.startsWith('drafts.'))) throw new Error('Taslak var — Studio’da yayınla/sil, sonra tekrar çalıştır')
const incoming = await client.fetch(`count(*[references($drop)])`, { drop: DROP })
if (incoming) throw new Error(`${DROP} dokümanına ${incoming} referans var`)

const backup = path.join(DIR, 'ortodonti-duplicate-backup-before-merge.json')
if (!DRY_RUN) fs.writeFileSync(backup, JSON.stringify([keep, drop], null, 2))

const keepAssets = (keep.gallery || []).map(g => g.asset?._ref)
// Eski import'taki galeri öğelerinde _key yok; eklenenlere benzersiz anahtar verilir, mevcutlara dokunulmaz
const extra = (drop.gallery || [])
  .filter(g => !keepAssets.includes(g.asset?._ref))
  .map((g, i) => ({ ...g, _key: `merged${Date.now().toString(36)}${i}` }))
const set = { sector: drop.sector, address: drop.address }

console.log(`Tut: ${KEEP} (rev ${keep._rev}) | Sil: ${DROP} (rev ${drop._rev})`)
console.log(`  galeri: ${keepAssets.length} + ${extra.length} → ${keepAssets.length + extra.length}`, extra.map(g => g.asset._ref))
console.log(`  sector : ${JSON.stringify(keep.sector)} → ${JSON.stringify(set.sector)}`)
console.log(`  address: ${JSON.stringify(keep.address)} → ${JSON.stringify(set.address)}`)
if (DRY_RUN) { console.log('DRY RUN — yazma yapılmadı.'); process.exit(0) }

const tx = client.transaction()
  .patch(client.patch(KEEP).ifRevisionId(keep._rev).set(set).setIfMissing({ gallery: [] }).append('gallery', extra))
  .patch(client.patch(DROP).ifRevisionId(drop._rev).set({ title: drop.title }))  // değeri aynı; yalnızca DROP revizyonunu kilitler
  .delete(DROP)
const res = await tx.commit()
console.log(`Yedek: ${path.basename(backup)} | transaction: ${res.transactionId}`)
