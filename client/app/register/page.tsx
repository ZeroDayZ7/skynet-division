'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import { toast } from 'sonner';
import { fetchCsrfToken } from '@/lib/csrf';

// Dynamiczne ładowanie RegisterForm
const RegisterForm = dynamic(() => import('@/app/register/RegisterForm'), {
  ssr: false, // Wyłącz SSR dla formularza
  loading: () => (
    <div className="flex justify-center">
      <FaSpinner className="animate-spin text-2xl text-gray-500" />
    </div>
  ),
});

export default function RegisterPage() {
  const [showForm, setShowForm] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowForm = async () => {
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      const token = await fetchCsrfToken();
      console.log(`Token CSRF: ${token}`);
      setCsrfToken(token);
      setShowForm(true);
    } catch (error) {
      console.error('[RegisterPage] Błąd pobierania CSRF:', error);
      toast.error('Nie udało się załadować formularza. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Złóż wniosek o rejestrację</CardTitle>
          <CardDescription>
            Wypełnij formularz, aby złożyć wniosek o konto. Oczekuj weryfikacji.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showForm ? (
            <RegisterForm csrfToken={csrfToken} />
          ) : (
            <Button
              className="w-full"
              onClick={handleShowForm}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="mr-2 animate-spin" />
                  Ładowanie...
                </>
              ) : (
                'Złóż wniosek o rejestrację'
              )}
            </Button>
          )}
        </CardContent>
        <CardContent>
          <p className="text-center text-sm text-gray-600">
            Masz już konto?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Zaloguj się
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}