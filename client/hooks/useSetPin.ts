// hooks/useSetPin.ts
import { useState, useEffect } from 'react';
import { fetchClient } from '@/lib/fetchClient';

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
  successMessage: string; // Nowy stan dla sukcesu
  pinExists: boolean | null;
  handleSubmit: (data: PinFormData) => Promise<void>;
  resetForm: () => void;
}

export function useSetPin(onSuccess: () => void): UseSetPinReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Nowy stan
  const [pinExists, setPinExists] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkPinStatus() {
      try {
        const response = await fetchClient<{ isPinSet: boolean }>('/api/users/pin-status');
        setPinExists(response.isPinSet);
      } catch (err) {
        setError('Błąd podczas sprawdzania stanu PIN-u');
      }
    }
    checkPinStatus();
  }, []);

  const resetForm = () => {
    setError('');
    setSuccessMessage(''); // Czyść sukces
  };

  const handleSubmit = async (data: PinFormData) => {
    setError('');
    setSuccessMessage('');

    setIsLoading(true);
    try {
      const response = await fetchClient<SetPinResponse>('/api/users/set-pin', {
        method: 'POST',
        body: JSON.stringify({
          pin: data.pin,
          confirmPin: data.confirmPin,
          password: data.password,
        }),
        csrf: true,
      });

      if (response.success) {
        setSuccessMessage(response.message || 'PIN został ustawiony poprawnie');
        onSuccess();
        resetForm();
      } else {
        setError(response.message || 'Błąd podczas zapisywania PIN-u');
      }
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas zapisywania PIN-u');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    successMessage, // Zwróć sukces
    pinExists,
    handleSubmit,
    resetForm,
  };
}