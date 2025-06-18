import express from "express";
import { exportCSV } from "../controllers/exportController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const exportRouter = express.Router();

router.use(authMiddleware);
router.get("/csv", exportCSV);

export { exportRouter };
