require('dotenv').config();

const express = require('express');
const connectDb = require('./config/database');
const { default: mongoose } = require('mongoose');

const app = express();
const PORT = process.env.PORT;

connectDb();

app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err);
});

mongoose.connection.on('connected', () => {
  app.listen(PORT, error => {
    if (error) throw error;
    console.log(`Server listening on ${PORT}`);
  });
});
