import { createContext, useContext, useState, useEffect } from "react";

const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/2014/magic-items")
      .then((res) => res.json())
      .then((data) => setItems(data.results || []))
      .catch((err) => console.error("Error cargando objetos mágicos:", err));
  }, []);

  const agregarFavorito = (item) => {
    if (!favoritos.find((f) => f.index === item.index)) {
      setFavoritos([...favoritos, item]);
    }
  };

  return (
    <SharedContext.Provider value={{ items, favoritos, agregarFavorito }}>
      {children}
    </SharedContext.Provider>
  );
};

export const useShared = () => useContext(SharedContext);
