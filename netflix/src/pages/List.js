import React, { useContext } from "react";
import { ListContext } from "../context/ListContext";
import "./List.css";

const List = () => {
  const { listMovies } = useContext(ListContext);

  return (
    <div className="list-container">
      <h2 className="list-name">Your List</h2>
      <div className="list-items">
        {listMovies.map((movie) => (
          <div key={movie.name} className="list-item">
            <img src={movie.image} alt={movie.name} />
            <h3>{movie.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
