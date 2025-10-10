import { io } from '../config/server.js';

const socketHandler = () => {
  console.log('hi');

  io.on('connection', socket => {
    console.log('user connected', socket.id);
  });

  io.on('disconnect', socket => {
    console.log('User disconnected:', socket.id);
  });
};

export default socketHandler;
