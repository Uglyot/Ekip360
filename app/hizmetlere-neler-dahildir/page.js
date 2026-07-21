// TODO: İçerik Sanity'den gelecek

export const metadata = {
  title: 'Hizmetlere Neler Dahildir? — Ekip 360',
}

export default function HizmetlereNelerDahilPage() {
  return (
    <>
      <div className="breadCrumbs">
        <ul>
          <li><a href="/google-sanal-tur-avantajlari">360 Sanal Tur Nedir?</a></li>
          <li className="selected"><a href="/hizmetlere-neler-dahildir">Hizmetlere Neler Dahildir?</a></li>
        </ul>
      </div>

      <div className="pageSanalTurFullTitle">
        <h1>Hizmetlere Neler Dahildir?</h1>
      </div>

      <div className="pageWrapper">
        <div className="Content">
          <div className="pageRightColums">
            <div className="PageMenu">
              <div className="MobileBt">
                <span className="icon"></span>
                <span className="Text">MENÜ</span>
              </div>
              <ul>
                <li><a href="/google-sanal-tur-avantajlari">360 Sanal Tur Avantajları Nelerdir?</a></li>
                <li><a href="/hizmetlere-neler-dahildir" className="Active">Hizmetlere Neler Dahildir?</a></li>
                <li><a href="/nasil-baslamaliyim">Nasıl Başlamalıyım?</a></li>
                <li><a href="/fiyatlandirma">Fiyatlandırma Nasıl Yapılır?</a></li>
                <li><a href="/referanslar">Örnek Uygulamalar</a></li>
                <li><a href="/iletisim">Bize Ulaşın / Biz Sizi Arayalım</a></li>
                <li><a href="/web-sitenize-ekleyin">360 Sanal Turunuzu Web Sitenize Ekleyin</a></li>
                <li><a href="/facebooka-ekleyin">360 Sanal Turunuzu Facebook&apos;a Ekleyin</a></li>
              </ul>
            </div>
          </div>

          <div className="pageLeftColums">
            <div className="TextContent">
              <ul className="Bull">
                <li>DSLR makine ve son teknoloji ekipmanlar ile yüksek kalite sanal tur çekimi</li>
                <li>HDR fotoğraf (POI) çekimi</li>
                <li>VR (Sanal Gerçeklik) teknolojisi uyumluluk</li>
                <li>Google İşletmem ve Google Haritalar entegrasyon desteği</li>
                <li>30 Sahne ve üzeri hizmet alan müşterilerimize sanal turdan türetilmiş animasyon video hediye!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
