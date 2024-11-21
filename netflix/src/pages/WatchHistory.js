import React, { useContext } from "react";
import { WatchHistoryContext } from "../context/WatchHistoryContext";
import "./WatchHistory.css";

const WatchHistory = () => {
  const { watchHistory } = useContext(WatchHistoryContext);

  return (
    <div className="watch-history-container">
      <h2 className="watch-history-title">Watch History</h2>
      <div className="watch-history-items">
        {watchHistory.map((movie) => (
          <div key={movie.title} className="watch-history-item">
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchHistory;
