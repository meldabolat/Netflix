import React, { createContext, useState } from "react";

// Context oluşturma
export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [listMovies, setListMovies] = useState([]);

  return (
    <ListContext.Provider value={{ listMovies, setListMovies }}>
      {children}
    </ListContext.Provider>
  );
};
