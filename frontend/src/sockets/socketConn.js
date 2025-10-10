import { io } from 'socket.io-client';
import { getFromLocalStorage } from '@/lib/saveToLocalStorage';

let socket = null;

export const initConnection = () => {
  if (socket && socket.connected) {
    console.log('Socket already connected');
    return socket;
  }

  socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling'],
    auth: {
      token: getFromLocalStorage('accessToken'),
    },
  });
  console.log(getFromLocalStorage('accessToken'));

  socket.on('connect', () => {
    console.log('Connected:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });

  socket.on('connect_error', err => {
    console.error('❌ Connection error:', err.message);
  });

  return socket;
};

export const closeConnection = () => {
  if (socket) {
    console.log('Disconnecting socket');
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
