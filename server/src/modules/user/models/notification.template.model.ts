import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '#ro/config/sequelize.config';

interface NotificationTemplateAttributes {
  id: number;
  title: string;
  message: string;
  type?: string;
  created_at?: Date;
}

type NotificationTemplateCreationAttributes = Optional<NotificationTemplateAttributes, 'id' | 'type' | 'created_at'>;

class NotificationTemplateModel extends Model<
  NotificationTemplateAttributes,
  NotificationTemplateCreationAttributes
> implements NotificationTemplateAttributes {
  public id!: number;
  public title!: string;
  public message!: string;
  public type?: string;
  public createdAt?: Date;
}

NotificationTemplateModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'template',
    tableName: 'notification_templates',
    timestamps: false,
    createdAt: true
  }
);

export default NotificationTemplateModel;
