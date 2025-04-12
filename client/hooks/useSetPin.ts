// hooks/useSetPin.ts
import { useState, useEffect } from 'react';
import { fetchClient } from '@/lib/fetchClient'; // Załóżmy, że masz wcześniej zdefiniowany fetchClient

interface SetPinResponse {
  success: boolean;
  message?: string;
}

interface UseSetPinReturn {
  pin: string;
  confirmPin: string;
  password: string;
  isLoading: boolean;
  error: string;
  pinExists: boolean | null;
  setPin: (value: string) => void;
  setConfirmPin: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export function useSetPin(onSuccess: () => void): UseSetPinReturn {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pinExists, setPinExists] = useState<boolean | null>(null);

  // Pobierz stan PIN-u przy pierwszym renderowaniu
  useEffect(() => {
    async function checkPinStatus() {
      try {
        const response = await fetchClient<{ pinExists: boolean }>('/api/users/pin-status');
        setPinExists(response.pinExists);
      } catch (err) {
        setError('Błąd podczas sprawdzania stanu PIN-u');
      }
    }
    checkPinStatus();
  }, []);

  // Reset formularza
  const resetForm = () => {
    setPin('');
    setConfirmPin('');
    setPassword('');
    setError('');
  };

  // Obsługa wysyłania formularza
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Walidacja
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setError('Kod PIN musi składać się z 4 cyfr');
      return;
    }

    if (pin !== confirmPin) {
      setError('Kody PIN nie są identyczne');
      return;
    }

    if (!password) {
      setError('Wprowadź aktualne hasło');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchClient<SetPinResponse>('/api/set-pin', {
        method: 'POST',
        body: JSON.stringify({ pin, password }),
        csrf: true, // Włącz CSRF, jeśli wymagane
      });

      if (response.success) {
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
    pin,
    confirmPin,
    password,
    isLoading,
    error,
    pinExists,
    setPin,
    setConfirmPin,
    setPassword,
    handleSubmit,
    resetForm,
  };
}