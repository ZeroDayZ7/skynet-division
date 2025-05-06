import { fetchClient } from '@/lib/fetchClient';
import type { SupportTicket, TicketMessage } from '../types/support';

export async function getTicketsWithPagination(
  status: string[],
  limit: number,
  page: number
): Promise<{
  tickets: SupportTicket[];
  total: number;
  page: number;
  limit: number;
}> {
  const query = new URLSearchParams({
    status: status.join(','),
    limit: limit.toString(),
    page: page.toString(),
  });
  const response = await fetchClient<{
    data: SupportTicket[];
    total: number;
    page: number;
    limit: number;
  }>(`/api/support?${query}`);
  console.log(`[getTicketsWithPagination] Response: ${JSON.stringify(response)}`);
  if (!response) {
    throw new Error('Failed to fetch tickets');
  }
  return {
    tickets: response.data,
    total: response.total,
    page: response.page,
    limit: response.limit,
  };
}

export async function getTicketDetails(id: number): Promise<{
  id: number;
  messages: TicketMessage[];
  status: string;
  subject: string;
  createdAt: string;
}> {
  const response = await fetchClient<{
    success: boolean;
    data: {
      id: number;
      messages: TicketMessage[];
      status: string;
      subject: string;
      createdAt: string;
    };
  }>(`/api/support/${id}`);
  console.log(`[getTicketDetails] Data: ${JSON.stringify(response)}`);
  return response.data; // Zwracamy tylko wewnętrzny obiekt data
}

export async function closeTicket(id: number, reason?: string): Promise<void> {
  await fetchClient(`/api/support/${id}/close`, {
    method: 'PATCH',
    body: JSON.stringify({ reason }),
  });
}