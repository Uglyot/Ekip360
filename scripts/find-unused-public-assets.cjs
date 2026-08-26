// public/ altindaki dosyalari tarar; adi kod tabaninda hic gecmeyenleri raporlar.
// Kullanim: node scripts/find-unused-public-assets.cjs
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PUB = path.join(ROOT, 'public');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// Tarama disi: sunucu tarafindan dogrudan servis edilen kok dosyalari da dahil et,
// ama kendi kendini referans saymamasi icin icerik havuzunu ayri topla.
const haystackFiles = [];
for (const base of ['app', 'components', 'lib', 'scripts', 'middleware.js', 'next.config.mjs']) {
  const p = path.join(ROOT, base);
  if (!fs.existsSync(p)) continue;
  const st = fs.statSync(p);
  if (st.isFile()) haystackFiles.push(p);
  else haystackFiles.push(...walk(p));
}
for (const ext of ['.css', '.js']) {
  const files = walk(PUB).filter((f) => f.endsWith(ext));
  haystackFiles.push(...files);
}

const haystack = haystackFiles
  .map((f) => {
    try {
      return fs.readFileSync(f, 'utf8');
    } catch {
      return '';
    }
  })
  .join('\n');

const skipDirs = new Set(['dev', 'cache']);
const unused = [];
let total = 0;

for (const f of walk(PUB)) {
  const rel = path.relative(PUB, f);
  if (rel.split(path.sep)[0] === '.DS_Store') continue;
  if (/\.DS_Store$/.test(rel)) continue;
  total++;
  const base = path.basename(f);
  // yalnizca benzersiz isimlerde guvenli arama; yaygin isimler (index.html vb.) atlanir
  if (['index.html', 'robots.txt'].includes(base)) continue;
  if (!haystack.includes(base)) unused.push(rel);
}

console.log('Toplam public dosyasi:', total);
console.log('\n== Kod tabaninda referansi bulunmayan dosyalar ==');
unused.sort().forEach((u) => {
  const size = fs.statSync(path.join(PUB, u)).size;
  console.log(`${(size / 1024).toFixed(0)}KB\t${u}`);
});
