import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faRobot,faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onAIRecommendationClick }) => {
  const [searchType, setSearchType] = useState("movie");

  const handleAIClick = () => {
    if (onAIRecommendationClick) {
      onAIRecommendationClick();
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
              <li><a href="#">Movies</a></li>
              <li><a href="#">TV Shows</a></li>
              <li><a href="#">New</a></li>
              <li><a href="/preferences">My Preferences</a></li>
            </ul>
          </nav>

          <div className="search-box">
  <input 
    type="text" 
    placeholder={`Search by ${searchType}...`} 
  />

  <div className="select-wrapper">
    <select 
      value={searchType} 
      onChange={(e) => setSearchType(e.target.value)}
    >
      <option value="movie">Movie</option>
      <option value="actor">Actor</option>
      <option value="genre">Genre</option>
    </select>
    <FontAwesomeIcon icon={faChevronDown} className="select-icon" />
  </div>

  <i className="fas fa-search"></i>
</div>


          <button 
            className="ai-recommendation-btn"
            onClick={handleAIClick}
            aria-label="AI Recommendations"
          >
            <FontAwesomeIcon icon={faRobot} />
          <p>AI search</p>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
