'use client'

import { useEffect, useState } from 'react'
import { urlFor } from '@/lib/sanity'

const CATEGORIES = [
  { id: 'Hotels',       label: 'OTELLER' },
  { id: 'Automotive',   label: 'OTOMOTİV' },
  { id: 'CafeBakeries', label: 'KAFE - PASTANELER' },
  { id: 'RestaurantBar',label: 'RESTORAN - BAR' },
  { id: 'Gyms',         label: 'SPOR SALONLARI' },
  { id: 'Hospitals',    label: 'HASTANELER' },
  { id: 'PersonalCare', label: 'KİŞİSEL BAKIM' },
  { id: 'Showrooms',    label: 'SHOWROOMLAR' },
  { id: 'ArtGalleries', label: 'SANAT GALERİLERİ' },
  { id: 'SmallBusiness',label: 'KÜÇÜK İŞLETMELER' },
  { id: 'Other',        label: 'DİĞER' },
]

export default function ReferanslarClient({ references }) {
  const [activeHash, setActiveHash] = useState('All')

  useEffect(() => {
    function readHash() {
      const hash = window.location.hash.replace('#/', '') || 'All'
      setActiveHash(hash)
    }
    readHash()
    window.addEventListener('hashchange', readHash)
    return () => window.removeEventListener('hashchange', readHash)
  }, [])

  const showAll = activeHash === 'All'

  return (
    <div className="pageReferenceWrapper">
      <div className="Content">
        {/* Filtre menüsü */}
        <div className="ReferansListFilter">
          <div className="MobileBt">
            <span className="icon"></span>
            <span className="Text">MENÜ</span>
          </div>
          <ul>
            <li><a href="#/All" className={activeHash === 'All' ? 'Active' : ''}>Tüm Kategoriler</a></li>
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <a
                  href={`#/${cat.id}`}
                  className={activeHash === cat.id ? 'Active' : ''}
                >
                  {cat.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Referans listesi */}
        <div className="ReferansList">
          {CATEGORIES.map(cat => {
            const items = references.filter(r => r.category === cat.id)
            if (!showAll && activeHash !== cat.id) return null
            return (
              <ul key={cat.id} id={cat.id}>
                <li className="CategoryTitle">{cat.label}</li>
                {items.length === 0 ? (
                  <li className="NotContent">Bu kategoride içerik bulunamamıştır</li>
                ) : items.map(ref => (
                  <li key={ref._id}>
                    <span className="Capsule">
                      <a href={`/referanslar/${ref._id}`}>
                        {ref.thumbnail && (
                          <span className="Image">
                            <img
                              src={urlFor(ref.thumbnail).width(255).height(180).url()}
                              width="255"
                              height="180"
                              alt={ref.title}
                            />
                          </span>
                        )}
                        <span className="Description">
                          <span className="Title">{ref.title}</span>
                          <p>Ayrıntı için Tıkla</p>
                        </span>
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            )
          })}
        </div>

        <div className="clear"></div>
      </div>
      <div className="clear"></div>
    </div>
  )
}
