import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import options from './cors.js';
import cors from 'cors';

const app = express();

app.use(cors(options));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

export { app, io, server };
