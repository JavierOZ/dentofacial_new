export default async function handler(req, res) {
  const { fecha } = req.query;

  try {
    const response = await fetch('https://apis.digital.gob.cl/fl/feriados');
    const feriados = await response.json();

    const esFeriado = feriados.some((f) => f.fecha === fecha);

    res.status(200).json({ esFeriado });
  } catch (error) {
    console.error("Error al consultar la API del gobierno:", error);
    res.status(500).json({ esFeriado: false, error: true });
  }
}