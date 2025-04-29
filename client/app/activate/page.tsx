'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { fetchCsrfToken } from '@/lib/csrf';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function ActivateForm() {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Autofocus input po załadowaniu
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Pobranie tokenu CSRF
  useEffect(() => {
    const getCsrfToken = async () => {
      const csrfToken = await fetchCsrfToken();
      setCsrfToken(csrfToken);
    };
    getCsrfToken();
  }, []);

  const handleActivate = async () => {
    if (!token || !csrfToken) return;
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/auth/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ activationToken: token }),
        credentials: 'include',
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
    <div className="min-h-screen flex flex-col items-center justify-center px-2">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Aktywuj konto</CardTitle>
          <CardDescription>Wpisz 6-cyfrowy kod wysłany na Twój e-mail.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Input
            ref={inputRef}
            id='activatetoken'
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Kod aktywacyjny"
            maxLength={6}
            disabled={isLoading}
            className="text-center tracking-widest text-xl"
          />
          <Button
            onClick={handleActivate}
            disabled={isLoading || token.length !== 6}
            className="w-full"
          >
            {isLoading ? 'Aktywowanie...' : 'Aktywuj konto'}
          </Button>
          <p className="text-center text-xs text-gray-500">
            Nie otrzymałeś kodu?{' '}
            <span className="underline cursor-pointer text-primary hover:text-primary/80">
              Wyślij ponownie
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
