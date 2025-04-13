// hooks/useSetPin.ts
import { useState, useCallback } from 'react';
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

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
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
      const csrfToken = getCookie('csrf');
      if (!csrfToken) {
        throw new Error('CSRF token not found');
      }

      const response = await fetch('http://localhost:3000/api/users/set-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({
          pin: data.pin,
          confirmPin: data.confirmPin,
          password: data.password,
        }),
      });

      console.log(`[${hookId}] set-pin response:`, response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to set PIN: ${response.status}`);
      }

      const result: SetPinResponse = await response.json();

      if (result.success) {
        const message = result.message || 'PIN został ustawiony poprawnie';
        onSuccess(message);
        resetForm();
        return message;
      } else {
        setError(result.message || 'Błąd podczas zapisywania PIN-u');
        setTimeout(() => setError(''), 5000);
        throw new Error(result.message);
      }
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas zapisywania PIN-u');
      setTimeout(() => setError(''), 5000);
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