import Script from 'next/script'
import SliderInit from '@/components/SliderInit'

export const metadata = {
  title: 'Ekip 360 - Google Street View Güvenilir Profesyonelleri',
  description:
    'Google Business View Türkiye hizmet veren profesyonelleri. Street View Google haritalar entegrasyonu ile dünyanın her yerinden sokak panoramaları ile 7/24 direk iş yerinize geçiş imkanı sunuyoruz.',
  keywords:
    'google sanal tur, 360 sanal tur, sanal tur, sanaltur, 360, 360derece, 360 derece, 360 fotoğraf, virtual tour, google street view, ekip 360, ekip360',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta httpEquiv="Content-Language" content="TR" />
        <meta name="Author" content="Ekip 360" />
        <meta name="Copyright" content="Ekip 360" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="/css/Ekip360_style.css" />
        <link rel="stylesheet" type="text/css" href="/css/Ekip360_responsive.css" />
        <link rel="stylesheet" type="text/css" href="/css/jquery.selectbox.css" />
        <link rel="stylesheet" type="text/css" href="/fancybox/jquery.fancybox.css" />
      </head>
      <body>
        {/* Header */}
        <div className="Header">
          <div className="Content">
            {/* Logo */}
            <div className="Logo">
              <a href="/">ekip 360 sanal tur</a>
            </div>

            {/* Dil */}
            <div className="Language">
              <a href="/en">EN</a>
            </div>

            {/* Mobil menü butonu */}
            <div className="MobileBt">
              <span></span>
            </div>

            {/* Navigasyon */}
            <div className="Navigation">
              <ul className="navMenu">
                {/* Kurumsal */}
                <li>
                  <a href="#">Kurumsal</a>
                  <ul>
                    <li><a href="/hakkimizda">Hakkımızda</a></li>
                    <li><a href="/ekip360">Ekip 360</a></li>
                    <li><a href="/sss">Sıkça Sorulan Sorular</a></li>
                  </ul>
                </li>

                {/* 360 Sanal Tur Nedir? */}
                <li>
                  <a href="#">360 Sanal Tur Nedir?</a>
                  <ul>
                    <li><a href="/google-sanal-tur-avantajlari">Google Sanal Tur Avantajları</a></li>
                    <li><a href="/hizmetlere-neler-dahildir">Hizmetlere Neler Dahildir?</a></li>
                    <li><a href="/nasil-baslamaliyim">Nasıl Başlamalıyım?</a></li>
                    <li><a href="/fiyatlandirma">Fiyatlandırma</a></li>
                    <li><a href="/referanslar">Örnek Uygulamalar</a></li>
                    <li><a href="/iletisim">İletişim</a></li>
                    <li><a href="/web-sitenize-ekleyin">Web Sitenize Ekleyin</a></li>
                    <li><a href="/facebooka-ekleyin">Facebook&apos;a Ekleyin</a></li>
                  </ul>
                </li>

                {/* Hizmetlerimiz */}
                <li><a href="/hizmetlerimiz">Hizmetlerimiz</a></li>

                {/* Kimler Yararlanabilir */}
                <li><a href="/kimler-yararlanabilir">Kimler Yararlanabilir?</a></li>

                {/* Referanslar */}
                <li>
                  <a href="/referanslar#/All">Referanslar</a>
                  <ul>
                    <li><a href="/referanslar#/All">Tüm Kategoriler</a></li>
                    <li><a href="/referanslar#/Hotels">Oteller</a></li>
                    <li><a href="/referanslar#/Automotive">Otomotiv</a></li>
                    <li><a href="/referanslar#/CafeBakeries">Kafe-Pastaneler</a></li>
                    <li><a href="/referanslar#/RestaurantBar">Restoran-Bar</a></li>
                    <li><a href="/referanslar#/Gyms">Spor Salonları</a></li>
                    <li><a href="/referanslar#/Hospitals">Hastaneler</a></li>
                    <li><a href="/referanslar#/PersonalCare">Kişisel Bakım</a></li>
                    <li><a href="/referanslar#/Showrooms">Showroomlar</a></li>
                    <li><a href="/referanslar#/ArtGalleries">Sanat Galerileri</a></li>
                    <li><a href="/referanslar#/SmallBusiness">Küçük İşletmeler</a></li>
                    <li><a href="/referanslar#/Other">Diğer</a></li>
                  </ul>
                </li>

                {/* İletişim */}
                <li><a href="/iletisim">İletişim</a></li>

                {/* Blog */}
                <li><a href="/blog">BLOG</a></li>
              </ul>
            </div>

            <div className="clear"></div>
          </div>

          {/* Alt menü */}
          <div className="subMenu">
            <div className="SubMenuContainer"></div>
          </div>
        </div>
        {/* /Header */}

        {/* Body */}
        {children}
        {/* /Body */}

        {/* Footer */}
        <div className="FooterCapsule">
          <div className="Content">
            {/* Sosyal medya */}
            <div className="SocialCapsule">
              <ul>
                <li className="facebookbt">
                  <a href="https://www.facebook.com/ekip360.net/home" target="_blank" rel="noopener noreferrer">Facebook</a>
                </li>
                <li className="twitterbt">
                  <a href="https://twitter.com/ekip360" target="_blank" rel="noopener noreferrer">Twitter</a>
                </li>
                <li className="instagrambt">
                  <a href="https://www.instagram.com/ekip360/?hl=tr" target="_blank" rel="noopener noreferrer">İnstagram</a>
                </li>
                <li className="youtubebt">
                  <a href="https://www.youtube.com/channel/UC__3hdiphYtsPlHbNeeOa3A" target="_blank" rel="noopener noreferrer">Youtube</a>
                </li>
              </ul>
              <div className="GoogleCapsule">
                <img src="/images/Ekip360Logo.png" width="100" height="auto" alt="Ekip 360" />
              </div>
            </div>

            {/* Footer linkleri */}
            <div className="LinkCapsule">
              <ul>
                <li><a href="/hakkimizda" className="TitleLink">Kurumsal</a></li>
                <li><a href="/hakkimizda">Hakkımızda</a></li>
                <li><a href="/ekip360">Ekip 360</a></li>
                <li><a href="/sss">Sıkça Sorulan Sorular</a></li>
                <li><a href="/google-sanal-tur-avantajlari" className="BigLink">360 Sanal Tur Nedir?</a></li>
              </ul>
              <ul>
                <li><a href="/hizmetlerimiz" className="TitleLink">Hizmetlerimiz</a></li>
                <li><a href="/hizmetlerimiz">Sanal Tur</a></li>
                <li><a href="/hizmetlerimiz">Sanal Turdan 360 Video</a></li>
                <li><a href="/hizmetlerimiz">HDR Fotoğraf Çekimi</a></li>
                <li><a href="/hizmetlerimiz">Google Yerel İşletme Kaydı</a></li>
              </ul>
              <ul>
                <li><a href="/kimler-yararlanabilir" className="BigLink2">Kimler Yararlanabilir?</a></li>
                <li><a href="/referanslar#/All" className="BigLink2">Referanslar</a></li>
                <li><a href="/iletisim" className="BigLink2">İletişim</a></li>
                <li><a href="/blog" className="BigLink2">Blog</a></li>
              </ul>
            </div>

            <div className="clear"></div>
          </div>

          {/* Copyright */}
          <div className="BottomFoot">
            <div className="Content">
              <span className="Copyright">Copyright@2020</span>
              <span className="ekip360">
                <a href="http://ekip360.net" target="_blank" rel="noopener noreferrer" title="ekip360">ekip360</a>
              </span>
            </div>
          </div>

          <div className="clear"></div>
        </div>
        {/* /Footer */}

        {/* Alert popup */}
        <a className="fancybox" id="AlertOpen" href="#Alert" style={{ display: 'none' }}>&nbsp;</a>
        <div id="Alert" className="AlertPopup"></div>

        <SliderInit />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-SBMN12KLSC" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SBMN12KLSC');
        `}</Script>
      </body>
    </html>
  )
}
