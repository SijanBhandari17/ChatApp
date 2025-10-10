import jwt from 'jsonwebtoken';
import { io } from '../config/server.js';
import 'dotenv/config';
import { redisClient } from '../config/redis.js';
import setLastSeen from '../utils/setLastSeen.js';

const initSocket = () => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        return next(new Error('Authentication error - No token'));
      }

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      } catch (err) {
        console.error('JWT verification failed:', err.message);
        if (err.name === 'TokenExpiredError') {
          console.warn('Token has expired.');
        } else if (err.name === 'JsonWebTokenError') {
          console.warn('Invalid signature or malformed token.');
        } else {
          console.warn('Unknown JWT error:', err);
        }
        return next(new Error('Invalid token'));
      }

      socket.userId = decoded.id;
      socket.user = decoded;

      next();
    } catch (err) {
      console.error('Unhandled error in socket auth:', err);
      next(new Error('Authentication middleware failed'));
    }
  });

  io.on('connection', socket => {
    const userId = socket.userId;
    socket.userId = userId;

    redisClient.set(`online:${userId}`, 'true', { EX: 60 });

    socket.on('disconnect', async () => {
      redisClient.del(`online:${socket.userId}`);
      await setLastSeen(userId);
    });

    socket.on('heartbeat', () => {
      redisClient.set(`online:${socket.userId}`, 'true');
      redisClient.expire(`online:${socket.userId}`, 30);
    });

    socket.on('get-user-status', async ({ userId }) => {
      try {
        const isOnline = await redisClient.exists(`online:${userId}`);

        socket.emit('user-status-response', {
          userId,
          isOnline: !!isOnline,
        });
      } catch (err) {
        console.error('Error fetching user status:', err);
      }
    });
  });

  io.engine.on('connection_error', err => {
    console.error('Socket.IO connection error:');
    console.error('Message:', err.message);
    console.error('Description:', err.description);
    console.error('Context:', err.context);
  });
};

export default initSocket;
