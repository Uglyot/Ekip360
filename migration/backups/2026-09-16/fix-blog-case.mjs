/**
 * Blog yazılarında import-blog.mjs'teki /gi entity decode hatasının küçülttüğü Ç/Ö/Ü'leri düzeltir (2026-09-16).
 * Girdi: blog-case-proposals.json — Wayback arşivinden, hatalı decoder (bugünkü veriyi birebir üretir) ile
 * yalnızca case-sensitive farkı olan decoder karşılaştırılarak üretildi. Yalnızca etkilenen blokların metni
 * ve buna bağlı summary yazılır; yazarın metnindeki başka hiçbir şeye dokunulmaz.
 *
 *   DRY_RUN=1 SANITY_WRITE_TOKEN=... node fix-blog-case.mjs
 *   SANITY_WRITE_TOKEN=... node fix-blog-case.mjs
 * Sıra: yedek → drift kontrolü (öneriden beri metin değişti mi) → yaz (ifRevisionId) → doğrula.
 */
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const DIR = path.dirname(new URL(import.meta.url).pathname)
const DRY_RUN = process.env.DRY_RUN === '1'
const client = createClient({ projectId: '1gjnai7w', dataset: 'production', apiVersion: '2024-01-01', token: process.env.SANITY_WRITE_TOKEN, useCdn: false })

const proposals = JSON.parse(fs.readFileSync(path.join(DIR, 'blog-case-proposals.json'), 'utf8'))
  .filter(p => p.status === 'ok' && (p.blocks.length || (p.summary && p.summary.old !== p.summary.new)))
const docs = await client.fetch(`*[_type == "blogPost"]`)
if (docs.some(d => d._id.startsWith('drafts.'))) throw new Error('Taslak blog yazısı var — önce Studio’da çöz')
const byId = Object.fromEntries(docs.map(d => [d._id, d]))

const textOf = b => (b.children || []).map(c => c.text).join('')
const plan = [], drift = []
for (const p of proposals) {
  const doc = byId[p.sanityId]
  if (!doc) { drift.push(`${p.id}: doküman yok`); continue }
  const set = {}
  for (const blk of p.blocks) {
    const cur = (doc.body || []).find(b => b._key === blk.key)
    if (!cur || textOf(cur) !== blk.old || cur.children.length !== 1) { drift.push(`${p.id} blok ${blk.i}: metin öneriden sonra değişmiş`); continue }
    set[`body[_key=="${blk.key}"].children[_key=="${blk.childKeys[0]}"].text`] = blk.new
  }
  if (p.summary && p.summary.old !== p.summary.new) {
    if (doc.summary !== p.summary.old) drift.push(`${p.id} summary: öneriden sonra değişmiş`)
    else set.summary = p.summary.new
  }
  plan.push({ p, doc, set })
}
const nBlocks = plan.reduce((a, x) => a + Object.keys(x.set).filter(k => k.startsWith('body')).length, 0)
const nSummary = plan.filter(x => 'summary' in x.set).length
console.log(`Yazılacak: ${plan.length} yazı | ${nBlocks} blok | ${nSummary} summary | kayma: ${drift.length}`)
drift.forEach(d => console.log('  ⚠️ ', d))
if (drift.length) { console.log('Kayma var — hiçbir şey yazılmadı.'); process.exit(1) }
if (DRY_RUN) { console.log('DRY RUN — yazma yapılmadı.'); process.exit(0) }

const backup = path.join(DIR, 'blog-backup-before-case-fix.json')
fs.writeFileSync(backup, JSON.stringify(docs, null, 2))
console.log(`Yedek: ${path.basename(backup)} (${docs.length} yazı)`)
let ok = 0; const failed = []
for (const { p, doc, set } of plan) {
  try { await client.patch(doc._id).ifRevisionId(doc._rev).set(set).commit(); ok++ }
  catch (e) { failed.push(`${p.id}: ${e.message}`) }
}
console.log(`Yazıldı: ${ok}/${plan.length} | hata: ${failed.length}`); failed.forEach(f => console.log('  ❌', f))
if (failed.length) process.exit(1)

// Doğrula: etkilenen bloklar yeni metinde, geri kalan her şey yedekle aynı
const after = Object.fromEntries((await client.fetch(`*[_type == "blogPost"]`)).map(d => [d._id, d]))
const before = Object.fromEntries(docs.map(d => [d._id, d]))
const problems = []
for (const id of Object.keys(before)) {
  const exp = JSON.parse(JSON.stringify(before[id]))
  const x = plan.find(q => q.doc._id === id)
  if (x) {
    for (const blk of x.p.blocks) exp.body.find(b => b._key === blk.key).children[0].text = blk.new
    if ('summary' in x.set) exp.summary = x.set.summary
  }
  const keys = new Set([...Object.keys(exp), ...Object.keys(after[id])])
  for (const k of keys) if (!['_rev', '_updatedAt'].includes(k) && JSON.stringify(exp[k]) !== JSON.stringify(after[id][k])) problems.push(`${id}.${k}`)
}
console.log(`Doğrulama: ${problems.length ? 'SORUN ' + problems.join(', ') : 'yedek + beklenen değişiklikler = güncel veri (fark 0)'}`)
