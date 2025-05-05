// #ro/models/SupportMessage.ts
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '#ro/config/sequelize.config';
import { SupportMessageAttributes, SupportMessageCreationAttributes } from './SupportMessageAttributes';
import SupportTicket from './SupportTicket';
import Users from '../Users';

class SupportMessage extends Model<SupportMessageAttributes, SupportMessageCreationAttributes> {
  public id!: number;
  public ticket_id!: number;
  public sender_type!: 'user' | 'support';
  public sender_id!: number;
  public message!: string;
  public readonly createdAt!: Date;
}

SupportMessage.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ticket_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    sender_type: {
      type: DataTypes.ENUM('user', 'support'),
      allowNull: false,
    },
    sender_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'SupportMessage',
    tableName: 'support_ticket_messages',
    updatedAt: false,
  }
);


  // SupportMessage.belongsTo(SupportTicket, { foreignKey: 'ticket_id', as: 'ticket' });
  // SupportMessage.belongsTo(Users, { foreignKey: 'sender_id', as: 'sendero' });

export default SupportMessage;
