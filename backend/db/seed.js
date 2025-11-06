import 'dotenv/config';
import userModel from '../models/userModel.js';
import productModel from '../models/productModel.js';
import hashPassword from '../utils/hashPassword.js';
import { products } from './data.js';
import mongoose from 'mongoose';

const seedInitData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGO_DB_NAME,
    });

    const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD);
    const isDBConnected = mongoose.connection.readyState === 1;

    const adminUser = new userModel({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      isAdmin: true,
    });

    const existingAdmin = await userModel.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    const existingProducts = await productModel.countDocuments();

    if (isDBConnected && !existingAdmin) {
      await adminUser.save();
      console.log('Default user created ✅');
    }

    if (isDBConnected && existingProducts < 1) {
      await productModel.bulkWrite(
        products.map((product) => ({
          insertOne: {
            document: product,
          },
        })),
      );
      console.log('Default products added ✅');
    }
  } catch (error) {
    console.error('Error seeding init data:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('DB connection closed ✅');
  }
};

seedInitData();
