import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { fecha } = req.query;

  try {
    const filePath = path.join(process.cwd(), 'data', 'feriados.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const feriados = JSON.parse(fileData);

    const esFeriado = feriados.some(f => f.fecha === fecha);

    res.status(200).json({ esFeriado });
  } catch (error) {
    console.error('Error al leer feriados locales:', error);
    res.status(500).json({ esFeriado: false, error: true });
  }
}