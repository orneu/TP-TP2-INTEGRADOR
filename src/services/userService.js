import * as userRepo from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) throw new Error("JWT_SECRET no está definido en .env");

export async function registerUser({ username, password }) {
  try {
    if (!username || !password) {
      throw new Error("Username y password son requeridos");
    }

    if (await userRepo.findUserByUsername(username)) {
      throw new Error("Usuario ya existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userRepo.createUser({ username, password: hashedPassword });
  } catch (error) {
    throw error;
  }
  return { message: "Usuario creado exitosamente" };
}

export async function loginUser({ username, password }) {
  if (!username || !password) {
    throw new Error("Username y password son requeridos");
  }

  const user = await userRepo.findUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, username: user.username };
}
