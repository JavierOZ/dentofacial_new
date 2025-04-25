import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fef6fb' }}>
      <section style={{
        backgroundImage: 'url("/img/smile2.jpg")',
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

      {/* Formulario de contacto */}
      <section id="formulario" style={{ padding: '4rem 2rem', backgroundColor: '#ffffff', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '2rem', color: '#333' }}>Agenda tu hora</h2>
        <form action="https://sheetdb.io/api/v1/wy7rmfutsrihe" method="post" style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" name="data[nombre]" placeholder="Nombre" required style={inputStyle} />
          <input type="text" name="data[apellido]" placeholder="Apellido" required style={inputStyle} />
          <input type="email" name="data[email]" placeholder="Correo electrónico" required style={inputStyle} />
          <input type="tel" name="data[telefono]" placeholder="+56912345678" required style={inputStyle} />
          <select name="data[motivo]" required style={inputStyle}>
            <option value="">Seleccione un motivo</option>
            {servicios.map((servicio, idx) => (
              <option key={idx} value={servicio}>{servicio}</option>
            ))}
          </select>
          <input type="date" name="data[fechaDeseada]" required style={inputStyle} />
          <button type="submit" style={{ padding: '1rem', backgroundColor: '#a051c4', border: 'none', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>
            Enviar
          </button>
        </form>
      </section>
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