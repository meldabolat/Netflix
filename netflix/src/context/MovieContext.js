import React, { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [listMovies, setListMovies] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);

  const addFavorite = (movie) => {
    if (!favoriteMovies.find((fav) => fav.name === movie.name)) {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  const addToList = (movie) => {
    if (!listMovies.find((item) => item.name === movie.name)) {
      setListMovies([...listMovies, movie]);
    }
  };

  const addToWatchHistory = (movie) => {
    if (!watchHistory.find((watched) => watched.name === movie.name)) {
      setWatchHistory([...watchHistory, movie]);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        favoriteMovies,
        listMovies,
        watchHistory,
        addFavorite,
        addToList,
        addToWatchHistory,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
