import { Model, DataTypes } from "sequelize";
import sequelize from "#config/db.js";

class NotificationTemplate extends Model {}

NotificationTemplate.init({
  id: {
    type: DataTypes.INTEGER(11),
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
}, {
  sequelize,
  modelName: "NotificationTemplate",
  tableName: "notification_templates",
  timestamps: false,
});

export default NotificationTemplate;
