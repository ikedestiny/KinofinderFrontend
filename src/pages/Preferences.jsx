import { useState } from "react";
import Navbar from "../components/Navbar";
import "../Style/Preferences.css";

export default function Preferences() {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [actor, setActor] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(5);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [saving, setSaving] = useState(false);


  // Accordion states
  const [showMovies, setShowMovies] = useState(false);
  const [showTv, setShowTv] = useState(false);

  const movieGenreOptions = [
    { id: 28, name: "Action" }, { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" }, { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" }, { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" }, { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" }, { id: 36, name: "History" },
    { id: 27, name: "Horror" }, { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" }, { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" }, { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" }, { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  const tvGenreOptions = [
    { id: 10759, name: "Action & Adventure" }, { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" }, { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" }, { id: 18, name: "Drama" },
    { id: 10751, name: "Family" }, { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" }, { id: 10763, name: "News" },
    { id: 10764, name: "Reality" }, { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" }, { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" }, { id: 37, name: "Western" },
  ];

  const languageOptions = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "hi", name: "Hindi" },
    { code: "es", name: "Spanish" },
    { code: "ja", name: "Japanese" },
  ];

  const toggleMovieGenre = (id) => {
    setMovieGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const toggleTvGenre = (id) => {
    setTvGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const toggleLanguage = (code) => {
    setLanguages((prev) =>
      prev.includes(code) ? prev.filter((l) => l !== code) : [...prev, code]
    );
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    let actorId = "";
    if (actor.trim() !== "") {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/person?api_key=YOUR_TMDB_API_KEY&query=${encodeURIComponent(actor)}`
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          actorId = data.results[0].id; // take the first match
        } else {
          alert("⚠️ No actor found with that name. Saving without actor filter.");
        }
      } catch (err) {
        console.error("Error fetching actor:", err);
        alert("⚠️ Failed to fetch actor ID. Saving without actor filter.");
      }
    }

    const preferences = {
      movieGenres,
      tvGenres,
      languages,
      actorId,  // ✅ save ID, not raw text
      year,
      rating,
      sortBy,
    };

    localStorage.setItem("Kinofinder_preferences", JSON.stringify(preferences));

    alert("Preferences saved! They will now be used for recommendations.");
    setSaving(false);
  };


  return (
    <div className="homepage">
      <Navbar />
      <div className="preferences-container">
        <h1 className="page-title">🎬 Set Your Movie & TV Preferences</h1>

        <form onSubmit={handleSubmit} className="preferences-form">

          {/* Collapsible Movie Genres */}
          <div className="form-section">
            <button
              type="button"
              className="accordion-btn"
              onClick={() => setShowMovies(!showMovies)}
            >
              {showMovies ? "▼" : "▶"} Movie Genres
            </button>
            {showMovies && (
              <div className="checkbox-grid">
                {movieGenreOptions.map((g) => (
                  <label key={g.id}>
                    <input
                      type="checkbox"
                      checked={movieGenres.includes(g.id)}
                      onChange={() => toggleMovieGenre(g.id)}
                    />
                    {g.name}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Collapsible TV Genres */}
          <div className="form-section">
            <button
              type="button"
              className="accordion-btn"
              onClick={() => setShowTv(!showTv)}
            >
              {showTv ? "▼" : "▶"} TV Genres
            </button>
            {showTv && (
              <div className="checkbox-grid">
                {tvGenreOptions.map((g) => (
                  <label key={g.id}>
                    <input
                      type="checkbox"
                      checked={tvGenres.includes(g.id)}
                      onChange={() => toggleTvGenre(g.id)}
                    />
                    {g.name}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Languages */}
          <div className="form-section">
            <h2>Preferred Languages</h2>
            <div className="checkbox-grid">
              {languageOptions.map((l) => (
                <label key={l.code}>
                  <input
                    type="checkbox"
                    checked={languages.includes(l.code)}
                    onChange={() => toggleLanguage(l.code)}
                  />
                  {l.name}
                </label>
              ))}
            </div>
          </div>

          {/* Actor */}
            <div>
                <label>Favorite Actor:</label>
                <input
                type="text"
                value={actor}
                onChange={(e) => setActor(e.target.value)}
                placeholder="Type actor name"
                />
            </div>
          {/* Year + Rating + Sort */}
          <div className="form-section">
            <h2>Release Year</h2>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 2024"
            />
          </div>

          <div className="form-section">
            <h2>Minimum Rating</h2>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <span>{rating}+</span>
          </div>

          <div className="form-section">
            <h2>Sort By</h2>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="popularity.desc">Popularity</option>
              <option value="vote_average.desc">Rating</option>
              <option value="release_date.desc">Newest</option>
              <option value="release_date.asc">Oldest</option>
            </select>
          </div>

          <button type="submit" className="submit-btn" disabled={saving}>
             {saving ? "Saving..." : "Save Preferences"}
          </button>
        </form>
      </div>
    </div>
  );
}
