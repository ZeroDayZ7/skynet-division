import {
  Model,
  DataTypes
} from "sequelize";
import sequelize from "#ro/auth/config/db.config.js";
import {
  NotificationTemplateAttributes,
  NotificationTemplateCreationAttributes
} from "#ro/auth/types/NotificationTemplateAttributes";

class NotificationTemplate extends Model<
  NotificationTemplateAttributes,
  NotificationTemplateCreationAttributes
> implements NotificationTemplateAttributes {
  public id!: number;
  public type!: string;
  public message!: string;
}

NotificationTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "NotificationTemplate",
    tableName: "notification_templates",
    timestamps: false,
  }
);

export default NotificationTemplate;
