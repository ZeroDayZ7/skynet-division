import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoaderProps {
  fullscreen?: boolean; // true -> overlay na cały ekran
  size?: string; // np. "text-4xl"
  colorClass?: string; // np. "text-muted-foreground"
  className?: string; // dodatkowe klasy
  message?: string; // dostępne tylko dla screen readerów
}

const Loader: React.FC<LoaderProps> = ({
  fullscreen = false,
  size = 'text-4xl',
  colorClass = 'text-muted-foreground',
  className = '',
  message = 'Ładowanie danych, proszę czekać...',
}) => {
  return (
    <div
      className={`${fullscreen ? 'fixed inset-0 z-50 bg-foreground bg-opacity-50' : 'h-full w-full'} flex items-center justify-center ${className}`}
      role="status"
      aria-live="polite"
    >
      <Loader2
        className={`animate-spin ${colorClass} ${size}`}
      />
      <span className="sr-only">{message}</span>
    </div>
  );
};

export default Loader;
