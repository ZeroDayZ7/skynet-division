import { Model, DataTypes } from 'sequelize';
import sequelize from '#config/db';
import bcrypt from 'bcrypt';
import { UserAttributes, UserCreationAttributes } from '#auth/types/UserAttributes';

// Powiązanie modelu z interfejsem UserAttributes
class Users extends Model<UserAttributes, UserCreationAttributes> {
  // Deklaracja właściwości (opcjonalna, ale poprawia czytelność)
  public readonly id!: number;
  private pass!: string;

  public email!: string;
  public user!: string | null;
  public pin!: number | null;
  public points!: number;
  public activation_token!: string | null;
  public reset_password_token!: string | null;
  public login_count!: number;
  public role!: string;
  public userBlock!: boolean;
  public loginAttempts!: number;
  public lastLoginAttempt!: Date | null;
  public lastLoginIp!: string | null;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(88),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    pass: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [6, 100],
      }
    },
    pin: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    points: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    activation_token: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
    },
    reset_password_token: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
    },
    login_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 0,
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'user'
    },
    userBlock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Poprawiłem z 0 na false dla typu BOOLEAN
    },
    loginAttempts: {
      type: DataTypes.TINYINT.UNSIGNED,
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
  },
  {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: true,
  }
);

export default Users;