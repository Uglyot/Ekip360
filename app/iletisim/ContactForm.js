'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'success' | 'error' | 'loading'

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="Box">
      <div className="Capsule">
        <span className="Title">MESAJ GÖNDER</span>
        <div className="Form">
          <form onSubmit={handleSubmit}>
            <ul>
              <li>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Adınız"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </li>
              <li>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="E-Posta Adresiniz"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </li>
              <li>
                <textarea
                  name="message"
                  className="form-control"
                  placeholder="Mesajınız"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </li>
              <li>
                <input
                  type="submit"
                  value={status === 'loading' ? 'GÖNDERİLİYOR...' : 'GÖNDER'}
                  disabled={status === 'loading'}
                />
              </li>
            </ul>
          </form>
          {status === 'success' && <p style={{ color: 'green', marginTop: 8 }}>Formunuz başarıyla gönderilmiştir.</p>}
          {status === 'error' && <p style={{ color: 'red', marginTop: 8 }}>Bir hata oluştu. Lütfen tekrar deneyin.</p>}
        </div>
      </div>
    </div>
  )
}
