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
      API_URL: string;
  
      BCRYPT_ROUND: string;
  
      JWT_KEY: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      JWT_ISSUER: string;
      JWT_COOKIE_NAME: string
  
     

      // SESSION
      ACCESS_COOKIE_NAME: string;
      SESSION_COOKIE_NAME: string;
      SESSION_EXPIRES: string;
      SESSION_SECRET_KEY: string;
      SESSION_COOKIE_DOMAIN: string;
      SESSION_MAX_AGE: string;
  
      ENCRYPTION_KEY: string;

      CSRF_COOKIE_NAME: string;
  
      CORS_EXPIRES: string;
  
      PHOTO_UPLOAD_DIR: string;
    }
  }
  