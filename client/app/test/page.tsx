// app/test/page.tsx (jeśli Next.js) lub w dowolnym komponencie React
'use client';

import { getCsrfToken } from '@/lib/getCsrfToken';
import { useEffect } from 'react';

export default function TestPage() {
  useEffect(() => {
    const token = getCsrfToken();
    console.log('CSRF Token:', token);
  }, []);

  return <div className="p-4">Sprawdź konsolę przeglądarki 🔍</div>;
}
