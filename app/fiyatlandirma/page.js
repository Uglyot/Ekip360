// TODO: İçerik Sanity'den gelecek

export const metadata = {
  title: 'Fiyatlandırma Nasıl Yapılır? — Ekip 360',
}

export default function FiyatlandirmaPage() {
  return (
    <>
      <div className="breadCrumbs">
        <ul>
          <li><a href="/google-sanal-tur-avantajlari">360 Sanal Tur Nedir?</a></li>
          <li className="selected"><a href="/fiyatlandirma">Sanal Tur Fiyatlandırması Nasıl Yapılır?</a></li>
        </ul>
      </div>

      <div className="pageSanalTurFullTitle">
        <h1>Sanal Tur Fiyatlandırması Nasıl Yapılır?</h1>
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
                <li><a href="/fiyatlandirma" className="Active">Fiyatlandırma Nasıl Yapılır?</a></li>
                <li><a href="/referanslar">Örnek Uygulamalar</a></li>
                <li><a href="/iletisim">Bize Ulaşın / Biz Sizi Arayalım</a></li>
                <li><a href="/web-sitenize-ekleyin">360 Sanal Turunuzu Web Sitenize Ekleyin</a></li>
                <li><a href="/facebooka-ekleyin">360 Sanal Turunuzu Facebook&apos;a Ekleyin</a></li>
              </ul>
            </div>
          </div>

          <div className="pageLeftColums">
            <div className="TextContent">
              <h1 className="page-title">Sanal Tur Fiyatlandırması Nasıl Yapılır?</h1>
              <p className="lead">
                İşletmeniz için sanal tur bütçesini belirlemek aslında çok kolaydır. Fiyatlandırmamız temel olarak çekilecek <strong>sahne (nokta) sayısına</strong> göre belirlenir.
              </p>

              <div className="pricing-rules" style={{ marginTop: 30, marginBottom: 30 }}>
                <p>
                  <strong>Sahne Nedir?</strong> Kamerayı taşıyan tripodun yerleştirildiği her bir nokta <strong>1 sahne</strong> olarak kabul edilir. Sahnelerin toplam sayısı çekimin maliyetini belirler.
                </p>
                <ul>
                  <li><strong>Sahne Birim Maliyeti:</strong> Çekimlerimizde sahne başına birim maliyetimiz <strong>[2.500] TL'den</strong> başlamaktadır.</li>
                  <li><strong>Minimum Servis Bedeli:</strong> Proje bazlı minimum başlangıç maliyetimiz <strong>[15.000] TL'dir</strong>.</li>
                </ul>
              </div>

              <hr />

              <div className="pricing-options" style={{ marginTop: 30 }}>
                <h2>Kendi Temel Stratejinizi Belirleyin</h2>
                <p>Fiyatlama ile ilgili iki temel yöntemle hareket edebilirsiniz:</p>

                <div className="option-card" style={{ marginBottom: 25 }}>
                  <h3>1. İDEAL ÇEKİM (FULL ÇEKİM)</h3>
                  <p>
                    Google standartlarına tam uyumlu, kullanıcılara sanki oradaymış hissini en üst düzeyde veren çekimlerdir.
                  </p>
                  <ul>
                    <li>Çekimi yapılan her iki nokta birbirini mutlaka görmelidir.</li>
                    <li>Çekim noktaları arasındaki geçişler, bir ziyaretçi için en normal yürüme rotası olmalıdır.</li>
                    <li><strong>Nasıl Hesaplanır?</strong> Mekanınızda bu kurallara göre kaç sahnelik bir çekim yapılacağını kabaca hesaplayıp elde ettiğiniz sayıyı bize iletebilirsiniz. Çekim noktaları fazla olduğu için maliyeti kısmi çekime göre daha yüksektir.</li>
                  </ul>
                </div>

                <div className="option-card" style={{ marginBottom: 25 }}>
                  <h3>2. KISMİ ÇEKİM (BÜTÇE DOSTU)</h3>
                  <p>
                    Full çekimin bütçenizi aşması durumunda tercih edilen, çok daha ekonomik bir yöntemdir.
                  </p>
                  <ul>
                    <li>Sektörel segmentinize özel sahne birim maliyetini bizden öğrenirsiniz.</li>
                    <li>Bunu kendi bütçenize bölerek kaç adet sahne çektirebileceğinizi kendiniz belirlersiniz.</li>
                    <li>Geriye kalan tek işlem, bütçenize sığan bu sahnelerin mekanın hangi kritik noktaları olacağına karar vermektir. (Sahnelerin birbirini görmesi ve ardışık olması kuralı bu çekimde de geçerlidir).</li>
                  </ul>
                </div>
              </div>

              <hr />

              <div className="pricing-footer" style={{ marginTop: 30 }}>
                <p>
                  <em>* Yapılacak çekimlerin işçilik ve detay seviyesi sektör bazında (Lüks segment, orta veya butik işletmeler) değişebileceği için her segment için tek bir standart fiyatımız bulunmamaktadır. İşletmenizin segmentine en uygun adil fiyatlandırmayı sunuyoruz.</em>
                </p>
                <p style={{ fontWeight: 'bold', marginTop: 20 }}>
                  Kendi stratejinizi belirledikten sonra tahmini sahne sayısıyla bizimle iletişime geçebilir veya bizi doğrudan arayarak hesaplama yöntemini telefondan kolayca öğrenebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
