import { Model, DataTypes } from 'sequelize';
import sequelize from '#ro/config/sequelize.config';

export interface PermissionAttributes {
  id: number;
  user_id: number;
  permission_name: string;
  is_visible: boolean;
  is_enabled: boolean;
  description?: string | null;
}

export interface PermissionCreationAttributes
  extends Omit<PermissionAttributes, 'id'> {}

class Permission
  extends Model<PermissionAttributes, PermissionCreationAttributes>
  implements PermissionAttributes
{
  public readonly id!: number;
  public readonly user_id!: number;
  public permission_name!: string;
  public is_visible!: boolean;
  public is_enabled!: boolean;
  public description?: string | null;
}

Permission.init(
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
    permission_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    is_visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: 'Permission',
    tableName: 'permission',
    timestamps: false,
  }
);

export default Permission;
