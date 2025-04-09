export interface UserDataAttributes {
    id: number;
    user_id: number;
    first_name: string;
    second_name: string | null;
    last_name: string;
    pesel: string;
    birth_date: Date;
    birth_place: string;
    gender: string;
    nationality: string;
  }
  
  export type UserDataCreationAttributes = Omit<UserDataAttributes, "id">;
  