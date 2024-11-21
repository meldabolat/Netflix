import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "./Home.css";

const Home = () => {
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [selectedCategory, setSelectedCategory] = useState(""); // Category select state
  const [categories, setCategories] = useState([]); // Category options

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

        // Kategorileri al
        setCategories(Object.keys(groupedMovies));

        // Favorites kategorisini rastgele sırala
        if (groupedMovies["Favorites"]) {
          groupedMovies["Favorites"] = groupedMovies["Favorites"].sort(
            () => Math.random() - 0.5
          );
        }

        setMoviesByCategory(groupedMovies);
        setAllMovies(movies); // Tüm filmleri sakla
        setFilteredMovies(movies); // Başlangıçta tüm filmleri göster
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  // Search filter
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Category filter
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter films based on search term and selected category
  useEffect(() => {
    let filtered = allMovies;

    // Filmleri arama terimine göre filtrele
    if (searchTerm) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Kategoriyi filtrele
    if (selectedCategory) {
      filtered = filtered.filter((movie) => movie.category === selectedCategory);
    }

    setFilteredMovies(filtered);
  }, [searchTerm, selectedCategory, allMovies]);

  return (
    <div className="home">
      {/* Search Box */}
      <div className="home__search">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Category Dropdown */}
      <div className="home__category-select">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Movie Categories */}
      {searchTerm === "" && selectedCategory === "" ? (
        // If no search term and no category is selected, show all categories
        Object.entries(moviesByCategory).map(([category, movies]) => (
          <div key={category} className="home__category">
            <h2 className="home__category-title">{category}</h2>
            <div className="home__movies">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.title}
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
        ))
      ) : (
        // If search term is entered or a category is selected, show filtered movies
        <div className="home__category">
          <h2 className="home__category-title">{selectedCategory || "Search Results"}</h2>
          <div className="home__movies">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.title}
                  title={movie.title}
                  image={movie.image}
                  description={movie.description}
                  duration={movie.duration}
                  director={movie.director}
                  cast={movie.cast}
                />
              ))
            ) : (
              <p>No movies found for your search</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
