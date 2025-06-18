import * as filmRepo from "../repositories/filmRepository.js";

// Recupera todas las visualizaciones de un usuario.

export async function getUserFilms(userId) {
  return filmRepo.getFilmsByUser(userId);
}

//Procesa la lista de films y devuelve un reporte con horas totales por mes, genero más visto, dia con mayor actividad

export function calculateUserReport(films) {
  const hoursPerMonth = {};
  const genreCount = {};
  const daysCount = {};

  films.forEach((film) => {
    const month = film.dateWatched.toISOString().slice(0, 7);
    hoursPerMonth[month] = (hoursPerMonth[month] || 0) + film.duration / 60;

    if (film.genre) {
      genreCount[film.genre] = (genreCount[film.genre] || 0) + 1;
    }

    const day = film.dateWatched.toISOString().slice(0, 10);
    daysCount[day] = (daysCount[day] || 0) + 1;
  });

  // genero mss visto
  let topGenre = null;
  let maxGenre = 0;
  for (const [g, c] of Object.entries(genreCount)) {
    if (c > maxGenre) {
      maxGenre = c;
      topGenre = g;
    }
  }

  // dia con mayor actividad
  let topDay = null;
  let maxDay = 0;
  for (const [d, c] of Object.entries(daysCount)) {
    if (c > maxDay) {
      maxDay = c;
      topDay = d;
    }
  }

  return {
    hoursPerMonth,
    topGenre,
    maxGenreCount: maxGenre,
    topDay,
    maxDayCount: maxDay,
  };
}
