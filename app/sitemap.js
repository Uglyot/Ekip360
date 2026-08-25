import { getBlogPosts, getReferences } from "@/lib/sanity";

const siteUrl = "https://ekip360.net";

const staticRoutes = [
  "/",
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

export default async function sitemap() {
  const [posts, references] = await Promise.all([
    getBlogPosts().catch(() => []),
    getReferences().catch(() => []),
  ]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : 0.7,
    })),
    ...posts
      .filter((post) => post.slug?.current)
      .map((post) => ({
        url: `${siteUrl}/blog/${post.slug.current}`,
        lastModified: post.publishedAt || undefined,
        changeFrequency: "monthly",
        priority: 0.6,
      })),
    ...references
      .filter((reference) => reference._id)
      .map((reference) => ({
        url: `${siteUrl}/referanslar/${reference._id}`,
        changeFrequency: "yearly",
        priority: 0.5,
      })),
  ];
}
