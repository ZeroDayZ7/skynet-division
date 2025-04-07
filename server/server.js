import express from 'express';
import dotenv from 'dotenv';
import sessionManager from '#tools/sessionManager.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import SystemLog from '#utils/SystemLog.js';
import helmet from 'helmet';
import { setLocale } from '#language/i18nSetup.js'; // Import setLocale
import { consoleLogRequest } from '#tools/tools.js';
import apiRouter from '#routes/apiRouter.js'; // Statyczny import
import defineUserAssociations from '#config/associations.js'

dotenv.config();

const app = express();
let counter = 1; // Inicjalizacja licznika

// Funkcja do dodawania kolejnych numerów i logowania
function logWithCounter(message) {
  console.log(`${message}: ${counter}`);
  counter++; // Zwiększ licznik po każdym logowaniu
}
// Middleware do logowania z numeracją
app.use((req, res, next) => {
  console.log(`=============== START ================`);
  logWithCounter(`NUMER: `);
  console.log(`=============== STOP ================`);
  next(); // Przejście do następnego middleware lub trasy
});


// // Security middlewares
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "'unsafe-inline'"],
//       styleSrc: ["'self'", "'unsafe-inline'"],
//       imgSrc: ["'self'", 'data:'],
//       connectSrc: ["'self'", process.env.API_URL]
//     }
//   }
// }));
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(consoleLogRequest);
app.disable('x-powered-by');

defineUserAssociations();

// Session and language
sessionManager(app);
// app.use(setLocale); // Używamy setLocale jako middleware

// CORS
const corsOptions = {
  origin: process.env.API_URL,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length'],
  maxAge: parseInt(process.env.C_MAX_AGE),
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// API routes
app.use('/api', apiRouter); // Używamy .default z dynamicznego importu

// Error handling
app.use((err, req, res, next) => {
  SystemLog.error(err.stack);
  console.log(`${err}`);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Server start
app.listen(process.env.PORT, () => {
  SystemLog.info(`Server running on port ${process.env.PORT}`);
});