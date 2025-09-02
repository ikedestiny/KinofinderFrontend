import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";

const SearchResult = () => {
  const location = useLocation();
  const movies = location.state?.results || []; // fallback to empty array

  return (
    <div className="homepage">
      <Navbar />
      <section className="recommendations">
        <h2 className="section-title">
          <i className="fas fa-fire"></i> Search Results
        </h2>

        <div className="movie-grid">
          {movies.length === 0 ? (
            <p>No results found.</p>
          ) : (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResult;
