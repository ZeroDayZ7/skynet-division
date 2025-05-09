import { RedisStore } from 'connect-redis';
import { redisClient } from './redis.config';
import { TIME } from './constants';
import SystemLog from '#ro/common/utils/SystemLog';

export function createSessionStore(): RedisStore {
  const store = new RedisStore({
    client: redisClient,
    prefix: 'session:', // Prefiks dla kluczy sesji w Redis
    ttl: 15 * TIME.MINUTE / 1000, // TTL w sekundach
  });

  // Logowanie połączenia z Redis
  redisClient.connect().catch((err) => {
    SystemLog.error('Error connecting to Redis session store', {
      error: err.message,
      stack: err.stack,
    });
  });

  return store;
}