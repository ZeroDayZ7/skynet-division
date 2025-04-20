import User from '#models/Users'; // Importuj model użytkownika z odpowiedniej lokalizacji

export const getUserPermissions = async (userId: string) => {
  const user = await User.findByPk(userId, {
    attributes: ['permissions'],
  });

  if (!user) {
    throw new Error('Użytkownik nie znaleziony');
  }

  return user.permissions;
};
