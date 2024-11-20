// src/components/MovieCard.js
import React from "react";
import "./MovieCard.css";

const MovieCard = ({ title, image, description, duration, director, cast, }) => {
  return (
    <div className="movie-card">
      <img src={image} alt={title} className="movie-card__image" />
      <div className="movie-card__overlay">
        <div className="movie-card__details">
          <h3 className="movie-card__details-title">{title}</h3>
          <p>{description}</p>
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
      </div>
      <div className="movie-card__title">{title}</div>
    </div>
  );
};

export default MovieCard;
