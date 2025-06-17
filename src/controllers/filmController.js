import * as filmService from '../services/filmService.js';

export async function createFilm(req, res) {
  try {
    const userId = req.user.id;
    const { title, genre, type, duration, dateWatched } = req.body;

    const film = await filmService.createFilm({ userId, title, genre, type, duration, dateWatched });
    res.status(201).json(film);
  } catch (error) {
    res.status(500).json({ error: 'Error creando visualización' });
  }
}

export async function getFilms(req, res) {
  try {
    const userId = req.user.id;
    const films = await filmService.getFilmsByUser(userId);
    res.json(films);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo historial' });
  }
}
