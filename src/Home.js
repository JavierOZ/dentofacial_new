import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '+569',
    motivo: '',
    fechaDeseada: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fechaDeseada) {
      setMensaje("❌ Debes seleccionar una fecha.");
      return;
    }

    // Calcular el día de la semana en UTC para evitar problemas de zona horaria
    const dia = new Date(form.fechaDeseada + 'T12:00:00').getUTCDay();

    if (dia === 0) {
      setMensaje("❌ No se pueden agendar horas los días domingo.");
      return;
    }

    try {
      const feriadoResp = await fetch(`/api/feriados?fecha=${form.fechaDeseada}`);
      const feriadoData = await feriadoResp.json();

      if (feriadoData.esFeriado) {
        setMensaje("❌ La fecha seleccionada corresponde a un feriado. Elige otro día.");
        return;
      }

      const payload = {
        data: {
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          telefono: form.telefono,
          motivo: form.motivo,
          fechaDeseada: form.fechaDeseada,
          fecha: new Date().toISOString()
        }
      };

      const response = await fetch("https://sheetdb.io/api/v1/wy7rmfutsrihe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setMensaje("✅ Tu solicitud ha sido enviada correctamente.");
        setForm({ nombre: '', apellido: '', email: '', telefono: '+569', motivo: '', fechaDeseada: '' });
      } else {
        setMensaje("❌ Ocurrió un error al enviar. Inténtalo nuevamente.");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      setMensaje("❌ Error inesperado. Inténtalo más tarde.");
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fef6fb' }}>
      {/* HERO */}
      <section style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/img/smile2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        padding: '6rem 2rem',
        textAlign: 'center',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Confianza que se nota en tu sonrisa</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Clínica Estética Dentofacial</p>
        <button
          onClick={() => navigate('/#formulario')}
          style={{ padding: '1rem 2rem', backgroundColor: '#a051c4', border: 'none', borderRadius: '8px', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}
        >
          Agenda tu hora
        </button>
      </section>

      {/* SERVICIOS */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '3rem', color: '#333' }}>Nuestros Servicios</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {servicios.map((servicio, idx) => (
            <div key={idx} style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s',
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#a051c4' }}>{servicio}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="formulario" style={{ padding: '4rem 2rem', backgroundColor: '#ffffff', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '2rem', color: '#333' }}>Agenda tu hora</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required style={inputStyle} />
          <input type="text" name="apellido" placeholder="Apellido" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} required style={inputStyle} />
          <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required style={inputStyle} />
          <input
            type="tel"
            name="telefono"
            placeholder="+56912345678"
            value={form.telefono}
            onChange={(e) => {
              let input = e.target.value;
              if (!input.startsWith("+569")) input = "+569";
              const soloNumeros = input.slice(4).replace(/\D/g, "").slice(0, 8);
              setForm({ ...form, telefono: "+569" + soloNumeros });
            }}
            required
            style={inputStyle}
          />
          <select name="motivo" value={form.motivo} onChange={(e) => setForm({ ...form, motivo: e.target.value })} required style={inputStyle}>
            <option value="">Seleccione un motivo</option>
            {servicios.map((servicio, idx) => (
              <option key={idx} value={servicio}>{servicio}</option>
            ))}
          </select>
          <input type="date" name="fechaDeseada" value={form.fechaDeseada} onChange={(e) => setForm({ ...form, fechaDeseada: e.target.value })} required style={inputStyle} />
          <button type="submit" style={{ padding: '1rem', backgroundColor: '#a051c4', border: 'none', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>
            Enviar
          </button>
        </form>
        {mensaje && <p style={{ marginTop: '1rem', color: mensaje.startsWith('✅') ? 'green' : 'red' }}>{mensaje}</p>}
      </section>
    {/* Footer */}
    <footer style={{ backgroundColor: '#662c91', color: '#ecf0f1', padding: '1rem', textAlign: 'center', marginTop: '2rem' }}>
      <p>&copy; {new Date().getFullYear()} Clínica Dentofacial | dentofacial.contacto@gmail.com</p>
      <div style={{ marginTop: '0.5rem' }}>
        <a href="#" style={{ margin: '0 0.5rem', color: '#ecf0f1', textDecoration: 'none' }}>Facebook</a>
        <a href="#" style={{ margin: '0 0.5rem', color: '#ecf0f1', textDecoration: 'none' }}>Instagram</a>
        <a href="#" style={{ margin: '0 0.5rem', color: '#ecf0f1', textDecoration: 'none' }}>WhatsApp</a>
      </div>
    </footer>
    </div>
  );
}

const servicios = [
  'Revisión de diagnóstico',
  'Limpieza dental',
  'Blanqueamiento dental',
  'Endodoncia (Tratamiento de conducto)',
  'Corona dental',
  'Implante dental',
  'Tratamiento periodontal',
  'Radiografías dentales',
];

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

export default Home;