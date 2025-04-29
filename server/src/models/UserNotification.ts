import { Model, DataTypes } from "sequelize";
import sequelize from "#ro/config/sequelize.config";

class UserNotification extends Model {
  public id!: number;
  public user_id!: number;
  public notification_id!: number;
  public is_read!: boolean;
  public createdAt!: Date;  // Dodajemy pole createdAt
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
  },
  {
    sequelize,
    modelName: "UserNotification",
    tableName: "user_notifications",
    // timestamps: true,       // Ustawiamy na true, aby Sequelize zarządzał createdAt
    createdAt: true,
    updatedAt: false        // Wyłączamy zarządzanie updatedAt
  }
);

export default UserNotification;
