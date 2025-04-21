export interface User {
  id: number;
  email: string;
  role: string;
  userBlock?: boolean;
  permissions?: import('@/context/permissions/types').Permissions | null;
  userData?: {
    first_name?: string;
    last_name?: string;
  } | null;
}

// Usuń lokalną definicję Permissions i używaj tej z context/permissions/types