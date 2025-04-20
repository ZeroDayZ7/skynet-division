// app/user-management/page.tsx
import { Suspense } from 'react';
import { UserSearch } from './components/UserSearch';
import { UserTable } from './components/UserTable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { searchUsers } from './actions/searchUsers';

interface SearchParams {
  email?: string;
  id?: string;
  role?: string;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function UserManagementPage({ searchParams }: Props) {
  const { email = '', id = '', role = '' } = await searchParams;
  const hasSearchCriteria = !!(email || id || role);
  const users = hasSearchCriteria ? await searchUsers({ email, id, role }) : [];

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Zarządzanie użytkownikami</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="text-center">Ładowanie formularza...</div>}>
            <UserSearch initialCriteria={{ email, id, role }} />
          </Suspense>
          {hasSearchCriteria && <UserTable users={users} noResults={users.length === 0} />}
        </CardContent>
      </Card>
    </div>
  );
}