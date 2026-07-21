import { getSliderImages } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'

export default async function HomePage() {
  const sliders = await getSliderImages()

  return (
    <>
      {/* Slider */}
      <div className="Slider">
        <ul id="MainSlider">
          {sliders.length > 0 ? sliders.map((slide) => (
            <li key={slide._id} style={{ backgroundImage: `url(${urlFor(slide.image).width(1920).url()})` }}>
              {slide.alt && (
                <span className="Caption">
                  <span className="Icon">&nbsp;</span>
                  <span className="Text">{slide.alt}</span>
                </span>
              )}
            </li>
          )) : (
            <li style={{ backgroundImage: 'url(/images/slider/slider01.jpg)' }}>
              <span className="Caption">
                <span className="Icon">&nbsp;</span>
                <span className="Text">EKİP 360 SANAL TUR İLE İŞİNİ GOOGLE&apos;DA GEZDİR!</span>
                <p>Google Sokak Panoramaları&apos;na entegre 360 derece Sanal Tur hizmeti.</p>
              </span>
            </li>
          )}
        </ul>
        <a href="#" className="Prev" id="Prev">Önceki</a>
        <a href="#" className="Next" id="Next">Sonraki</a>
        <div className="Pagination" id="Pager"></div>
        <div className="ScrollDown">
          <a href="#360SanalTur">
            <span className="Text">Google Business View Nedir?</span>
            <span className="Icon">&nbsp;</span>
          </a>
        </div>
      </div>

      {/* Açıklama + Video */}
      <div className="SectionText" id="360SanalTur">
        <div className="Content">
          <span className="Title">EKİP 360 SANAL TUR İLE İŞİNİ GOOGLE&apos;DA GEZDİR!</span>
          <p>
            Google Sokak Panoramaları&apos;na entegre 360 derece Sanal Tur sayesinde mekanınız 7/24
            zamandan bağımsız gezdirin. Firmanıza prestij, müşterinize zaman kazandırın.
            <br />
            Ayrıca, potansiyel müşteriler sizi Google&apos;da aradığında karşılarına çıkan ilk
            sonuçların mükemmel olmasını sağlayın.
          </p>
          <a href="/google-sanal-tur-avantajlari">Daha fazlası için tıkla</a>

          <div className="VideoCapsule">
            <div className="Video" id="VideoCps">
              <iframe
                id="VideoMain"
                name="VideoMain"
                width="100%"
                height="506"
                src="https://www.youtube.com/embed/kMWxBpM-MSA?controls=1&showinfo=0&rel=0&loop=1"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>

          <div className="clear"></div>
        </div>
        <div className="clear"></div>
      </div>

      {/* Hizmetlerimiz */}
      <div className="ServicesCapsule">
        <div className="Content">
          <span className="Title">HİZMETLERİMİZ</span>
          <ul id="ServicesBox">
            <li>
              <a href="/hizmetlerimiz">
                <span className="Icon">
                  <img src="/images/servicesIcon01.png" width="125" height="100" alt="Sanal Tur" />
                </span>
                <span className="Text">Sanal Tur</span>
                <p>Sanal Tur çekimleriniz Google Güvenilir Fotoğrafçıları ve Google onaylı ekipmanlar ile yapılır.</p>
              </a>
            </li>
            <li>
              <a href="/hizmetlerimiz">
                <span className="Icon">
                  <img src="/images/servicesIcon02.png" width="125" height="100" alt="360 Video" />
                </span>
                <span className="Text">Sanal Turdan 360 Video</span>
                <p>30 sahne ve üstünde çekim yaptıran müşterilerimize, kurgusal animasyonlu video hediye edilir.</p>
              </a>
            </li>
            <li>
              <a href="/hizmetlerimiz">
                <span className="Icon">
                  <img src="/images/servicesIcon03.png" width="125" height="100" alt="HDR Fotoğraf" />
                </span>
                <span className="Text">HDR Fotoğraf Çekimi</span>
                <p>Profesyonel ekipman, geniş açı ve en son HDR teknikleri kullanılır, ayrıca ücret ödemezsiniz.</p>
              </a>
            </li>
            <li>
              <a href="/hizmetlerimiz">
                <span className="Icon">
                  <img src="/images/servicesIcon04.png" width="125" height="100" alt="Google İşletme Kaydı" />
                </span>
                <span className="Text">Google İşletme Kaydı</span>
                <p>İşletmeniz Google Yerel İşletme kaydı en hızlı ve en doğru şekilde gerçekleştirilir.</p>
              </a>
            </li>
          </ul>
          <div className="clear"></div>
        </div>
      </div>

      {/* Bize Ulaşın */}
      <div className="ContactUsCapsule">
        <div className="Content">
          <span>Google Business View ile müşterilerinizi sanal turla ağırlayın! </span>
          <a href="/iletisim">Bize Ulaşın</a>
        </div>
        <div className="clear"></div>
      </div>

      {/* Markalar */}
      <div className="BrandsCapsule">
        <div className="Content">
          <ul id="BrandSlider">
            <li><img src="/images/marka/remax.png" width="165" height="80" alt="RE/MAX" /></li>
            <li><img src="/images/marka/beko.png" width="165" height="80" alt="Beko" /></li>
            <li><img src="/images/marka/Coldwell_Banker_logo-gri.png" width="165" height="80" alt="Coldwell Banker" /></li>
            <li><img src="/images/marka/Lexus-Logo-Wallpaper-500x200.png" width="165" height="80" alt="Lexus" /></li>
            <li><img src="/images/marka/remax.png" width="165" height="80" alt="RE/MAX" /></li>
            <li><img src="/images/marka/beko.png" width="165" height="80" alt="Beko" /></li>
            <li><img src="/images/marka/Coldwell_Banker_logo-gri.png" width="165" height="80" alt="Coldwell Banker" /></li>
            <li><img src="/images/marka/Lexus-Logo-Wallpaper-500x200.png" width="165" height="80" alt="Lexus" /></li>
          </ul>
          <a href="#" className="Prev" id="BrandPrev">Önceki</a>
          <a href="#" className="Next" id="BrandNext">Sonraki</a>
          <div className="clear"></div>
        </div>
      </div>
    </>
  )
}
