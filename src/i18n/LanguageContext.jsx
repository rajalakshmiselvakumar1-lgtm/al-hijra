import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LANGUAGES, translations } from './translations.js'

const STORAGE_KEY = 'alhijra-lang'
const LanguageContext = createContext(null)

function readInitialLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && translations[stored]) return stored
  } catch {
    /* storage unavailable — fall through */
  }
  return 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLanguage)
  const meta = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = meta.dir
  }, [lang, meta.dir])

  const setLang = useCallback((code) => {
    if (!translations[code]) return
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* ignore */
    }
    // Cross-fade the page content around the swap (skipped under reduced motion).
    const root = document.documentElement
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || root.classList.contains('is-switching')) {
      setLangState(code)
      return
    }
    root.classList.add('is-switching')
    window.setTimeout(() => {
      setLangState(code)
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('is-switching')))
    }, 240)
  }, [])

  const value = useMemo(
    () => ({ lang, dir: meta.dir, t: translations[lang], setLang }),
    [lang, meta.dir, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
