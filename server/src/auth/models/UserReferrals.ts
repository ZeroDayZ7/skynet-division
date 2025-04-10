import { Model, DataTypes } from 'sequelize';
import sequelize from '#config/db.config';
import { UserReferralAttributes, UserReferralCreationAttributes } from '#auth/types/UserReferralAttributes';

// Powiązanie modelu z interfejsem UserReferralAttributes
class UserReferrals extends Model<UserReferralAttributes, UserReferralCreationAttributes> {
  public readonly id!: number;
  public readonly referrerId!: number;
  public readonly referredUserId!: number;
  public readonly createdAt!: Date;
}

UserReferrals.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    referrerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users', // Zakładając, że użytkownicy są w tabeli 'users'
        key: 'id',
      },
    },
    referredUserId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users', // Zakładając, że użytkownicy są w tabeli 'users'
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'UserReferrals',
    tableName: 'user_referrals',
    timestamps: true, // Jeżeli nie potrzebujesz pól createdAt/updatedAt, ustaw to na false
    updatedAt: false,

  }
);

export default UserReferrals;
