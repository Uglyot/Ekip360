import { getBlogPost, getBlogCategories } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <img
          src={urlFor(value).url()}
          alt=""
          style={{ maxWidth: '100%', maxHeight: '160px', width: 'auto', margin: '8px 4px', verticalAlign: 'middle' }}
        />
      )
    },
  },
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Ekip 360 Blog`,
    description: post.summary || post.title,
    openGraph: {
      title: post.title,
      images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
    },
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params
  const [post, categories] = await Promise.all([
    getBlogPost(slug),
    getBlogCategories(),
  ])

  if (!post) notFound()

  const postUrl = `https://ekip360.net/blog/${slug}`

  return (
    <>
      <div className="breadCrumbs">
        <ul>
          <li><a href="/">Anasayfa</a></li>
          <li><a href="/blog">Blog</a></li>
          <li className="selected"><a href={`/blog/${params.slug}`}>{post.title}</a></li>
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
                <li><a href="/blog">Tüm Yazılar</a></li>
                {categories.map(cat => (
                  <li key={cat._id}>
                    <a href={`/blog?cat=${cat.slug?.current}`}>{cat.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sol sütun — yazı detayı */}
          <div className="pageLeftColums">
            <div className="TextContent">
              <div className="BlogDetailText">
                <h1>{post.title}</h1>
                <span className="BlogCategoryDate">
                  {formatDate(post.publishedAt)}
                  {post.category && (
                    <> | <a href={`/blog?cat=${post.category.slug?.current}`}>{post.category.title}</a></>
                  )}
                </span>
                <span className="BlogText">
                  {post.body && <PortableText value={post.body} components={portableTextComponents} />}
                </span>

                {/* Paylaşım butonları */}
                <div className="SocialShare">
                  <span className="title">Paylaş :</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="facebook"
                  >
                    Facebook ile paylaş
                  </a>
                  <a
                    href={`https://twitter.com/share?text=${encodeURIComponent(post.title)}&via=ekip360&url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="twitter"
                  >
                    Twitter ile paylaş
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin"
                  >
                    LinkedIn ile paylaş
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
