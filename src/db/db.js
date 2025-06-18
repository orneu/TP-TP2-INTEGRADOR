import mongoose from "mongoose";
import dotenv from "dotenv";
import sequelize from "./mysql.database.js";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(" Conectado a MongoDB");

    await sequelize.connect(process.env.MYSQL_PORT);
    console.log(" Conectado a MySQL");
  } catch (error) {
    console.error("Error al conectarse a la DB:", error);
    process.exit(1);
  }
};
