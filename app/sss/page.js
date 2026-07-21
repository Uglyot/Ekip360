export const metadata = {
  title: 'Sıkça Sorulan Sorular — Ekip 360',
}

const faqs = [
  {
    id: 1,
    question: 'Google Business View Nedir?',
    answer: 'Google Arama ve Google Haritalar\'da iç mekan Street View görüntüleri kullanılarak işletmelerin içinde sanal tur veya VR gözlükler ile sanki oradaymış gibi gezilmesine olanak sağlayan Google zenginleştirilmiş sunum teknolojisidir.',
  },
  {
    id: 2,
    question: 'İşletme iç mekan görüntülerini kimler çekebilir?',
    answer: 'Bu konuda Google Güvenilir Profesyonelleri hizmet vermektedir. Program sonlandırılmış olsa da sizler, biz eski rozetli güvenilir profesyonellerden hizmet almaya devam edebilirsiniz.',
  },
  {
    id: 3,
    question: 'Kimler yararlanabilir?',
    answer: 'Google Arama ve Google Haritalar\'da işletmesini bu teknoloji ile tanıtmak isteyen herkes. Satılık veya kiralık gayrimenkuller dışında fiziki bütün mekanlar bu sistem ile tanıtılabilmektedir.',
  },
  {
    id: 4,
    question: 'Sanal Tur Nedir?',
    answer: 'Sanal tur, bir mekanın, özel fotoğraflama tekniği ile birbirini tamamlayan fotoğraf sahneleri çekimleri gerçekleştirilerek, bunların da çeşitli post production yazılımlardan geçirilmesiyle oluşturulmuş, kullanıcıya mekanın içindeymiş hissi veren simülasyonudur. Bu simülasyon daha sonra çeşitli multimedya görüntü, ses efektleri veya metinlerle zenginleştirilebilmektedir. Ayrıca Virtual Reality teknolojisi ile de uyumlu çalışabilmektedir.',
  },
  {
    id: 5,
    question: 'Hizmeti almaya karar verdim. Ne yapmalıyım?',
    answer: <>
      Google Güvenilir Profesyonelleri ile bağlantıya geçmelisiniz. Bununla birlikte Google İşletmem (My Business) kaydınızı yaptırmalısınız. Ve yaptığınız kaydı doğrulamalısınız.
      <br /><br />
    </>,
  },
  {
    id: 6,
    question: 'Çekim Sahnesi nedir?',
    answer: <>
      Çekimlerde fotoğraf makinası tripodunun (ayağı&apos;nın) konularak 360 derece çekimin yapıldığı her bir ayrı bölümü ifade eder. Sanal tur içinde 360 derece etrafa baktığınız her bir ayrı bölümdür.
      <br /><br />
      <strong>Google çekim kuralları:</strong> Çekimi yapılan her iki nokta birbirini mutlaka görmeli (1) Bu noktalar (sahneler) arası mekanın içindeysek 3 metre, sokaktan mekana doğru ilerliyorsak en fazla 6 metre olmalı (2) Ve bu rota herhangi biri için en normal yürüme yolu olmalı (3)
    </>,
  },
  {
    id: 7,
    question: 'Kaç sahne çekim yaptırmam gerektiği konusunda hala bir fikrim oluşmadı?',
    answer: <><a href="/fiyatlandirma">Fiyatlandırma nasıl yapılır</a> sayfamızı okuyunuz. Veya lütfen bizimle <a href="/iletisim">irtibata geçiniz</a>.</>,
  },
  {
    id: 8,
    question: 'Türkiye genelinde hizmet veriyor musunuz?',
    answer: 'Hizmet verdiğimiz il İstanbul\'dur. Ancak çekim sahne sayısı 30 ve üzeri ise Türkiye\'nin her iline hizmet götürmekteyiz.',
  },
  {
    id: 9,
    question: 'Çekimlerden önce nelere dikkat etmeliyim?',
    answer: 'Çekilecek mekanın öncelikle çekime hazırlanması, uygun hale getirilmesi gerekmektedir. Temiz ve düzenli bir mekan oluşturmalı ve aydınlatma konusunda gün ışığından maksimum istifade edecek bir saati tercih etmelisiniz. Mekan içi aydınlatma cihazlarının çalışır olması önemlidir. Mekan dışında açık havada çekim yapılacaksa havanın yağışsız olması gerekmektedir.',
  },
]

export default function SSSPage() {
  return (
    <>
      <div className="breadCrumbs">
        <ul>
          <li><a href="/hakkimizda">Kurumsal</a></li>
          <li className="selected"><a href="/sss">Sıkça Sorulan Sorular</a></li>
        </ul>
      </div>

      <div className="pageSanalTurFullTitle">
        <h1>Sıkça Sorulan Sorular</h1>
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
                <li><a href="/ekip360">Ekip 360</a></li>
                <li><a href="/sss" className="Active">Sıkça Sorulan Sorular</a></li>
              </ul>
            </div>
          </div>

          <div className="pageLeftColums">
            <div className="TextContent">
              <ul>
                {faqs.map((faq) => (
                  <li key={faq.id}>
                    <span className="Question"><strong>{faq.question}</strong></span>
                    <p>{faq.answer}</p>
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
