"use client";

import React from 'react';
import "./style.css"
import Header from '../components/header/header';
import Navbar from '../components/navbar/navbar';

const Evaluation = () => {
  return (
    
    <div className="evaluation-container">
        <Header></Header>
        <Navbar></Navbar>
      <header className="evaluation-header">
        <h1>Evaluación</h1>
      </header>
      <div className="evaluation-content">
        <div className="evaluation-column">
          <h2>¿Qué forma suelen tener las señales de advertencia?</h2>
          <p>A) Circulares</p>
          <p>B) Rectangulares</p>
          <p>C) Triangulares</p>

          <h2>¿Qué indican las señales de indicación?</h2>
          <p>A) Peligros potenciales en la carretera</p>
          <p>B) Obligaciones y prohibiciones</p>
          <p>C) Reglas de estacionamiento</p>

          <h2>¿Qué forma suelen tener las señales de indicación?</h2>
          <p>A) Circulares</p>
          <p>B) Rectangulares</p>
          <p>C) Triangulares</p>
        </div>

        <div className="evaluation-column">
          <h2>¿Qué forma suelen tener las señales de advertencia?</h2>
          <p>A) Circulares</p>
          <p>B) Rectangulares</p>
          <p>C) Triangulares</p>

          <h2>¿Cuál es una señal de reglamentación típica?</h2>
          <p>A) Curva peligrosa a la derecha</p>
          <p>B) Límite de velocidad</p>
          <p>C) Paso de peatones</p>

          <h2>¿Qué deben hacer los conductores con respecto a las señales de tráfico?</h2>
          <p>A) Curva peligrosa a la derecha</p>
          <p>B) Límite de velocidad</p>
          <p>C) Paso de peatones</p>
        </div>
      </div>
      <div className="evaluation-buttons">
        <button className="button purple">Regresar</button>
        <button className="button purple">Enviar</button>
      </div>
    </div>
  );
};

export default Evaluation;