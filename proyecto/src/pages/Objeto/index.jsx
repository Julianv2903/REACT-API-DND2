import React, { useState } from "react";
import "./style.css";

export default function Objeto() {
  const [index, setIndex] = useState("");
  const [data, setData] = useState(null);

  const buscarObjeto = async () => {
    try {
      const res = await fetch(`https://www.dnd5eapi.co/api/magic-item/${index}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="objeto">
      <h2>Consultar Objeto Mágico</h2>
      <input
        type="text"
        placeholder="Ejemplo: adamantine-armor"
        value={index}
        onChange={(e) => setIndex(e.target.value)}
      />
      <button onClick={buscarObjeto}>Buscar</button>

      {data && (
        <div className="detalle">
          <h3>{data.name}</h3>
          {data.desc?.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}
