import express from 'express';
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
} from '../controllers/productController.js';
import isAdmin from '../middleware/isAdmin.js';
import uploadImage from '../middleware/multer.js';

const productRouter = express.Router();

productRouter.post('/add', uploadImage, isAdmin, addProduct);
productRouter.post('/remove', isAdmin, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);

export default productRouter;
