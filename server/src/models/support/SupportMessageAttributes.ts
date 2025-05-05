// #ro/models/SupportMessageAttributes.ts
export interface SupportMessageAttributes {
    id: number;
    ticket_id: number;
    sender_type: 'user' | 'support';
    sender_id: number;
    message: string;
    createdAt?: Date;
  }
  
  export interface SupportMessageCreationAttributes extends Omit<SupportMessageAttributes, 'id' | 'createdAt'> {}
  