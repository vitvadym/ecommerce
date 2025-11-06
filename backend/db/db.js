import mongoose from 'mongoose';

const initDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGO_DB_NAME,
    });
    console.log('DB Connected ✅');
  } catch (error) {
    console.error('DB Connection Failed ⛔', error);
    process.exit(1);
  }
};

export default initDB;
