// useLoginForm.ts
'use client'; // Jeśli używasz Next.js App Router

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fetchCsrfToken } from '@/lib/csrf'; // Załóżmy, że ta funkcja istnieje
import { useLogin } from './useLogin'; // Twój hook do API

// Definicja schematu i typu (można też trzymać w osobnym pliku np. schemas.ts)
const loginSchema = z.object({
  email: z.string().email({ message: 'Nieprawidłowy adres e-mail.' }),
  password: z.string().min(6, { message: 'Hasło musi mieć co najmniej 6 znaków.' }),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null); // Stan do przechowywania błędów logowania
  const { login } = useLogin(); // Użyj hooka do logiki API

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: process.env.NODE_ENV === 'development' ? 'dev@example.com' : '',
      password: process.env.NODE_ENV === 'development' ? 'secret123' : '',
    },
  });

  // Pobierz token CSRF przy montowaniu
  useEffect(() => {
    let isMounted = true; // Flaga do śledzenia montowania
    setIsLoading(true); // Ustaw ładowanie na czas pobierania tokenu
    fetchCsrfToken()
      .then((token) => {
        if (isMounted) {
          console.log(`Pobrano CSRF Token: ${token}`); // Poprawione logowanie
          setCsrfToken(token);
        }
      })
      .catch((err) => {
        console.error('Błąd pobierania tokenu CSRF:', err);
        if (isMounted) {
          setFormError('Nie udało się załadować formularza. Odśwież stronę.');
        }
      })
      .finally(() => {
         if (isMounted) {
            setIsLoading(false); // Zakończ ładowanie po pobraniu tokenu (lub błędzie)
         }
      });

      return () => { isMounted = false; }; // Funkcja czyszcząca
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Handler do wysłania formularza zarządzany przez react-hook-form
  const handleFormSubmit = async (values: LoginSchema) => {
    if (!csrfToken) {
        setFormError('Brak tokenu CSRF. Nie można wysłać formularza.');
        console.error('Próba wysłania formularza bez tokenu CSRF');
        return;
    }
    setIsLoading(true);
    setFormError(null); // Resetuj błąd przed próbą logowania
    try {
      await login(values);
      // Logika po sukcesie (np. przekierowanie) powinna być obsłużona
      // w komponencie strony lub przez kontekst/globalny stan
      console.log('Logowanie pomyślne!');
      // np. router.push('/dashboard');
    } catch (error: any) {
      console.error('Błąd podczas logowania w hooku formularza:', error);
      // Ustaw błąd do wyświetlenia w formularzu
      setFormError(error.message || 'Wystąpił błąd podczas logowania.');
    } finally {
      setIsLoading(false);
    }
  };

  // Zwracamy wszystko, czego potrzebuje komponent LoginForm i strona
  return {
    form, // Instancja react-hook-form
    isLoading: isLoading || !csrfToken, // Blokuj, gdy ładuje LUB nie ma jeszcze tokenu
    isSubmitting: form.formState.isSubmitting, // Można użyć dla precyzyjniejszego stanu
    showPassword,
    toggleShowPassword,
    onSubmit: form.handleSubmit(handleFormSubmit), // Gotowy handler dla <form>
    csrfTokenReady: !!csrfToken, // Flaga wskazująca gotowość tokenu
    formError, // Błąd do wyświetlenia
  };
}