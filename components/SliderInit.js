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
      await loadScript('/jquery-1.8.2.min.js')
      await loadScript('/jquery.easing.1.3.js')
      await loadScript('/jquery.mousewheel.js')
      await loadScript('/jquery.touchSwipe.min.js')
      await loadScript('/jquery.carouFredSel-6.2.1-packed.js')
      await loadScript('/fancybox/jquery.fancybox.js')
      await loadScript('/ekip360_app.js')

      if (typeof window.MainSlider === 'function') window.MainSlider()
      if (typeof window.BrandSlider === 'function') window.BrandSlider()
    }

    init()
  }, [])

  return null
}
