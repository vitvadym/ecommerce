import express from 'express';
import * as productController from '../controllers/productController.js';
import isAdmin from '../middleware/isAdmin.js';
import uploadImage from '../middleware/multer.js';

const router = express.Router();

router.post('/add', uploadImage, isAdmin, productController.addProduct);
router.post('/remove', isAdmin, productController.removeProduct);
router.get('/list', productController.listProducts);
router.get('/latest', productController.latestProducts);
router.get('/best-selling', productController.bestSellerProducts);
router.get('/:id', productController.singleProduct);

export default router;
