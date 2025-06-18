import express from 'express';
import { createFilm, getFilms } from '../controllers/filmController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); // todas requieren autenticación

router.post('/', createFilm);
router.get('/', getFilms);

export default router;