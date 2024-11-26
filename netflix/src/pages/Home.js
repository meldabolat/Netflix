import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "./Home.css";

const Home = () => {
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/movies");
        const movies = response.data;
        setAllMovies(movies);

        // Tüm kategorileri topla
        const allCategories = [...new Set(movies.flatMap(movie => movie.category))];
        setCategories(allCategories);

        // Filmleri kategorilerine göre grupla
        const grouped = allCategories.reduce((acc, category) => {
          acc[category] = movies.filter(movie => movie.category.includes(category));
          return acc;
        }, {});

        setMoviesByCategory(grouped);
        setFilteredMovies(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "" && selectedCategory === "") {
      setFilteredMovies(allMovies);
    } else {
      const filtered = allMovies.filter(movie => {
        const matchesSearch = movie.name.toLowerCase().includes(term);
        const matchesCategory = selectedCategory === "" || movie.category.includes(selectedCategory);
        return matchesSearch && matchesCategory;
      });
      setFilteredMovies(filtered);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === "" && searchTerm === "") {
      setFilteredMovies(allMovies);
    } else {
      const filtered = allMovies.filter(movie => {
        const matchesSearch = movie.name.toLowerCase().includes(searchTerm);
        const matchesCategory = category === "" || movie.category.includes(category);
        return matchesSearch && matchesCategory;
      });
      setFilteredMovies(filtered);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <div className="home__search">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="home__category-select"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {searchTerm === "" && selectedCategory === "" ? (
        // Kategorilere göre gruplanmış filmler
        categories.map((category) => (
          <div key={category} className="home__category">
            <h2 className="home__category-name">{category}</h2>
            <div className="home__movies">
              {moviesByCategory[category]?.map((movie) => (
                <MovieCard
                  key={`${category}-${movie.name}`}
                  name={movie.name}
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
        // Filtrelenmiş sonuçlar
        <div className="home__category">
          <h2 className="home__category-name">
            {selectedCategory || "Search Results"}
          </h2>
          <div className="home__movies">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.name}
                  name={movie.name}
                  image={movie.image}
                  description={movie.description}
                  duration={movie.duration}
                  director={movie.director}
                  cast={movie.cast}
                />
              ))
            ) : (
              <p>No movies found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;