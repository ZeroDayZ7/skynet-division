import { Model, DataTypes } from "sequelize";
import sequelize from "#config/db.js";

class UserData extends Model {}

UserData.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // Gwarantuje, że każdy użytkownik ma tylko jeden zestaw danych
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
    unique: true, // Unikalny PESEL
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  birth_place: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "UserData",
  tableName: "user_data",
  timestamps: false, // Możesz ustawić true, jeśli chcesz śledzić daty utworzenia/aktualizacji
});

export default UserData;
