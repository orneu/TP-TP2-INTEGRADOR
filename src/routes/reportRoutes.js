import express from "express";
import { getUserReport } from "../controllers/reportsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const reportRouter = express.Router();

reportRouter.use(authMiddleware);
reportRouter.get("/", getUserReport);

export default reportRouter;







