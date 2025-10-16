import React from "react";
import "./style.css";

export default function PaginaInformativa() {
  return (
    <div className="info-container">
      <h2 className="info-titulo">Bienvenido al mundo de Dungeons & Dragons</h2>
      <p className="info-descripcion">
        Explora un vasto universo de magia, tesoros y aventuras.  
        Esta aplicación muestra los objetos mágicos disponibles en la API oficial de D&D 5e.  
        Aprende, filtra y guarda tus favoritos para tus próximas campañas.
      </p>

      <a
        href="https://github.com/julianv2903"
        target="_blank"
        rel="noopener noreferrer"
        className="info-link"
      >
        Mi GitHub
      </a>

      <h2 className="info-autor">Oscar Julian Villamarin Wilches</h2>
    </div>
  );
}
