import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fef6fb' }}>
      
      {/* Hero principal */}
      <section style={{
        backgroundImage: 'url("/img/smile2.jpg")', // Aquí usas tu imagen real
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

      {/* Sección de servicios */}
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

export default Home;