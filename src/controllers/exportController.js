import * as exportService from '../services/exportService.js';

export async function exportCSV(req, res) {
  try {
    const userId = req.user.id;
    const csv = await exportService.generateCSVForUser(userId);

    res.header('Content-Type', 'text/csv');
    res.attachment('historial.csv');
    res.send(csv);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error exportando CSV' });
  }
}