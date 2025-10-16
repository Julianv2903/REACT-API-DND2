import React, { useState } from "react";
import { useShared } from "../../contexts/SharedContext";
import "./style.css";

export default function Filtro() {
  const { items } = useShared();
  const [letra, setLetra] = useState("");

  const itemsFiltrados = letra
    ? items.filter((i) => i.name.toLowerCase().startsWith(letra.toLowerCase()))
    : items;

  return (
    <div className="filtro">
      <h2>Filtrar objetos mágicos</h2>
      <input
        type="text"
        placeholder="Filtrar por letra inicial..."
        maxLength={1}
        value={letra}
        onChange={(e) => setLetra(e.target.value)}
      />

      <div className="lista">
        {itemsFiltrados.map((item) => (
          <div key={item.index} className="card">
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
