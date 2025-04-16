// @/types/notification.ts
export type NotificationType = 'success' | 'warning' | 'error' | 'info';

export interface Notification {
  id: number;
  template: {
    type: NotificationType;
    title?: string;
    message: string;
  };
  is_read?: boolean;
  created_at?: string;
}
