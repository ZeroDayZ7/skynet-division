// #ro/models/types/SupportTicketAttributes.ts

export interface SupportTicketAttributes {
    id: number;
    user_id: number;
    subject: string;
    status: 'new' | 'open' | 'in_progress' | 'closed';
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  // Interfejs dla tworzenia nowego zgłoszenia, który dziedziczy po SupportTicketAttributes
  // ale pomija 'id', 'createdAt' i 'updatedAt'.
  export interface SupportCreationTicketAttributes extends Omit<SupportTicketAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
  