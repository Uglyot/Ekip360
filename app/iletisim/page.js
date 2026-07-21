import ContactForm from './ContactForm'

export const metadata = {
  title: 'İletişim — Ekip 360',
}

export default function IletisimPage() {
  return (
    <>
      {/* Google Maps */}
      <div className="pageContactslide">
        <div id="map-canvas" style={{ width: '100%', height: '380px' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3015.3!2d29.11737!3d40.93584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDU2JzA5LjAiTiAyOcKwMDcnMDIuNSJF!5e0!3m2!1str!2str!4v1"
            width="100%"
            height="380"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
      </div>

      {/* Form + Adres */}
      <div className="pageContactWrapper">
        <div className="Content">
          <ContactForm />

          {/* Adres bilgileri */}
          <div className="Box">
            <div className="Capsule">
              <span className="Title">BİZE ULAŞIN</span>
              <div className="Address">
                <ul>
                  <li>İdealtepe Mah., Adalet Sk., No:1/7, 34841<br />Maltepe / İstanbul</li>
                  <li className="Phone">+ 90 533 714 55 66</li>
                  <li className="Phone">+ 90 532 370 23 71</li>
                  <li className="Email"><a href="mailto:info@ekip360.net">info@ekip360.net</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="clear"></div>
        </div>
        <div className="clear"></div>
      </div>
    </>
  )
}
