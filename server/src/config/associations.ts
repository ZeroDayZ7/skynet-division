import Users from '#ro/modules/auth/models/Users';
import UserData from '#ro/modules/auth/models/UserData';
import UserEIDData from '#ro/modules/auth/models/UserEIDData';
import Passport from '#ro/modules/auth/models/UserPassportData';
import UserNotification from '#ro/modules/auth/models/UserNotification';
import NotificationTemplate from '#ro/modules/auth/models/NotificationTemplate';

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
}


// Wywołanie definicji asocjacji od razu przy imporcie (opcjonalne)
// defineUserAssociations();
