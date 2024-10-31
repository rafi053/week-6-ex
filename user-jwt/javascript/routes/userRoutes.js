import express from 'express';
import * as userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();
router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.use(authMiddleware);
router.route('/').get(userController.getUserByToken);
export default router;
