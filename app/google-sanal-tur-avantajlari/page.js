export const metadata = {
  title: 'Google Sanal Tur Avantajları — Ekip 360',
  alternates: { canonical: '/google-sanal-tur-avantajlari' },
  openGraph: {
    title: 'Google Sanal Tur Avantajları — Ekip 360',
    url: '/google-sanal-tur-avantajlari',
    images: ['/images/slider/slider01.jpg'],
  },
}

const advantages = [
  {
    id: 1,
    icon: '/images/page360_icon_01.jpg',
    title: 'Google Aramalarda Görünür Olun',
    description: 'Google Arama sonuçlarında, rakiplerinizden farklı olarak işletmenizin iç mekan görüntülerini potansiyel müşterilerinize sunun. Müşterileriniz kapınızı çalmadan önce içeride neler olduğunu görebilsinler.',
  },
  {
    id: 2,
    icon: '/images/page360_icon_02.jpg',
    title: 'Haritalarda Görünür Olun',
    description: 'Google Haritalar\'da işletmenizi arayanlara iç mekan görüntülerinizi sunun. Müşterileriniz haritalar üzerinden işletmenizi kolaylıkla bulabilir ve içeriye sanal tur yapabilirler.',
  },
  {
    id: 3,
    icon: '/images/page360_icon_03.jpg',
    title: '360 Derece Panoramalar ile İşinizi Gezdirin',
    description: 'Potansiyel müşterilerinize işletmenizi 360 derece gezdirin. İşletmenizin atmosferini, dekorasyonunu ve sunduğu imkanları sanal tur aracılığıyla keşfettirin. Müşteri güvenini artırın.',
  },
  {
    id: 4,
    icon: '/images/page360_icon_04.jpg',
    title: 'Google İşletme Kaydı ile Kontrol Sizde',
    description: 'Google İşletmem (Google My Business) kaydınız ile sanal turunuzu, fotoğraflarınızı, çalışma saatlerinizi ve iletişim bilgilerinizi istediğiniz zaman güncelleyebilirsiniz. İşletmenizin Google\'daki varlığını kendiniz yönetin.',
  },
  {
    id: 5,
    icon: '/images/page360_icon_05.jpg',
    title: 'Tek Ödeme ile Üç Ayrı Platformda Kullanın',
    description: 'Bir kez yaptırdığınız sanal tur çekimi; Google Arama, Google Haritalar ve Google+ sayfanızda aynı anda yayınlanır. Bunun yanı sıra sanal turunuzu web sitenize ve Facebook sayfanıza da ekleyebilirsiniz.',
  },
]

export default function SanalTurAvantajlariPage() {
  return (
    <>
      <style>{`
        .page360Wrapper .Content ul li span.Right { float: left; }
        .page360Wrapper .Content ul li span.Left  { float: right; }
      `}</style>

      <div className="page360slide">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m0!3m2!1str!2str!4v1455367143598!6m8!1m7!1spjyBAC55gZUAAAQvOfknLg!2m2!1d40.96453809689153!2d29.07379252162878!3f35.18!4f0!5f0.7820865974627469?hl=ru"
          width="100%"
          height="380"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
        />
      </div>

      <div className="page360Wrapper">
        <div className="Content">
          <h1>Google Sanal Tur Avantajları Nelerdir?</h1>
          <ul>
            {advantages.map((item, i) => (
              <li key={item.id}>
                {i % 2 === 0 ? (
                  <>
                    <span className="Colums Text Right">
                      <span>{item.title}</span>
                      <p>{item.description}</p>
                    </span>
                    <span className="Colums Image">
                      <img src={item.icon} width="475" height="350" alt={item.title} />
                    </span>
                  </>
                ) : (
                  <>
                    <span className="Colums Image">
                      <img src={item.icon} width="475" height="350" alt={item.title} />
                    </span>
                    <span className="Colums Text Left">
                      <span>{item.title}</span>
                      <p>{item.description}</p>
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="clear"></div>
        </div>
        <div className="clear"></div>
      </div>
    </>
  )
}
