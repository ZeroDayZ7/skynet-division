/**
 * Hook do obsługi wywołań API aktywacji konta i ponownego wysyłania kodu aktywacyjnego.
 * @module hooks/useActivate
 */

import { useState } from 'react';
import { activateAccount, resendActivationCode } from '@/lib/api/auth';
import { ActivateSchema, ResendActivationSchema } from '@/lib/schemas/auth';

interface ActivateState {
  activate: (data: ActivateSchema, csrfToken: string) => Promise<void>;
  resendCode: (data: ResendActivationSchema, csrfToken: string) => Promise<void>;
  isActivating: boolean;
  isResending: boolean;
  error: string | null;
}

/**
 * Zarządza wywołaniami API aktywacji i ponownego wysyłania kodu z obsługą stanu.
 * @returns Funkcje aktywacji, ponownego wysyłania oraz stan.
 */
export function useActivate(): ActivateState {
  const [isActivating, setIsActivating] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activate = async (data: ActivateSchema, csrfToken: string) => {
    setIsActivating(true);
    setError(null);

    try {
      await activateAccount(data.activationToken, csrfToken);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsActivating(false);
    }
  };

  const resendCode = async (data: ResendActivationSchema, csrfToken: string) => {
    setIsResending(true);
    setError(null);

    try {
      await resendActivationCode(data.email, csrfToken);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsResending(false);
    }
  };

  return { activate, resendCode, isActivating, isResending, error };
}