// context/UserActionsContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';
// import { User } from '@/';
import * as userActions from '@/app/admin/management/actions';


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

interface SelectedUser {
  user: User;
  action: string;
}

interface UserActionsContextType {
  users: User[];
  setUsers: (users: User[]) => void;
  selectedUser: SelectedUser | null;
  setSelectedUser: (user: SelectedUser | null) => void;
}

const UserActionsContext = createContext<UserActionsContextType | undefined>(undefined);

export const UserActionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);

  return (
    <UserActionsContext.Provider
      value={{
        users,
        setUsers,
        selectedUser,
        setSelectedUser
      }}
    >
      {children}
    </UserActionsContext.Provider>
  );
};

export const useUserActions = () => {
  const context = useContext(UserActionsContext);
  if (!context) throw new Error('useUserActions must be used within UserActionsProvider');
  return context;
};