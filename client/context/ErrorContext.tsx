// app/contexts/ErrorContext.tsx
'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface ErrorContextType {
  error: string | null;
  setError: (message: string | null) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType>({
  error: null,
  setError: () => {},
  clearError: () => {},
});

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {error && (
        <Alert className="fixed top-4 right-4 z-50 max-w-md" variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Błąd</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);