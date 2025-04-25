import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import App from './App'; // Página principal
import Admin from './Admin'; // Página de administración


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/admin" element={<Admin />} />
      </Routes>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);