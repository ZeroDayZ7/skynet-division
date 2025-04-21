// models/PermissionTemplate.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '#ro/config/sequelize.config';
import PermissionUser from './PermissionUser';

interface PermissionTemplateAttributes {
  id: number;
  key: string;
  description: string;
}

class PermissionTemplate extends Model<PermissionTemplateAttributes> implements PermissionTemplateAttributes {
  public id!: number;
  public key!: string;
  public description!: string;

  public readonly userPermissions?: PermissionUser[];
}

PermissionTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
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