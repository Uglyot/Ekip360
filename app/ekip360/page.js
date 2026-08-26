export const metadata = {
  title: 'Ekip 360 — Ekip 360',
  alternates: { canonical: '/ekip360' },
  openGraph: {
    title: 'Ekip 360 — Ekip 360',
    url: '/ekip360',
    images: ['/images/slider/slider01.jpg'],
  },
}

const team = [
  {
    id: 1,
    name: 'TOLGA BALIKÇI',
    title: 'CEO',
    photo: '/images/ekip/tolgabalikci.png',
    bio: '1969 doğumlu, Çukurova Üniversitesi İktisadi İdari Bilimler Fakültesi, İngilizce İktisat Bölümü mezunu, müteşebbis, amatör müzisyen, Google Güvenilir Fotoğrafçı.',
  },
  {
    id: 2,
    name: 'GÖKHAN AYDIN',
    title: 'CEO',
    photo: '/images/ekip/gokhanaydin.png',
    bio: '1974 doğumlu, Yıldız Teknik Üniversitesi Restorasyon ve sonrasında Yıldız Teknik Üniversitesi Mimarlık Fakültesi mezunu, fotoğrafçı.',
  },

  {
    id: 3,
    name: 'İBRAHİM YÜZLÜ',
    title: 'FOTOĞRAFÇI',
    photo: '/images/ekip/ibrahimyuzlu.jpg',
    bio: '1988 doğumlu, Bahçeşehir Üniversitesi Pazarlama Bölümü mezunu, 13 yıllık yurt içi, dışı projelerde yer almış serbest Profesyonel Fotoğrafçı. ',
  },
  {
    id: 4,
    name: 'TURGAY SÜSEM',
    title: 'FOTOĞRAFÇI',
    photo: '/images/ekip/turgaysusem.png',
    bio: '1981 doğumlu, Kocaeli Üniversitesi Gazetecilik Bölümü mezunu, Marmara Üniversitesi GSF Yüksek Lisans Öğrencisi, Gazeteci, Profesyonel Fotoğrafçı, Fotoğraf Eğitmeni.',
  },
]

export default function Ekip360Page() {
  return (
    <>
      <div className="breadCrumbs">
        <ul>
          <li><a href="/hakkimizda">Kurumsal</a></li>
          <li className="selected"><a href="/ekip360">Ekip 360</a></li>
        </ul>
      </div>

      <div className="pageSanalTurFullTitle">
        <h1>Ekip 360</h1>
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
                <li><a href="/hakkimizda">Hakkımızda</a></li>
                <li><a href="/ekip360" className="Active">Ekip 360</a></li>
                <li><a href="/sss">Sıkça Sorulan Sorular</a></li>
              </ul>
            </div>
          </div>

          <div className="pageLeftColums">
            <div className="EkipList">
              <ul>
                {team.map((member) => (
                  <li key={member.id}>
                    <span className="Image">
                      <img
                        src={member.photo}
                        width="200"
                        height="300"
                        alt={member.name}
                      />
                    </span>
                    <span className="Content">
                      <span className="Name">
                        <b>{member.name}</b> / {member.title}
                      </span>
                      <p>{member.bio}</p>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
