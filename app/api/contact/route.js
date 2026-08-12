import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return Response.json({ error: 'Tüm alanlar zorunludur.' }, { status: 400 })
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message)

    const { error } = await resend.emails.send({
      from: 'Ekip 360 Web <no-reply@mail.ekip360.net>',
      to: process.env.CONTACT_EMAIL || 'info@ekip360.net',
      replyTo: email,
      subject: `Ekip 360 İletişim Formu — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #333;">Yeni İletişim Formu Mesajı</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 120px;">Ad Soyad:</td>
              <td style="padding: 8px;">${safeName}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 8px; font-weight: bold;">E-Posta:</td>
              <td style="padding: 8px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; vertical-align: top;">Mesaj:</td>
              <td style="padding: 8px; white-space: pre-wrap;">${safeMessage}</td>
            </tr>
          </table>
          <p style="color: #999; font-size: 12px; margin-top: 24px;">
            Bu e-posta ekip360.net iletişim formundan gönderilmiştir.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ error: 'E-posta gönderilemedi.' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return Response.json({ error: 'Sunucu hatası.' }, { status: 500 })
  }
}
