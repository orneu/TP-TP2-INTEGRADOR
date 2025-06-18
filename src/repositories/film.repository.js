import Film from "../models/Film.js";

function ensureUserId(userId) {
  if (!userId) throw new Error("userId es requerido");
}

export const filmRepository = {
  createFilm: async (data) => {
    ensureUserId(data?.userId);
    return await Film.create(data);
  },

  getFilmsByUser: async (userId) => {
     ensureUserId(userId);
    return await Film.find({ userId }).sort({ dateWatched: -1 });
  },

  getFilmsRaw: async (userId) => {
    ensureUserId(userId);
    return await Film.find({ userId }).lean();
  },
};
