import React, { useState, useEffect } from "react";
import "./style.css";

/**
 * PestañaOriginal
 * Muestra un “versus” entre dos objetos mágicos del API de D&D
 * El usuario elige cuál es mejor, y el elegido permanece mientras se genera un nuevo contrincante.
 */
function PestañaOriginal() {
  const [items, setItems] = useState([]);
  const [actual, setActual] = useState(null);
  const [contrincante, setContrincante] = useState(null);
  const [ganador, setGanador] = useState(null);

  // Cargar los objetos mágicos de la API
  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/magic-items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.results);
        if (data.results.length >= 2) {
          const shuffled = data.results.sort(() => Math.random() - 0.5);
          setActual(shuffled[0]);
          setContrincante(shuffled[1]);
        }
      })
      .catch((err) => console.error("Error al cargar los objetos mágicos:", err));
  }, []);

  // Maneja la elección del usuario
  const manejarEleccion = (seleccionado) => {
    setGanador(seleccionado);
    const nuevoContrincante =
      items[Math.floor(Math.random() * items.length)];
    setContrincante(nuevoContrincante);
    setActual(seleccionado);
  };

  if (!actual || !contrincante) {
    return <div className="loading">Cargando objetos mágicos...</div>;
  }

  return (
    <div className="versus-container">
      <h2>⚔️ Batalla de Objetos Mágicos ⚔️</h2>
      <p>Elige cuál objeto te parece más poderoso o interesante.</p>

      <div className="versus">
        <div className="card">
          <h3>{actual.name}</h3>
          <button onClick={() => manejarEleccion(actual)}>⭐ Elegir</button>
        </div>

        <span className="vs-text">VS</span>

        <div className="card">
          <h3>{contrincante.name}</h3>
          <button onClick={() => manejarEleccion(contrincante)}>⭐ Elegir</button>
        </div>
      </div>

      {ganador && (
        <div className="winner">
          <h4>🏆 Último ganador: {ganador.name}</h4>
        </div>
      )}
    </div>
  );
}

export default PestañaOriginal;
