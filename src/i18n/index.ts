import { createI18n } from 'vue-i18n'
import en from './locales/en'
import ru from './locales/ru'

export type Locale = 'en' | 'ru'

const STORAGE_KEY = 'lang'
const DEFAULT_LOCALE: Locale = 'en'

function detectLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'ru') return saved
  return DEFAULT_LOCALE
}

const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: { en, ru }
})

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale
}

export function toggleLocale() {
  setLocale(i18n.global.locale.value === 'en' ? 'ru' : 'en')
}

export default i18n
