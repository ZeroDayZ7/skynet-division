const db = require('../db');
const bcrypt = require('bcrypt');
const userService = require('./userService');

module.exports = {
  async validateUser(email, password, ip) {
    const userDetails = await userService.checkUserDetails(email);
    
    if (!userDetails || userDetails.userBlock === 1 || !userDetails.isActivationTokenNull) {
      return {
        error: true,
        messages: 'error',
        isLoggedIn: false,
        code: userDetails
          ? userDetails.userBlock
            ? 'LOGIN.USER_BLOCKED'
            : 'LOGIN.ACCOUNT_ACTIVATE_FALSE'
          : 'LOGIN.WRONG_DATA'
      };
    }

    const user = await userService.getUserByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.pass);
    
    if (!isPasswordValid) {
      return {
        error: true,
        messages: 'error',
        isLoggedIn: false,
        code: 'LOGIN.WRONG_DATA'
      };
    }

    if (userDetails.lastLoginIp !== ip) {
      await userService.updateLastLoginIp(email, ip);
    }

    await userService.updateLoginCount(email);
    
    return { 
      error: false,
      user 
    };
  }
};