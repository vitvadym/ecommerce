import mongoose from 'mongoose';
import hashPassword from '../utils/hashPassword.js';
import userModel from '../models/userModel.js';

const seedInitData = async () => {
  const adminExists = await userModel.findOne({
    email: process.env.ADMIN_EMAIL,
  });

  if (!adminExists) {
    const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD);

    const adminUser = new userModel({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });

    await adminUser.save();
    console.log('Default user created 🚀');
  }
};

const initDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'ecommerce',
    });
    console.log('DB Connected 🚀');

    await seedInitData();
  } catch (error) {
    console.error('DB Connection Failed ⛔', error);
    process.exit(1);
  }
};

export default initDB;
