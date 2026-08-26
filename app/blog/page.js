import { getBlogPosts, getBlogCategories } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'

export const metadata = {
  title: 'Blog — Ekip 360',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Ekip 360',
    url: '/blog',
    images: ['/images/slider/slider01.jpg'],
  },
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function plainText(blocks) {
  if (!blocks) return ''
  return blocks
    .filter(b => b._type === 'block')
    .map(b => b.children?.map(c => c.text).join('') || '')
    .join(' ')
}

export default async function BlogPage({ searchParams }) {
  const resolvedParams = await searchParams
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
  ])

  const catSlug = resolvedParams?.cat
  const filteredPosts = catSlug
    ? posts.filter(p => p.category?.slug?.current === catSlug)
    : posts

  return (
    <>
      <div className="breadCrumbs">
        <ul>
          <li><a href="/">Anasayfa</a></li>
          <li className="selected"><a href="/blog">Blog</a></li>
        </ul>
      </div>

      <div className="pageSanalTurFullTitle">
        <h1>Ekip 360 Blog</h1>
      </div>

      <div className="pageWrapper">
        <div className="Content">
          {/* Sağ sütun — kategoriler */}
          <div className="pageRightColums">
            <div className="PageMenu">
              <div className="MobileBt">
                <span className="icon"></span>
                <span className="Text">MENÜ</span>
              </div>
              <ul>
                <li><a href="/blog" className={!catSlug ? 'Active' : ''}>Tüm Yazılar</a></li>
                {categories.map(cat => (
                  <li key={cat._id}>
                    <a
                      href={`/blog?cat=${cat.slug?.current}`}
                      className={catSlug === cat.slug?.current ? 'Active' : ''}
                    >
                      {cat.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sol sütun — yazı listesi */}
          <div className="pageLeftColums">
            <div className="TextContent">
              <div className="Bloglist">
                <ul>
                  {filteredPosts.map(post => {
                    const excerpt = plainText(post.body || [])
                    const short = excerpt.length > 200 ? excerpt.substring(0, 200) + '…' : excerpt
                    return (
                      <li key={post._id}>
                        <h1>
                          <a href={`/blog/${post.slug.current}`}>{post.title}</a>
                        </h1>
                        <span className="BlogCategoryDate">
                          {formatDate(post.publishedAt)}
                          {post.category && (
                            <> | <a href={`/blog?cat=${post.category.slug?.current}`}>{post.category.title}</a></>
                          )}
                        </span>
                        <span className="BlogText">
                          {post.mainImage && (
                            <span className="BlogImage">
                              <a href={`/blog/${post.slug.current}`}>
                                <img
                                  src={urlFor(post.mainImage).width(160).height(160).url()}
                                  width="160"
                                  height="160"
                                  alt={post.title}
                                />
                              </a>
                            </span>
                          )}
                          {post.summary ? (
                            <p>{post.summary.length > 200 ? post.summary.substring(0, 200) + '…' : post.summary}</p>
                          ) : (
                            <p>{short}</p>
                          )}
                          <p><a href={`/blog/${post.slug.current}`}>Devamı »</a></p>
                        </span>
                      </li>
                    )
                  })}

                  {filteredPosts.length === 0 && (
                    <li>
                      <p>Henüz bu kategoride yazı bulunmamaktadır.</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
