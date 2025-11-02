import express from 'express';
import * as authController from '../controllers/authController.js';
import isAdmin from '../middleware/isAdmin.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', isAuth, authController.logout);
router.get('/protected', isAuth, isAdmin, (req, res) => {
  res.json({ success: true, message: 'You are an admin', user: req.user });
});

export default router;
