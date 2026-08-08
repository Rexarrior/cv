import { createI18n, type MessageFunction } from 'vue-i18n'
import en from './locales/en'
import ru from './locales/ru'

export type Locale = 'en' | 'ru'

const STORAGE_KEY = 'lang'
const DEFAULT_LOCALE: Locale = 'en'

type MessageSource = string | { [key: string]: MessageSource }
type RuntimeMessage = MessageFunction<string> | { [key: string]: RuntimeMessage }

function toRuntimeMessages(source: MessageSource): RuntimeMessage {
  if (typeof source === 'string') return () => source
  return Object.fromEntries(
    Object.entries(source).map(([key, value]) => [key, toRuntimeMessages(value)])
  )
}

function detectLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'ru') return saved
  return DEFAULT_LOCALE
}

const i18n = createI18n<false>({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: {
    en: toRuntimeMessages(en),
    ru: toRuntimeMessages(ru)
  } as any
})

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale as typeof i18n.global.locale.value
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale
}

export function toggleLocale() {
  setLocale(i18n.global.locale.value === 'en' ? 'ru' : 'en')
}

export default i18n
