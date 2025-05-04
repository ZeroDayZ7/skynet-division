import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '#ro/config/sequelize.config';
import Users from './Users';

interface SupportAttributes {
  id: number;
  user_id: number;
  subject: string;
  message: string;
  status: 'new' | 'open' | 'in_progress' | 'closed';
  response: string | null;
  responder_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SupportCreationAttributes extends Optional<SupportAttributes, 'id' | 'response' | 'responder_id' | 'status'> {}

class Support extends Model<SupportAttributes, SupportCreationAttributes> implements SupportAttributes {
  public id!: number;
  public user_id!: number;
  public subject!: string;
  public message!: string;
  public status!: 'new' | 'open' | 'in_progress' | 'closed';
  public response!: string | null;
  public responder_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Support.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Users,
        key: 'id',
      },
    },
    subject: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('new', 'open', 'in_progress', 'closed'),
      allowNull: false,
      defaultValue: 'new',
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    responder_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: Users,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Support',
    tableName: 'support_messages',
    timestamps: true,
  }
);

// Relacje
Support.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });
Support.belongsTo(Users, { foreignKey: 'responder_id', as: 'responder' });

export default Support;
