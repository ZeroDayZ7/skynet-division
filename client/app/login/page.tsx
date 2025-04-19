'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoginForm } from './LoginForm';
import { useLoginForm } from './useLoginForm';
import Image from 'next/image';

export default function MainPage() {
  const {
    form,
    isLoading,
    isSubmitting,
    showPassword,
    toggleShowPassword,
    onSubmit, // Ten onSubmit pochodzi z form.handleSubmit opakowanego w hooku
    formError,
    csrfTokenReady
  } = useLoginForm();

  return (
    <div className="mx-auto px-4 py-8 flex flex-col items-center space-y-6">
      <Image
        src="/images/logo.jpg"
        alt="Logo aplikacji"
        className="rounded-full"
        width={200}
        height={112}
        priority
      />
      <h1 className="mt-4 text-2xl font-bold text-gray-700 dark:text-gray-200">Aplikacja Obywatelska</h1>
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>Zaloguj się</CardTitle>
          <CardDescription>
            Wpisz swoje dane, aby uzyskać dostęp do konta.
          </CardDescription>
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

