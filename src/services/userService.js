import * as userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function getJwtSecret() {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("JWT_SECRET no está definido en .env");
  return JWT_SECRET;
}

export async function registerUser({ username, password }) {
  try {
    if (!username || !password) {
      throw new Error("Username y password son requeridos");
    }

    if (await userRepository.findUserByUsername(username)) {
      throw new Error("Usuario ya existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userRepository.createUser({ username, password: hashedPassword });
  } catch (error) {
    throw error;
  }
  return { message: "Usuario creado exitosamente" };
}

export async function loginUser({ username, password }) {
  console.log("loginUser llamado con:", username, password);
  if (!username || !password) {
    throw new Error("Username y password son requeridos");
  }

  const user = await userRepository.findUserByUsername(username);
  console.log("Usuario encontrado:", user);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  const JWT_SECRET = getJwtSecret();

  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, username: user.username };
}
