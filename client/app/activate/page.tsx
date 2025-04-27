'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { fetchCsrfToken } from '@/lib/csrf';

export default function ActivateForm() {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(null); 
  const router = useRouter();

    // Pobranie tokenu CSRF przy załadowaniu komponentu
    useEffect(() => {
        const getCsrfToken = async () => {
          const csrfToken = await fetchCsrfToken();
          console.log(`csrfToken: ${csrfToken}`);
          setCsrfToken(csrfToken);
        };
    
        getCsrfToken();
      }, []);

  const handleActivate = async () => {
    if (!token || !csrfToken) return;
    setIsLoading(true);


    try {
    
      console.log(`${csrfToken}`);
      const res = await fetch('http://localhost:3001/api/auth/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify({ activationToken: token }),
        credentials: 'include'
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Nieprawidłowy kod.');
      }

      toast.success('Konto zostało aktywowane!');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || 'Błąd aktywacji.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
      <Input
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Wprowadź kod aktywacyjny"
        disabled={isLoading}
      />
      <Button onClick={handleActivate} disabled={isLoading || token.length !== 6}>
        {isLoading ? 'Aktywowanie...' : 'Aktywuj konto'}
      </Button>
    </div>
  );
}
