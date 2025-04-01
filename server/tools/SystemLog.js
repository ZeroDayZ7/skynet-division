import { transports as _transports, createLogger, format as _format } from 'winston';
import 'winston-daily-rotate-file';

const transport = new _transports.DailyRotateFile({
  filename: 'logs/app-%DATE%.csv',  // Każdy dzień nowy plik
  datePattern: 'YYYY-MM-DD',
  maxSize: '10m', // Maks. 10MB na plik
  maxFiles: '14d' // Przechowuje logi z 14 dni
});

const SystemLog = createLogger({
  level: 'info',
  format: _format.combine(
    _format.timestamp(),
    _format.json()
  ),
  transports: [
    new _transports.Console(),
    transport
  ]
});

export default SystemLog;
