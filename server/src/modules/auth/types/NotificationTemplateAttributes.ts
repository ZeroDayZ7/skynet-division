export interface NotificationTemplateAttributes {
  id: number;
  type: string;
  message: string;
}

// Przy tworzeniu pomijamy `id`, bo autoIncrement
export type NotificationTemplateCreationAttributes = Omit<NotificationTemplateAttributes, "id">;
