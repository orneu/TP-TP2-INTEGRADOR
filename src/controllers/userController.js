import * as userService from "../services/userService.js";

export async function register(req, res) {
  try {
    console.log("Entrando al login"); 
    const { username, password } = req.body;
    const result = await userService.registerUser({ username, password });
    console.log("Resultado login:", result); 
    res.status(201).json(result);
  } catch (error) {
    console.error("Error en login:", error);
    if (error.message === "Usuario ya existe") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Error al registrar usuario" });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const result = await userService.loginUser({ username, password });
    res.json(result);
  } catch (error) {
    console.error(error);
    if (error.message === "Usuario o contraseña incorrectos") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
}
