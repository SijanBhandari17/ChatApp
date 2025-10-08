import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { rateLimiter } from './utils/rateLimiter.js';

import connectDb from './config/database.js';

import options from './config/cors.js';

import RegisterRouter from './routes/registerRoutes.js';
import LoginRouter from './routes/loginRoutes.js';
import LogoutRouter from './routes/logoutRoutes.js';
import RefreshRouter from './routes/refreshRoutes.js';
import ForgotPasswordRouter from './routes/forgotPasswordRoutes.js';
import ResetPasswordRouter from './routes/passwordResetRoutes.js';
import SearchRouter from './routes/searchRoutes.js';
import ConversationRouter from './routes/conversationRouter.js';
import MessageRouter from './routes/messagesRouter.js';
import { initializeRedisClient } from './config/redis.js';
import helmetConfig from './config/helment.js';
import DashboardRouter from './routes/dashboardRouter.js';
import ProfileImageRouter from './routes/profileImageRouter.js';

const app = express();

app.use(cors(options));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(helmetConfig);

connectDb();

app.use('/register', RegisterRouter);
app.use('/login', LoginRouter);
app.use('/refresh', RefreshRouter);
app.use('/logout', LogoutRouter);
app.use('/forgot-password', ForgotPasswordRouter);
app.use('/reset-password', ResetPasswordRouter);
app.use('/search', SearchRouter);
app.use('/conversation', ConversationRouter);
app.use('/messages', MessageRouter);
app.use('/dashboard', DashboardRouter);
app.use('/upload/', ProfileImageRouter);

app.use((err, req, res, next) => {
  console.error('here', err);
  return res.status(400).json({ error: err.message });
});

async function startServer() {
  try {
    await connectDb();
    await initializeRedisClient();
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server running on port ${process.env.PORT || 3000}`),
    );
  } catch (err) {
    console.error('Startup failed:', err);
  }
}
startServer();
