import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '#ro/config/sequelize.config';
import NotificationTemplateModel from './notification.template.model';

interface NotificationAttributes {
  id: number;
  user_id: number;
  notification_id: number;
  is_read: boolean;
  created_at?: Date;
}

type NotificationCreationAttributes = Optional<NotificationAttributes, 'id' | 'is_read' | 'created_at'>;

class NotificationModel extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes {
  public readonly id!: number;
  public readonly user_id!: number;
  public notification_id!: number;
  public is_read!: boolean;
  public createdAt?: Date;
}

NotificationModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
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
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'user_notifications',
    timestamps: false,
    createdAt: true
  }
);

// Relacja
NotificationModel.belongsTo(NotificationTemplateModel, {
  foreignKey: 'notification_id',
  as: 'template',
});

export default NotificationModel;
