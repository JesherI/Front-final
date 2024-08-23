"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/navbar';
import './login.css';
import '../globals.css';

export default function Page() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    curp: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('http://127.0.0.1:8000/user/register/', formData);
      setSuccess(true);
    } catch (err) {
      setError(err.response.data.error || 'Error en el registro');
    }
  };

  return (
    <div>
      <Header />
      <Navbar />

      <div className="register-container">
        <h2>Registro</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Registro exitoso!</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Apellido</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>CURP</label>
            <input
              type="text"
              name="curp"
              value={formData.curp}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
