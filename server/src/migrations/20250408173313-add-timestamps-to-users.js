/** @type {import('sequelize-cli').Migration} */
export default {
  up: async (queryInterface, Sequelize) => {
    // Dodanie nowych kolumn createdAt i updatedAt
    await queryInterface.addColumn('users', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.addColumn('users', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    // Dodanie ograniczenia UNIQUE do kolumny email
    await queryInterface.addConstraint('users', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email', // Nazwa ograniczenia
    });

    // Dodanie ograniczenia UNIQUE do kolumny email
    await queryInterface.addConstraint('users', {
      fields: ['user'],
      type: 'unique',
      name: 'unique_user', // Nazwa ograniczenia
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Usunięcie kolumn createdAt i updatedAt
    await queryInterface.removeColumn('users', 'createdAt');
    await queryInterface.removeColumn('users', 'updatedAt');

    // Usunięcie kolumny registration_date, jeśli jest
    await queryInterface.removeColumn('users', 'registration_date');

    // Usunięcie ograniczenia UNIQUE dla email
    await queryInterface.removeConstraint('users', 'unique_email');
    await queryInterface.removeConstraint('users', 'unique_user');
  }
};
