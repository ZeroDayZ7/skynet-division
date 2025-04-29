'use client';

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
import { AppBrand } from '@/components/auth/AppBrand';
import Link from 'next/link';

export default function LoginPage() {
  const {
    form,
    isLoading,
    isSubmitting,
    showPassword,
    toggleShowPassword,
    onSubmit,
    formError,
    csrfTokenReady,
  } = useLoginForm();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-2 px-4 py-4">
      <Card className="w-[330px]">
        <CardHeader className="flex flex-col items-center space-y-2">
          <AppBrand />
          <div className="mt-4">
            <CardTitle>Zaloguj się</CardTitle>
            <CardDescription>
              Wpisz swoje dane, aby uzyskać dostęp do konta.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <LoginForm
            form={form}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            onSubmit={onSubmit}
            formError={formError}
            csrfTokenReady={csrfTokenReady}
          />
          <div className="mt-4 text-center text-sm text-gray-500">
            <Link href="/" className="hover:underline">
              Strona główna
            </Link>{' '}
            |
            <Link href="/register" className="ml-2 hover:underline">
              Rejestracja
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
