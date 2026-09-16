# Vaka notu — Blog verisinde büyük harf entity hatası (2026-09-16)

> Taslak. migration-playbook reposuna taşınırken düzenlenecek.
> İlgili vaka: `2026-09-16-referans-ayristirma.md` (aynı hata deseni orada kopyalanmadan yakalandı).

## Sorunun kaynağı
- `migration/import-scripts/import-blog.mjs` → `decodeEntities()` regex'leri `/gi` idi: `.replace(/&ouml;/gi, 'ö')` `&Ouml;`'yü de yakalayıp küçük harfe çeviriyordu; büyük harf kuralı sonra çalıştığı için hiç eşleşmiyordu.
- Blog import'u bu fonksiyonla çalıştırılmıştı → hata production blog verisine gitmişti.
- Arşivdeki blog HTML'inde bu hatayı tetikleyen entity'ler: yalnızca `&Ccedil;`, `&Ouml;`, `&Uuml;`.

## Tespit
- Referans işinin vaka notu yazılırken, "kopyalansaydı referansları bozacaktı" iddiası doğrulanırken bulundu: bu decoder'ı zaten kullanmış olan blog verisine bakıldı.
- İlk heuristik (cümle başında küçük ç/ö/ü): 14 yazının 10'unda 13 geçiş. **Eksik sayım** — büyük harfle yazılmış başlık/slogan kelimelerinin içini ("İçİNİ GöRüN", "öNEMLİ ANLARDA GöRüNüR") ve özel adları yakalamıyordu.

## Doğrulama yöntemi
- 14/14 yazının orijinal sayfası Wayback'ten çekildi (`/web/2021id_/https://ekip360.net/Blog-Detay/...`; CDX servisi o an "Temporarily Offline" döndü, doğrudan `id_` kopyası çalıştı).
- Arşiv HTML'i import'un kendi segmentasyonuyla iki decoder'dan geçirildi:
  - **hatalı decoder** (script dosyasından birebir okundu) → 14 yazının tüm metin bloklarında bugünkü Sanity metnine **birebir eşit** (başka fark 0, kesme işareti farkı 0, blok sayısı 14/14 eşit). Mekanizma kanıtlandı.
  - **case-sensitive decoder** (tek fark `/gi` → `/g`) → hedef metin.
- Düzeltme = iki decoder çıktısının farklı olduğu karakter pozisyonları. Bu tanım gereği yazarın kendi yazımına dokunulamaz (ör. "360 derece İç Mekan", başlıktaki küçük "çektirdiniz" korundu).
- Kontrol: değişen her karakter çifti yalnızca `ç>Ç`, `ö>Ö`, `ü>Ü`; blok uzunlukları değişmedi.

## Sonuç (gerçek sayılar)
- 11/14 yazı, 21 blok, **29 kelime / 34 karakter**; ayrıca 4 yazının `summary`'si (ilk bloğun ilk 300 karakteri, her birinde 1 karakter).
- Heuristik tahmin (13 cümle) ile gerçek kapsam (29 kelime) arasında ~2,2× fark → "semptom sayımı" kapsam tahmini için yetersiz; kaynakla karşılaştırma şart.

## Yazma
- Script: `migration/backups/2026-09-16/fix-blog-case.mjs`, girdi `blog-case-proposals.json` (repoda, yeniden çalıştırılabilir).
- Sıra: DRY_RUN (drift 0) → yedek (`blog-backup-before-case-fix.json`, 14 yazı) → yaz (`ifRevisionId`; yalnızca `body[_key==…].children[_key==…].text` ve `summary`) → doğrula (yedek + beklenen değişiklikler = güncel veri, fark 0).
- 11/11 yazı yazıldı, hata 0.
- Deploy gerekmedi: blog detay `getBlogPost` 60 sn revalidate ile çekiyor. Canlıda ilk kontrolde 21/21 blok yeni metinde, eski metin 0, 11/11 sayfa 200; `/blog` listesinde bozuk iz 0.

## Kök sebep düzeltmesi
- `import-blog.mjs` → `decodeEntities()`: büyük harf varyantları önce, küçük harfler sonra, hepsi `/g` (case-sensitive) — `fix-html-entities.mjs` ile aynı desen. Test: `&Ccedil;IKIN &ccedil;ok &Ouml;NE …` → `ÇIKIN çok ÖNE …`.
- Bilinçli olarak dokunulmayan: `&iuml;` → "ı" eşlemesi yanlış (doğrusu "ï"); arşivdeki blog metinlerinde kullanılmadığı için etkisiz, kapsam yalnızca büyük/küçük harf.

## Checklist'e aday maddeler
- Aynı işi yapan yardımcı fonksiyon (entity decode) birden fazla script'te kopyalanmışsa: biri hatalı çıktığında **diğer kopyaların hangi veriye zaten yazdığını** kontrol et, sadece gelecekteki kullanımı değil.
- `/gi` ile harf eşlemesi yapan her regex şüphelidir (Türkçe büyük/küçük harf entity'leri ayrı kurallar ister).
- Kapsam tahmini semptom heuristiğiyle değil, kaynak (arşiv) ile karşılaştırarak yapılmalı.
