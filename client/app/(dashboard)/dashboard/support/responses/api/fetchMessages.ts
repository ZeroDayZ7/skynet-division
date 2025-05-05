// src/services/tickets.ts
import { fetchClient } from '@/lib/fetchClient';

export interface SupportMessage {
  id: number;
  createdAt: string;
  subject: string;
  status: string;
  SupportMessages: {
    id: number;
    message: string;
    sender_id: number;
    sender: {
      username: string;
      role: string;
    };
  }[];
}

export async function fetchMessages(): Promise<SupportMessage[]> {
  const data = await fetchClient<{ success: boolean; data: SupportMessage[] }>('api/support');
  return data.data;
}
