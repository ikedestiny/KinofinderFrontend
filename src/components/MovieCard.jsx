import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card" key={movie.id}>
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
      />
      <div className="movie-content">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <span className="rating">
            <i className="fas fa-star"></i> {movie.vote_average}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;