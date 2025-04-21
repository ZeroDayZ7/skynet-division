'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SearchCriteria {
  email: string;
  id: string;
  role: string;
}

interface UserSearchProps {
  initialCriteria: Partial<SearchCriteria>;
}

export const UserSearch: React.FC<UserSearchProps> = ({ initialCriteria }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [criteria, setCriteria] = useState<SearchCriteria>({
    email: initialCriteria.email ?? '',
    id: initialCriteria.id ?? '',
    role: initialCriteria.role ?? '',
  });

  useEffect(() => {
    setCriteria({
      email: searchParams.get('email') ?? '',
      id: searchParams.get('id') ?? '',
      role: searchParams.get('role') ?? '',
    });
  }, [searchParams]);

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
      <Button className="w-full sm:w-auto">
        <Search className="h-4 w-4 mr-2" />
        Szukaj
      </Button>
    </div>
  );
};
