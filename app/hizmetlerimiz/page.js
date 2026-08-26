export const metadata = {
  title: 'Hizmetlerimiz — Ekip 360',
  alternates: { canonical: '/hizmetlerimiz' },
  openGraph: {
    title: 'Hizmetlerimiz — Ekip 360',
    url: '/hizmetlerimiz',
    images: ['/images/slider/slider01.jpg'],
  },
}

const services = [
  {
    id: 1,
    icon: '/images/servicesIcon01_page.png',
    title: 'Sanal Tur',
    description: 'Sanal Tur çekimleriniz Google Güvenilir Fotoğrafçıları ve Google onaylı ekipmanlar ile en hızlı ve en kaliteli şekilde gerçekleştirilir. Çekimler onayınızı müteakiben yayına alınır. Yayından sonra da Google Kalite Yönergeleri doğrultusunda kontrolden geçer.',
  },
  {
    id: 2,
    icon: '/images/servicesIcon02_page.png',
    title: 'Sanal Turdan 360 Video',
    description: '30 sahne ve yukarısı çekim yaptıran müşterimize Youtube ve diğer sosyal medya tanıtımlarında kullanabilecekleri sanal turdan türetilmiş kurgusal animasyonlu video (MP4 format, max. 1,5 dk) hediye edilir!',
  },
  {
    id: 3,
    icon: '/images/servicesIcon03_page.png',
    title: 'HDR Fotoğraf Çekimi',
    description: 'Profesyonel ekipman, geniş açı lensler ve en son HDR teknikleri kullanılarak çekilen işletme fotoğraflarınız için ayrıca ücret ödemezsiniz. Ayrıca çekilen fotoğrafların telif hakları tarafınıza devredilir.',
  },
  {
    id: 4,
    icon: '/images/servicesIcon04_page.png',
    title: 'Google Yerel İşletme Kaydı',
    description: 'İşletmenizin Google Yerel İşletme kaydı en hızlı ve en doğru şekilde gerçekleştirilir. Google+ hesabınız oluşturulur. Hesabınız var ise kontrolleri ve gerekli düzeltmeler yapılır.',
  },
  {
    id: 5,
    icon: '/images/servicesIcon05_page.png',
    title: 'Videolu Sanal Tur',
    description: 'Firmamız Google Sanal Tur hizmeti dışında ayrıca Videolu Sanal Tur hizmeti de sunmaktadır. Konu ile ilgili bilgi almak için lütfen bizi arayınız.',
  },
  {
    id: 6,
    icon: '/images/servicesIcon06_page.png',
    title: 'Havadan Video Çekimleri',
    description: 'Firmamız Google Sanal Tur hizmeti dışında ayrıca Havadan Video çekim hizmeti de sunmaktadır. Konu ile ilgili bilgi almak için lütfen bizi arayınız.',
  },
]

export default function HizmetlerimizPage() {
  return (
    <>
      <div className="pageServicesFullTitle">
        <h1>Hizmetlerimiz</h1>
      </div>

      <div className="pageServicesWrapper">
        <div className="Content">
          {services.map((service) => (
            <div className="Box" key={service.id}>
              <div className="Capsule">
                <span className="Image">
                  <img
                    src={service.icon}
                    width="130"
                    height="100"
                    alt={service.title}
                  />
                </span>
                <span className="Title">{service.title}</span>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
          <div className="clear"></div>
        </div>
        <div className="clear"></div>
      </div>
    </>
  )
}
