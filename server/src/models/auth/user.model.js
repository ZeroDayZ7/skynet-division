import sequelize from '#ro/config/db.js'; // Import instancji Sequelize
import { Model, DataTypes } from 'sequelize';


class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(88),
    allowNull: true,
    unique: true,
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
    type: DataTypes.INTEGER(11),
    allowNull: true,
  },
  points: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: 0,
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
    type: DataTypes.INTEGER(11),
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
    type: DataTypes.INTEGER(11),
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
  modelName: 'User',
  tableName: 'users', // Nazwa tabeli w bazie danych
  timestamps: false, // Wyłącz automatyczne createdAt/updatedAt, jeśli nie używasz
});

export default User;
