import React, { useState } from "react";
import { useShared } from "../../contexts/SharedContext";
import "./style.css";

export default function Buscador() {
  const { items } = useShared();
  const [query, setQuery] = useState("");

  const resultados = items.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="buscador">
      <h2>Buscar objetos mágicos</h2>
      <input
        type="text"
        placeholder="Escribe el nombre del objeto..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {resultados.map((i) => (
          <li key={i.index}>{i.name}</li>
        ))}
      </ul>
    </div>
  );
}
