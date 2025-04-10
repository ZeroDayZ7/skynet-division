import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import sessionManager from '#services/session.services';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import SystemLog from '#utils/SystemLog';
// import helmet from 'helmet';
// import { setLocale } from '#language/i18nSetup'; // Import setLocale
// import { requestLogger } from '#middlewares/requestLogger';
import apiRouter from '#routes/apiRouter.js'; // Statyczny import
import defineUserAssociations from '#auth/config/associations'

dotenv.config();

const app = express();
let counter = 1; // Inicjalizacja licznika

// Funkcja do dodawania kolejnych numerów i logowania
function logWithCounter(message: string) {
  console.log(`${message}: ${counter}`);
  counter++; // Zwiększ licznik po każdym logowaniu
}
// Middleware do logowania z numeracją
app.use((req: Request, res: Response, next) => {
  console.log(`=============== START ================`);
  logWithCounter(`NUMER: `);
  console.log(`=============== STOP ================`);
  next(); 
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
// app.use(requestLogger);
app.disable('x-powered-by');



// Session and language
sessionManager(app);
// app.use(setLocale); // Używamy setLocale jako middleware

// CORS
const corsOptions = {
  origin: process.env.API_URL,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', "X-CSRF-Token"],
  exposedHeaders: ['Content-Length'],
  maxAge: parseInt(process.env.CORS_EXPIRES),
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// API routes
app.use('/api', apiRouter); // Używamy .default z dynamicznego importu

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  SystemLog.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Server start
app.listen(process.env.PORT, () => {
  defineUserAssociations();
  SystemLog.info(`Server running on port ${process.env.PORT}`);
});