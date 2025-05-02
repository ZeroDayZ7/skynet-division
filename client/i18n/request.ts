// i18n/request.ts
import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'

const SUPPORTED_LOCALES = ['pl', 'en'] as const
type Locale = (typeof SUPPORTED_LOCALES)[number]

export default getRequestConfig(async ({ requestLocale }) => {
  // 1) Odczyt ciasteczka
  const cookieStore = await cookies()
  const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale | undefined

  // 2) Odczyt segmentu [locale] (jeśli używasz folderu app/[locale]/)
  const localeFromRequest = await requestLocale  // to jest Promise<string|undefined>

  // 3) Wybór finalnej wartości (cookie > URL > domyślny)
  let locale: Locale = 'pl'
  switch (true) {
    case localeFromCookie && SUPPORTED_LOCALES.includes(localeFromCookie):
      locale = localeFromCookie
      break
    case localeFromRequest && SUPPORTED_LOCALES.includes(localeFromRequest as Locale):
      locale = localeFromRequest as Locale
      break
    default:
      break
  }

  // 4) Parsowanie nagłówka Accept-Language tylko jako fallback, jeżeli chcesz
  if (!localeFromCookie && !localeFromRequest) {
    const acceptLang = cookieStore.get('NEXT_LOCALE') || 'pl'
    if (!acceptLang) {
      locale = 'pl'
    }
  }

  // 5) Import odpowiedniego pliku z tłumaczeniami na podstawie wybranego języka
  let messages
  switch (locale) {
    case 'pl':
      messages = (await import('./messages/pl')).default
      break
    case 'en':
      messages = (await import('./messages/en')).default
      break
    default:
      messages = (await import('./messages/pl')).default  // domyślnie język polski
      break
  }

  return { locale, messages }
})
