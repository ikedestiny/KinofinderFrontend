import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const Recommended = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const storedPrefs = localStorage.getItem("Kinofinder_preferences");
      if (!storedPrefs) {
        setLoading(false);
        return;
      }

      const prefs = JSON.parse(storedPrefs);

      const movieGenres = prefs.movieGenres?.join(",") || "";
      const tvGenres = prefs.tvGenres?.join(",") || "";
      const languages = prefs.languages?.join(",") || "";
      const year = prefs.year || "";
      const rating = prefs.rating || 5;
      const sortBy = prefs.sortBy || "popularity.desc";
      const actorId = prefs.actorId || "";
      const tmdbKey = "d8eb1916689af1638494d5f5a980c2e9";

      const buildMovieQuery = (useActor = true, useYear = true, useGenres = true) => {
        let query = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbKey}&sort_by=${sortBy}&vote_average.gte=${rating}`;

        if (useGenres && movieGenres) query += `&with_genres=${movieGenres}`;
        if (languages) query += `&with_original_language=${languages}`;
        if (useYear && year) query += `&primary_release_year=${year}`;
        if (useActor && actorId) query += `&with_cast=${actorId}`;

        return query;
      };

      const buildTvQuery = (useActor = true, useYear = true, useGenres = true) => {
        let query = `https://api.themoviedb.org/3/discover/tv?api_key=${tmdbKey}&sort_by=${sortBy}&vote_average.gte=${rating}`;

        if (useGenres && tvGenres) query += `&with_genres=${tvGenres}`;
        if (languages) query += `&with_original_language=${languages}`;
        if (useYear && year) query += `&first_air_date_year=${year}`;
        if (useActor && actorId) query += `&with_cast=${actorId}`;

        return query;
      };

      let movieResults = [];
      let tvResults = [];

      const fallbackOptions = [
        { actor: true, year: true, genres: true },
        { actor: false, year: true, genres: true },
        { actor: false, year: false, genres: true },
        { actor: false, year: false, genres: false },
      ];

      for (const opts of fallbackOptions) {
        const movieRes = await fetch(buildMovieQuery(opts.actor, opts.year, opts.genres));
        const movieData = await movieRes.json();

        const tvRes = await fetch(buildTvQuery(opts.actor, opts.year, opts.genres));
        const tvData = await tvRes.json();

        movieResults = movieData.results || [];
        tvResults = tvData.results || [];

        if (movieResults.length + tvResults.length > 0) break; // stop when we have results
      }

      const combined = [...movieResults, ...tvResults].sort((a, b) => b.popularity - a.popularity);

      setMovies(combined);
      setLoading(false);
    };

    fetchRecommendations();
  }, []);

  if (loading) return <div>Loading recommendations...</div>;
  if (movies.length === 0) return <div>No recommendations found. Try updating your Kinofinder preferences!</div>;

  return (
    <section className="recommendations">
      <h2 className="section-title">
        <i className="fas fa-fire"></i> Recommended for you
      </h2>

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default Recommended;
