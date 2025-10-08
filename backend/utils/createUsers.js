import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import User from '../models/userModel.js';
import Message from '../models/messageModel.js';

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

async function createRandomMessages(count = 100) {
  await mongoose.connect(process.env.MONGODB_URL);

  const conversationId = new mongoose.Types.ObjectId('68dfb62b94995a48ef31cbde');
  const senderIds = [
    new mongoose.Types.ObjectId('68d7e804ffb1a61856b29e8a'),
    new mongoose.Types.ObjectId('68d8bd348a35c615ecc96d42'),
  ];

  const messageTypes = ['text', 'image', 'video', 'file'];

  const messages = [];

  for (let i = 0; i < count; i++) {
    const messageType = faker.helpers.arrayElement(messageTypes);
    let content;

    switch (messageType) {
      case 'text':
        content = faker.lorem.sentence();
        break;
      case 'image':
        content = faker.image.urlPicsumPhotos();
        break;
      case 'video':
        content = faker.internet.url(); // simulate video link
        break;
      case 'file':
        content = faker.system.fileName();
        break;
    }

    messages.push({
      conversation_id: conversationId,
      sender_id: faker.helpers.arrayElement(senderIds),
      content,
      message_type: messageType,
      createdAt: faker.date.recent({ days: 10 }), // within last 10 days
      updatedAt: new Date(),
    });
  }

  try {
    await Message.insertMany(messages);
    console.log(`✅ ${count} random messages created successfully!`);
  } catch (err) {
    console.error('❌ Error inserting messages:', err);
  } finally {
    await mongoose.disconnect();
  }
}

export { createRandomUsers, createRandomMessages };
