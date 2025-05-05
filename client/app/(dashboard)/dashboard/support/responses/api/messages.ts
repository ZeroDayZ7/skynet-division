import { fetchClient } from '@/lib/fetchClient';
import type { TicketMessage } from '../support';

export async function sendMessage(id: number, message: string): Promise<TicketMessage> {
  const data = await fetchClient<{ success: boolean; data: TicketMessage }>(
    `/support/${id}/reply`,
    {
      method: 'POST',
      body: JSON.stringify({ message }),
    }
  );
  return data.data;
}
