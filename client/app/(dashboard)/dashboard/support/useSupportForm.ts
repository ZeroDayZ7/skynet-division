'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchClient } from '@/lib/fetchClient';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export function useSupportForm() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const t = useTranslations('SupportPage');

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error(t('errors.emptyMessage'));
      return;
    }

    setLoading(true);
    try {
      await fetchClient('/api/support', {
        method: 'POST',
        body: JSON.stringify({
          name: user?.nick,
          message,
        }),
      });
      toast.success(t('successMessage'));
      setMessage('');
    } catch (err: any) {
      toast.error(err.message || t('errors.genericError'));
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    message,
    setMessage,
    loading,
    handleSubmit,
    t,
  };
}
