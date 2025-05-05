import { fetchClient } from '@/lib/fetchClient';
import type { SupportTicket, TicketMessage } from '../types/support';

export async function getTickets(status: string[], limit: number): Promise<SupportTicket[]> {
  const query = new URLSearchParams({
    status: status.join(','),
    limit: limit.toString(),
  });
  const data = await fetchClient<{ success: boolean; data: SupportTicket[] }>(
    `/api/support?${query}`
  );
  return data.data;
}

export async function getTicketDetails(id: number): Promise<{
  id: number;
  messages: TicketMessage[];
  status: string;
  subject: string;
  createdAt: string;
}> {
  const data = await fetchClient<{ success: boolean; data: any }>(`/api/support/${id}`);
  console.log(`data: ${JSON.stringify(data)}`);
  return data.data;
}

export async function closeTicket(id: number, reason?: string): Promise<void> {
  await fetchClient(`/support/${id}/close`, {
    method: 'PATCH',
    body: JSON.stringify({ reason }),
  });
  
}
