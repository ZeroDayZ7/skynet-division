import { SupportTicket, TicketMessage } from './support';

/**
 * Pobieranie listy ticketów z filtrem statusu i limitem
 */
export async function getTickets(status: string[], limit: number): Promise<SupportTicket[]> {
  const query = new URLSearchParams({
    status: status.join(','),
    limit: limit.toString(),
  });
  const res = await fetch(`/api/support?${query}`);
  const json = await res.json();
  if (!json.success) throw new Error('Błąd pobierania ticketów');
  return json.data;
}

/**
 * Pobieranie szczegółów ticketa
 */
export async function getTicketDetails(id: number): Promise<{
  id: number;
  messages: TicketMessage[];
  status: string;
  subject: string;
  createdAt: string;
}> {
  const res = await fetch(`/api/support/${id}`);
  const json = await res.json();
  if (!json.success) throw new Error('Błąd pobierania szczegółów ticketa');
  return json.data;
}

/**
 * Wysyłanie nowej wiadomości
 */
export async function sendMessage(id: number, message: string): Promise<TicketMessage> {
  const res = await fetch(`/api/support/${id}/reply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  const json = await res.json();
  if (!json.success) throw new Error('Błąd wysyłania wiadomości');
  return json.data;
}

/**
 * Zamykanie ticketa
 */
export async function closeTicket(id: number, reason?: string): Promise<void> {
  const res = await fetch(`/api/support/${id}/close`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason }),
  });
  const json = await res.json();
  if (!json.success) throw new Error('Błąd zamykania ticketa');
}