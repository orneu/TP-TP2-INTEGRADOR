import express from "express";
import { createFilm, getFilms } from "../controllers/filmController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const filmRouter = express.Router();

filmRouter.use(authMiddleware); // todas requieren autenticación

filmRouter.post("/", createFilm);
filmRouter.get("/", getFilms);

export default filmRouter;