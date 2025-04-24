import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', telefono: '', mensaje: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        telefono: form.telefono,
        mensaje: form.mensaje,
        fecha: new Date().toISOString(),
      },
    };

    try {
      const response = await fetch("https://sheetdb.io/api/v1/wy7rmfutsrihe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Mensaje enviado correctamente ✅");
        setForm({ nombre: '', apellido: '', email: '', telefono: '', mensaje: '' });
      } else {
        alert("Hubo un error al enviar 😥");
      }
    } catch (error) {
      alert("Error de conexión o servidor");
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fdf7f9', minHeight: '100vh' }}>
      {/* Sección de bienvenida visual con fondo y color ajustado */}
      <section style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1599058917212-d750089bc07f?auto=format&fit=crop&w=1470&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', color: '#fff', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>Bienvenido a Clínica Estética Dentofacial</h1>
        <p style={{ fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto', textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>Sonríe con confianza. Salud, estética y bienestar en un solo lugar.</p>
      </section>

      {/* Sección de servicios destacados */}
      <section style={{ backgroundColor: '#ffffff', padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '2rem' }}>Nuestros Servicios</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
          <div style={{ width: '250px', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
            <h3 style={{ color: '#16a085' }}>Odontología General</h3>
            <p>Diagnóstico, prevención y tratamiento para una salud bucal integral.</p>
          </div>
          <div style={{ width: '250px', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
            <h3 style={{ color: '#16a085' }}>Ortodoncia</h3>
            <p>Tratamientos personalizados para alinear tu sonrisa.</p>
          </div>
          <div style={{ width: '250px', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
            <h3 style={{ color: '#16a085' }}>Estética Dental</h3>
            <p>Blanqueamiento, carillas y todo lo necesario para una sonrisa radiante.</p>
          </div>
        </div>
      </section>

      {/* Formulario de contacto */}
      <section style={{ background: '#ffffff', borderRadius: '8px', padding: '2rem', maxWidth: '600px', margin: '2rem auto', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#34495e' }}>Agenda tu hora</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="text" placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type="text" placeholder="Apellido" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} required style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <input type="email" placeholder="Correo" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="tel" placeholder="Teléfono" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          <textarea placeholder="Mensaje" value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }} />
          <button type="submit" style={{ padding: '0.7rem', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Enviar</button>
        </form>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '1rem', textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} Clínica Dentofacial | contacto@clinicadentofacial.cl</p>
        <div style={{ marginTop: '0.5rem' }}>
          <a href="#" style={{ margin: '0 0.5rem', color: '#ecf0f1' }}>Facebook</a>
          <a href="#" style={{ margin: '0 0.5rem', color: '#ecf0f1' }}>Instagram</a>
          <a href="#" style={{ margin: '0 0.5rem', color: '#ecf0f1' }}>WhatsApp</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
