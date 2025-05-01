'use client'

import { useEffect, useState } from 'react'

export default function LanguageSelector() {
  const [lang, setLang] = useState<'pl' | 'en'>('pl')

  // Po załadowaniu pobieramy cookie
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=(pl|en)/)
    if (match) setLang(match[1] as 'pl' | 'en')
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as 'pl' | 'en'
    // Zapisujemy cookie na rok
    document.cookie = `NEXT_LOCALE=${newLang}; Path=/; Max-Age=${60*60*24*365}; SameSite=Strict${process.env.NODE_ENV==='production'?'; Secure':''}`
    setLang(newLang)
    // Przeładuj, żeby Next.js po stronie serwera przeczytał nowe cookie
    window.location.reload()
  }

  return (
    <select value={lang} onChange={onChange}>
      <option value="pl">Polski</option>
      <option value="en">English</option>
    </select>
  )
}
