import { DataTypes } from 'sequelize';
import db from '#config/db.js'; // Upewnij się, że ścieżka jest poprawna

const UserEIDData = db.define('UserEIDData', {
  // Definicja pól, które odpowiadają kolumnom w tabeli
  id: { 
    type: DataTypes.INTEGER.UNSIGNED,  // BIGINT(20) UNSIGNED
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER, // INTEGER(11) - standardowo MySQL traktuje int(11) jako INTEGER
    allowNull: false,
    unique: true,  // user_id ma być unikalny
  },
  first_name: {
    type: DataTypes.STRING(100),  // VARCHAR(100)
    allowNull: false,
  },
  second_name: {
    type: DataTypes.STRING(100),  // VARCHAR(100)
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(100),  // VARCHAR(100)
    allowNull: false,
  },
  pesel: {
    type: DataTypes.STRING(11),  // VARCHAR(11)
    allowNull: false,
    unique: true,  // PESEL ma być unikalny
  },
  birth_date: {
    type: DataTypes.DATE,  // DATE
    allowNull: true,
  },
  birth_place: {
    type: DataTypes.STRING(255),  // VARCHAR(255)
    allowNull: true,
  },
  document_number: {
    type: DataTypes.STRING(20),  // VARCHAR(20)
    allowNull: false,
    unique: true,  // Numer dokumentu ma być unikalny
  },
  issue_date: {
    type: DataTypes.DATE,  // DATE
    allowNull: false,
  },
  expiration_date: {
    type: DataTypes.DATE,  // DATE
    allowNull: false,
  },
}, {
  tableName: 'user_eid_data', // Określenie nazwy tabeli w bazie danych
  timestamps: false, // Jeżeli nie masz pól do śledzenia dat utworzenia/aktualizacji
});

export default UserEIDData;
