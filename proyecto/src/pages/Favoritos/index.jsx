import React from "react";
import { useShared } from "../../contexts/SharedContext";
import { Link } from "react-router-dom";
import "./style.css";

export default function Favoritos() {
  const { favoritos, eliminarFavorito } = useShared();

  if (favoritos.length === 0) {
    return <p className="empty">No tienes favoritos aún.</p>;
  }

  return (
    <div className="favoritos">
      <h2>Mis objetos mágicos favoritos</h2>
      <div className="lista">
        {favoritos.map((item) => (
          <div key={item.index} className="card">
            <p>{item.name}</p>
            <Link to={`/detalle/${item.index}`}>Ver detalle</Link>
            <button onClick={() => eliminarFavorito(item.index)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}
