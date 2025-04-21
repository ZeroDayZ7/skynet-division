// app/user-management/types/user.ts
export interface User {
  id: string;
  email: string;
  role: string;
  userBlock: boolean;
  permissions: Permissions | null;
  userData: { first_name?: string; last_name?: string } | null;
}



export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  type?: string;
}