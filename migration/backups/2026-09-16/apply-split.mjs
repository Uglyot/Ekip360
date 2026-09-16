/**
 * Referans address/description/website/telephoneNumber ayrıştırmasını Sanity'ye yazar.
 * Kaynak: final-proposals.json (Wayback arşivinden üretildi, kullanıcı onaylı review).
 *
 *   DRY_RUN=1 SANITY_WRITE_TOKEN=... node apply-split.mjs   → yazmaz, özet + fark
 *   SANITY_WRITE_TOKEN=... node apply-split.mjs             → yazar (ifRevisionId kilidiyle)
 */
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const DIR = path.dirname(new URL(import.meta.url).pathname)
const DRY_RUN = process.env.DRY_RUN === '1'
const FIELDS = ['address', 'description', 'website', 'telephoneNumber']
const client = createClient({ projectId: '1gjnai7w', dataset: 'production', apiVersion: '2024-01-01', token: process.env.SANITY_WRITE_TOKEN, useCdn: false })

const proposals = JSON.parse(fs.readFileSync(path.join(DIR, 'final-proposals.json'), 'utf8'))
const current = await client.fetch(`*[_type == "referans"]`)
const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const backup = path.join(DIR, `referans-backup-before-split-${stamp}.json`)
fs.writeFileSync(backup, JSON.stringify(current, null, 2))
console.log(`Yedek: ${backup} (${current.length} doküman, drafts: ${current.filter(d => d._id.startsWith('drafts.')).length})`)

const byId = Object.fromEntries(current.map(d => [d._id, d]))
const same = (a, b) => (a ?? '') === (b ?? '')
const plan = [], drift = []
for (const p of proposals) {
  const doc = byId[p._id]
  if (!doc) { drift.push(`${p.title}: doküman bulunamadı`); continue }
  // Öneri hazırlandığından beri alanlar değişti mi?
  const changedSince = FIELDS.filter(k => !same(doc[k], p.old[k]))
  if (changedSince.length) { drift.push(`${p.title}: ${changedSince.join(', ')} öneriden sonra değişmiş`); continue }
  const set = {}
  for (const k of FIELDS) if (!same(p.old[k], p.new[k])) set[k] = p.new[k]
  if (Object.keys(set).length) plan.push({ p, doc, set })
}
console.log(`Yazılacak: ${plan.length} doküman | kayma (atlanacak): ${drift.length}`)
drift.forEach(d => console.log('  ⚠️ ', d))
const fieldCount = {}; plan.forEach(x => Object.keys(x.set).forEach(k => fieldCount[k] = (fieldCount[k] || 0) + 1))
console.log('Alan bazında:', fieldCount)
if (drift.length) { console.log('Kayma var — hiçbir şey yazılmadı.'); process.exit(1) }

if (DRY_RUN) {
  for (const { p, set } of plan) console.log(`  [DRY RUN] ${p._id} | ${p.title} | ${Object.keys(set).join(', ')}`)
  console.log('DRY RUN — yazma yapılmadı.')
  process.exit(0)
}

let ok = 0
const failed = []
for (const { p, doc, set } of plan) {
  try {
    await client.patch(p._id).ifRevisionId(doc._rev).set(set).commit()
    ok++
    console.log(`  ✅ ${p.title} (${Object.keys(set).join(', ')})`)
  } catch (e) {
    failed.push(`${p.title}: ${e.message}`)
    console.log(`  ❌ ${p.title}: ${e.message}`)
  }
}
console.log(`Yazıldı: ${ok}/${plan.length} | hata: ${failed.length}`)
if (failed.length) process.exit(1)
