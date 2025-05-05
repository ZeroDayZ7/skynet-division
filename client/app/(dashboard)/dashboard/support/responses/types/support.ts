// support.types
export interface SupportTicket {
    id: number;
    createdAt: string;
    subject: string;
    status: 'new' | 'open' | 'in_progress' | 'closed';
  }
  
  export interface TicketMessage {
    id: number;
    message: string;
    sender_id: number;
    createdAt: string;
    sender: {
      username: string;
      role: string;
    };
  }
  
  export interface TicketDetails {
    id: number;
    messages: TicketMessage[];
    status: 'new' | 'open' | 'in_progress' | 'closed';
    subject: string;
    createdAt: string;
    loading: boolean;
    error: string | null;
  }