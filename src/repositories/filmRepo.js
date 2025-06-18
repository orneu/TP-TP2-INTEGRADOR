import Film from "../models/Film.js";

export async function createFilm(data) {
  return await Film.create(data);
}

export async function getFilmsByUser(userId) {
  return await Film.find({ userId }).sort({ dateWatched: -1 });
}

export async function getFilmsRaw(userId) {
  return await Film.find({ userId }).lean();
}
