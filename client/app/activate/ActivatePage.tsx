'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppBrand } from '@/components/auth/AppBrand';
import { useActivateForm } from './useActivateForm';

const ActivateForm = dynamic(() => import('./ActivateForm'), {
  ssr: false,
  loading: () => <div className="flex justify-center"><span className="animate-pulse">Ładowanie...</span></div>,
});

/**
 * Renderuje stronę aktywacji z formularzem.
 * @returns Element JSX.
 */
export default function ActivatePage() {
  const {
    form,
    resendForm,
    isActivating,
    isResending,
    isLoading,
    isFormDisabled,
    isResendDisabled,
    onSubmit,
    onResendSubmit,
    refreshCsrfToken,
  } = useActivateForm();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-4">
      <Card className="w-[350px]">
        <CardHeader className="flex flex-col items-center space-y-2">
          <AppBrand />
          <div className="mt-4">
            <CardTitle>Aktywuj konto</CardTitle>
            <CardDescription>Wpisz 6-cyfrowy kod wysłany na Twój e-mail.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ActivateForm
            form={form}
            resendForm={resendForm}
            isActivating={isActivating}
            isResending={isResending}
            isLoading={isLoading}
            isFormDisabled={isFormDisabled}
            isResendDisabled={isResendDisabled}
            onSubmit={onSubmit}
            onResendSubmit={onResendSubmit}
            // refreshCsrfToken={refreshCsrfToken}
          />
        </CardContent>
      </Card>
    </div>
  );
}