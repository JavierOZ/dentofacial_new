import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', telefono: '+569', mensaje: '', fechaDeseada: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Por favor, ingresa un correo válido (formato correo@algo.com)");
      return;
    }

    try {
      const check = await fetch(`https://sheetdb.io/api/v1/wy7rmfutsrihe/search?email=${form.email}`);
      const checkResult = await check.json();

      if (checkResult.length > 0) {
        alert("Este correo ya está registrado en una solicitud de hora");
        return;
      }

      if (!/^\+569\d{8}$/.test(form.telefono)) {
        alert("El teléfono debe tener el formato +569 seguido de 8 dígitos numéricos.");
        return;
      }

      const payload = {
        data: {
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          telefono: form.telefono,
          mensaje: form.mensaje,
          fechaDeseada: form.fechaDeseada,
          fecha: new Date().toISOString(),
        },
      };

      const response = await fetch("https://sheetdb.io/api/v1/wy7rmfutsrihe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Mensaje enviado correctamente ✅");
        setForm({ nombre: '', apellido: '', email: '', telefono: '+569', mensaje: '', fechaDeseada: '' });
      } else {
        alert("Hubo un error al enviar 😥");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un error inesperado al enviar.");
    }
  };

  // Obtener la fecha de hoy en formato YYYY-MM-DD
  const hoy = new Date().toISOString().split("T")[0];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fef6fb', minHeight: '100vh' }}>
      {/* Sección de bienvenida visual con imagen realista de sonrisas */}
      <section style={{
        backgroundImage: 'url(/img/smile1.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
        color: '#fff'
}}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
          Bienvenido a Clínica Estética Dentofacial
        </h1>
        <p style={{ fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto', textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>
          Sonríe con confianza. Salud, estética y bienestar en un solo lugar.
        </p>
      </section>

      {/* Sección de servicios destacados */}
      <section style={{ backgroundColor: '#ffffff', padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#662c91', marginBottom: '2rem' }}>Nuestros Servicios</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
          <div style={{ width: '250px', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
            <h3 style={{ color: '#1fbabf' }}>Odontología General</h3>
            <p>Diagnóstico, prevención y tratamiento para una salud bucal integral.</p>
          </div>
          <div style={{ width: '250px', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
            <h3 style={{ color: '#1fbabf' }}>Ortodoncia</h3>
            <p>Tratamientos personalizados para alinear tu sonrisa.</p>
          </div>
          <div style={{ width: '250px', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
            <h3 style={{ color: '#1fbabf' }}>Estética Dental</h3>
            <p>Blanqueamiento, carillas y todo lo necesario para una sonrisa radiante.</p>
          </div>
        </div>
      </section>

      {/* Formulario de contacto */}
      <section style={{ background: '#fef6fb', borderRadius: '8px', padding: '2rem', maxWidth: '600px', margin: '2rem auto', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#34495e' }}>Agenda tu hora</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="text" placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type="text" placeholder="Apellido" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} required style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <input type="email" placeholder="Correo" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input
            type="tel"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={(e) => {
              let input = e.target.value;
              if (!input.startsWith("+569")) input = "+569";
              const soloNumeros = input.slice(4).replace(/\D/g, "").slice(0, 8);
              setForm({ ...form, telefono: "+569" + soloNumeros });
            }}
            required
            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <textarea placeholder="Mensaje" value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }} />
          <label style={{ fontSize: '0.9rem', color: '#333' }}>Fecha propuesta para atención:</label>
          <input type="date" value={form.fechaDeseada} onChange={(e) => setForm({ ...form, fechaDeseada: e.target.value })} required min={hoy} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          <button type="submit" style={{ padding: '0.7rem', backgroundColor: '#a051c4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Enviar</button>
        </form>
      </section>


      {/* Footer */}
      <footer style={{ backgroundColor: '#662c91', color: '#ecf0f1', padding: '1rem', textAlign: 'center' }}>
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
