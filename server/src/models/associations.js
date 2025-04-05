import Users from "#models/users/Users.js";
import UserData from "#models/users/UserData.js";
import Passport from "#models/users/UserPassportData.js";

export function defineAssociations() {
  Users.hasOne(UserData, { foreignKey: "user_id", as: "userData" });
  UserData.belongsTo(Users, { foreignKey: "user_id", as: "user" });
  UserData.hasOne(Passport, { foreignKey: "user_id", as: "passport", sourceKey: "user_id" });
  Passport.belongsTo(UserData, { foreignKey: "user_id", as: "user", targetKey: "user_id" });
}