declare namespace NodeJS {
  interface ProcessEnv {
    // DATABASE
    DB_HOST: string;
    DB_PORT: string;
    DB_DATABASE: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;

    // SERVER
    PORT: string;

    // URL
    FRONTEND_URL: string;

    // BCRYPT
    BCRYPT_SALT_ROUNDS: string;

    // JWT
    JWT_COOKIE_NAME: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_ISSUER: string;

    // SESSION
    SESSION_COOKIE_NAME: string;
    SESSION_SECRET_KEY: string;
    SESSION_EXPIRES: string;
    SESSION_COOKIE_DOMAIN: string;

    // CSRF
    CSRF_COOKIE_NAME: string;

    // CORS
    CORS_EXPIRES: string;

    // PHOTO UPLOAD DIR
    PHOTO_UPLOAD_DIR: string;

    // Encryption Config
    ENCRYPTION_KEY: string;
    ENCRYPTION_ALGORITHM: string;
    IV_LENGTH: string;
    TAG_LENGTH: string;

    // NODE_ENV
    NODE_ENV: string;

    // REDIS
    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_PASSWORD: string;
  }
}
