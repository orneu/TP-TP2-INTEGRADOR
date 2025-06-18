import { config } from "./config/config.js";
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import viewingRoutes from './routes/viewingRoutes.js';
import statisticsRoutes from './routes/statisticsRoutes.js';
import exportRoutes from './routes/exportRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use(authMiddleware);
app.use('/api/viewings', viewingRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/export', exportRoutes);
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

export default app;
