import React, { useContext } from "react";
import { ListContext } from "../context/ListContext";
import { WatchHistoryContext } from "../context/WatchHistoryContext";
import "./MovieCard.css";

const MovieCard = ({ title, image, description, duration, director, cast }) => {
  const { listMovies, setListMovies } = useContext(ListContext);
  const { watchHistory, setWatchHistory } = useContext(WatchHistoryContext);

  // Listeye ekle
  const handleAddToList = () => {
    if (!listMovies.find((movie) => movie.title === title)) {
      setListMovies([...listMovies, { title, image, description, duration, director, cast }]);
      alert(`${title} has been added to your list.`);
    } else {
      alert(`${title} is already in your list.`);
    }
  };

  // İzleme geçmişine ekle
  const handleWatch = () => {
    if (!watchHistory.find((movie) => movie.title === title)) {
      setWatchHistory([...watchHistory, { title, image, description, duration, director, cast }]);
      alert(`${title} has been added to your watch history.`);
    } else {
      alert(`${title} is already in your watch history.`);
    }
  };

  // Favorilere ekle (örnek bir alert ile)
  const handleFavorite = () => {
    alert(`${title} has been marked as favorite!`);
  };

  return (
    <div className="movie-card">
      <img src={image} alt={title} className="movie-card__image" />
      <div className="movie-card__overlay">
        <div className="movie-card__details">
          <h3 className="movie-card__details-title">{title}</h3>
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
      <div className="movie-card__title">{title}</div>
    </div>
  );
};

export default MovieCard;
