import Users from "#models/users/Users.js";
import UserData from "#models/users/UserData.js";
import UserEIDData from "#models/users/UserEIDData.js";
import Passport from "#models/users/UserPassportData.js";

export default function defineUserAssociations() {
  // Relacja Users <-> UserData
  Users.hasOne(UserData, { foreignKey: "user_id", as: "userData" });
  UserData.belongsTo(Users, { foreignKey: "user_id", as: "user" });

  // Relacja UserData <-> Passport
  UserData.hasOne(Passport, { foreignKey: "user_id", as: "passport", sourceKey: "user_id" });
  Passport.belongsTo(UserData, { foreignKey: "user_id", as: "user", targetKey: "user_id" });

  // Relacja UserData <-> UserEIDData
  UserData.hasOne(UserEIDData, { foreignKey: "user_id", as: "user_eid_data", sourceKey: "user_id" });
  UserEIDData.belongsTo(UserData, { foreignKey: "user_id", as: "user", targetKey: "user_id" });
}

// Wywołanie definicji asocjacji od razu przy imporcie (opcjonalne)
// defineUserAssociations();