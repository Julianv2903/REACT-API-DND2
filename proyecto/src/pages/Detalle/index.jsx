import React, { useEffect, useState } from "react";

export default function Detalle() {
  const [items, setItems] = useState([]); // Lista completa de objetos mágicos
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const [filteredItems, setFilteredItems] = useState([]); // Resultados filtrados
  const [selectedIndex, setSelectedIndex] = useState(null); // Index del objeto seleccionado
  const [itemDetail, setItemDetail] = useState(null); // Detalle del objeto seleccionado
  const [showFullDetail, setShowFullDetail] = useState(false); // Mostrar detalle completo
  const [loading, setLoading] = useState(false); // Estado de carga

  // Cargar lista completa de objetos mágicos al montar el componente
  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/magic-items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.results);
        setFilteredItems(data.results);
      })
      .catch((err) => console.error("Error cargando objetos mágicos:", err));
  }, []);

  // Filtrar la lista según término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItems(items);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredItems(items.filter((obj) => obj.name.toLowerCase().includes(term)));
    }
  }, [searchTerm, items]);

  // Cargar detalle del objeto seleccionado
  useEffect(() => {
    if (selectedIndex) {
      console.log("Cargando detalle de:", selectedIndex);
      setLoading(true);
      fetch(`https://www.dnd5eapi.co/api/magic-item/${selectedIndex}`)
        .then((res) => {
          if (!res.ok) {
            console.error(`Error en la respuesta: ${res.status} ${res.statusText}`);
            throw new Error("No se pudo cargar el detalle");
          }
          return res.json();
        })
        .then((data) => {
          setItemDetail(data);
          setShowFullDetail(false);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setItemDetail(null);
          setLoading(false);
        });
    } else {
      setItemDetail(null);
      setShowFullDetail(false);
    }
  }, [selectedIndex]);

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>Buscador de Objetos Mágicos</h1>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Escribe el nombre del objeto mágico"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: 10, fontSize: 16, marginBottom: 20 }}
      />

      {/* Lista filtrada */}
      <ul
        style={{
          maxHeight: 200,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: 10,
          listStyle: "none",
          margin: 0,
        }}
      >
        {filteredItems.length === 0 && <li>No se encontraron objetos.</li>}
        {filteredItems.map((obj) => (
          <li
            key={obj.index}
            style={{
              padding: 8,
              cursor: "pointer",
              backgroundColor: selectedIndex === obj.index ? "#eee" : "transparent",
              borderBottom: "1px solid #ddd",
            }}
            onClick={() => setSelectedIndex(obj.index)}
          >
            {obj.name}
          </li>
        ))}
      </ul>

      {/* Detalle */}
      {loading && <p>Cargando detalle del objeto...</p>}

      {itemDetail && !loading && (
        <div style={{ marginTop: 30 }}>
          <h2>{itemDetail.name}</h2>
          <p>
            <strong>Rareza:</strong> {itemDetail.rarity?.name || "Desconocida"}
          </p>
          <p>
            <strong>Categoría:</strong>{" "}
            {itemDetail.equipment_category?.name || itemDetail.category || "Desconocida"}
          </p>

          {itemDetail.desc && (
            <div>
              <strong>Descripción breve:</strong>
              <p>{itemDetail.desc[0]}</p>
            </div>
          )}

          <button
            onClick={() => setShowFullDetail(!showFullDetail)}
            style={{
              marginTop: 10,
              padding: "8px 12px",
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: 4,
            }}
          >
            {showFullDetail ? "Ocultar detalle completo" : "Ver detalle completo"}
          </button>

          {showFullDetail && (
            <div
              style={{
                marginTop: 20,
                backgroundColor: "#f9f9f9",
                padding: 15,
                borderRadius: 5,
                whiteSpace: "pre-wrap",
              }}
            >
              {itemDetail.desc.map((line, i) => (
                <p key={i} style={{ marginBottom: 8 }}>
                  {line}
                </p>
              ))}

              {itemDetail.requires_attunement !== undefined && (
                <p>
                  <strong>Requiere sintonización:</strong>{" "}
                  {itemDetail.requires_attunement ? "Sí" : "No"}
                </p>
              )}
              {itemDetail.weight && (
                <p>
                  <strong>Peso:</strong> {itemDetail.weight} lbs
                </p>
              )}
              {itemDetail.stealth_disadvantage !== undefined && (
                <p>
                  <strong>Desventaja en sigilo:</strong>{" "}
                  {itemDetail.stealth_disadvantage ? "Sí" : "No"}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
