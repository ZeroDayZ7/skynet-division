const express = require('express');
require('dotenv').config();
const path = require('path');
const sessionManager = require('./tools/sessionManager');
const cors = require('cors');
const i18n = require('./language/i18nSetup');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const SystemLog = require('./tools/SystemLog');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const { consoleLogRequest } = require('./tools/tools');

console.log(`====================== START ===========================`);


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

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
//   keyGenerator: (req) => req.ip || req.socket.remoteAddress
// });

// // Bardziej restrykcyjny limit dla autentykacji
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minut
//   max: 225, // Tylko 5 prób logowania
//   keyGenerator: (req) => req.ip || req.socket.remoteAddress,
//   message: "Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.",
//   handler: (req, res) => {
//     // Logowanie podejrzanej aktywności
//     SystemLog.warn(`Próba brute force z IP: ${req.ip}`);
//     res.status(429).json({
//       error: "Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.",
//       retryAfter: 15 * 60 // czas w sekundach
//     });
//   }
// });
 

// app.use(limiter);


app.use(express.json());
// app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(consoleLogRequest);
console.log(`= 8 => API URL:  ${process.env.API_URL}`);
app.disable('x-powered-by');

// Session and language

sessionManager(app);
app.use(i18n.setLocale);

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

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API routes
const apiRouter = express.Router();

apiRouter.use('/register', require('./endpoints/registrationEndpoint'));
apiRouter.use('/login', authLimiter, require('./endpoints/loginEndpoint'));
apiRouter.use('/contact', require('./endpoints/contactEndpoint'));
apiRouter.use('/user', require('./endpoints/userEndpoint'));
apiRouter.use('/projects', require('./endpoints/citizenprojects'));
apiRouter.use('/jobs', require('./endpoints/jobsEndpoint'));
app.use('/api', apiRouter);

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