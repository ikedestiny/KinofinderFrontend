import React from 'react';

const MovieCard = ({ movie }) => {
  // Determine type: Movie vs TV
  const isMovie = movie.media_type === "movie" || movie.title; // TMDb sometimes returns "movie" or object with title
  const title = movie.title || movie.name;
  const date = movie.release_date || movie.first_air_date || "";
  const year = date ? new Date(date).getFullYear() : "N/A";
  const typeLabel = isMovie ? "Movie" : "TV Show";

  return (
    <div className="movie-card" key={movie.id}>
      <img 
        src={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
              : "https://via.placeholder.com/500x750?text=No+Image"} 
        alt={title} 
      />
      <div className="movie-content">
        <h3>{title}</h3>
        <div className="movie-meta">
          <span>{year}</span>
          <span className="rating">
            <i className="fas fa-star"></i> {movie.vote_average}
          </span>
        </div>
        <span className={`type-badge ${isMovie ? "movie" : "tv"}`}>{typeLabel}</span>
      </div>
    </div>
  );
};

export default MovieCard;
