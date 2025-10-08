import mongoose from 'mongoose';
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (err) {
    console.error('Could not connect to the database', err);
  }
};
export default connectDb;
