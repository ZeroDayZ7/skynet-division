export interface PassportAttributes {
    id: number;
    user_id: number;
    passport_number: string;
    issue_date: Date;
    expiration_date: Date;
    country_code: string;
    passport_type: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type PassportCreationAttributes = Omit<PassportAttributes, "id" | "createdAt" | "updatedAt">;
  