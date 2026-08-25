import { getSliderImages } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import VideoFacade from "@/components/VideoFacade";

// LCP: hero gorseli /_next/image optimizer'i yerine dogrudan cdn.sanity.io'dan
// servis edilir; srcset ile tarayici ekran genisligine uygun varyanti secer.
const SLIDER_WIDTHS = [640, 960, 1280, 1920];

function sliderUrl(image) {
  return urlFor(image).width(1920).url();
}

function sliderSrcSet(image) {
  return SLIDER_WIDTHS.map((w) => `${urlFor(image).width(w).url()} ${w}w`).join(", ");
}

export default async function HomePage() {
  const sliders = await getSliderImages();

  return (
    <>
      {/* LCP: ilk slide gorselini on yukle (React 19 bu link'i head'e tasir) */}
      {sliders.length > 0 && sliders[0].image ? (
        <link
          rel="preload"
          as="image"
          href={sliderUrl(sliders[0].image)}
          imageSrcSet={sliderSrcSet(sliders[0].image)}
          imageSizes="100vw"
        />
      ) : (
        <link rel="preload" as="image" href="/images/slider/slider01.jpg" />
      )}

      {/* Slider */}
      <div className="Slider">
        <ul id="MainSlider">
          {sliders.length > 0 ? (
            sliders.map((slide, index) => (
              <li
                key={slide._id}
                style={slide.image ? undefined : { backgroundColor: "#000" }}
              >
                <img
                  className="SliderImage"
                  src={slide.image ? sliderUrl(slide.image) : "/images/slider/slider01.jpg"}
                  srcSet={slide.image ? sliderSrcSet(slide.image) : undefined}
                  sizes="100vw"
                  alt={slide.alt || slide.title || "Ekip 360"}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : undefined}
                />
                {slide.alt && (
                  <span className="Caption">
                    <span className="Icon">&nbsp;</span>
                    <span className="Text">{slide.alt}</span>
                  </span>
                )}
              </li>
            ))
          ) : (
            <li style={{ backgroundColor: "#000" }}>
              <img
                className="SliderImage"
                src="/images/slider/slider01.jpg"
                sizes="100vw"
                alt="Ekip 360"
                loading="eager"
                fetchPriority="high"
              />
              <span className="Caption">
                <span className="Icon">&nbsp;</span>
                <span className="Text">
                  EKİP 360 SANAL TUR İLE İŞİNİ GOOGLE&apos;DA GEZDİR!
                </span>
                <p>
                  Google Sokak Panoramaları&apos;na entegre 360 derece Sanal Tur
                  hizmeti.
                </p>
              </span>
            </li>
          )}
        </ul>
        <a href="#" className="Prev" id="Prev">
          Önceki
        </a>
        <a href="#" className="Next" id="Next">
          Sonraki
        </a>
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
          <span className="Title">
            EKİP 360 SANAL TUR İLE İŞİNİ GOOGLE&apos;DA GEZDİR!
          </span>
          <p>
            Google Sokak Panoramaları&apos;na entegre 360 derece Sanal Tur
            sayesinde mekanınız 7/24 zamandan bağımsız gezdirin. Firmanıza
            prestij, müşterinize zaman kazandırın.
            <br />
            Ayrıca, potansiyel müşteriler sizi Google&apos;da aradığında
            karşılarına çıkan ilk sonuçların mükemmel olmasını sağlayın.
          </p>
          <a href="/google-sanal-tur-avantajlari">Daha fazlası için tıkla</a>

          <div className="VideoCapsule">
            <div className="Video" id="VideoCps">
              <VideoFacade />
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
                  <img
                    src="/images/servicesIcon01.png"
                    width="125"
                    height="100"
                    alt="Sanal Tur"
                  />
                </span>
                <span className="Text">Sanal Tur</span>
                <p>
                  Sanal Tur çekimleriniz Google Güvenilir Fotoğrafçıları ve
                  Google onaylı ekipmanlar ile yapılır.
                </p>
              </a>
            </li>
            <li>
              <a href="/hizmetlerimiz">
                <span className="Icon">
                  <img
                    src="/images/servicesIcon02.png"
                    width="125"
                    height="100"
                    alt="360 Video"
                  />
                </span>
                <span className="Text">Sanal Turdan 360 Video</span>
                <p>
                  30 sahne ve üstünde çekim yaptıran müşterilerimize, kurgusal
                  animasyonlu video hediye edilir.
                </p>
              </a>
            </li>
            <li>
              <a href="/hizmetlerimiz">
                <span className="Icon">
                  <img
                    src="/images/servicesIcon03.png"
                    width="125"
                    height="100"
                    alt="HDR Fotoğraf"
                  />
                </span>
                <span className="Text">HDR Fotoğraf Çekimi</span>
                <p>
                  Profesyonel ekipman, geniş açı ve en son HDR teknikleri
                  kullanılır, ayrıca ücret ödemezsiniz.
                </p>
              </a>
            </li>
            <li>
              <a href="/hizmetlerimiz">
                <span className="Icon">
                  <img
                    src="/images/servicesIcon04.png"
                    width="125"
                    height="100"
                    alt="Google İşletme Kaydı"
                  />
                </span>
                <span className="Text">Google İşletme Kaydı</span>
                <p>
                  İşletmeniz Google Yerel İşletme kaydı en hızlı ve en doğru
                  şekilde gerçekleştirilir.
                </p>
              </a>
            </li>
          </ul>
          <div className="clear"></div>
        </div>
      </div>

      {/* Bize Ulaşın */}
      <div className="ContactUsCapsule">
        <div className="Content">
          <span>
            Google Business View ile müşterilerinizi sanal turla ağırlayın!{" "}
          </span>
          <a href="/iletisim">Bize Ulaşın</a>
        </div>
        <div className="clear"></div>
      </div>

      {/* Markalar */}
      <div className="BrandsCapsule">
        <div className="Content">
          <ul id="BrandSlider">
            <li>
              <img
                src="/images/marka/remax.png"
                width="165"
                height="80"
                alt="RE/MAX"
              />
            </li>
            <li>
              <img
                src="/images/marka/beko.png"
                width="165"
                height="80"
                alt="Beko"
              />
            </li>
            <li>
              <img
                src="/images/marka/Coldwell_Banker_logo-gri.png"
                width="165"
                height="80"
                alt="Coldwell Banker"
              />
            </li>
            <li>
              <img
                src="/images/marka/Lexus-Logo-Wallpaper-500x200.png"
                width="165"
                height="80"
                alt="Lexus"
              />
            </li>
            <li>
              <img
                src="/images/marka/remax.png"
                width="165"
                height="80"
                alt="RE/MAX"
              />
            </li>
            <li>
              <img
                src="/images/marka/beko.png"
                width="165"
                height="80"
                alt="Beko"
              />
            </li>
            <li>
              <img
                src="/images/marka/Coldwell_Banker_logo-gri.png"
                width="165"
                height="80"
                alt="Coldwell Banker"
              />
            </li>
            <li>
              <img
                src="/images/marka/Lexus-Logo-Wallpaper-500x200.png"
                width="165"
                height="80"
                alt="Lexus"
              />
            </li>
          </ul>
          <a href="#" className="Prev" id="BrandPrev">
            Önceki
          </a>
          <a href="#" className="Next" id="BrandNext">
            Sonraki
          </a>
          <div className="clear"></div>
        </div>
      </div>
    </>
  );
}
