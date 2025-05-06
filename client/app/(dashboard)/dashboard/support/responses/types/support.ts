import type { SupportTicketStatus } from "@/app/admin/support-messages/useSupportMessages";

export interface SupportTicket {
  id: number;
  user_id: number;
  subject: string;
  status: SupportTicketStatus;
  createdAt: string;
}

export interface TicketMessage {
  id: number;
  sender_id: number;
  message: string;
  createdAt: string;
  sender: {
    username: string;
    role: string;
  };
}

export interface TicketDetails {
  id: number;
  messages: TicketMessage[];
  status: SupportTicketStatus;
  subject: string;
  createdAt: string;
  loading?: boolean; // Opcjonalne
  error?: string | null; // Opcjonalne
}