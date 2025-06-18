import { Parser } from "json2csv";
import { filmRepo } from "../repositories/filmRepo.js";

// Genera un CSV con el historial de visualizaciones de un usuario
export async function generateCSVForUser(userId) {
  const films = await filmRepo.getFilmsRaw(userId);

  const fields = ["title", "genre", "type", "duration", "dateWatched"];
  const parser = new Parser({ fields });
  return parser.parse(films);
}
