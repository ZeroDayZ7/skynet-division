'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { searchUsers } from '../actions';
import { User } from '../types/user';

interface SearchCriteria {
  email: string;
  id: string;
  role: string;
}

interface UserSearchProps {
  onSearchResults?: (results: User[]) => void; // Callback opcjonalny
}

export const UserSearch: React.FC<UserSearchProps> = ({ onSearchResults }) => {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    email: '',
    id: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchUsers(criteria);
      onSearchResults?.(results.data ?? []); // Przekazujemy wyniki do komponentu nadrzędnego
    } catch (error) {
      console.error('Błąd wyszukiwania użytkowników:', error);
      onSearchResults?.([]); // W przypadku błędu, przekazujemy pustą tablicę
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Input
        placeholder="Szukaj po emailu"
        value={criteria.email}
        onChange={(e) => setCriteria({ ...criteria, email: e.target.value })}
        className="w-full sm:w-64"
      />
      <Input
        placeholder="Szukaj po ID"
        value={criteria.id}
        onChange={(e) => setCriteria({ ...criteria, id: e.target.value })}
        className="w-full sm:w-64"
      />
      <Select
        value={criteria.role}
        onValueChange={(value) => setCriteria({ ...criteria, role: value })}
      >
        <SelectTrigger className="w-full sm:w-64">
          <SelectValue placeholder="Rola" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Wszystkie role</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="moderator">Moderator</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleSearch} disabled={loading} className="w-full sm:w-auto">
        <Search className="h-4 w-4 mr-2" />
        {loading ? 'Wyszukiwanie...' : 'Szukaj'}
      </Button>
    </div>
  );
};
