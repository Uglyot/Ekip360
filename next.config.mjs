/** @type {import('next').NextConfig} */

// Eski ASP.NET URL'lerinden kalinmirasi. Iki katman:
// 1) BURADA (301/308): path'i degisen rotalar + eski detay formatlari.
//    Kaynak: ekip360-website-backup httpdocs/Views/_LayoutPage.cshtml menü linkleri
//    ve Blog/Referans cshtml'leri.
// 2) Sadece buyuk/kucuk harf farki olanlar (orn. /Hakkimizda -> /hakkimizda)
//    middleware.js'te cozulur; burada yazilsaydi Next'in duyarsiz eslestirmesi
//    hedefin kendisini de yakalayip sonsuz donge kurardı.
const legacyRedirects = [
  { source: "/Sikca-Sorulan-Sorular", destination: "/sss" },
  { source: "/Google-Sanal-Tur-Avantajlari-Nelerdir", destination: "/google-sanal-tur-avantajlari" },
  { source: "/Fiyatlandirma-Nasil-Yapilir", destination: "/fiyatlandirma" },
  { source: "/360-Sanal-Turunuzu-Facebooka-Ekleyin", destination: "/facebooka-ekleyin" },
  { source: "/360-Sanal-Turunuzu-Web-Sitenize-Ekleyin", destination: "/web-sitenize-ekleyin" },
  // Eski detay formatlari (PK eslemesi yok; bolum sayfasina toplanir).
  // /ReferansDetay/<slug>/<pk> ise middleware.js te slug esleme ile ozel detaya gider.
  { source: "/BlogDetail/:id", destination: "/blog" },
  { source: "/Home/ReferansDetay/:id", destination: "/referanslar" },
].map(({ source, destination }) => ({ source, destination, permanent: true }));

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
