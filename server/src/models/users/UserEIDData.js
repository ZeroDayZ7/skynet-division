import { Model, DataTypes } from 'sequelize';
import sequelize from "#ro/config/db.js";

class UserEIDData extends Model {}

UserEIDData.init({
  id: { 
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
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
}, {
  sequelize,  // Określamy instancję Sequelize
  modelName: 'UserEIDData',  // Nazwa klasy/modelu
  tableName: 'user_eid_data',  // Określenie nazwy tabeli w bazie danych
  timestamps: false, // Jeżeli nie masz pól do śledzenia dat utworzenia/aktualizacji
});

export default UserEIDData;
