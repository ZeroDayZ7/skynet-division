'use client';

import { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

export default function LanguageSettings() {
  const [lang, setLang] = useState<'pl' | 'en'>('pl');

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=(pl|en)/);
    if (match) setLang(match[1] as 'pl' | 'en');
  }, []);

  const onChange = (value: string) => {
    const newLang = value as 'pl' | 'en';
    document.cookie = `NEXT_LOCALE=${newLang}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Strict${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`;
    setLang(newLang);
    window.location.reload();
  };

  return (
    <fieldset className="space-y-2">
      <legend className="flex items-center gap-2">
        <Languages className="h-5 w-5" />
        Język aplikacji
      </legend>
      <Select value={lang} onValueChange={onChange} required>
        <SelectTrigger className="w-full max-w-xs">
          <span>{lang === 'pl' ? 'Polski' : 'English'}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pl">Polski</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    </fieldset>
  );
}
