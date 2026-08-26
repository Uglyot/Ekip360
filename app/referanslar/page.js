import { getReferences } from '@/lib/sanity'
import ReferanslarClient from './ReferanslarClient'

export const metadata = {
  title: 'Referanslar — Ekip 360',
  alternates: { canonical: '/referanslar' },
  openGraph: {
    title: 'Referanslar — Ekip 360',
    url: '/referanslar',
    images: ['/images/slider/slider01.jpg'],
  },
}

export default async function ReferanslarPage() {
  const references = await getReferences()

  return (
    <>
      <div className="breadCrumbs">
        <ul>
          <li><a href="/referanslar#/All">Referanslar</a></li>
          <li className="selected"><a href="#/All">Tüm Kategoriler</a></li>
        </ul>
      </div>

      <ReferanslarClient references={references} />
    </>
  )
}
