// /logger/logger.js
const winston = require('winston');

// Konfiguracja loggera Winsona
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),  // Logowanie do konsoli
    new winston.transports.File({ filename: 'logs/app.log' })  // Logowanie do pliku
  ],
});

module.exports = logger;


// logger.info(`Request received: ${req.method} ${req.url}`);