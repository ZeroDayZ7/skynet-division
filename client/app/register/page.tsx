/**
 * Komponent strony rejestracji z formularzem i brandingiem.
 * @module components/auth/RegisterPage
 */

'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRegisterForm } from './useRegisterForm';
import { AppBrand } from '@/components/auth/AppBrand';
import Link from 'next/link';

// Dynamiczny import formularza rejestracji dla optymalizacji wydajności
const RegisterForm = dynamic(() => import('./RegisterForm'), {
  ssr: false,
  loading: () => <div className="flex justify-center"><span className="animate-pulse">Ładowanie...</span></div>,
});

/**
 * Renderuje stronę rejestracji z formularzem i linkami nawigacyjnymi.
 * @returns Element JSX.
 */
export default function RegisterPage() {
  const {
    form,
    isLoading,
    isSubmitting,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    onSubmit,
    csrfTokenReady,
    captchaPassed,
    setCaptchaPassed,
  } = useRegisterForm();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-2 px-4 py-4">
      <Card className="w-[350px]">
        <CardHeader className="flex flex-col items-center space-y-2">
          <AppBrand />
          <div className="mt-4">
            <CardTitle>Złóż wniosek o rejestrację</CardTitle>
            <CardDescription>
              Wypełnij formularz, aby złożyć wniosek o konto. Oczekuj weryfikacji.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <RegisterForm
            form={form}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            onSubmit={onSubmit}
            csrfTokenReady={csrfTokenReady}
            captchaPassed={captchaPassed}
            setCaptchaPassed={setCaptchaPassed}
          />
          <div className="mt-4 text-center text-sm text-gray-500">
            Masz już konto?{' '}
            <Link href="/login" className="text-green-500 hover:underline">
              Zaloguj się
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}