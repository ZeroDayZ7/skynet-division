export interface User {
  id: number;
  email: string;
  points: number;
  login_count: number;
  role: string;
  userBlock: boolean;
  lastLoginIp: string;
  permissions: Record<string, any> | null;
  userData?: {
    first_name: string;
    last_name: string;
  };
}