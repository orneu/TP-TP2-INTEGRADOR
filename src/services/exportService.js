import { Parser } from "json2csv";
import { filmRepository } from "../repositories/film.repository.js";

// Genera un CSV con el historial de visualizaciones de un usuario
export async function generateCSVForUser(userId) {
  const films = await filmRepository.getFilmsRaw(userId);

  const fields = ["title", "genre", "type", "duration", "dateWatched"];
  const parser = new Parser({ fields });
  return parser.parse(films);
}
