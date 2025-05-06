import type { SupportTicketStatus } from '@/app/admin/support-messages/useSupportMessages';

export const getBadgeVariant = (status: SupportTicketStatus) => {
  switch (status) {
    case 'new':
      return 'destructive';
    case 'open':
      return 'default';
    case 'in_progress':
      return 'secondary';
    case 'closed':
      return 'outline';
    default:
      return 'outline';
  }
};