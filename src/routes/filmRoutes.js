import express from "express";
import { createFilm, getFilms } from "../controllers/filmController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const filmRouter = express.Router();

router.use(authMiddleware); // todas requieren autenticación

router.post("/", createFilm);
router.get("/", getFilms);

export { filmRouter };
