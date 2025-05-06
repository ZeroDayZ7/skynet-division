// src/services/messages.ts
import { fetchClient } from '@/lib/fetchClient';
import { TicketMessage } from '../types/support';

export async function sendMessage(id: number, message: string) {
  const res = await fetchClient<TicketMessage>(
    `/api/support/${id}/reply`,
    {
      method: 'POST',
      body: JSON.stringify({ message }),
    }
  );  
  console.log(`[sendMessage][Response]: ${JSON.stringify(res, null, 2)}`);
  return res;
}