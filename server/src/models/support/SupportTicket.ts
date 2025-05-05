// #ro/models/SupportTicket.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '#ro/config/sequelize.config';
import { SupportTicketAttributes, SupportCreationTicketAttributes } from './SupportTicketAttributes';
import SupportMessage from './SupportTicketMessage';
import Users from '../Users';

class SupportTicket extends Model<SupportTicketAttributes, SupportCreationTicketAttributes> {
  public id!: number;
  public user_id!: number;
  public subject!: string;
  public status!: 'new' | 'open' | 'in_progress' | 'closed';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  SupportMessages: any;
}


SupportTicket.init(
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
    subject: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('new', 'open', 'in_progress', 'closed'),
      allowNull: false,
      defaultValue: 'new',
    },
  },
  {
    sequelize,
    modelName: 'SupportTicket',
    tableName: 'support_ticket',
    timestamps: true,
  }
);

// Relacje
// SupportTicket.hasMany(SupportMessage, { foreignKey: 'ticket_id' });
// SupportTicket.belongsTo(Users, { foreignKey: 'user_id', as: 'usero' });

export default SupportTicket;
