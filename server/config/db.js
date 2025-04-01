require('dotenv').config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || 3000,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

module.exports = db;
