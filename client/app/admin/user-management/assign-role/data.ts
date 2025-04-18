import { User } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    role: 'admin',
    customPermissions: { canCreateUser: true, canEditUser: true },
  },
  {
    id: '2',
    name: 'Anna Nowak',
    email: 'anna@example.com',
    role: 'moderator',
    customPermissions: { canCreateUser: false, canBlockUser: true },
  },
  {
    id: '3',
    name: 'Piotr Zieliński',
    email: 'piotr@example.com',
    role: 'user',
  },
  {
    id: '4',
    name: 'Katarzyna Wiśniewska',
    email: 'kasia@example.com',
    role: 'moderator',
    customPermissions: { canEditUser: true, canAssignRole: true },
  },
];