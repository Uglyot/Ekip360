// TODO: İçerik Sanity'den gelecek

export const metadata = {
  title: 'Nasıl Başlamalıyım? — Ekip 360',
  alternates: { canonical: '/nasil-baslamaliyim' },
  openGraph: {
    title: 'Nasıl Başlamalıyım? — Ekip 360',
    url: '/nasil-baslamaliyim',
    images: ['/images/slider/slider01.jpg'],
  },
}

export default function NasilBaslamaliyimPage() {
  return (
    <>
      <div className="breadCrumbs">
        <ul>
          <li>
            <a href="/google-sanal-tur-avantajlari">360 Sanal Tur Nedir?</a>
          </li>
          <li className="selected">
            <a href="/nasil-baslamaliyim">Nasıl Başlamalıyım?</a>
          </li>
        </ul>
      </div>

      <div className="pageSanalTurFullTitle">
        <h1>Nasıl Başlamalıyım?</h1>
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
                <li>
                  <a href="/google-sanal-tur-avantajlari">
                    360 Sanal Tur Avantajları Nelerdir?
                  </a>
                </li>
                <li>
                  <a href="/hizmetlere-neler-dahildir">
                    Hizmetlere Neler Dahildir?
                  </a>
                </li>
                <li>
                  <a href="/nasil-baslamaliyim" className="Active">
                    Nasıl Başlamalıyım?
                  </a>
                </li>
                <li>
                  <a href="/fiyatlandirma">Fiyatlandırma Nasıl Yapılır?</a>
                </li>
                <li>
                  <a href="/referanslar">Örnek Uygulamalar</a>
                </li>
                <li>
                  <a href="/iletisim">Bize Ulaşın / Biz Sizi Arayalım</a>
                </li>
                <li>
                  <a href="/web-sitenize-ekleyin">
                    360 Sanal Turunuzu Web Sitenize Ekleyin
                  </a>
                </li>
                <li>
                  <a href="/facebooka-ekleyin">
                    360 Sanal Turunuzu Facebook&apos;a Ekleyin
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pageLeftColums">
            <div className="TextContent">
              <p>
                Bu hizmeti almayı düşündüğünüzde bilmeniz gereken ilk şey Google
                Business View hizmetinin Google Güvenilir Profesyonelleri
                aracılığıyla verildiğidir. Firmamız program sonlandırılana kadar
                Google Street View Güvenilir Profesyonelleri listesinde yer
                almaktaydı. Program devam etmese de bu bizim çekim yapmamızı engellemiyor.
                Kısacası, güvenilir ellerdesiniz.
              </p>
              <p>
                İkinci önemli husus, işletmenizin Google İşletmem (Google My
                Business) kaydının yapılmış olması gerekmektedir. Firmamız daha
                önce kayıt yaptırmamış olan müşterilerimize ücretsiz danışmanlık
                hizmeti sunmaktadır. 
              </p>
              <p>
                Bu iki önemli hususa dikkat ettikten ve fiyat teklifimizi alıp
                bizimle çalışmaya karar verdikten sonra beraber sözleşme imzalar
                ve çekim gününe karar veririz. Hizmet veren olarak %50 peşinat
                alarak işe başlıyoruz. Google işletmem kaydı tamamlanmış, onayı
                alınmış işletmenizin çekimlerini müteakip sanal turunuz en geç 1
                hafta içinde Google aramalarda ve haritalarda görünür hale
                gelmiş olur.
              </p>
              <p>
                Google Business View ile müşterilerinizi sanal turla ağırlamaya
                başlayabilir, işyerinizin güzel bir yerine Google
                sticker&apos;ınızı yapıştırabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
