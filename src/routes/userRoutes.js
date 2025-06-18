import express from "express";
import { register, login } from "../controllers/userController.js";

const userRouter = express.Router();

router.post("/register", register);

router.post("/login", login);

export { userRouter };
