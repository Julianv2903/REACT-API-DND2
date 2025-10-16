import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import Lista from "./pages/Lista";
import Filtro from "./pages/Filtro";
import Buscador from "./pages/Buscador";
import Detalle from "./pages/Detalle";
import Favoritos from "./pages/Favoritos";
import PestañaOriginal from "./pages/PestañaOriginal"
import PaginaInformativa from "./pages/PaginaInformativa";
import Objeto from "./pages/Objeto";
import "./index.css";

export default function App() {
  return (
    <div className="app">
      <Menu />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/lista" replace />} />
          <Route path="/lista" element={<Lista />} />
          <Route path="/filtro" element={<Filtro />} />
          <Route path="/buscador" element={<Buscador />} />
          <Route path="/detalle/:index" element={<Detalle />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/original" element={<PestañaOriginal />} />
          <Route path="/info" element={<PaginaInformativa />} />
          <Route path="/objeto" element={<Objeto />} />
        </Routes>
      </main>
    </div>
  );
}
