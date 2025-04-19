'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from './LoginForm';
import { useLoginForm } from './useLoginForm';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function MainPage() {
  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const {
    form,
    isLoading,
    isSubmitting,
    showPassword,
    toggleShowPassword,
    onSubmit, // Ten onSubmit pochodzi z form.handleSubmit opakowanego w hooku
    formError,
    csrfTokenReady,
  } = useLoginForm();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'unauthorized') {
      setErrorMsg('Nieautoryzowany dostęp.');
    }
  }, [searchParams]);

  return (
    <div className="mx-auto flex flex-col items-center space-y-6 px-4 py-8">
      {errorMsg && (
        <Alert className='text-red-500' variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>{errorMsg}</AlertTitle>
        </Alert>
      )}
      <Image src="/images/logo.jpg" alt="Logo aplikacji" className="rounded-full" width={200} height={112} priority />
      <h1 className="mt-4 text-2xl font-bold text-gray-700 dark:text-gray-200">Aplikacja Obywatelska</h1>
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>Zaloguj się</CardTitle>
          <CardDescription>Wpisz swoje dane, aby uzyskać dostęp do konta.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm
            form={form}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            onSubmit={onSubmit} // Przekaż handler z hooka
            formError={formError} // Przekaż błąd
            csrfTokenReady={csrfTokenReady} // Przekaż stan gotowości tokenu
          />
        </CardContent>
      </Card>
    </div>
  );
}
