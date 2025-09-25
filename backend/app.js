require('dotenv').config();

const express = require('express');
const connectDb = require('./config/database');
const { default: mongoose } = require('mongoose');
const RegisterRouter = require('./routes/registerRoutes');
const LoginRouter = require('./routes/loginRoutes');
const RefreshRouter = require('./routes/refreshroute');
const HomeRouter = require('./routes/homeRoutes');
const cookieParser = require('cookie-parser');
const LogoutRouter = require('./routes/logoutRoutes');
const ForgotPasswordRouter = require('./routes/forgotPasswordRoutes');
const ResetPasswordRouter = require('./routes/passwordResetRoutes');

const app = express();
const PORT = process.env.PORT;

connectDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/register', RegisterRouter);
app.use('/login', LoginRouter);
app.use('/refresh', RefreshRouter);
app.use('/home', HomeRouter);
app.use('/logout', LogoutRouter);
app.use('/forgot-password', ForgotPasswordRouter);
app.use('/reset-password', ResetPasswordRouter);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use((err, req, res, next) => {
  console.error(err);
});

mongoose.connection.on('connected', () => {
  app.listen(PORT, error => {
    if (error) throw error;
    console.log(`Server listening on ${PORT}`);
  });
});
