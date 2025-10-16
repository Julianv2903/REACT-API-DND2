import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Menu() {
  return (
    <nav className="menu">
      <Link to="/lista">Lista</Link>
      <Link to="/filtro">Filtro</Link>
      <Link to="/buscador">Buscador</Link>
      <Link to="/detalle/1">Detalle</Link>
      <Link to="/favoritos">Favoritos</Link>
      <Link to="/original">Pestaña Original</Link>
      <Link to="/info">Página Informativa</Link>
      <Link to="/objeto">Objeto</Link>
    </nav>
  );
}
