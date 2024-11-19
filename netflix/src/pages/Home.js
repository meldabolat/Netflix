import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "./Home.css";

const Home = () => {
  const [moviesByCategory, setMoviesByCategory] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((response) => {
        const movies = response.data;

        // Filmleri kategorilere göre gruplandır
        const groupedMovies = movies.reduce((acc, movie) => {
          const { category } = movie;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(movie);
          return acc;
        }, {});

        setMoviesByCategory(groupedMovies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  return (
    <div className="home">
      {Object.entries(moviesByCategory).map(([category, movies]) => (
        <div key={category} className="home__category">
          <h2 className="home__category-title">{category}</h2>
          <div className="home__movies">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                image={movie.image}
                description={movie.description}
                duration={movie.duration}
                director={movie.director}
                cast={movie.cast}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
