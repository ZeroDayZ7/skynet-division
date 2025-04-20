import User from '#models/Users';

export const editUserPermissions = async (userId: string, permissions: any) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Użytkownik nie znaleziony');
  }

  user.permissions = permissions;
  await user.save();

  return user.permissions;
};
