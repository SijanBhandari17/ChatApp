import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import User from '../models/userModel.js';

async function createRandomUsers(count = 50) {
  await mongoose.connect(process.env.MONGODB_URL);

  const users = [];

  for (let i = 0; i < count; i++) {
    users.push({
      email: faker.internet.email().toLowerCase(),
      userName: faker.perso.fullName(),
      password: await bcrypt.hash('password123', 10),
      profile_image: faker.image.avatar(),
      last_active_at: faker.date.recent(30), // last 30 days
    });
  }

  try {
    await User.insertMany(users);
    console.log(`✅ ${count} random users created successfully!`);
  } catch (err) {
    console.error('❌ Error inserting users:', err);
  } finally {
    await mongoose.disconnect();
  }
}

module.exports = createRandomUsers;
