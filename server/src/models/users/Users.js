import { Model, DataTypes } from "sequelize";
import sequelize from "#config/db.js";

class Users extends Model {}

Users.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(88),
    allowNull: true,
  },
  user: {
    type: DataTypes.STRING(55),
    allowNull: true,
  },
  pass: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  pin: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  points: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  activation_token: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  reset_password_token: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  login_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  registration_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  login_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  role: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  userBlock: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0,
  },
  loginAttempts: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  lastLoginAttempt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  lastLoginIp: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Users",
  tableName: "users",
  timestamps: false, // Możesz ustawić true, jeśli chcesz śledzić daty utworzenia/aktualizacji
});

export default Users;
