// app/user-management/components/UserTableHeader.tsx
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';

export const UserTableHeader = () => (
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Imię</TableHead>
        <TableHead>Nazwisko</TableHead>
        <TableHead>Rola</TableHead>
        <TableHead>Status blokady</TableHead>
        <TableHead>Akcje</TableHead>
      </TableRow>
    </TableHeader>
  );