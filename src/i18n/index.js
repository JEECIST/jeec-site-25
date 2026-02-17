import { createI18n } from 'vue-i18n'

import pt from './locales/pt.json'
import en from './locales/en.json'

const options = {
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  availableLocales: ['en', 'pt'],
  messages: { pt, en },
}

const i18n = createI18n(options)

const setLocale = (locale) => {
  if (i18n.global.availableLocales.includes(locale)) {
    i18n.global.locale.value = locale
    localStorage.setItem('locale', locale)
  } else {
    i18n.global.locale.value = i18n.global.fallbackLocale
    localStorage.setItem('locale', i18n.global.fallbackLocale)
    console.warn(`Locale ${locale} is not supported. Falling back to default locale (en).`)
  }
}

const resolveLocaleFallback = () => {
  const navLocale = (navigator.language || navigator.userLanguage).split('-')[0]
  const storage = localStorage.getItem('locale')

  if (storage && i18n.global.availableLocales.includes(storage)) return storage
  if (i18n.global.availableLocales.includes(navLocale)) return navLocale
  return i18n.global.fallbackLocale
}

export { setLocale, resolveLocaleFallback }
export default i18n
