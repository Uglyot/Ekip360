// TODO: İçerik Sanity'den gelecek — getPageContent('hakkimizda') ile

export const metadata = {
  title: 'Hakkımızda — Ekip 360',
}

export default function HakkimizdaPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="breadCrumbs">
        <ul>
          <li><a href="/hakkimizda">Kurumsal</a></li>
          <li className="selected"><a href="/hakkimizda">Hakkımızda</a></li>
        </ul>
      </div>

      {/* Sayfa başlığı */}
      <div className="pageSanalTurFullTitle">
        <h1>Hakkımızda</h1>
      </div>

      {/* İçerik */}
      <div className="pageWrapper">
        <div className="Content">
          {/* Sağ sütun — menü */}
          <div className="pageRightColums">
            <div className="PageMenu">
              <div className="MobileBt">
                <span className="icon"></span>
                <span className="Text">MENÜ</span>
              </div>
              <ul>
                <li><a href="/hakkimizda" className="Active">Hakkımızda</a></li>
                <li><a href="/ekip360">Ekip 360</a></li>
                <li><a href="/sss">Sıkça Sorulan Sorular</a></li>
              </ul>
            </div>
          </div>

          {/* Sol sütun — içerik */}
          <div className="pageLeftColums">
            <div className="TextContent">
              <p>
                2011 yılından beri sadece sanal tur işi ile iştigal eden firmamız emlak sektöründe
                uzmanlaşarak yepyeni bir konsept ile sektör profesyonellerine sanal tur çözümlerini
                EmlakGezen EkoSistemi ile emlakgezen.com üzerinden vermekteydi. İdealist bir
                yaklaşımla kurulmuş olan EmlakGezen, sektöre, kaliteden asla ödün vermeden uygun
                maliyetlerle sanal tur hizmeti sunarak yepyeni bir değer eğrisi yaratmış olmanın
                haklı gururunu yaşamış misyonunu tamalamış ve operasyonlarını sonlandırmıştır.
              </p>
              <p>
                Aynı ekip ruhu ile bu sefer 2016 yılı başlarında &quot;EKİP 360 - Sanal Tur
                Hizmetleri&quot; olarak &quot;Google Street View Güvenilir Ajans&quot; programına
                katıldık. Güvenilir (Trusted) programı 31 Aralık 2024 tarhinde sonlandırılmış olsa da
                kullanıcılar için durum değişmemiştir. Yani sizler biz rozetli eski güvenilir profesyonellerden 
                hizmet almaya devam edebilirsiniz. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
