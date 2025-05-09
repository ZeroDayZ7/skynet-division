// src/config/redis.config.ts

import SystemLog from '#ro/common/utils/SystemLog';
import { createClient } from 'redis';
import { env } from './env/env';

// Tworzymy klienta Redis z nowym API
const redisClient = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
  password: env.REDIS_PASSWORD
});


redisClient.on('connect', () => {
    SystemLog.info('Connected to Redis');
});
   

redisClient.on('error', (err) => {
  SystemLog.error('Error connecting to Redis:', err);
});

export { redisClient };
