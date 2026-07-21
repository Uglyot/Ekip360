export const metadata = {
  title: 'Kimler Yararlanabilir? — Ekip 360',
}

export default function KimlerYararlanabilirPage() {
  return (
    <>
      <div className="pageKimlerYararlanirFullTitle">
        <h1>Kimler Yararlanabilir?</h1>
      </div>

      <div className="pageWhoParticipateWrapper">
        <div className="Content">

          {/* Tag cloud görseli */}
          <div className="Box">
            <img
              src="/images/tagclou_ekip360.png"
              width="980"
              height="450"
              alt="Kimler Yararlanabilir - Ekip 360"
            />
          </div>

          {/* Oteller */}
          <div className="TextBox">
            <span className="Line">&nbsp;</span>
            <span className="Title">VE OTELLER</span>
            <span className="Image">
              <img
                src="/images/referans/pagereferance01.jpg"
                alt="Otel Sanal Tur"
                style={{ width: '60%', height: 'auto', float: 'none', display: 'block', margin: '0 auto' }}
              />
            </span>
            <ul>
              <li>MİNİMUM 2 TİP ODA — Full coverage. Varsa balkon ve banyo.</li>
              <li>LOBBY / RECEPTION BÖLGESİ — Full coverage.</li>
              <li>RESTAURANTS — Otel tarafından işletiliyor olmalı. Full coverage.</li>
              <li>FİTNESS CENTER — Minimum coverage of 1 photo sphere.</li>
            </ul>
            <ul>
              <li>POOL — Minimum coverage of 1 photo sphere.</li>
              <li>STAND ALONE BAR — Minimum coverage of 1 photo sphere.</li>
              <li>LOUNGE — Minimum coverage of 1 photo sphere.</li>
              <li>SPA — Minimum coverage of 1 photo sphere.</li>
            </ul>
          </div>

          <div className="clear"></div>
        </div>
        <div className="clear"></div>
      </div>
    </>
  )
}
