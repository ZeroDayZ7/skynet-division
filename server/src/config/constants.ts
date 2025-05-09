export const TIME = {
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
  };
  
  export const SESSION_DEFAULTS = {
    COOKIE_NAME: 'sessionId',
    SECRET_KEY: 'default-secret-key', // W produkcji wymagane
    EXPIRES: 15 * TIME.MINUTE,
  };