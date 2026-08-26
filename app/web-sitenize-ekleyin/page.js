// TODO: İçerik Sanity'den gelecek

export const metadata = {
  title: '360 Sanal Turunuzu Web Sitenize Ekleyin — Ekip 360',
  alternates: { canonical: '/web-sitenize-ekleyin' },
  openGraph: {
    title: '360 Sanal Turunuzu Web Sitenize Ekleyin — Ekip 360',
    url: '/web-sitenize-ekleyin',
    images: ['/images/slider/slider01.jpg'],
  },
}

export default function WebSitenizeEkleyinPage() {
  return (
    <>
      <div className="breadCrumbs">
        <ul>
          <li><a href="/google-sanal-tur-avantajlari">360 Sanal Tur Nedir?</a></li>
          <li className="selected"><a href="/web-sitenize-ekleyin">360 Sanal Turunuzu Web Sitenize Ekleyin</a></li>
        </ul>
      </div>

      <div className="pageSanalTurFullTitle">
        <h1>360 Sanal Turunuzu Web Sitenize Ekleyin</h1>
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
                <li><a href="/hizmetlere-neler-dahildir">Hizmetlere Neler Dahildir?</a></li>
                <li><a href="/nasil-baslamaliyim">Nasıl Başlamalıyım?</a></li>
                <li><a href="/fiyatlandirma">Fiyatlandırma Nasıl Yapılır?</a></li>
                <li><a href="/referanslar">Örnek Uygulamalar</a></li>
                <li><a href="/iletisim">Bize Ulaşın / Biz Sizi Arayalım</a></li>
                <li><a href="/web-sitenize-ekleyin" className="Active">360 Sanal Turunuzu Web Sitenize Ekleyin</a></li>
                <li><a href="/facebooka-ekleyin">360 Sanal Turunuzu Facebook&apos;a Ekleyin</a></li>
              </ul>
            </div>
          </div>

          <div className="pageLeftColums">
            <div className="TextContent">
              <p>
                Tebrikler! Google Business View hizmeti alarak ayrıcalıklı bir dünyaya adım attınız.
                Artık Google Aramalar&apos;da ayrıcalıklı bir konuma yükseldiniz. İşletmeniz dünyanın
                her köşesinden 7/24 gezilebiliyor. Şimdi sıra geldi bu hizmeti kendi web sitenize
                eklemeye (embedding). Yapmanız gereken birkaç basit işlem var.
              </p>
              <ul>
                <li>
                  <strong>1. ADIM:</strong> Tarayıcınızda Google Haritalar (Google Maps)&apos;ı açın. Sol tarafta yer alan arama çubuğuna işletmenizin adını yazarak bulun. Sanal Tur sembolü olan resime tıklayarak sanal tura geçiş yapın.
                  <img src="/images/page_webekleme_01.png" alt="1. Adım" style={{ display: 'block', maxWidth: '100%', marginTop: '15px' }} />
                </li>
                <li>
                  <strong>2. ADIM:</strong> Açılan sanal turda sitenizde görmek istediğiniz konumu ve açıyı ayarlayın. Sol üstte yer alan gri kutucuğun sağında üç nokta üst üste olan sembole basın. Açılan kutucuktan &quot;Paylaşın veya resim yerleştirin&quot; düğmesine basın.
                  <img src="/images/page_webekleme_02.jpg" alt="2. Adım" style={{ display: 'block', maxWidth: '100%', marginTop: '15px' }} />
                </li>
                <li>
                  <strong>3. ADIM:</strong> Açılan pencerede &quot;Görseli yerleştir&quot; düğmesine basın. Solda görülen boyut seçeneklerinden istediğiniz birini veya &quot;Özel boyut&quot; düğmesine basın. Sağda kodun yazılı olduğu bölüme tıklayınca kodun tamamı seçilecektir. Kodu kopyalayın.
                  <img src="/images/page_webekleme_03.jpg" alt="3. Adım" style={{ display: 'block', maxWidth: '100%', marginTop: '15px' }} />
                </li>
                <li>
                  <strong>4. ADIM:</strong> Sitenizin açılış sayfasına (index.html) kodu yapıştırın. Eğer &quot;width&quot; değerini &quot;100%&quot; olarak girerseniz, sanal tur penceresi ekran çözünürlüğüne göre kendisini ayarlayacak ve tüm genişliği kullanacaktır.
                  <img src="/images/page_webekleme_04.jpg" alt="4. Adım" style={{ display: 'block', maxWidth: '100%', marginTop: '15px' }} />
                  <img src="/images/page_webekleme_05.jpg" alt="4. Adım - Kod" style={{ maxWidth: '100%', marginTop: '10px' }} />
                </li>
                <li>
                  <strong>5. ADIM:</strong> Server dosyasını güncelledikten sonra web sitenizi kontrol edin.
                </li>
                <li>
                  <strong>6. ADIM:</strong> Değişiklikleri tanıdıklarınızla paylaşın.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
