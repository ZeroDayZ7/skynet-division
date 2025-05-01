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
import { AppBrand } from '@/components/auth/AppBrand';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const {
    form,
    isLoading,
    isSubmitting,
    showPassword,
    toggleShowPassword,
    onSubmit,
    csrfTokenReady,
  } = useLoginForm();

  const t = useTranslations('LoginPage'); // Użyj tłumaczeń z namespace 'LoginPage'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-2 px-4 py-4">
      <Card className="w-[330px]">
        <CardHeader className="flex flex-col items-center space-y-2">
          <AppBrand />
          <div className="mt-4">
            {/* Tłumaczenie tytułu */}
            <CardTitle>{t('loginTitle')}</CardTitle>
            <CardDescription>
              {/* Tłumaczenie opisu */}
              {t('loginDescription')}
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
            csrfTokenReady={csrfTokenReady}
          />
          <div className="mt-4 text-center text-sm text-gray-500">
            <Link href="/" className="hover:underline">
              {t('homePage')}
            </Link>{' '}
            |
            <Link href="/register" className="ml-2 hover:underline">
              {t('register')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
