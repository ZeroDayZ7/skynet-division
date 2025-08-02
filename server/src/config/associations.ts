import Users from '#ro/models/Users';
import UserData from '#ro/models/UserData';
import UserEIDData from '#ro/models/UserEIDData';
import Passport from '#ro/models/UserPassportData';
import UserNotification from '#ro/models/UserNotification';
import NotificationTemplate from '#ro/modules/user/models/notification.template.model';
import PermissionTemplate from '#ro/models/permissionTemplate.model';
import PermissionUser from '#ro/models/userPermission.model';
import SupportTicket from '#ro/models/support/SupportTicket';
import SupportMessage from '#ro/models/support/SupportTicketMessage';
import UserSettings from '#ro/models/UserSettings';

export default function defineUserAssociations() {
  // Relacja Users <-> UserData
  // Users.hasOne(UserData, { foreignKey: 'user_id', as: 'userData' });
  // UserData.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

  // Relacja UserData <-> Passport
  // UserData.hasOne(Passport, { foreignKey: 'user_id', as: 'passport', sourceKey: 'user_id' });

  // Relacja UserData <-> UserEIDData
  // UserData.hasOne(UserEIDData, { foreignKey: 'user_id', as: 'user_eid_data', sourceKey: 'user_id' });

  UserEIDData.belongsTo(UserData, {
    foreignKey: 'user_id',
    as: 'user',
    targetKey: 'user_id',
  });
  Passport.belongsTo(UserData, {
    foreignKey: 'user_id',
    as: 'user',
    targetKey: 'user_id',
  });

  // UserNotification.belongsTo(NotificationTemplate, { foreignKey: 'notification_id', as: 'template' });

  Users.hasOne(UserData, { foreignKey: 'user_id', as: 'userData' });
  UserData.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

  PermissionTemplate.hasMany(PermissionUser, {
    foreignKey: 'permission_id',
    as: 'userPermissions',
  });

  PermissionUser.belongsTo(PermissionTemplate, {
    foreignKey: 'permission_id',
    as: 'template_permission',
  });

  SupportTicket.hasMany(SupportMessage, {
    foreignKey: 'ticket_id',
    as: 'messages',
  });
  SupportTicket.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

  SupportMessage.belongsTo(SupportTicket, {
    foreignKey: 'ticket_id',
    as: 'ticket',
  });
  SupportMessage.belongsTo(Users, { foreignKey: 'sender_id', as: 'sender' });

  // w models/Users.ts
  Users.hasOne(UserSettings, {
    foreignKey: 'user_id',
    as: 'settings',
    onDelete: 'CASCADE',
  });

  // w models/UserSettings.ts
  UserSettings.belongsTo(Users, {
    foreignKey: 'user_id',
    as: 'user',
  });
}

// Wywołanie definicji asocjacji od razu przy imporcie (opcjonalne)
// defineUserAssociations();
