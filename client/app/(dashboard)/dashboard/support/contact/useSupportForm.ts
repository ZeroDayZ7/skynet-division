'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { fetchClient } from '@/lib/fetchClient';
import { useCsrfToken } from '@/hooks/useCsrfToken';

const SupportSchema = z.object({
  topic: z.string().min(1, 'Wybierz temat'),
  message: z.string().min(1, 'Wiadomość nie może być pusta'),
});

export type SupportFormData = z.infer<typeof SupportSchema>;

export function useSupportForm() {
  const t = useTranslations('SupportPage');
  const { user } = useAuth();
  const { csrfToken, error: csrfError } = useCsrfToken();

  const form = useForm<SupportFormData>({
    resolver: zodResolver(SupportSchema),
    defaultValues: {
      topic: '',
      message: '',
    },
    mode: 'onBlur'
  });

  useEffect(() => {
    if (csrfError) {
      toast.error(`Błąd bezpieczeństwa: ${csrfError}. Odśwież stronę.`);
    }
  }, [csrfError]);

  const onSubmit = async (data: SupportFormData) => {
    if (!csrfToken || csrfError) {
      toast.error('Brak tokenu CSRF lub błąd bezpieczeństwa. Odśwież stronę.');
      return;
    }

    try {
      await fetchClient('/api/support', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          name: user?.username,
          subject: data.topic,
          message: data.message,
        }),
      });
      toast.success(t('successMessage'));
      form.reset();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : t('errors.genericError'));
    }
  };

  return {
    user,
    form,
    t,
    onSubmit,
  };
}
