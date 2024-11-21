import React, { createContext, useState } from "react";

// Context oluşturma
export const WatchHistoryContext = createContext();

export const WatchHistoryProvider = ({ children }) => {
  const [watchHistory, setWatchHistory] = useState([]);

  return (
    <WatchHistoryContext.Provider value={{ watchHistory, setWatchHistory }}>
      {children}
    </WatchHistoryContext.Provider>
  );
};
