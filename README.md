# AL-HIJRA PERFUMES — website

React + Vite. Cinematic header + hero, collection / story / contact sections, English · Tamil · Arabic (RTL).

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  components/
    Header.jsx           floating nav, language selector, mobile menu
    HeroSection.jsx      headline, description, CTA, pointer parallax
    HeroArt.jsx          layered scene: glow, smoke, bottle + pedestal, oud wood, grain
    PerfumeBottle.jsx    SVG bottle (variants: amber | noir)
    OudForeground.jsx    SVG wood, oud chips, resin (seeded scatter)
    FeaturedCard.jsx     floating product card → WhatsApp enquiry
    LanguageSelector.jsx EN · த · ع
    HomeSections.jsx     Collection, Story, Contact, Footer
  i18n/
    translations.js      all copy for en / ta / ar
    LanguageContext.jsx  provider, persists choice, sets <html lang dir>
  config/site.js         business details, WhatsApp helper, HERO_PHOTO slot
  styles.css             all styling (palette tokens at the top)
```

## Hero photography & the floating attar

All imagery lives in `src/assets/images/` (imported, so Vite hashes it or inlines it for the single-file build).
The hero plate (`hero.webp` + `hero.jpg`) is the attar-in-water photograph extended leftwards into a landscape
frame, with the bottle removed. The bottle itself is `bottle.webp`, a transparent cut-out that `FloatingProduct.jsx`
places back exactly where it was photographed (box in `HERO_PHOTO.bottle`, plate pixels, mapped to the rendered
cover-cropped image on resize) and lets drift with a slow CSS bob and tilt; gold dust and bubbles rise behind it.
Under `prefers-reduced-motion` everything holds still.
Around it: a double gold manuscript frame with 8-point star finials (`.hero__frame`), a calligraphic watermark behind
the headline (`.hero__calli` — Arabic الهجرة, or the Latin wordmark when the site is in Arabic) and a trust line under
the call to action (`hero.meta` in `translations.js`).

```js
export const HERO_PHOTO = {
  webp, fallback, width, height,            // the plate
  focus: { x: 0.8, y: 0.5 },                // object-position used for cover-cropping
  card:  { webp, fallback, width, height },  // crop used in the floating product card
  bottle: { src, x, y, w, h },               // floating sprite box, in plate pixels
}
```

## Motion

All motion is CSS and honours `prefers-reduced-motion`. Hero: headline lines rise out of a mask, the plate settles
from a slight zoom, bottle / card / watermark shift with the pointer (`--mx`/`--my`), and the copy and frame drift
on scroll (scroll-driven animation, progressive). Sections: `[data-reveal]` blocks reveal their children one after
another, product cut-outs settle into their niches, framed photos settle from a zoom, gold rules draw toward their
star, and price rows cascade (`--r`). Buttons fill with a gold sweep on hover; switching language cross-fades the page
(`html.is-switching`, set in `LanguageContext.jsx`).

## Collection photos, price board and store video

- Category banners: `CATEGORY_IMAGES` in `src/config/site.js` holds a transparent WebP cut-out per category
  (`cut-*.webp`, order matches the six categories); headline/blurb copy per category is in `translations.js`.
- Price board: `PRICE_LIST` in `src/config/site.js` — fragrance names and ₹ prices as on the in-store board.
  Headings and the note are translated in `translations.js` (`menu`).
- Store video: `STORE_VIDEO` (muted, looping, `playsinline`, with a poster) shown in the Our Story section.
- Ornament: `GirihDefs` (in App) defines the `#girih` pattern and the `#arch` clipPath once; `.arch-media` clips any
  element to the arch, `<Arch/>` draws the gold outline, `<Girih/>` fills a positioned parent with the lattice.

## Deploying to Vercel (alhijra.allbeesolutions.com)

1. Push this folder to a Git repo (GitHub/GitLab) or run `npx vercel` from it.
2. In Vercel: New Project → import the repo. `vercel.json` already sets the build (`npm run build`, output `dist`)
   and cache/security headers, so no settings are needed.
3. Project → Settings → Domains → add `alhijra.allbeesolutions.com`.
   In the DNS for allbeesolutions.com add: `CNAME  alhijra  cname.vercel-dns.com` — Vercel issues HTTPS automatically.
4. After the first deploy, check `https://alhijra.allbeesolutions.com/sitemap.xml` and `/robots.txt`, then submit the
   sitemap in Google Search Console and create/claim the Google Business Profile for the shop (links the Maps listing).

If the domain ever changes, update it in `index.html` (canonical, og:url, og:image, JSON-LD), `public/robots.txt`
and `public/sitemap.xml`.

## Builds

- `npm run build` → `dist/` (normal hashed assets)
- `npm run build:single` → `dist-single/index.html`, the whole site in one file (fonts, images and video inlined)

## Editing copy or contact details

- Copy: `src/i18n/translations.js` (one block per language).
- Phone / WhatsApp / email / address: `src/config/site.js`.
