// models/PermissionUser.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '#ro/config/sequelize.config';
import PermissionTemplate from '#ro/models/permissionTemplate.model';

interface PermissionUserAttributes {
  id: number;
  permission_id: number;
  user_id: number;
  is_visible: boolean;
  is_enabled: boolean;
}

class PermissionUser extends Model<PermissionUserAttributes> implements PermissionUserAttributes {
  public id!: number;
  public permission_id!: number;
  public user_id!: number;
  public is_visible!: boolean;
  public is_enabled!: boolean;

  public readonly template_permission?: PermissionTemplate;
}

PermissionUser.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    permission_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'permission_templates',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    is_visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    is_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'PermissionUser',
    tableName: 'user_permission',
    timestamps: false,
  }
);

export default PermissionUser;