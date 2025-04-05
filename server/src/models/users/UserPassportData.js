import { Model, DataTypes } from "sequelize";
import sequelize from "#config/db.js";

class Passport extends Model {}

Passport.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  passport_number: {
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
  country_code: {
    type: DataTypes.STRING(3),
    allowNull: false,
    defaultValue: 'POL',
  },
  passport_type: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 'P',
  },
}, {
  sequelize,
  modelName: "Passport",
  tableName: "user_passport_data",
  timestamps: true,
});

export default Passport;
