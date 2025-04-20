// src/modules/auth/models/Session.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '#ro/config/sequelize.config';

class Session extends Model {
  public sid!: string;
  public data!: string;
  public expires!: Date;
  public userId?: number; // Dodajemy pole userId (opcjonalne, jeśli sesja może nie mieć użytkownika)
}

Session.init(
  {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER, // Zakładam, że userId jest liczbą (dostosuj, jeśli jest stringiem)
      allowNull: true, // Może być null, jeśli sesja nie jest powiązana z użytkownikiem
    },
  },
  {
    sequelize,
    modelName: 'Session',
    tableName: 'sessions',
    timestamps: false,
  }
);

export default Session;