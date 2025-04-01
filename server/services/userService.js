const db = require('../config/db');

module.exports = {
  async checkUserDetails(email) {
    const query = `SELECT activation_token, userBlock, email, lastLoginIp 
                   FROM users WHERE email = ? LIMIT 1`;
    const [results] = await db.promise().query(query, [email]);
    return results[0] || null;
  },

  async getUserByEmail(email) {
    const query = 'SELECT pass, ids, role FROM users WHERE email = ? LIMIT 1';
    const [results] = await db.promise().query(query, [email]);
    return results[0];
  },

  async updateLoginCount(email) {
    const query = 'UPDATE users SET login_count = login_count + 1, login_date = NOW() WHERE email = ?';
    await db.promise().query(query, [email]);
  },

  async updateLastLoginIp(email, ip) {
    const query = 'UPDATE users SET lastLoginIp = ? WHERE email = ?';
    await db.promise().query(query, [ip, email]);
  }
};