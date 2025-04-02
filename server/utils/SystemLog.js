import { transports, createLogger, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { env } from 'process';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const consoleFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message, ...meta }) => {
    return `${timestamp} [${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta) : ''
    }`;
  })
);

const fileFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.json()
);

const SystemLog = createLogger({
  levels: logLevels,
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: fileFormat,
  transports: [
    new transports.Console({
      format: consoleFormat,
    }),
    new DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '14d',
      format: fileFormat,
    }),
    new DailyRotateFile({
      level: 'error',
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '30d',
    }),
  ],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
  rejectionHandlers: [new transports.File({ filename: 'logs/rejections.log' })],
});

SystemLog.debugObject = (message, object) => {
  if (SystemLog.isDebugEnabled()) {
    SystemLog.debug(message, { object: JSON.stringify(object, null, 2) });
  }
};

export default SystemLog;