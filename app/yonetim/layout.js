// Studio sayfasi 'use client' oldugu icin metadata buradan (sunucu layout'u) verilir.
// Arama motorlarinin yonetim panelini indekslemesi engellenir.
export const metadata = {
  title: 'Ekip 360 Yönetim',
  robots: {
    index: false,
    follow: false,
  },
}

export default function YonetimLayout({ children }) {
  return children
}
