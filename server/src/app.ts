import express, { Request, Response } from 'express';
import sessionManager from '#ro/middlewares/core/session.middlewares';
import cookieParser from 'cookie-parser';
import SystemLog from '#ro/common/utils/SystemLog';
// import helmet from 'helmet';
// import { setLocale } from '#ro/language/i18nSetup';
import { requestLoggerDev } from './middlewares/core/requestLogger';
import apiRouter from '#ro/routes/apiRouter';
import defineUserAssociations from '#ro/config/associations';
import { errorMiddleware } from './common/errors/errorMiddleware';

import { globalLimiter } from './middlewares/core/DDOS/globalLimiter.middleware';
import { corsMiddleware } from './middlewares/security/cors.middleware';
import { helmetMiddleware } from './middlewares/security/helmet.middleware';

const app = express();
let counter = 1;

function logWithCounter() {
  SystemLog.info(`=========== ${counter} =========`);
  counter++;
}

app.use((req: Request, res: Response, next) => {
  logWithCounter();
  next();
});

// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(requestLogger);
app.disable('x-powered-by');

// Baza / relacje
defineUserAssociations();
// Sesje
sessionManager(app);
// app.use(setLocale);
app.use(helmetMiddleware)
// CORS
app.use(corsMiddleware)
// Limiter
app.use(globalLimiter);

if (process.env.NODE_ENV !== 'production') {
  app.use(requestLoggerDev);
}

// Routing
app.use('/api', apiRouter);

// Błędy
app.use(errorMiddleware);

app.use((req: Request, res: Response) => {
  res.status(404).send("Nic tu nie ma, lamusie! Spróbuj czegoś innego.");
});

app.use((err: Error, req: Request, res: Response) => {
  SystemLog.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
