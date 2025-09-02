import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faRobot, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Navbar = ({ onAIRecommendationClick }) => {
  const navigate = useNavigate()
  const [searchType, setSearchType] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_TOKEN;


  // const handleAIClick = () => {
  //   if (onAIRecommendationClick) {
  //     onAIRecommendationClick();
  //   }
  // };

  const handleSearch = async () => {
    let url = "";

      if (!searchTerm.trim()) return;

      const endpointMap = {
        movie: "movie",
        person: "person",
      };

      url = `${BASE_URL}/search/${endpointMap[searchType]}?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`;
    

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      console.log("Search results:", data.results);
      // You can handle the search results here, e.g., pass them to a parent component
      navigate("/search", { state: { results: data.results } });
    } catch (err) {
      console.error("Error fetching search:", err);
    }
  };

  const enterSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <a href="#" className="logo">
            <FontAwesomeIcon icon={faFilm} />
            <span>KinoFinder</span>
          </a>

          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/preferences">My Preferences</a></li>
            </ul>
          </nav>

          <div className="search-box">
            <input
              type="text"
              placeholder={`Search by ${searchType}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={enterSearch}
            />

            <div className="select-wrapper">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="movie">movie</option>
                <option value="person">person</option>
              </select>
              <FontAwesomeIcon icon={faChevronDown} className="select-icon" />
            </div>

            <i className="fas fa-search" onClick={handleSearch}></i>
          </div>

          {/* Uncomment when AI search is ready */}
          {/* 
          <button
            className="ai-recommendation-btn"
            onClick={handleAIClick}
            aria-label="AI Recommendations"
          >
            <FontAwesomeIcon icon={faRobot} />
            <p>AI search</p>
          </button> 
          */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
