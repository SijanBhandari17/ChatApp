const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (err) {
    console.error("Could not connect to the database", err);
  }
};
module.exports = connectDb;
