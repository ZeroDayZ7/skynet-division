'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchClient } from '@/lib/fetchClient';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useCsrfToken } from '@/hooks/useCsrfToken';

export function useSupportForm() {
  const { csrfToken, error: csrfError } = useCsrfToken();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const t = useTranslations('SupportPage');

  useEffect(() => {
    if (csrfError) {
      toast.error(`Błąd bezpieczeństwa: ${csrfError}. Odśwież stronę.`);
    }
  }, [csrfError]);

  const handleSubmit = async () => {
    if (!csrfToken || csrfError) {
      toast.error('Brak tokenu CSRF lub błąd bezpieczeństwa. Odśwież stronę.');
      return;
    }

    if (!topic) {
      toast.error(t('errors.emptyTopic'));
      return;
    }

    if (!message.trim()) {
      toast.error(t('errors.emptyMessage'));
      return;
    }

    setLoading(true);
    try {
      await fetchClient('/api/support', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          name: user?.username,
          subject: topic,
          message,
        }),
      });
      toast.success(t('successMessage'));
      setMessage('');
      setTopic('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || t('errors.genericError'));
      } else {
        toast.error(t('errors.genericError'));
      }
    } finally {
        setLoading(false);
    }
  };

  return {
    user,
    message,
    setMessage,
    topic,
    setTopic,
    loading,
    handleSubmit,
    t,
  };
}