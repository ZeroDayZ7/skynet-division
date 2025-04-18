// useLoginForm.ts
'use client'; // Jeśli używasz Next.js App Router

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fetchCsrfToken } from '@/lib/csrf'; // Załóżmy, że ta funkcja istnieje
import { useLogin } from './useLogin'; // Twój hook do API
import { useAuth } from '@/context/auth-context'; // Zaimportuj useAuth
import { useRouter } from 'next/navigation'; // Importuj useRouter tutaj
import type { User } from '@/context/auth-context';


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
  const { login: loginApiCall } = useLogin(); // Zmień nazwę, aby uniknąć konfliktu
  const { login: loginContext } = useAuth(); 
  const router = useRouter();


  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: process.env.NODE_ENV === 'development' ? 'yovasec567@fincainc.com' : '',
      password: process.env.NODE_ENV === 'development' ? 'Zaq1@wsx' : '',
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

  const handleFormSubmit = async (values: LoginSchema) => {
    
    if (!csrfToken) {
      setFormError('Brak tokenu CSRF. Nie można wysłać formularza.');
      console.error('Próba wysłania formularza bez tokenu CSRF');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setFormError(null);
    try {
        console.log(values); // Logowanie wartości formularza
        console.log('Token CSRF:', csrfToken); // Logowanie tokenu CSRF
      // Wywołaj funkcję logowania API
      const userData = await loginApiCall(values, csrfToken); // Wywołaj funkcję logowania API
      console.log('Dane użytkownika po zalogowaniu:', userData);

      // Załóżmy, że odpowiedź z API zawiera dane użytkownika w formacie User
      loginContext(userData.user as User); // Zapisz dane użytkownika do AuthContext
      router.replace('/dashboard'); // Przekieruj na dashboard
    } catch (error: any) {
      console.error('Błąd podczas logowania w hooku formularza:', error);
      setFormError(error.message || 'Wystąpił błąd podczas logowania.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading: isLoading,
    isSubmitting: form.formState.isSubmitting,
    showPassword,
    toggleShowPassword,
    onSubmit: form.handleSubmit(handleFormSubmit),
    csrfTokenReady: !!csrfToken,
    formError,
  };
}