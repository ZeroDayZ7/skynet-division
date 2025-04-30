export type NotificationType = 'success' | 'warning' | 'error' | 'info';

export interface Notification {
  id: number;
  template: {
    type: NotificationType;
    title?: string;
    message: string;
  };
  is_read: 0 | 1;
  createdAt?: string;
}

export interface NotificationsListResponse {
  notifications: Notification[];
  total: number;
}