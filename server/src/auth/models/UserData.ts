import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "#auth/config/db.config.js";
import {
  UserDataAttributes,
  UserDataCreationAttributes,
} from "#auth/types/UserDataAttributes.js";

class UserData extends Model<UserDataAttributes, UserDataCreationAttributes>
  implements UserDataAttributes {
  public id!: number;
  public user_id!: number;
  public first_name!: string;
  public second_name!: string | null;
  public last_name!: string;
  public pesel!: string;
  public birth_date!: Date;
  public birth_place!: string;
  public gender!: string;
  public nationality!: string;
}

UserData.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    second_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    pesel: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    birth_place: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserData",
    tableName: "user_data",
    timestamps: false,
  }
);

export default UserData;
