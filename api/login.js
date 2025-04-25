export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Método no permitido
    }
  
    const { clave } = req.body;
  
    // Contraseña segura configurada
    const CONTRASENA_CORRECTA = '@Clinica.2025::';
  
    if (clave === CONTRASENA_CORRECTA) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false });
    }
  }