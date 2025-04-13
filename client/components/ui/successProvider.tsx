// lib/successModal.tsx
'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SuccessModalOptions {
  description?: string;
  duration?: number; // w milisekundach
  icon?: React.ReactNode;
}

interface SuccessModalContextType {
  show: (title: string, options?: SuccessModalOptions) => void;
  hide: () => void;
}

const SuccessModalContext = createContext<SuccessModalContextType | undefined>(undefined);

export function SuccessModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState<SuccessModalOptions>({});
  const [timeLeft, setTimeLeft] = useState(0);

  const show = useCallback((title: string, options: SuccessModalOptions = {}) => {
    setTitle(title);
    setOptions(options);
    setTimeLeft(options.duration || 5000);
    setIsOpen(true);
  }, []);

  const hide = useCallback(() => {
    setIsOpen(false);
    setTimeLeft(0);
  }, []);

  // Animacja licznika
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) {
      setTimeLeft(0);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 10 : prev));
    }, 10);

    const timeout = setTimeout(() => {
      if (isOpen) {
        hide();
      }
    }, timeLeft);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isOpen, timeLeft, hide]);

  // Formatuj czas do 00:00:05:999
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `00:00:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <SuccessModalContext.Provider value={{ show, hide }}>
      {children}
      <Dialog open={isOpen} onOpenChange={hide}>
        <DialogContent className="mx-auto sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {options.description && <DialogDescription>{options.description}</DialogDescription>}
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            {options.icon && <div className="text-green-600 text-2xl">{options.icon}</div>}
            <div className="text-green-600 text-lg font-mono animate-pulse" role="alert">
              {formatTime(timeLeft)}
            </div>
            <Button onClick={hide}>Zamknij</Button>
          </div>
        </DialogContent>
      </Dialog>
    </SuccessModalContext.Provider>
  );
}

export function useSuccessModal() {
  const context = useContext(SuccessModalContext);
  if (!context) {
    throw new Error('useSuccessModal must be used within a SuccessModalProvider');
  }
  return context;
}