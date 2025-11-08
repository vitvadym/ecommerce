import express from 'express';
import * as productController from '../controllers/productController.js';
import isAdmin from '../middleware/isAdmin.js';
import isAuth from '../middleware/isAuth.js';
import uploadImage from '../middleware/multer.js';

const router = express.Router();

router.post('/add', isAuth, isAdmin, uploadImage, productController.addProduct);
router.delete('/delete/:id', isAuth, isAdmin, productController.removeProduct);
router.get('/list', productController.listProducts);
router.get('/latest', productController.latestProducts);
router.get('/best-selling', productController.bestSellerProducts);
router.get('/:id', productController.singleProduct);

export default router;
