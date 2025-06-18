import * as reportService from '../services/reportService.js';

export async function getUserReport(req, res) {
  try {
    const userId = req.user.id;
    const films = await reportService.getUserFilms(userId);
    const report = reportService.calculateUserReport(films);
    res.json(report);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error calculando reporte' });
  }
}