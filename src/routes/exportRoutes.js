import express from "express";
import { exportCSV } from "../controllers/exportController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const exportRouter = express.Router();

exportRouter.use(authMiddleware);
exportRouter.get("/csv", exportCSV);

export default exportRouter;

