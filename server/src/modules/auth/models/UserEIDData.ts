import { Model, DataTypes } from "sequelize";
import sequelize from "#ro/config/db.config.js";
import {
  UserEIDDataAttributes,
  UserEIDDataCreationAttributes,
} from "#ro/modules/auth/types/UserEIDDataAttributes.js";

class UserEIDData extends Model<UserEIDDataAttributes, UserEIDDataCreationAttributes>
  implements UserEIDDataAttributes {
  public id!: number;
  public user_id!: number;
  public document_number!: string;
  public issue_date!: Date;
  public expiration_date!: Date;
}

UserEIDData.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
    },
    document_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    issue_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserEIDData",
    tableName: "user_eid_data",
    timestamps: false,
  }
);

export default UserEIDData;
