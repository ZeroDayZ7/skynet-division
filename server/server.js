const express = require('express');
require('dotenv').config();
const path = require('path');
const sessionManager = require('./tools/sessionManager');
const cors = require('cors');
// const i18n = require('./language/i18nSetup');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const SystemLog = require('./tools/SystemLog');
const helmet = require('helmet');

const app = express();
const apiRouter = require('./routes/apiRouter');
const { consoleLogRequest } = require('./tools/tools');

console.log(`====================== START ===========================`);

 
// Security middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'", process.env.API_URL]
    }
  }
}));

app.use(express.json());
// app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(consoleLogRequest);
app.disable('x-powered-by');

// Session and language

sessionManager(app);
// app.use(i18n.setLocale);

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

// apiRouter.use('/register', require('./endpoints/registrationEndpoint'));
// apiRouter.post('/login', authLimiter, require('./endpoints/loginEndpoint'));
// apiRouter.post('/logout', require('./endpoints/loginEndpoint'));
// apiRouter.use('/contact', require('./endpoints/contactEndpoint'));
// apiRouter.use('/user', require('./endpoints/userEndpoint'));
// apiRouter.use('/projects', require('./endpoints/citizenprojects'));
// apiRouter.use('/jobs', require('./endpoints/jobsEndpoint'));
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