import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TicketHeaderProps {
  showClosed: boolean;
  onShowClosed: () => void;
  onShowActive: () => void;
}

export function TicketHeader({ showClosed, onShowClosed, onShowActive }: TicketHeaderProps) {
  return (
    <CardHeader>
      <CardTitle>Twoje zgłoszenia wsparcia</CardTitle>
      <div className="flex gap-2">
        {showClosed ? (
          <Button variant="outline" onClick={onShowActive}>
            Pokaż tylko aktywne zgłoszenia
          </Button>
        ) : (
          <Button variant="outline" onClick={onShowClosed}>
            Pokaż zamknięte zgłoszenia
          </Button>
        )}
      </div>
    </CardHeader>
  );
}