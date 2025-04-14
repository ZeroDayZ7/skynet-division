import sequelize from '#ro/config/db.config'; // Import instancji Sequelize
import User from '#ro/modules/auth/models/Users';
import UserData from '#ro/modules/auth/models/UserData'; // Zakładając, że masz model UserData
import { hashValue } from '#ro/common/utils/auth.utils'; // Funkcja haszująca hasło

export const createNewUser = async (email: string, password: string, first_name: string, second_name: string, idNumber: string): Promise<void> => {
  const hashedPassword = await hashValue(password);  // Hashowanie hasła

  // Rozpoczynamy transakcję
  const transaction = await sequelize.transaction();

  try {
    // Tworzenie użytkownika w tabeli Users
    const newUser = await User.create({
      email,
      pass: hashedPassword,
      role: 'user',
      userBlock: false,
      points: 0,
      login_count: 0,
    }, { transaction });

    // Tworzenie danych użytkownika w tabeli UserData
    await UserData.create({
      user_id: newUser.id,  // Powiązanie z nowym użytkownikiem
      first_name,
      second_name,
    }, { transaction });

    // Zatwierdzamy transakcję
    await transaction.commit();
  } catch (error) {
    // Jeśli wystąpił błąd, wycofujemy transakcję
    await transaction.rollback();
    throw error;
  }
};
