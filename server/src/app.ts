import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import sessionManager from '#ro/config/session.config';
import { globalLimiter } from '#ro/common/middlewares/core/DDOS/globalLimiter.middleware';
import { corsMiddleware } from '#ro/common/middlewares/security/cors.middleware';
import { helmetMiddleware } from '#ro/common/middlewares/security/helmet.middleware';
import { globalErrorMiddleware } from '#ro/common/errors/globalErrorMiddleware';
import SystemLog from '#ro/common/utils/SystemLog';
import apiRouter from '#ro/routes/apiRouter';
import defineUserAssociations from '#ro/config/associations';

// Inicjalizacja aplikacji Express
const app = express();

// Middleware zabezpieczające
app.use(helmetMiddleware); // Ustawia nagłówki HTTP dla bezpieczeństwa
app.use(corsMiddleware); // Obsługuje CORS

// Parsowanie żądań
app.use(express.json()); // Parsuje JSON w ciele żądania
app.use(express.urlencoded({ extended: true })); // Parsuje dane z formularzy
app.use(cookieParser()); // Parsuje ciasteczka

// Inicjalizacja sesji
sessionManager(app);

// Inicjalizacja relacji w bazie danych
defineUserAssociations();

// Limiter żądań (ochrona przed DDOS)
app.use(globalLimiter);

// Środowisko deweloperskie - opcjonalne logowanie żądań
if (process.env.NODE_ENV !== 'production') {
  // app.use(requestLoggerDev); // Odkomentuj, jeśli potrzebujesz logowania żądań
}

/**
 * Endpoint testowy do weryfikacji komunikacji z serwerem
 * @route POST /api/test
 * @param req - Obiekt żądania Express
 * @param res - Obiekt odpowiedzi Express
 */
app.post('/api/test', (req: Request, res: Response) => {
  SystemLog.info(`Testowy request: ${JSON.stringify(req.body, null, 2)}`);
  res.json({ status: true, data: req.body });
});

/**
 * Endpoint do sprawdzania zmiennych środowiskowych
 * @route GET /env
 * @param req - Obiekt żądania Express
 * @param res - Obiekt odpowiedzi Express
 */
app.get('/env', (req: Request, res: Response) => {
  res.json(process.env); // Zwraca zmienne środowiskowe
});

/**
 * Endpoint do sprawdzania stanu serwera
 * @route GET /health
 * @param req - Obiekt żądania Express
 * @param res - Obiekt odpowiedzi Express
 */
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Routing API
app.use('/api', apiRouter);

// Globalna obsługa błędów
app.use(globalErrorMiddleware);

// Obsługa nieistniejących tras
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Co tu szukasz lamusie ?',
  });
});

// Eksport aplikacji dla testów i serwera
export default app;