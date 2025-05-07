import express, { Request, Response } from 'express';
import sessionManager from '#ro/common/middlewares/core/session.middlewares';
import cookieParser from 'cookie-parser';
import SystemLog from '#ro/common/utils/SystemLog';
// import { setLocale } from '#ro/language/i18nSetup';
import { requestLoggerDev } from './common/middlewares/core/requestLogger.middleware';
import apiRouter from '#ro/routes/apiRouter';
import defineUserAssociations from '#ro/config/associations';
import { globalErrorMiddleware } from './common/errors/globalErrorMiddleware';

import { globalLimiter } from './common/middlewares/core/DDOS/globalLimiter.middleware';
import { corsMiddleware } from './common/middlewares/security/cors.middleware';
import { helmetMiddleware } from './common/middlewares/security/helmet.middleware';


const app = express();
app.use(helmetMiddleware);
// CORS
app.use(corsMiddleware)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Baza / relacje
defineUserAssociations();
// Sesje
sessionManager(app);
// app.use(setLocale);


// Limiter
app.use(globalLimiter);

// if (process.env.NODE_ENV !== 'production') {
//   app.use(requestLoggerDev);
// }

// app.post("/api/test", (req, res) => {
//   SystemLog.warn(`Wiadomość z Next server:", ${JSON.stringify(req.body, null, 2)}`);
//   res.json({ status: true, data: req.body });
// });

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});
// Routing
app.use('/api', apiRouter);

// Błędy
app.use(globalErrorMiddleware);

app.use((req: Request, res: Response) => {
  res.status(404).send("Nic tu nie ma, lamusie! Spróbuj czegoś innego.");
});

export default app;
 