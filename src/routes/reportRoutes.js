import express from 'express';
import { getUserReport } from '../controllers/ReportsController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', getUserReport);

export default router;
