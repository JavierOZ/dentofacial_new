import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        nombre: form.nombre,
        email: form.email,
        mensaje: form.mensaje,
        fecha: new Date().toISOString(),
      },
    };

    try {
      const response = await fetch("https://sheetdb.io/api/v1/wy7rmfutsrihe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Mensaje enviado correctamente ✅");
        setForm({ nombre: '', email: '', mensaje: '' });
      } else {
        alert("Hubo un error al enviar 😥");
      }
    } catch (error) {
      alert("Error de conexión o servidor");
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Bienvenido a Clínica Estetica Dentofacial</h1>
        <p>Cuidamos tu sonrisa con calidez, profesionalismo y tecnología de vanguardia.</p>
      </header>

      <section className="form-section">
        <h2>Agenda tu hora</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Correo"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Mensaje"
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}

export default App;
