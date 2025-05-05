import Users from '#ro/models/Users';
import UserData from '#ro/models/UserData';
import UserEIDData from '#ro/models/UserEIDData';
import Passport from '#ro/models/UserPassportData';
import UserNotification from '#ro/models/UserNotification';
import NotificationTemplate from '#ro/modules/user/models/notification.template.model';
import PermissionTemplate from '#ro/models/PermissionTemplate';
import PermissionUser from '#ro/models/PermissionUser';
import SupportTicket from '#ro/models/support/SupportTicket';
import SupportMessage from '#ro/models/support/SupportTicketMessage';

export default function defineUserAssociations() {
  // Relacja Users <-> UserData
  // Users.hasOne(UserData, { foreignKey: 'user_id', as: 'userData' });
  // UserData.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

  // Relacja UserData <-> Passport
  // UserData.hasOne(Passport, { foreignKey: 'user_id', as: 'passport', sourceKey: 'user_id' });
  

  // Relacja UserData <-> UserEIDData
  // UserData.hasOne(UserEIDData, { foreignKey: 'user_id', as: 'user_eid_data', sourceKey: 'user_id' });

  UserEIDData.belongsTo(UserData, { foreignKey: 'user_id', as: 'user', targetKey: 'user_id' });
  Passport.belongsTo(UserData, { foreignKey: 'user_id', as: 'user', targetKey: 'user_id' });

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


  SupportTicket.hasMany(SupportMessage, { foreignKey: 'ticket_id', as: 'messages' });
  SupportTicket.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

  SupportMessage.belongsTo(SupportTicket, { foreignKey: 'ticket_id', as: 'ticket' });
  SupportMessage.belongsTo(Users, { foreignKey: 'sender_id', as: 'sender' });
 

}


// Wywołanie definicji asocjacji od razu przy imporcie (opcjonalne)
// defineUserAssociations();
