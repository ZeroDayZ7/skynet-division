export interface UserNotificationAttributes {
  id: number;
  user_id: number;
  notification_id: number;
  is_read: boolean; // używasz TINYINT(1), więc trzymasz 0/1
  received_at: Date;
}

export type UserNotificationCreationAttributes = Omit<UserNotificationAttributes, "id">;
