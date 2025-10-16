import React from "react";
import { useShared } from "../../contexts/SharedContext";
import "./style.css";

export default function Lista() {
  const { items, agregarFavorito } = useShared();

  return (
    <div className="lista">
      {items.map((item) => (
        <div key={item.index} className="card">
          <p>{item.name}</p>
          <button onClick={() => agregarFavorito(item)}>⭐ Favorito</button>
        </div>
      ))}
    </div>
  );
}
