'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SearchCriteria {
  email: string;
  id: string | number;
  role: string;
}

interface UserSearchProps {
  searchCriteria: SearchCriteria;
}

export const UserSearch: React.FC<UserSearchProps> = ({ searchCriteria }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [criteria, setCriteria] = useState<SearchCriteria>({
    email: searchCriteria.email,
    id: searchCriteria.id,
    role: searchCriteria.role,
  });

  useEffect(() => {
    setCriteria({
      email: searchParams.get('email') || '',
      id: searchParams.get('id') || '',
      role: searchParams.get('role') || '',
    });
  }, [searchParams]);

  const updateSearch = () => {
    if (!criteria.email && !criteria.id && (!criteria.role || criteria.role === 'all')) {
      return;
    }

    const params = new URLSearchParams();
    if (criteria.email) params.set('email', criteria.email);
    if (criteria.id) params.set('id', criteria.id.toString());
    if (criteria.role && criteria.role !== 'all') params.set('role', criteria.role);
    router.push(`?${params.toString()}`);
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
      <Button onClick={updateSearch} className="w-full sm:w-auto">
        <Search className="h-4 w-4 mr-2" />
        Szukaj
      </Button>
    </div>
  );
};