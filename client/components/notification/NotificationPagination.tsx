'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';  // Można dodać ikony z react-icons

type Props = {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
};

export const NotificationPagination = ({ page, total, limit, onPageChange }: Props) => {
  const totalPages = Math.ceil(total / limit);

  // Ustalamy zakres stron do wyświetlenia
  const pageRange = (current: number, total: number) => {
    const range = [];
    for (let i = 1; i <= total; i++) {
      // Dodajemy logiczną paginację, np. 3 strony wokół aktualnej
      if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
        range.push(i);
      } else if (i === current - 2 || i === current + 2) {
        range.push(<PaginationEllipsis key={`ellipsis-${i}`} />);
      }
    }
    return range;
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent className="flex items-center space-x-2">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, page - 1))}
            className={`transition-all duration-200 ${page <= 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-200 rounded-full'}`}
            aria-label="Poprzednia strona"
          >
            <AiOutlineLeft className="text-xl" />
          </PaginationPrevious>
        </PaginationItem>

        {/* Wyświetlamy tylko odpowiednią liczbę stron */}
        {pageRange(page, totalPages).map((pageItem, index) => (
          <PaginationItem key={index}>
            {typeof pageItem === 'number' ? (
              <button
                onClick={() => onPageChange(pageItem)}
                className={`px-3 py-1 rounded-full transition-all duration-300 ease-in-out ${page === pageItem ? 'bg-gradient-to-r from-green-400 to-card-600 text-white shadow-lg transform scale-110' : 'hover:bg-green-900 text-gray-200'}`}
              >
                {pageItem}
              </button>
            ) : (
              pageItem
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            className={`transition-all duration-200 ${page >= totalPages ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-200 rounded-full'}`}
            aria-label="Następna strona"
          >
            <AiOutlineRight className="text-xl" />
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
