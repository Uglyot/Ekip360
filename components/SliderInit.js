'use client'

import { useEffect } from 'react'

export default function SliderInit() {
  useEffect(() => {
    function loadScript(src) {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        const script = document.createElement('script')
        script.src = src
        script.onload = resolve
        script.onerror = reject
        document.body.appendChild(script)
      })
    }

    async function init() {
      try {
        // jQuery once yuklenmeli; plugin'ler (easing/mousewheel/touchSwipe)
        // $ tanimli olmadan kayit olamaz. Bu yuzden 4 asamali yukleme:
        await loadScript('/jquery-1.8.2.min.js')
        await Promise.all([
          loadScript('/jquery.easing.1.3.js'),
          loadScript('/jquery.mousewheel.js'),
          loadScript('/jquery.touchSwipe.min.js'),
        ])
        await Promise.all([
          loadScript('/jquery.carouFredSel-6.2.1-packed.js'),
          loadScript('/fancybox/jquery.fancybox.js'),
        ])
        await loadScript('/ekip360_app.js')

        if (typeof window.MainSlider === 'function') window.MainSlider()
        if (typeof window.BrandSlider === 'function') window.BrandSlider()
      } catch (err) {
        console.error('Slider scriptleri yuklenemedi:', err)
      }
    }

    init()
  }, [])

  return null
}
