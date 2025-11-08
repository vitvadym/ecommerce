import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import initDB from './db/db.js';
import initCloudinary from './config/cloudinary.js';
import authRouter from './routes/authRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import paymentRouter from './routes/paymentRoute.js';
import errorHandler from './utils/errorHandler.js';

const app = express();
const port = process.env.PORT || 3030;
initDB();
initCloudinary();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_CLIENT_URL],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRouter);

app.get('/', (req, res) => {
  res.send('API Working 😎');
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port} 🚀`));
