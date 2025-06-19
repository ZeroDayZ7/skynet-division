import { Model, DataTypes } from 'sequelize';
import sequelize from '#ro/config/sequelize.config';
import { UserAttributes, UserCreationAttributes } from '#ro/modules/auth/types/UserAttributes';

class Users extends Model<UserAttributes, UserCreationAttributes> {
  public readonly id!: number;
  public username!: string;
  public pass!: string;
  public email!: string;
  public user!: string;
  public pin!: number | null;
  public points!: number;
  public activation_token!: string | null;
  public documents!: Record<string, boolean> | null; // 👈 JSON pole
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
    username:{
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    pass: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    pin: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: null,
    },
    points: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    activation_token: {
      type: DataTypes.STRING(6),
      allowNull: true,
      defaultValue: null,
    },
    documents: {
      type: DataTypes.JSON, // MySQL: `JSON`, Postgres: `JSONB` byłby lepszy
      allowNull: true,
      defaultValue: null, // 👈 null = nie ma żadnych dokumentów
    },
    login_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 0,
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'init',
    },
    userBlock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
