'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';

type Props = {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
};

export const NotificationPagination = ({ page, total, limit, onPageChange }: Props) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, page - 1))}
            className={page <= 1 ? 'opacity-50 pointer-events-none' : ''}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="text-sm text-muted-foreground">{`Strona ${page} z ${totalPages}`}</span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            className={page >= totalPages ? 'opacity-50 pointer-events-none' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
