import { Model, DataTypes } from "sequelize";
import sequelize from "#ro/config/db.js";
import NotificationTemplate from "#ro/models/users/NotificationTemplate.js";

class UserNotification extends Model {}

UserNotification.init({
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  notification_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  is_read: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0, // 0 - nieprzeczytane, 1 - przeczytane
  },
  received_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: "UserNotification",
  tableName: "user_notifications",
  timestamps: false,
});

// Relacja z NotificationTemplate
UserNotification.belongsTo(NotificationTemplate, { foreignKey: "notification_id", as: "template" });

export default UserNotification;
