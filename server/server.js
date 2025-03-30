const express = require('express');
require('dotenv').config();
const path = require('path');
const sessionManager = require('./tools/sessionManager');
const cors = require('cors');
const i18n = require('./language/i18nSetup');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const logger = require('./tools/logger');

const app = express();
const { consoleLogRequest } = require('./tools/tools');

const registrationEndpoint = require('./endpoints/registrationEndpoint');
const loginEndpoint = require('./endpoints/loginEndpoint');
const contactEndpoint = require('./endpoints/contactEndpoint');
const userEndpoint = require('./endpoints/userEndpoint');
const citizenprojects = require('./endpoints/citizenprojects');

app.use(cookieParser());
app.use(express.json());

// Użycie sessionManager
sessionManager(app);
 // Middleware ustawiający język
app.use(consoleLogRequest);
// Middleware ustawiający język
app.use(i18n.setLocale);
// Middleware do serwowania plików statycznych
app.use(express.static(path.join(__dirname, '..', 'frontend/dist')));
// Middleware dla CORS
app.use(
  cors({
    origin: process.env.API_URL,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Length',
    maxAge: parseInt(process.env.C_MAX_AGE),
    optionsSuccessStatus: 204,
  })
);

app.use(registrationEndpoint);
app.use(loginEndpoint);
app.use(contactEndpoint);
app.use(userEndpoint);
app.use(citizenprojects);

// // Obsługuje wszystkie inne żądania, które nie pasują do plików statycznych
app.get('*', (req, res) => {
  console.log("xDDDDD");
  res.sendFile(path.join(__dirname, '..', 'frontend/dist/index.html'));
});

// Nasłuchiwanie na określonym porcie
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
