'use client';

import { Mail, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableRow, TableCell, TableBody, TableHeader, TableHead } from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';
import { useSupportMessages } from './useSupportMessages';
import TicketModal from './TicketModal'; // Importujemy nasz nowy komponent modalu

const statusFilters = ['open', 'inprogress', 'closed'] as const;

export default function SupportMessagesPage() {
  const {
    activeStatus,
    setActiveStatus,
    searchQuery,
    setSearchQuery,
    tickets,
    isLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    updateTicketStatus,
  } = useSupportMessages();

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'new': return 'destructive';
      case 'open': return 'default';
      case 'inprogress': return 'secondary';
      case 'closed': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Support Messages</h1>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {statusFilters.map((status) => (
          <Button
            key={status}
            variant={activeStatus === status ? 'default' : 'outline'}
            onClick={() => setActiveStatus(status)}
          >
            {status === 'open' && 'Open'}
            {status === 'inprogress' && 'In Progress'}
            {status === 'closed' && 'Closed'}
          </Button>
        ))}
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2 mb-6">
        <Input 
          placeholder="Search by username or topic..."
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="outline">
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Tickets table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No tickets available
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.user_id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(ticket.status)}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {/* Wstawiamy TicketModal i przekazujemy ticket */}
                    <TicketModal ticket={ticket} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {/* {totalPages > 1 && (
        <div className="mt-6">
          <Pagination 
            totalPages={totalPages} 
            currentPage={currentPage} 
            onPageChange={setCurrentPage}
          />
        </div>
      )} */}
    </div>
  );
}
