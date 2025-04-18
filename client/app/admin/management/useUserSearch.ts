import { useState } from 'react';
import { User } from './types';

interface SearchCriteria {
  email: string;
  id: string;
  role: string;
}

export const useUserSearch = (initialUsers: User[]) => {
  const [users] = useState<User[]>(initialUsers);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    email: '',
    id: '',
    role: '',
  });
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);

  const noResults = filteredUsers.length === 0;

  const updateSearch = (criteria: SearchCriteria) => {
    setSearchCriteria(criteria);
    const filtered = users.filter((user) => {
      const emailMatch = !criteria.email || user.email.toLowerCase().includes(criteria.email.toLowerCase());
      const idMatch = !criteria.id || user.id.toLowerCase().includes(criteria.id.toLowerCase());
      const roleMatch = !criteria.role || user.role === criteria.role;
      return emailMatch && idMatch && roleMatch;
    });
    setFilteredUsers(filtered);
  };

  return {
    filteredUsers,
    searchCriteria,
    setSearchCriteria: updateSearch,
    noResults,
  };
};