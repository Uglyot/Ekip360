# Vaka notu — Referans address/description ayrıştırması (2026-09-16)

> Taslak. migration-playbook reposuna taşınırken düzenlenecek.
> Proje: ekip360.net (ASP.NET MVC 5 → Next.js + Sanity). Sayılar Sanity production ve canlı site ölçümlerinden.

## Sorunun kaynağı
- 70 referans kaydının 54'ünde `address` 150 karakterden uzundu; tanıtım metni + web sitesi URL'si + posta adresi tek alanda duruyordu. 70 kaydın hiçbirinde `description` dolu değildi.
- Kök sebep migration hatası değil: orijinal ASP.NET sitesinde bu içerik zaten `Adress` span'ının içindeydi (Wayback arşiviyle doğrulandı). Import, `<p>` yapısını düzleştirip tek satır yaptığı için sorun görünmez hale gelmişti.
- Yan sorun: 64 kayıtta çözülmemiş named HTML entity (`&uuml;` 760, `&ccedil;` 357, `&ouml;` 255, `&rsquo;` 110 geçiş…; 13 ayrı entity, `&sup2;` dahil).

## Doğrulama yöntemi ve maliyeti
- İlk kaynak (SQL dump, 2018) yetersiz kaldı: URL içeren 56 kaydın yalnızca 6'sını içeriyordu.
- Wayback Machine'e geçildi (CDX listesi + ham `id_` kopyalar): 70 sayfanın 69'u arşivden çekildi (eksik olan tek kaydın address'i zaten boştu).
- Arşiv metni bugünkü Sanity verisiyle karakter karakter karşılaştırıldı: ilk turda 61/69 eşleşti; kalan 8 kaydın farkı yalnızca kesme işaretiydi → kesme işaretleri hariç 69/69 birebir.
- Arşiv `<p>` sınırları sayesinde "URL gömülü mü", "adres kesilmiş mi", "cümle yarım mı kaldı" soruları tahminle değil kaynakla cevaplandı: 56 URL'nin 56'sı kendi paragrafında çıktı (gömülü URL: 0).
- Maliyet (ham veri, effort-estimation için; oturum zaman damgaları ve konuşma kaydından sayıldı — kesin log değil, yaklaşık):
  - Sınır doğrulaması (arşiv bulma → çekme → eşleştirme → 6 kontrol): 1 agent turu, ~12 shell komutu, ~14 dk duvar saati. 70 sayfalık Wayback çekimi tek komuttu (istekler arası 800 ms bekleme → en az ~1 dk).
  - Kullanıcı kararlarıyla 70 kayıtlık nihai önerinin yeniden üretimi + review sayfası: 1 agent turu, ~17 araç çağrısı, ~19 dk.
  - Referans ayrıştırma işinin tamamı (ilk istek → veri yazılıp canlıda doğrulanması): ~2 sa 20 dk duvar saati; bunun önemli kısmı kullanıcı review'ı ve manuel deploy beklemesi.
  - Oturumun tamamı (sonraki ek görevler dahil): ~5 sa 15 dk.

## Bulunan gerçek bug'lar (üretime gitmiş ya da gidebilecek)
- 4 script'te 4 farklı entity decode mantığı:
  - `import-referanslar-full.mjs` → `stripHtml()` sayısal entity'leri **çevirmiyor, siliyor** (`&#[0-9]+;` → `''`). Arşivde `&#39;` olan 21 kesme işareti bu yüzden 8 kayıtta production'dan kaybolmuştu ("İstanbul'un" → "İstanbulun"). Arşivden geri getirildi.
  - `fix-html-entities.mjs` → yalnızca sayısal Türkçe entity'ler; named entity'leri hiç işlemiyordu → 64 kayıtta `B&uuml;y&uuml;kada` canlıdaydı. Düzeltildi.
  - `import-blog.mjs` → named entity'leri işliyor ama regex'ler `gi` (case-insensitive): `&Ccedil;/&Uuml;/&Ouml;` önce küçük harf kuralına takılıp **küçük harfe çevriliyor**. Bu fonksiyon referans düzeltmesi için "doğru örnek" olarak önerilmişti; kopyalansaydı referans verisinde 63 büyük harf geçişi sessizce bozulacaktı (31 `&Ccedil;` + 24 `&Uuml;` + 8 `&Ouml;`). Ayrıca `&iuml;` → "ı" eşlemesi yanlış (doğrusu "ï").
  - `import-referanslar.mjs` → case-sensitive, büyük harf sorunu yok; `&iuml;` → "ı" hatası burada da var.
- **Blog verisine gitmişti — aynı gün düzeltildi:** `import-blog.mjs` blog import'unda çalıştırılmıştı. İlk heuristik "10 yazıda 13 cümle" dedi; arşivle karşılaştırma gerçek kapsamı 11 yazıda 29 kelime (+4 summary) olarak çıkardı. Veri düzeltildi, `import-blog.mjs` kök sebepte case-sensitive'e çevrildi. Ayrıntı: `2026-09-16-blog-entity-fix.md`.
- Import'un satır içi etiketleri (`<strong>` vb.) boşlukla değiştirmesi, noktalamadan önce yanlış boşluk ekledi ("Qubbe , kına"; orijinal: `<strong>Qubbe</strong>,`). İlk raporda "orijinal müşteri yazım hatası" sanıldı, arşiv HTML'iyle ikinci geçişte düzeltildi (2 kayıt: Qubbe Dedeman, Ortodonti). Gerçek orijinal hatalar ("konağımız ,", "geçirilmiştir.Otelimiz", Karşıyaka'daki asimetrik tırnak) bilerek korundu.
- Eski import galeri öğelerini `_key`'siz yazmıştı: 63 dokümanda 455 öğe; Studio'da "Missing keys" uyarısı. Backfill edildi. Tüm dataset tarandı, başka key'siz dizi yoktu.
- Geçişte (commit `5f216f6`, 2026-07-21) liste sorgusu `sector` çekmediği halde kart `ref.sector || 'Sanal Tur'` gösteriyordu → orijinalde olmayan metin (bkz. "Kuralın kendi kendini yakalaması").

## Analiz araçlarındaki hatalar (production'a gitmedi, yakalandı)
- Paragraf bölücü `<ul>/<li>`'de bölmediği için ilk turda 1 "gömülü URL" yanlış pozitifi (gerçekte 0).
- `</p>` cümle ortası birleştirme kuralı yalnızca küçük harfle başlayan devamı yakaladı; "…Havaalanı'na direk`</p><p>`Metro ile…" kaçtı, kural "noktalamasız biten, başlık olmayan paragraf" olarak sıkılaştırıldı.
- İlk arşiv↔Sanity fark script'i başlık eşleştirmesinde yanlış sayfaları aldı (3 sahte "farklı içerik").
- Canlı kontrol script'inde zsh `set -- $var` kelime bölmediği için sahte "0" sonuçlar; Node ile yeniden yazıldı.
- Birleştirme script'inde `_key`'siz dizide `"undefinedm"` tekrar eden anahtar üretilecekti; yazmadan önce veri kontrolüyle yakalandı.

## Görsel/fonksiyonel parite kontrolü nasıl yapıldı
- Yazmadan önce HTML review artifact'i: v1 56 kayıt, v2 70 kayıt; eski→yeni yan yana, grup filtreli, bütünlük kontrolü (eski metnin her karakteri yeni alanlardan birinde; boşluk/kesme/etiket hariç) 70/70.
- Gerçek site CSS'iyle yerel önizleme (Playwright + yerel HTTP sunucu, `file:` engelli), 1280 px ve 390 px'te birer görsel kontrol.
- Güvenli yazma sırası (4 yazma script'inde de aynı): **yedek → drift kontrolü** (öneri hazırlandığından beri kaynak alan değişti mi) → **DRY_RUN** → yaz (`ifRevisionId` kilidi, yalnızca değişen alanlar) → **yedekle karşılaştırarak doğrula** (beklenmeyen alan değişikliği 0). Checklist'e alınabilir.
- Kod, veriden önce deploy edildi: yeni blok boş alanda render edilmediği için canlıda görünür değişiklik olmadı; veri canlıdaki bloğun varlığı doğrulandıktan sonra yazıldı (aksi halde 47–53 kaydın tanıtım metni geçici olarak kaybolacaktı).
- Deploy sonrası canlı kontroller: `?cb=` önbellek atlatma ile redirect (308), sitemap sayısı (69), `/referanslar` boyutu (157.313 → 103.783 bayt, %34), tüm detay sayfalarının HTTP durumu (69/69 → 200), CSS hash'i canlı = yerel, alan değerleri review ile birebir.

## Otomasyon vs insan kararı oranı
- 70 kaydın 64'ü **değişti**; ama "değişti" ≠ "otomatik". Ayrım:
  - **Kural bazlı, insan kararı gerekmeden:** 53 kayıt (%76) — URL'li standart düzen (tanıtım / URL / adres), Zafer'in ters sırası dahil.
  - **İnsan kararı gerekti:** 11 kayıt (%16) — Natural Decor (telefon paragrafları → telephoneNumber), Saloon Locca (3 URL, hangisi website), Ortodonti `APlZ…` (website için metin değil href), Lexus Maslak ("Adres :" öneki), 4 × "tanıtım + sonda adres" (URL'siz; BW Premier Sakarya, BW Citadel, BW President, BW Eresin — grup başlık listesiyle elle sınıflandı), Edward's Coffee ve Panayır Fırın (ters sıra, elle), Orman Bölge Müdürlüğü (adres değil, boşaltıldı).
  - **Değişiklik yok:** 6 kayıt (%9) — adres zaten temiz ya da boş.
- İnceleme gerektirip değişiklik doğurmayanlar: BW Premier Karşıyaka (tırnak orijinalmiş), Zafer (boşluk değişikliği doğru bulundu).
- Ayrıca ayrı bir insan kararı: mükerrer Ortodonti kaydı (hangisi tutulacak, neler birleştirilecek).
- Kullanıcı karar turları: 5 kararlık bir tur + 2 koşullu onay + tek tek alınan onaylar (yazma, deploy, sektör seçeneği).

## Ek bulgular (aynı oturumda, ayrı görevler olarak)
- Mükerrer referans kaydı (aynı işletme; eski sitede de iki ayrı sayfaydı: `/46` 2016, `/2103` 2021). Eski-site slug yönlendirmesinin işaret ettiği kayıt tutuldu; diğerindeki 3 galeri görseli, sektör ve daha tam adres taşındı; silinen id için kalıcı yönlendirme (Next `permanent: true` → 308).
- Liste sayfası kullanılmayan `description` alanını her ziyarette gönderiyordu: alan doluyken GROQ projeksiyonundan çıkarmak `/referanslar`'ı %34 küçülttü. Genel ders: **yeni bir Sanity alanını doldurmak, onu kullanmayan ama `...`/geniş projeksiyonla çeken sorgulara sessizce yük bindirir** → checklist: "alan eklerken/doldururken ilgili tüm GROQ sorgularını gözden geçir".
- Aynı tarama tersini de gösterdi: client'ın okuduğu `ref.sector` sorguda hiç yoktu → projeksiyon ile bileşenin okuduğu alanlar karşılıklı kontrol edilmeli.

## Kuralın kendi kendini yakalaması — canlı örnek
- Sektörü liste kartında göstermek "iyileştirme" gibi göründü ve kodu yazıldı; arşiv kontrolü iki şey çıkardı: (1) eski sitede kartlar hiçbir zaman sektör göstermemiş, sabit "Ayrıntı için Tıkla" yazıyormuş (`Referanslar.cshtml:88`, arşivde 71/71 kart); (2) "Sanal Tur" ibaresi 2026-07-21 geçiş commit'inde (`5f216f6`) eklenmiş ve ~2 aydır CLAUDE.md'deki "birebir aynı" kuralını ihlal ediyormuş. Sektör zaten 69 kaydın yalnızca 7'sinde doluydu.
- Ders: "iyileştirme" önerileri de parite kontrolünden geçmeli, yalnızca hata düzeltmeleri değil. Checklist maddesi: her yeni görünür değişiklikte arşiv/orijinalle karşılaştır — "daha iyi" olması "doğru" olduğu anlamına gelmez.
- Yan bulgu: arşivde 71 kart, canlıda 69. Fark varsayımla değil başlık başlık karşılaştırmayla kapatıldı: 1 bugün silinen mükerrer kayıt, 1 eski sitede olup hiç import edilmemiş "Test" kaydı.

## Günün metrikleri (ilk veri noktası)
- Commit: **11** (hepsi origin/main'de) — `e26e359`, `61e2d62`, `0ca43f4`, `9d42703`, `342cf8d`, `d249676`, `0ef6281`, `ebfa552`, `60e98c7`, `bb043bd`, `c6edbf6`.
- Revert: **1** (`bb043bd`, sektör — rebase yerine revert commit'i; sonraki commit'ler aynı dosyaya dokunuyordu).
- Production'a yazan script: **4** — `fix-html-entities.mjs` (64 doküman), `apply-split.mjs` (64), `merge-ortodonti-duplicate.mjs` (1 transaction: 1 güncelleme + 1 silme), `backfill-gallery-keys.mjs` (63).
- Yazma öncesi yedek: 4 set, repoda `migration/backups/2026-09-16/`.
- Deploy: **4** (açıklama bloğu; mükerrer kayıt yönlendirmesi; sorgu daraltma; website linki + "Ayrıntı için Tıkla"). Bunların 2'si `public/` CSS senkronizasyonu gerektirdi; her deploy öncesi canlı ↔ yerel CSS hash'i karşılaştırıldı.
