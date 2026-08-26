// Eski /ReferansDetay/<slug>/<pk> adreslerindeki slug'lari, mevcut Sanity
// referans basliklarindan turetilen slug'larla eslestirir.
// Kullanim: node --env-file=.env.local scripts/generate-referans-slug-map.mjs
import { createClient } from 'next-sanity'
import { writeFileSync } from 'node:fs'
import { normalizeSlug as slugify } from '../lib/slug-normalize.mjs'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const refs = await client.fetch('*[_type == "referans" && defined(title)] { _id, title }')

/** @type {Record<string, string>} */
const map = {}
let collisions = 0
for (const ref of refs) {
  const slug = slugify(ref.title)
  if (!slug) continue
  if (map[slug] && map[slug] !== ref._id) {
    collisions++
    continue // ilk eslesme kazanir
  }
  map[slug] = ref._id
}

writeFileSync('lib/referans-slug-map.json', JSON.stringify(map, null, 2))
console.log(`Toplam referans: ${refs.length}, harita girisi: ${Object.keys(map).length}, cakisma: ${collisions}`)
