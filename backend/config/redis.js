import { createClient } from 'redis';

let redisClient;

async function initializeRedisClient() {
  const redisURL = process.env.REDIS_URL;
  if (!redisURL) return console.warn('No Redis URL found in env!');

  redisClient = createClient({ url: redisURL });

  redisClient.on('error', e => console.error('Redis error:', e));

  try {
    await redisClient.connect();
    console.log('Connected to Redis successfully!');
  } catch (e) {
    console.error('Redis connection failed:', e);
  }
}

export { redisClient, initializeRedisClient };
