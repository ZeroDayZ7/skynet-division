'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { ActivateSchema, ResendActivationSchema } from '@/lib/schemas/auth';

const ResendActivationDialog = dynamic(() => import('./ResendActivationDialog'), {
  ssr: false,
  loading: () => <div className="text-center text-sm">Ładowanie okna...</div>,
});

interface ActivateFormProps {
  form: ReturnType<typeof useForm<ActivateSchema>>;
  resendForm: ReturnType<typeof useForm<ResendActivationSchema>>;
  isActivating: boolean;
  isResending: boolean;
  isLoading: boolean;
  isFormDisabled: boolean;
  isResendDisabled: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onResendSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export default function ActivateForm({
  form,
  resendForm,
  isActivating,
  isResending,
  isLoading,
  isFormDisabled,
  isResendDisabled,
  onSubmit,
  onResendSubmit,
}: ActivateFormProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-4">
      <Form {...form}>
        {isLoading && <div className="text-center text-sm text-gray-500">Ładowanie...</div>}
        {!isLoading && (
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="activationToken"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      id="activationToken"
                      placeholder="Kod aktywacyjny"
                      maxLength={6}
                      disabled={isFormDisabled}
                      className="text-center tracking-widest text-xl"
                      inputMode="numeric"
                      pattern="\d{6}"
                      autoComplete="one-time-code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isFormDisabled || !form.formState.isValid}
              className="w-full"
            >
              {isActivating ? 'Aktywowanie...' : 'Aktywuj konto'}
            </Button>
          </form>
        )}
      </Form>

      <p className="text-center text-xs text-gray-500">
        Nie otrzymałeś kodu?{' '}
        <span
          className={`underline cursor-pointer text-primary ${
            isResendDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary/80'
          }`}
          onClick={isResendDisabled ? undefined : () => setDialogOpen(true)}
        >
          {isResending ? 'Wysyłanie...' : 'Wyślij ponownie'}
        </span>
      </p>

      <ResendActivationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        resendForm={resendForm}
        isResending={isResending}
        isResendDisabled={isResendDisabled}
        onSubmit={onResendSubmit}
      />
    </div>
  );
}
