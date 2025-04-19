'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils'; // Zakładam, że masz funkcję cn z shadcn/ui do łączenia klas
import { Button } from '@/components/ui/button';

type MessageType = 'success' | 'error' | 'warning';

interface Message {
  type: MessageType;
  text: string;
}

interface MessageContextType {
  message: Message | null;
  setMessage: (text: string, type?: MessageType) => void;
  clearMessage: () => void;
}

const MessageContext = createContext<MessageContextType>({
  message: null,
  setMessage: () => {},
  clearMessage: () => {},
});

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessageState] = useState<Message | null>(null);

  const setMessage = useCallback((text: string, type: MessageType = 'error') => {
    setMessageState({ type, text });
  }, []);

  const clearMessage = useCallback(() => setMessageState(null), []);

  return (
    <MessageContext.Provider value={{ message, setMessage, clearMessage }}>
      {message && (
        <Alert
          className={cn(
            'fixed top-4 right-4 z-[9999] w-[90%] max-w-[400px] sm:max-w-[500px] flex items-start gap-3 p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out',
            message.type === 'error' && 'bg-card border-red-500 text-red-500',
            message.type === 'success' && 'bg-card border-green-500 text-green-500',
            message.type === 'warning' && 'bg-card border-yellow-500 text-yellow-500',
            'animate-in slide-in-from-right'
          )}
        >
          {/* Ikona i tytuł w jednej linii */}
          <div className="flex items-center gap-2">
            {message.type === 'error' ? (
              <Terminal className="h-5 w-5" />
            ) : message.type === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
            <AlertTitle className="text-base font-semibold">
              {message.type === 'error' ? 'Błąd' : message.type === 'success' ? 'Sukces' : 'Ostrzeżenie'}
            </AlertTitle>
          </div>

          {/* Opis pod spodem */}
          <AlertDescription className="text-sm mt-1 ml-7">{message.text}</AlertDescription>

          {/* Przycisk zamykania */}
          <Button
            variant={'ghost'}
            onClick={clearMessage}
            aria-label="Zamknij powiadomienie"
            className="absolute top-2 right-2 transition p-1 rounded focus:outline-none focus:ring-2 focus:ring-ring"
            title="Zamknij powiadomienie"
          >
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      )}
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);