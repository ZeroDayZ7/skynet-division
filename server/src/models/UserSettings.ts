import {
  Model,
  DataTypes,
} from 'sequelize';
import sequelize from '#ro/config/sequelize.config';
import { UserSettingsAttributes, UserSettingsCreationAttributes } from '../modules/settings/types/UserSettingsAttributes';

class UserSettings extends Model<UserSettingsAttributes, UserSettingsCreationAttributes>
  implements UserSettingsAttributes
{
  public id!: number;
  public user_id!: number;
  public pin_hash!: string | null;
  public two_factor_enabled!: boolean;
  public dark_mode!: boolean;
  public biometric_enabled!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserSettings.init(
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
    pin_hash: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    two_factor_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    dark_mode: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    biometric_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
     },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'UserSettings',
    tableName: 'user_settings',
    timestamps: true,
    underscored: true,
  }
);
 
export default UserSettings;
