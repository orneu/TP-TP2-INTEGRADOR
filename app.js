import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import filmRoutes from "./routes/filmRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import exportRoutes from "./src/routes/exportRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
    process.exit(1);
  });

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use(authMiddleware);
app.use("/api/export", exportRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/film", filmRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

export default app;
