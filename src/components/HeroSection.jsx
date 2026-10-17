import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import HeroArt from './HeroArt.jsx'
import { Star8 } from './Ornaments.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { scrollToSection } from '../config/site.js'

/** Pointer parallax: writes --mx / --my (-1…1) on the hero; desktop + full motion only. */
function useParallax(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia) return
    const ok = window.matchMedia('(pointer: fine) and (min-width: 900px) and (prefers-reduced-motion: no-preference)')
    if (!ok.matches) return
    let frame = 0
    let tx = 0
    let ty = 0
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width) * 2 - 1
      ty = ((e.clientY - r.top) / r.height) * 2 - 1
      if (!frame)
        frame = requestAnimationFrame(() => {
          el.style.setProperty('--mx', tx.toFixed(3))
          el.style.setProperty('--my', ty.toFixed(3))
          frame = 0
        })
    }
    el.addEventListener('pointermove', onMove)
    return () => {
      el.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [ref])
}

export default function HeroSection() {
  const { t, lang } = useLanguage()
  const ref = useRef(null)
  useParallax(ref)
  const h = t.hero

  return (
    <section id="home" ref={ref} className={`hero hero--${lang}`} aria-labelledby="hero-title">
      <HeroArt bottleAlt={h.bottleAlt} />

      {/* manuscript frame: double gold hairline with 8-point star finials */}
      <div className="hero__frame" aria-hidden="true">
        <Star8 className="hero__frame-star hero__frame-star--tl" r={9} fill />
        <Star8 className="hero__frame-star hero__frame-star--tr" r={9} fill />
        <Star8 className="hero__frame-star hero__frame-star--bl" r={9} fill />
        <Star8 className="hero__frame-star hero__frame-star--br" r={9} fill />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy" key={lang}>
          {lang === 'ar' ? (
            <span className="hero__calli" lang="en" dir="ltr" aria-hidden="true">
              Al-Hijra
            </span>
          ) : (
            <span className="hero__calli" lang="ar" dir="rtl" aria-hidden="true">
              الهجرة
            </span>
          )}
          <p className="hero__eyebrow reveal" style={{ '--d': '0.15s' }}>
            <Star8 className="hero__eyebrow-star" r={8} fill />
            <span>{h.eyebrow}</span>
            <span className="hero__eyebrow-rule" aria-hidden="true" />
          </p>
          <h1 id="hero-title" className="hero__title">
            {h.headline.map((line, i) => (
              <span className={`hero__line${i === h.headline.length - 1 ? ' hero__line--gold' : ''}`} key={line}>
                <span className="reveal" style={{ '--d': `${0.3 + i * 0.14}s` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero__desc reveal" style={{ '--d': '0.62s' }}>
            {h.description}
          </p>
          <div className="reveal" style={{ '--d': '0.78s' }}>
            <a
              href="#collection"
              className="btn btn--outline"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('collection')
              }}
            >
              <span>{h.cta}</span>
              <ArrowRight className="btn__arrow" size={17} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
          <ul className="hero__meta reveal" style={{ '--d': '0.92s' }}>
            {h.meta.map((m, i) => (
              <li key={m}>
                {i > 0 && <Star8 className="hero__meta-star" r={6} fill />}
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
