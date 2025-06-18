
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // Formato esperado: 'Bearer <token>'
  const token = authHeader.split(' ')[1];


  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded?.id) {
      return res.status(401).json({ error: "Token inválido" });
    }
    req.user = decoded; // guardar info del usuario en req para usar en controladores
    next();
  } catch (error) {
    console.error("Error al verificar token:", error.message);
    return res.status(401).json({ error: 'Token inválido' });
  }
}