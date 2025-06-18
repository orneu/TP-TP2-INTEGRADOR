import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

startServer();
