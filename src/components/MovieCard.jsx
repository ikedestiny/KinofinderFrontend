import React, { useState, useEffect } from 'react';

const MovieCard = ({ movie }) => {
  const [showLinks, setShowLinks] = useState(false);
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState('US'); // Default region

  const API_KEY = "YOUR_TMDB_API_KEY";
  const isMovie = movie.media_type === "movie" || movie.title;
  const title = movie.title || movie.name;
  const type = isMovie ? "movie" : "tv";
  const year = (movie.release_date || movie.first_air_date || "").split("-")[0] || "N/A";

  const fetchProviders = async (selectedRegion) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${movie.id}/watch/providers?api_key=${API_KEY}`
      );
      const data = await res.json();
      setProviders(data.results?.[selectedRegion] || {});
    } catch (err) {
      console.error("Error fetching providers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when the user changes the region manually
  const handleRegionChange = (e) => {
    const newRegion = e.target.value;
    setRegion(newRegion);
    fetchProviders(newRegion);
  };

  const toggleDropdown = () => {
    if (!showLinks) fetchProviders(region);
    setShowLinks(!showLinks);
  };

  const freeOptions = [
    ...(providers?.free || []),
    ...(providers?.ads || [])
  ];

  return (
    <div className="movie-card">
      <img 
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750"} 
        alt={title} 
      />
      <div className="movie-content">
        <h3>{title}</h3>
        <button className="watch-btn" onClick={toggleDropdown}>
          {showLinks ? "Close" : "Watch Now"}
        </button>

        {showLinks && (
          <div className="watch-dropdown">
            <div className="region-selector">
              <label>Region: </label>
              <select value={region} onClick={(e) => e.stopPropagation()} onChange={handleRegionChange}>
                <option value="US">USA</option>
                <option value="GB">UK</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="RU">Russia</option>
              </select>
            </div>

            {loading ? (
              <p className="status-text">Checking streams...</p>
            ) : (
              <div className="results-area">
                {freeOptions.length > 0 ? (
                  <div className="provider-icons">
                    {freeOptions.map(p => (
                      <img key={p.provider_id} title={p.provider_name}
                        src={`https://image.tmdb.org/t/p/original${p.logo_path}`} 
                        alt={p.provider_name} />
                    ))}
                  </div>
                ) : (
                  <p className="no-free">No legal free streams in {region}.</p>
                )}
                
                <a 
                  href={`https://yandex.com/search/?text=${encodeURIComponent(title + " " + year + " watch online free english")}`} 
                  target="_blank" rel="noreferrer" className="yandex-link"
                >
                  Try Yandex Search
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;