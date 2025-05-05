// closeTicketLogic.ts
import { fetchClient } from '@/lib/fetchClient';
import { toast } from 'sonner';

export async function closeTicket(ticketId: number, onStatusChange?: () => void) {
  try {
    const res = await fetchClient(`/api/support/${ticketId}/close`, { // Używamy template string do przekazania ID
      method: 'PATCH',
    });

    if (res.success) {
      toast.success("Zgłoszenie zostało zamknięte.");
      onStatusChange?.(); // Bezpieczne wywołanie callbacka
    } else {
      toast.error(res.message || 'Nie udało się zamknąć zgłoszenia.');
    }
  } catch (error) {
    toast.error('Wystąpił błąd podczas zamykania zgłoszenia.');
    console.error('Błąd zamykania zgłoszenia:', error);
  }
}