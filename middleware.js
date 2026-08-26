import { NextResponse } from "next/server";

// Buyuk/kucuk harf duyarligi (madde 2): bilinen statik sayfa yollari haricinde
// dokunma; sadece listede olan ve buyuk harf iceren istekleri kalici 308 ile
// lowercase kanonige dusur. Liste disindaki her seye (varlik dosyalari,
// karisik harfli /referanslar/<id> ve /blog/<slug> adresleri) dokunulmaz.
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

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();

  if (lower !== pathname && CANONICAL_SET.has(lower)) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
