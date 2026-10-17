import { ArrowRight, ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Navigation, Phone, Truck } from 'lucide-react'
import BrandMark from './BrandMark.jsx'
import LanguageSelector from './LanguageSelector.jsx'
import { Arch, Divider, Girih, Star8 } from './Ornaments.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import {
  CATEGORY_IMAGES,
  CREDIT,
  NOORA_IMAGE,
  PRICE_CURRENCY,
  PRICE_LIST,
  SECTION_IDS,
  SITE,
  STOREFRONT_IMAGE,
  STORE_VIDEO,
  scrollToSection,
  whatsappLink,
} from '../config/site.js'

/** Numbered editorial eyebrow: "01 — The Collection". */
function Eyebrow({ n, children }) {
  return (
    <p className="eyebrow eyebrow--num">
      <span className="eyebrow__n" aria-hidden="true">0{n}</span>
      <span className="eyebrow__rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

export function CollectionSection() {
  const { t } = useLanguage()
  const c = t.collection
  return (
    <section id="collection" className="section section--flush collection" aria-labelledby="collection-title">
      <div className="container">
        <header className="section__head" data-reveal>
          <Eyebrow n={1}>{c.eyebrow}</Eyebrow>
          <h2 id="collection-title" className="section__title">{c.title}</h2>
          <p className="section__intro">{c.intro}</p>
          <Divider className="divider--start" />
        </header>
      </div>
      <ul className="banners">
        {c.items.map((item, i) => {
          const img = CATEGORY_IMAGES[i]
          const flip = i % 2 === 1
          return (
            <li key={item.name} className={`banner${flip ? ' banner--flip' : ''}`} data-reveal>
              <div className="container banner__inner">
                <div className="banner__art">
                  <span className="niche" aria-hidden="true">
                    <Girih className="niche__pattern" />
                    <Arch className="niche__arch" />
                  </span>
                  <span className="banner__spot" aria-hidden="true" />
                  <img
                    className="banner__img"
                    src={img.src}
                    width={img.w}
                    height={img.h}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="banner__copy">
                  <p className="banner__cat">{item.name}</p>
                  <h3 className="banner__title">{item.headline}</h3>
                  <p className="banner__blurb">{item.blurb}</p>
                  <a
                    className="btn btn--pill"
                    href={whatsappLink(c.message(item.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.name}: ${c.enquire} (${t.opensWhatsapp})`}
                  >
                    <span>{c.enquire}</span>
                    <ArrowUpRight className="btn__arrow" size={14} strokeWidth={1.6} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function MenuSection() {
  const { t } = useLanguage()
  const m = t.menu
  return (
    <section id="menu" className="section menu section--girih" aria-labelledby="menu-title">
      <Girih />
      <div className="container menu__grid">
        <div className="menu__aside" data-reveal>
          <Eyebrow n={2}>{m.eyebrow}</Eyebrow>
          <h2 id="menu-title" className="section__title">{m.title}</h2>
          <p className="section__intro">{m.intro}</p>
          <dl className="index">
            <div>
              <dt>{PRICE_LIST.reduce((n, g) => n + g.items.length, 0)}</dt>
              <dd>{t.index.fragrances}</dd>
            </div>
            <div>
              <dt>{PRICE_LIST.length}</dt>
              <dd>{t.index.collections}</dd>
            </div>
            <div>
              <dt>{t.collection.items.length}</dt>
              <dd>{t.index.categories}</dd>
            </div>
          </dl>
          <div className="menu__photo arch-frame">
            <Girih className="arch-frame__pattern" />
            <img className="menu__img" src={NOORA_IMAGE.src} width={NOORA_IMAGE.w} height={NOORA_IMAGE.h} alt={m.imageAlt} loading="lazy" decoding="async" />
            <Arch className="arch-frame__arch" />
          </div>
          <p className="menu__note">{m.note} {t.deliveryNote}</p>
        </div>
        <div className="menu__boards">
          {PRICE_LIST.map((group, gi) => (
            <div className="board" key={group.key} data-reveal style={{ '--i': gi }}>
              <h3 className="board__title">
                <Star8 className="board__star" r={7} fill />
                {m.groups[group.key]}
              </h3>
              <ul className="board__list">
                {group.items.map(([name, price], ri) => (
                  <li key={name} style={{ '--r': ri }}>
                    <a
                      className="board__row"
                      href={whatsappLink(m.message(name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${name}, ${PRICE_CURRENCY}${price}. ${m.cta} (${t.opensWhatsapp})`}
                    >
                      <span className="board__name" lang="en" dir="ltr">{name}</span>
                      <span className="board__dots" aria-hidden="true" />
                      <span className="board__price" dir="ltr">
                        <span className="board__cur">{PRICE_CURRENCY}</span>
                        {price}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StorySection() {
  const { t } = useLanguage()
  const s = t.story
  return (
    <section id="story" className="section story section--girih" aria-labelledby="story-title">
      <Girih />
      <div className="container story__grid">
        <div className="story__text" data-reveal>
          <Eyebrow n={3}>{s.eyebrow}</Eyebrow>
          <h2 id="story-title" className="section__title">{s.title}</h2>
          <p className="story__body">{s.body}</p>
          <dl className="story__facts">
            <div>
              <dt>{s.ownerLabel}</dt>
              <dd lang="en" dir="ltr">{SITE.owner}</dd>
            </div>
            <div>
              <dt>{s.visitLabel}</dt>
              <dd lang="en" dir="ltr">{SITE.address}</dd>
            </div>
          </dl>
        </div>
        <figure className="store arch-media" data-reveal style={{ '--i': 1 }}>
          <video
            className="store__video"
            poster={STORE_VIDEO.poster}
            width={STORE_VIDEO.width}
            height={STORE_VIDEO.height}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={s.videoAlt}
          >
            <source src={STORE_VIDEO.mp4} type="video/mp4" />
          </video>
          <Arch className="arch-media__arch" />
          <figcaption className="store__caption">
            <span className="store__dot" aria-hidden="true" />
            {s.videoLabel}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export function ContactSection() {
  const { t } = useLanguage()
  const c = t.contact
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container contact__grid contact__grid--photo">
        <figure className="storefront arch-media" data-reveal>
          <picture>
            <source srcSet={STOREFRONT_IMAGE.webp} type="image/webp" />
            <img
              className="storefront__img"
              src={STOREFRONT_IMAGE.fallback}
              width={STOREFRONT_IMAGE.width}
              height={STOREFRONT_IMAGE.height}
              alt={c.photoAlt}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 899px) 90vw, 40vw"
            />
          </picture>
          <Arch className="arch-media__arch" />
          <figcaption className="storefront__caption">
            <MapPin size={13} strokeWidth={1.6} aria-hidden="true" />
            {c.photoLabel}
          </figcaption>
        </figure>
        <div data-reveal style={{ '--i': 1 }}>
          <Eyebrow n={4}>{c.eyebrow}</Eyebrow>
          <h2 id="contact-title" className="section__title">{c.title}</h2>
          <p className="section__intro">{c.body}</p>
          <div className="contact__actions">
            <a className="btn btn--solid" href={whatsappLink(c.message)} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
              <span>{c.whatsapp}</span>
              <ArrowRight className="btn__arrow" size={15} strokeWidth={1.6} aria-hidden="true" />
              <span className="sr-only">({t.opensWhatsapp})</span>
            </a>
            <a className="btn" href={SITE.mapsHref} target="_blank" rel="noopener noreferrer">
              <Navigation size={15} strokeWidth={1.5} aria-hidden="true" />
              <span>{t.directions}</span>
            </a>
          </div>
        </div>
        <ul className="contact__list" data-reveal style={{ '--i': 2 }}>
          <li>
            <MapPin size={18} strokeWidth={1.4} aria-hidden="true" />
            <div>
              <span className="contact__label">{c.address}</span>
              <address lang="en" dir="ltr">{SITE.address}</address>
            </div>
          </li>
          <li>
            <Phone size={18} strokeWidth={1.4} aria-hidden="true" />
            <div>
              <span className="contact__label">{c.phone}</span>
              <a href={SITE.phoneHref} dir="ltr">{SITE.phoneDisplay}</a>
            </div>
          </li>
          <li>
            <Mail size={18} strokeWidth={1.4} aria-hidden="true" />
            <div>
              <span className="contact__label">{c.email}</span>
              <a href={`mailto:${SITE.email}`} dir="ltr">{SITE.email}</a>
            </div>
          </li>
          <li>
            <Truck size={18} strokeWidth={1.4} aria-hidden="true" />
            <div>
              <span className="contact__label">{t.delivery}</span>
              <p className="contact__note">{t.deliveryNote}</p>
            </div>
          </li>
          <li>
            <Clock size={18} strokeWidth={1.4} aria-hidden="true" />
            <div>
              <p className="contact__note">{t.hoursNote}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useLanguage()
  const go = (id) => (e) => {
    e.preventDefault()
    scrollToSection(id)
  }
  return (
    <footer className="site-footer">
      <span className="site-footer__calli" lang="ar" dir="rtl" aria-hidden="true">
        الهجرة
      </span>
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <a href="#home" className="brand" onClick={go('home')} aria-label={`${SITE.brand} ${SITE.brandSub}`}>
            <BrandMark className="brand__mark" />
            <span className="brand__text" lang="en" dir="ltr">
              <span className="brand__name">{SITE.brand}</span>
              <span className="brand__sub">{SITE.brandSub}</span>
            </span>
          </a>
          <p className="site-footer__line">{t.footerLine}</p>
          <LanguageSelector className="lang--footer" />
        </div>
        <nav className="site-footer__nav" aria-label={t.footerNav}>
          <h3 className="site-footer__h">{t.footerNav}</h3>
          <ul>
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={go(id)}>{t.nav[id]}</a>
              </li>
            ))}
            <li>
              <a href="#menu" onClick={go('menu')}>{t.menu.eyebrow}</a>
            </li>
          </ul>
        </nav>
        <div className="site-footer__contact">
          <h3 className="site-footer__h">{t.footerContact}</h3>
          <address lang="en" dir="ltr">{SITE.address}</address>
          <a href={SITE.phoneHref} dir="ltr">{SITE.phoneDisplay}</a>
          <a href={`mailto:${SITE.email}`} dir="ltr">{SITE.email}</a>
          <a href={whatsappLink(t.contact.message)} target="_blank" rel="noopener noreferrer" className="site-footer__wa">
            <MessageCircle size={14} strokeWidth={1.6} aria-hidden="true" />
            {t.contact.whatsapp}
          </a>
        </div>
      </div>
      <div className="container site-footer__row">
        <span dir="ltr" lang="en">AL-HIJRA PERFUMES · {SITE.owner}</span>
        <span>
          © {new Date().getFullYear()} AL-HIJRA PERFUMES. {t.footer}
        </span>
        <span className="site-footer__credit">
          {t.credit}{' '}
          <a href={CREDIT.href} target="_blank" rel="noopener noreferrer" lang="en" dir="ltr">
            {CREDIT.name}
          </a>
        </span>
      </div>
    </footer>
  )
}
