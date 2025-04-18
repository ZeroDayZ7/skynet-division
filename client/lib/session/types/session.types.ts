export type Session = {
    isAuthenticated: boolean;
    user: {
      id: string;
      role: "user" | "admin";
      // inne pola...
    } | null;
  };
  