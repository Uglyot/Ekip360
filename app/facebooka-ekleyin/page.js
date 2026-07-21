// TODO: İçerik Sanity'den gelecek

export const metadata = {
  title: "360 Sanal Turunuzu Facebook'a Ekleyin — Ekip 360",
}

export default function FacebookaEkleyinPage() {
  return (
    <>
      <div className="breadCrumbs">
        <ul>
          <li><a href="/google-sanal-tur-avantajlari">360 Sanal Tur Nedir?</a></li>
          <li className="selected"><a href="/facebooka-ekleyin">360 Sanal Turunuzu Facebook&apos;a Ekleyin</a></li>
        </ul>
      </div>

      <div className="pageSanalTurFullTitle">
        <h1>360 Sanal Turunuzu Facebook&apos;a Ekleyin</h1>
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
                <li><a href="/web-sitenize-ekleyin">360 Sanal Turunuzu Web Sitenize Ekleyin</a></li>
                <li><a href="/facebooka-ekleyin" className="Active">360 Sanal Turunuzu Facebook&apos;a Ekleyin</a></li>
              </ul>
            </div>
          </div>

          <div className="pageLeftColums">
            <div className="TextContent">
              <h2>Google Business View Sanal Turunuzu Facebook Sayfanıza Nasıl Eklersiniz?</h2>
              <p>
                Evet, sadece web sitenize değil, Google İşletme Sanal Turunuzu aynı zamanda Facebook
                sayfanıza hem de yeni bir TAB oluşturarak ekleyebilirsiniz! Bunu yapmak için aşağıdaki
                yönergeleri takip etmeniz yeterli. Hiçbir yazılım bilgisine gerek duymadan!
              </p>
              <ul>
                <li>
                  <strong>1. ADIM:</strong> Google Maps&apos;i tarayıcınızın yeni bir penceresinde açın. Sol üst köşede bulunan adres çubuğuna yayına alınmış işletmenizin adını yazarak aratın. Sol sütunda işletme rozetinizi göreceksiniz. (Önemli: Bu işlemi Google arama çubuğunda görünen işletme rozetinden değil, Google Maps üzerinden yapmalısınız)
                  <img src="/images/page_facebookekleme_01.jpg" alt="1. Adım" style={{ display: 'block', maxWidth: '100%', marginTop: '15px' }} />
                </li>
                <li>
                  <strong>2. ADIM:</strong> Haritanın sol alt köşesinde beliren sanal turlu sunumları ifade eden dairesel resimlerden birine tıklayın. Sanal turun içinde Facebook sayfanızda hangi noktadan ve açıdan başlamasını istiyorsanız oraya gidin.
                  <img src="/images/page_facebookekleme_02.jpg" alt="2. Adım" style={{ display: 'block', maxWidth: '100%', marginTop: '15px' }} />
                </li>
                <li>
                  <strong>3. ADIM:</strong> Sol üst köşede bulunan firma adınızın yanındaki &quot;üç nokta&quot; ikonuna tıklayın ve &quot;Paylaşın veya resim yerleştirin&quot;i seçin.
                  <img src="/images/page_facebookekleme_03.jpg" alt="3. Adım" style={{ display: 'block', maxWidth: '100%', marginTop: '15px' }} />
                </li>
                <li>
                  <strong>4. ADIM:</strong> Karşınıza çıkan kutucukta &quot;Görsel yerleştir&quot; sekmesine tıklayın. &quot;Orta&quot; seçeneğinde olduğunuzdan emin olarak iframe kaynak kodunu kopyalayın.
                  <img src="/images/page_facebookekleme_04.jpg" alt="4. Adım" style={{ display: 'block', maxWidth: '100%', marginTop: '15px' }} />
                </li>
                <li>
                  <strong>5. ADIM:</strong> Facebook hesabınıza giriş yapın. Facebook uygulamalar bölümünden Woobox Custom Page Tab uygulamasını açın ve yöneticisi olduğunuz işletme hesabını seçerek sayfa sekmesini ekleyin.
                </li>
                <li>
                  <strong>6. ADIM:</strong> &quot;Sayfa sekmesi ekle&quot; butonuna basın. 4. adımda kopyaladığınız kodu ilgili alana yapıştırın ve &quot;Save Settings&quot; tuşuna basarak sanal turunuzu Facebook işletme sayfanıza kaydedin.
                  <img src="/images/page_facebookekleme_05.jpg" alt="6. Adım" style={{ display: 'block', maxWidth: '100%', marginTop: '15px' }} />
                </li>
              </ul>
              <p>
                <strong>Son olarak:</strong> Facebook işletme sayfanızda sanal tur sekmesini daha görünür
                bir yere koymak için sekmelerin sonundaki &quot;daha fazla&quot; açılır menüsünü tıklayın.
                Sanal tur sayfanızı bulup sürükleyerek sayfanızı açılır açılmaz görünebilecek şekilde
                sekmelerin arasına bırakın.
              </p>
              <p>İyi tanıtımlar.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
