export interface UserEIDDataAttributes {
    id: number;
    user_id: number;
    document_number: string;
    issue_date: Date;
    expiration_date: Date;
  }
  
  export type UserEIDDataCreationAttributes = Omit<UserEIDDataAttributes, "id">;
  