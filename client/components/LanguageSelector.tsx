'use client';

import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'; // Używamy komponentów ShadCN UI

export default function LanguageSelector() {
  const [lang, setLang] = useState<'pl' | 'en'>('pl');

  // Po załadowaniu pobieramy cookie
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=(pl|en)/);
    if (match) setLang(match[1] as 'pl' | 'en');
  }, []);

  const onChange = (value: string) => {
    const newLang = value as 'pl' | 'en'; // Przekształcamy wartość na 'pl' | 'en'
    // Zapisujemy cookie na rok
    document.cookie = `NEXT_LOCALE=${newLang}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Strict${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`;
    setLang(newLang);
    // Przeładuj, żeby Next.js po stronie serwera przeczytał nowe cookie
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-xs">
        <Select value={lang} onValueChange={onChange} required>
          <SelectTrigger className="w-full">
            <span>{lang === 'pl' ? 'Polski' : 'English'}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pl">Polski</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
