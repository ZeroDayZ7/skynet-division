// src/components/TicketHeader.tsx
import { useTranslations } from 'next-intl';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TicketHeaderProps {
  showClosed: boolean;
  onShowClosed: () => void;
  onShowActive: () => void;
}

export function TicketHeader({ showClosed, onShowClosed, onShowActive }: TicketHeaderProps) {
  const t = useTranslations();
  return (
    <CardHeader>
      <CardTitle>{t('Twoje zgłoszenia wsparcia')}</CardTitle>
      <div className="flex gap-2">
        {showClosed ? (
          <Button variant="outline" onClick={onShowActive}>
            {t('Pokaż tylko aktywne zgłoszenia')}
          </Button>
        ) : (
          <Button variant="outline" onClick={onShowClosed}>
            {t('Pokaż zamknięte zgłoszenia')}
          </Button>
        )}
      </div>
    </CardHeader>
  );
}