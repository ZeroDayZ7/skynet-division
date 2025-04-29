import { Model, DataTypes } from 'sequelize';
import sequelize from '#ro/config/sequelize.config';

class NotificationTemplate extends Model {
  public id!: number;
  public title!: string;
  public message!: string;
  public type!: 'info' | 'success' | 'error' | 'warning';
  public createdAt!: Date;
}

NotificationTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('info', 'success', 'error', 'warning'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'NotificationTemplate',
    tableName: 'notification_templates',
    timestamps: false, // bo masz tylko created_at
    createdAt: true
  }
);

export default NotificationTemplate;
