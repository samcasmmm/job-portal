import express from 'express';
import {
  registerController,
  loginController,
} from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes

router.post('/register', registerController);
router.post('/login', authMiddleware, loginController);

export default router;
