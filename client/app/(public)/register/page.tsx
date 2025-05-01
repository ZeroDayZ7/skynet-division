'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRegisterForm } from './useRegisterForm';
import { AppBrand } from '@/components/auth/AppBrand';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

// Dynamiczny import formularza rejestracji
const RegisterForm = dynamic(() => import('./RegisterForm'), {
  ssr: false,
  loading: () => <div className="flex justify-center"><span className="animate-pulse">Ładowanie formularza...</span></div>,
});

export default function RegisterPage() {
  const t = useTranslations('RegisterPage');
  const [showForm, setShowForm] = useState(false);

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

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-2 px-4 py-4">
      <Card className="w-[350px]">
        <CardHeader className="flex flex-col items-center space-y-2">
          <AppBrand />
          <div className="mt-4">
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>
              {showForm ? t('formDescription') : t('initialDescription')}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {!showForm ? (
            <div className="flex flex-col space-y-4">
              <Button onClick={handleShowForm} className="w-full">
                {t('startButton')}
              </Button>
              <div className="text-center text-sm text-gray-500">
                {t('alreadyHaveAccount')}{' '}
                <Link href="/login" className="text-green-500 hover:underline">
                  {t('login')}
                </Link>
              </div>
            </div>
          ) : (
            <>
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
                {t('alreadyHaveAccount')}{' '}
                <Link href="/login" className="text-green-500 hover:underline">
                  {t('login')}
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
