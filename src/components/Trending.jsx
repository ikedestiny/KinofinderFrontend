import MovieCard from "./MovieCard";

const Trending = ({ movies }) => (
  <section className="recommendations">
    <h2 className="section-title">
      <i className="fas fa-fire"></i> Trending Now
    </h2>
    
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard movie={movie}/>
      ))}
    </div>
  </section>
);

export default Trending