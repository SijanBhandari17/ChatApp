import { io } from 'socket.io-client';

let socket = null;

const initConnection = () => {
  if (socket && socket.connected) {
    console.log('Socket already connected');
    return;
  }

  socket = io('http://localhost:3000');
  socket.on('connect', () => {
    console.log('Connected:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log(' Disconnected');
  });
};

const closeConnection = () => {
  if (socket) {
    console.log('disconnecting');
    socket.disconnect();
    socket = null;
  }
};

export { initConnection, closeConnection };
