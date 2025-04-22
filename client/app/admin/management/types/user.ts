// types/user.ts
export interface UserData {
  first_name: string;
  last_name: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
  userBlock: boolean;
  userData: UserData;
}
