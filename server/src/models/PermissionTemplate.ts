import { Model, DataTypes } from 'sequelize';
import sequelize from '#ro/config/sequelize.config';
import PermissionUser from '#ro/models/PermissionUser';

interface PermissionTemplateAttributes {
  id: number;
  name: string;
  parent_id: number | null;
}

class PermissionTemplate extends Model<PermissionTemplateAttributes> implements PermissionTemplateAttributes {
  public id!: number;
  public name!: string;
  public parent_id!: number | null;

  public readonly parent?: PermissionTemplate;
  public readonly children?: PermissionTemplate[];
  public readonly userPermissions?: PermissionUser[];
}

PermissionTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    parent_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'permission_templates',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    modelName: 'PermissionTemplate',
    tableName: 'permission_templates',
    timestamps: false,
  }
);

export default PermissionTemplate;