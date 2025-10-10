import jwt from 'jsonwebtoken';
import { io } from '../config/server.js';
import 'dotenv/config';

const initSocket = () => {
  io.use(async (socket, next) => {
    console.log('[SOCKET AUTH] New socket attempting connection...');

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
    console.log('Socket ID:', socket.id);

    socket.emit('server_message', { msg: 'Connected to the socket server' });

    socket.on('disconnect', reason => {
      console.log(`User disconnected (${socket.userId || 'unknown'}). Reason:`, reason);
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
