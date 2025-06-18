
import express from "express";
import path from "path";
import userRoutes from "./src/routes/userRoutes.js";
import filmRoutes from "./src/routes/filmRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";
import exportRoutes from "./src/routes/exportRoutes.js";
import authMiddleware from "./src/middleware/authMiddleware.js";

const app = express();


app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/api/users", userRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/film", authMiddleware, filmRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

export default app;
