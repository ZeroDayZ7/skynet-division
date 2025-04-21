// types/user.ts

export interface UserData {
    first_name: string;
    last_name: string;
  }
  
  export interface Permissions {
    [key: string]: {
      enabled: boolean;
      visible: boolean;
      description?: string
    };
  }
  
  export interface User {
    id: number; // id powinno być typu number
    email: string;
    role: string;
    userBlock: boolean;
    permissions: Permissions | null;
    userData: UserData | null; // Dodajemy userData
  }
  