// src/components/MovieCard.js
import React, { useState } from "react";
import "./MovieCard.css";

const MovieCard = ({ title, image, description, duration, director, cast }) => {
  const [isOpen, setIsOpen] = useState(false); // Kart açılma durumu

  const toggleDetails = () => {
    setIsOpen(!isOpen); // Detayları göster/gizle
  };

  return (
    <div
      className={`movie-card ${isOpen ? "movie-card--open" : ""}`}
      onClick={toggleDetails}
    >
      <img src={image} alt={title} className="movie-card__image" />
      <div className="movie-card__info">
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__description">{description}</p>
        {isOpen && (
          <div className="movie-card__details">
            <p>
              <strong>Duration:</strong> {duration} mins
            </p>
            <p>
              <strong>Director:</strong> {director}
            </p>
            <p>
              <strong>Cast:</strong> {cast.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
