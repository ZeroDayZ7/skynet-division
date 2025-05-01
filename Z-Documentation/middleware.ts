// middleware.ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
})

// zastosuj na wszystkich ścieżkach poza _next i api
export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
