import * as filmRepo from "../repositories/filmRepository.js";

// Crea un nuevo registro de visualización de peliculas y series.
export async function createFilm(data) {
  return filmRepo.createFilm(data);
}

// Obtiene el historial de visualizaciones de un usuario ordenado por fecha.
export async function getFilmsByUser(userId) {
  return filmRepo.getFilmsByUser(userId);
}
