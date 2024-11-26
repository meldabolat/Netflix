import React, { useContext } from "react";
import { ListContext } from "../context/ListContext";
import { WatchHistoryContext } from "../context/WatchHistoryContext";
import "./MovieCard.css";

const MovieCard = ({ name, image, description, duration, director, cast }) => {
  const { listMovies, setListMovies } = useContext(ListContext);
  const { watchHistory, setWatchHistory } = useContext(WatchHistoryContext);

  // Listeye ekle
  const handleAddToList = () => {
    if (!listMovies.find((movie) => movie.name === name)) {
      setListMovies([...listMovies, { name, image, description, duration, director, cast }]);
      alert(`${name} has been added to your list.`);
    } else {
      alert(`${name} is already in your list.`);
    }
  };

  // İzleme geçmişine ekle
  const handleWatch = () => {
    if (!watchHistory.find((movie) => movie.name === name)) {
      setWatchHistory([...watchHistory, { name, image, description, duration, director, cast }]);
      alert(`${name} has been added to your watch history.`);
    } else {
      alert(`${name} is already in your watch history.`);
    }
  };

  // Favorilere ekle (örnek bir alert ile)
  const handleFavorite = () => {
    alert(`${name} has been marked as favorite!`);
  };

  return (
    <div className="movie-card">
      <img src={image} alt={name} className="movie-card__image" />
      <div className="movie-card__overlay">
        <div className="movie-card__details">
          <h3 className="movie-card__details-name">{name}</h3>
          <p>{description}</p>
          <p><strong>Duration:</strong> {duration} mins</p>
          <p><strong>Director:</strong> {director}</p>
          <p><strong>Cast:</strong> {cast.join(", ")}</p>
          <div className="movie-card__actions">
            <button onClick={handleFavorite} className="movie-card__button">⭐ </button>
            <button onClick={handleAddToList} className="movie-card__button">➕ </button>
            <button onClick={handleWatch} className="movie-card__button">🎬 </button>
          </div>
        </div>
      </div>
      <div className="movie-card__name">{name}</div>
    </div>
  );
};

export default MovieCard;
