import { getReferenceById } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { id } = await params
  const ref = await getReferenceById(id)
  if (!ref) return {}

  const title = ref.title ? `${ref.title} — Ekip 360 Referansları` : 'Referanslar — Ekip 360'
  // description alani metin blok array'i de olabileceginden once tip kontrolu yapilir
  const description =
    (typeof ref.description === 'string' && ref.description) ||
    (ref.sector
      ? `${ref.title}, ${ref.sector} alanında Ekip 360 tarafından hayata geçirilen Google sanal tur projesi.`
      : `${ref.title || 'Ekip 360'} — 360° sanal tur referansı.`)

  return {
    title,
    description,
    alternates: { canonical: `https://ekip360.net/referanslar/${id}` },
    openGraph: {
      title,
      description,
      url: `/referanslar/${id}`,
      images: ref.thumbnail ? [urlFor(ref.thumbnail).width(1200).height(630).url()] : [],
    },
  }
}

export default async function ReferansDetayPage({ params }) {
  const { id } = await params
  const ref = await getReferenceById(id)
  if (!ref) notFound()

  const gallery = ref.gallery || []

  return (
    <>
      <div className="breadCrumbs">
        <ul>
          <li><a href="/referanslar#/All">Referanslar</a></li>
          <li className="selected"><a href="#">{ref.title}</a></li>
        </ul>
      </div>

      <div className="RerefansDetailWrapper">
        <div className="Content">
          {/* Street View embed */}
          {ref.streetViewUrl && (
            <div className="SanalTurCapsule">
              <iframe
                src={ref.streetViewUrl}
                width="100%"
                height="372"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          )}

          {/* İşletme bilgileri */}
          <div className="SanalTurDescription">
            <span className="Description">
              <span className="Title">{ref.title}</span>
              {ref.sector && <span className="Text01">{ref.sector}</span>}
            </span>
            <span className="AdressInfo">
              {ref.telephoneNumber && <span className="Phone">{ref.telephoneNumber}</span>}
              {ref.address && <span className="Adress">{ref.address}</span>}
            </span>
          </div>

          {/* Galeri */}
          {gallery.length > 0 && (
            <div className="SanalTurGallery">
              <span className="Title">
                <span>GALERİ</span>
              </span>
              <ul className="gallerySlider">
                {gallery.map((img, i) => (
                  <li key={i}>
                    <a
                      href={urlFor(img).url()}
                      className="fancybox"
                      rel="gallery1"
                    >
                      <img
                        src={urlFor(img).width(255).height(130).url()}
                        width="255"
                        height="130"
                        alt={`${ref.title} - ${i + 1}`}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="clear"></div>
        </div>
      </div>
    </>
  )
}
