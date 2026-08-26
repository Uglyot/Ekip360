// Slug normalizasyonu — TEK KAYNAK.
// Kullanicilar: middleware.js (eski /ReferansDetay/<slug>/<pk> esleme) ve
// scripts/generate-referans-slug-map.mjs (harita uretimi). Bu fonksiyonun iki
// kopyada ayrı tutulmasi senkron kaymaya yol acip yonlendirmeleri bozar.
export function normalizeSlug(value) {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // bozuk percent-encoding: ham degerle devam et
  }
  return decoded
    .replace(/ç/gi, "c")
    .replace(/ğ/gi, "g")
    .replace(/ı/gi, "i")
    .replace(/İ/g, "i")
    .replace(/ö/gi, "o")
    .replace(/ş/gi, "s")
    .replace(/ü/gi, "u")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
