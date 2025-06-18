import express from "express";
import { getUserReport } from "../controllers/ReportsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const reportRouter = express.Router();

router.use(authMiddleware);
router.get("/", getUserReport);

export { reportRouter };
