import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

export default function Detalle() {
  const { index } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (index) {
      fetch(`https://www.dnd5eapi.co/api/magic-item/${index}`)
        .then((res) => res.json())
        .then((data) => setItem(data))
        .catch((err) => console.error("Error cargando detalle:", err));
    }
  }, [index]);

  if (!item) return <p>Cargando detalle...</p>;

  return (
    <div className="detalle">
      <h2>{item.name}</h2>
      <p>
        <strong>Rarity:</strong> {item.rarity?.name || "Desconocido"}
      </p>
      <p>
        <strong>Category:</strong> {item.equipment_category?.name || "N/A"}
      </p>

      {item.desc && (
        <div className="descripcion">
          {item.desc.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}
