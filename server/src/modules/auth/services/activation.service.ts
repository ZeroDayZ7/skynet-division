import Users from '#ro/models/Users';
import AppError from '#ro/common/errors/AppError';
import sequelize from '#ro/config/sequelize.config';
import UserNotification from '#ro/models/UserNotification';

export const activateUser = async (email: string, activationToken: string): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    // Szukanie użytkownika według e-maila i tokenu aktywacyjnego
    const user = await Users.findOne({ where: { email, activation_token: activationToken }, transaction });

    if (!user) {
      throw new AppError('INVALID_ACTIVATION_TOKEN', 400, false, 'Nieprawidłowy kod aktywacyjny.');
    }

    // Aktywacja użytkownika i dodanie punktów
    await user.update(
      {
        activation_token: null,
        points: user.points + 50, // Dodajemy 50 pkt
      },
      { transaction }
    );

    // Przypisanie użytkownikowi powiadomienia o ID 1 (np. 'Witaj nowy użytkowniku')
    await UserNotification.create(
      {
        user_id: user.id,            // ID użytkownika, któremu przypisujesz powiadomienie
        notification_id: 1,           // ID powiadomienia (np. 'Witaj nowy użytkowniku')
        is_read: false,               // Powiadomienie początkowo nieprzeczytane
      },
      { transaction } // Wykonanie operacji w ramach transakcji
    );

    // Zatwierdzenie transakcji
    await transaction.commit();
    console.log('Użytkownik aktywowany i powiadomienie zostało przypisane.');
    
  } catch (error) {
    // Wycofanie transakcji w przypadku błędu
    await transaction.rollback();
    console.error('Błąd podczas aktywacji użytkownika:', error);
    throw error; // Rzucenie błędu do dalszego przetwarzania
  }
};
