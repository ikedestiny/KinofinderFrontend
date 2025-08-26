import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Trending from "../components/Trending";
import MovieCard from "../components/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";

const API_KEY = "d8eb1916689af1638494d5f5a980c2e9"; // 🔑 replace with your TMDb API key
const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch trending movies
  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    }
    fetchMovies();
  }, []);

  // Slideshow logic (switch every 4s)
  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) return <div className="loading">Loading movies...</div>;

  const currentMovie = movies[currentIndex];

  return (
    <div className="homepage">
      <Navbar/>
      {/* Slideshow section */}
      <div className="slideshow">
        <img
          src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
          alt={currentMovie.title}
          className="slide-image"
        />
        <div className="movie-info">
          <h1>{currentMovie.title}</h1>
          <p>{currentMovie.overview.substring(0, 150)}...</p>
           <div className="cta-buttons">
  <button className="btn btn-primary">
    <FontAwesomeIcon icon={faPlay} /> Watch Now
  </button>
  <button className="btn btn-secondary">
    <FontAwesomeIcon icon={faPlus} /> My List
  </button>
</div>

        </div>
      </div>

      {/* Recommendation area */}
      <div className="recommendations">
        <h2>Recommended for you</h2>
        <div className="movie-grid">
          {movies.slice(0, 6).map((movie) => (
            <MovieCard movie={movie}/>
          ))}
        </div>
        <Trending movies={movies}/>
      </div>

      <Footer/>
    </div>
  );
}
