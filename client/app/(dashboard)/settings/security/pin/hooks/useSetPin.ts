// hooks/useSetPin.ts
import { useState, useCallback } from 'react';
import { fetchClient } from '@/lib/fetchClient';
import { nanoid } from 'nanoid';

interface SetPinResponse {
  success: boolean;
  message?: string;
}

export interface PinFormData {
  pin: string;
  confirmPin: string;
  password: string;
}

interface UseSetPinReturn {
  isLoading: boolean;
  error: string;
  handleSubmit: (data: PinFormData) => Promise<string>;
  resetForm: () => void;
}

export function useSetPin(onSuccess: (message: string) => void): UseSetPinReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const hookId = nanoid();

  const resetForm = useCallback(() => {
    setError('');
  }, []);

  const handleSubmit = useCallback(async (data: PinFormData) => {
    setError('');
    setIsLoading(true);
    try {
      console.log(`[${hookId}] handleSubmit called with data:`, data);
      const response = await fetchClient<SetPinResponse>('/api/settings/set-pin', {
        method: 'POST',
        body: JSON.stringify({
          pin: data.pin,
          confirmPin: data.confirmPin,
          password: data.password,
        }),
        // csrf: true,
      });

      console.log(`[${hookId}] set-pin response:`, response);

      if (response.success) {
        const message = response.message || 'PIN został ustawiony poprawnie';
        onSuccess(message);
        resetForm();
        return message;
      } else {
        setError(response.message || 'Błąd podczas zapisywania PIN-u');
        throw new Error(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas zapisywania PIN-u');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess, resetForm]);

  return {
    isLoading,
    error,
    handleSubmit,
    resetForm,
  };
}