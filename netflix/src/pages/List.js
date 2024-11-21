import React, { useContext } from "react";
import { ListContext } from "../context/ListContext";
import "./List.css";

const List = () => {
  const { listMovies } = useContext(ListContext);

  return (
    <div className="list-container">
      <h2 className="list-title">Your List</h2>
      <div className="list-items">
        {listMovies.map((movie) => (
          <div key={movie.title} className="list-item">
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
