import React, { useEffect, useState } from 'react';

function Admin() {
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const response = await fetch('https://sheetdb.io/api/v1/wy7rmfutsrihe');
        const data = await response.json();
        setRegistros(data);
      } catch (error) {
        console.error('Error cargando registros:', error);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  if (cargando) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando registros...</div>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#fef6fb', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Registros de Solicitudes</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={estiloCabecera}>Nombre</th>
            <th style={estiloCabecera}>Apellido</th>
            <th style={estiloCabecera}>Motivo</th>
            <th style={estiloCabecera}>Teléfono</th>
            <th style={estiloCabecera}>Fecha Deseada</th>
            <th style={estiloCabecera}>Fecha Registro</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, idx) => (
            <tr key={idx}>
              <td style={estiloCelda}>{registro.nombre}</td>
              <td style={estiloCelda}>{registro.apellido}</td>
              <td style={estiloCelda}>{registro.motivo}</td>
              <td style={estiloCelda}>{registro.telefono}</td>
              <td style={estiloCelda}>{registro.fechaDeseada}</td>
              <td style={estiloCelda}>{new Date(registro.fecha).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const estiloCabecera = {
  backgroundColor: '#a051c4',
  color: 'white',
  padding: '0.75rem',
  border: '1px solid #ddd',
};

const estiloCelda = {
  padding: '0.75rem',
  border: '1px solid #ddd',
  textAlign: 'center',
};

export default Admin;