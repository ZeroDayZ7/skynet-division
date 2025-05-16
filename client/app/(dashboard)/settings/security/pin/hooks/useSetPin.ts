// hooks/useSetPin.ts
import { useState, useCallback } from 'react';
import { fetchClient } from '@/lib/fetchClient';
import { nanoid } from 'nanoid';
import { useCsrfToken } from '@/hooks/useCsrfToken';

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
  // Pobieramy token CSRF oraz status ładowania i błąd tokena
  const { csrfToken, isLoading: isCsrfLoading, error: csrfError, refreshToken } = useCsrfToken();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const hookId = nanoid();

  const resetForm = useCallback(() => {
    setError('');
  }, []);

  const handleSubmit = useCallback(async (data: PinFormData) => {
    setError('');

    // Jeśli token CSRF jeszcze się ładuje lub jest błąd, blokujemy wysłanie
    if (isCsrfLoading) {
      setError('Token CSRF jest w trakcie ładowania. Spróbuj ponownie za chwilę.');
      throw new Error('CSRF token loading');
    }
    if (csrfError) {
      setError('Błąd podczas pobierania tokena CSRF.');
      throw new Error('CSRF token error');
    }

    setIsLoading(true);
    try {
      console.log(`[${hookId}] handleSubmit called with data:`, data);

      // Wysyłamy request z nagłówkiem X-CSRF-Token zawierającym token
      const response = await fetchClient<SetPinResponse>('/api/settings/set-pin', {
        method: 'POST',
        body: JSON.stringify({
          pin: data.pin,
          confirmPin: data.confirmPin,
          password: data.password,
        }),
        headers: {
          'X-CSRF-Token': csrfToken || '',
        },
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
  }, [onSuccess, resetForm, csrfToken, isCsrfLoading, csrfError]);

  return {
    isLoading,
    error,
    handleSubmit,
    resetForm,
  };
}
