/**
 * Interfejs dla ticketu w liście
 */
export interface Ticket {
    id: number;
    createdAt: Date;
    subject: string;
    status: 'new' | 'open' | 'in_progress' | 'closed';
    SupportMessages: {
      id: number;
      message: string;
      sender_id: number;
      createdAt: Date;
      sender: {
        username: string;
        role: string;
      };
    }[];
  }
  
  /**
   * Interfejs dla wiadomości w tickecie
   */
  export interface TicketMessage {
    id: number;
    message: string;
    sender_id: number;
    createdAt: Date;
    sender: {
      username: string;
      role: string;
    };
  }