import { io } from '../config/server.js';

const socketHandler = () => {
  console.log('hi');
  io.on('connection', socket => {
    console.log('user connected', socket);
  });
};

export default socketHandler;
