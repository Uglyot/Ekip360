import { NextResponse } from "next/server";
import { normalizeSlug } from "./lib/slug-normalize.mjs";
import referansSlugMap from "./lib/referans-slug-map.json";

// Kanonik statik sayfa yollari: sadece bu listedekiler buyuk harf normalizasyonuna girer.
const CANONICAL_PAGES = [
  "/hakkimizda",
  "/ekip360",
  "/sss",
  "/google-sanal-tur-avantajlari",
  "/hizmetlere-neler-dahildir",
  "/nasil-baslamaliyim",
  "/fiyatlandirma",
  "/hizmetlerimiz",
  "/kimler-yararlanabilir",
  "/web-sitenize-ekleyin",
  "/facebooka-ekleyin",
  "/iletisim",
  "/blog",
  "/referanslar",
];

const CANONICAL_SET = new Set(CANONICAL_PAGES);

// Eski EN sayfalari -> TR karsiliklari (EN surum kaldirildi)
const LEGACY_EN_TO_TR = {
  "/about": "/hakkimizda",
  "/360teams": "/ekip360",
  "/faq": "/sss",
  "/what-are-advantages-of-google-virtual-tour": "/google-sanal-tur-avantajlari",
  "/what-is-included-in-services": "/hizmetlere-neler-dahildir",
  "/how-should-i-start": "/nasil-baslamaliyim",
  "/how-to-do-pricing": "/fiyatlandirma",
  "/references": "/referanslar",
  "/contact": "/iletisim",
  "/add-360-virtual-tour-to-your-website": "/web-sitenize-ekleyin",
  "/add-360-virtual-tour-to-facebook": "/facebooka-ekleyin",
  "/services": "/hizmetlerimiz",
  "/who-can-benefit": "/kimler-yararlanabilir",
  "/blogen": "/blog",
};

function redirectTo(request, pathname, status) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url, status);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // www -> apex (ayni icerigi servis eden ikinci host otoriteyi boler)
  const host = (request.headers.get("host") || "").toLowerCase();
  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.port = "";
    url.protocol = "https:";
    url.host = "ekip360.net";
    return NextResponse.redirect(url, 308);
  }

  const lower = pathname.toLowerCase();

  // /Home -> /
  if (lower === "/home") return redirectTo(request, "/", 308);

  // Eski EN sayfalari -> TR karsiliklari
  const enTarget = LEGACY_EN_TO_TR[lower];
  if (enTarget) return redirectTo(request, enTarget, 308);

  // Eski blog detay/pagination formatlari -> blog listesi
  if (
    lower.startsWith("/blog-detay/") ||
    lower.startsWith("/blog-detail/") ||
    lower === "/blogen" ||
    /^\/blogen\/\d+$/.test(lower) ||
    /^\/blog\/\d+$/.test(lower)
  ) {
    return redirectTo(request, "/blog", 308);
  }

  // Eski referans detay: /ReferansDetay/<slug>/<pk> -> eslesen yeni detay, yoksa liste
  if (lower.startsWith("/referansdetay/")) {
    const parts = pathname.split("/").filter(Boolean);
    const legacySlug = normalizeSlug(parts[1] || "");
    const targetId = referansSlugMap[legacySlug];
    return redirectTo(request, targetId ? `/referanslar/${targetId}` : "/referanslar", 308);
  }

  // Eski test artikligi
  if (lower === "/test/index.html") return redirectTo(request, "/", 308);

  // Buyuk/kucuk harf normalizasyonu (sadece kanonik statik sayfalar)
  if (lower !== pathname && CANONICAL_SET.has(lower)) {
    return redirectTo(request, lower, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

