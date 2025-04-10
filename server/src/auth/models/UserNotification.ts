import {
  Model,
  DataTypes
} from "sequelize";
import sequelize from "#config/db.config.js";
import NotificationTemplate from "#auth/models/NotificationTemplate";
import {
  UserNotificationAttributes,
  UserNotificationCreationAttributes
} from "#auth/types/UserNotificationAttributes.js";

class UserNotification extends Model<
  UserNotificationAttributes,
  UserNotificationCreationAttributes
> implements UserNotificationAttributes {
  public id!: number;
  public user_id!: number;
  public notification_id!: number;
  public is_read!: boolean;
  public received_at!: Date;
}

UserNotification.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    notification_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    received_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "UserNotification",
    tableName: "user_notifications",
    timestamps: false,
  }
);

export default UserNotification;
