import Film from "../models/Film.js";

export const filmRepository = {
  createFilm: async (data) => {
    return await Film.create(data);
  },

  getFilmsByUser: async (userId) => {
    return await Film.find({ userId }).sort({ dateWatched: -1 });
  },

  getFilmsRaw: async (userId) => {
    return await Film.find({ userId }).lean();
  },
};
