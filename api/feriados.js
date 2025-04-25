export default async function handler(req, res) {
    const { fecha } = req.query;
  
    try {
      const api = await fetch(`https://api.victorsanmartin.com/feriados/${fecha}`);
      const data = await api.json();
  
      const esFeriado =
        data?.status === true &&
        typeof data?.data?.nombre === 'string' &&
        data.data.nombre.trim().length > 0;
  
      res.status(200).json({ esFeriado });
    } catch (error) {
      console.error("Error al consultar API de feriados:", error);
      res.status(500).json({ esFeriado: false, error: true });
    }
  }