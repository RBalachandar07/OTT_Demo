import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ onSearch, title }) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the current search term
  const searching = React.createRef(); // Reference for the search input field

  // Toggle the visibility of the search bar
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  // Pass the search term to the parent component (MovieGrid)
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Update the search term state
    onSearch(value); // Call the onSearch function passed from the parent
  };
  // Clear the search input and reset search term
  const clearsearch = () => {
    setSearchTerm(''); // Reset the search term
    onSearch(''); // Reset the search in the parent component
    searching.current.focus();  // Refocus the input field
  };

  const clickBack = () => {
    setSearchTerm('');
    onSearch('');
    setSearchVisible(false); // Hide the search input field
  };

  return (
    <div className="Header">
      <div className="Header-left">
        <Link className="backIcon">
        {/* Back button to navigate back, triggers clickBack on click */}
          <img
            src="https://test.create.diagnal.com/images/Back.png"
            alt="Back"
            style={{ width: '20px' }}
            onClick={clickBack}
          />
        </Link>
        {/* Show the title only when the search bar is not visible */}
        {!isSearchVisible && <span className="header-title">{title}</span>}
      </div>

      <div className="Header-right">
        <div className="search-icon" onClick={toggleSearch}>
          <img
            src="https://test.create.diagnal.com/images/search.png"
            alt="Search"
          />
        </div>
        {isSearchVisible && (
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search.."
              value={searchTerm}
              onChange={handleSearchInput} // Update search term on input change
              autoFocus
              ref={searching}  // Reference for focusing later
            />
            {searchTerm && (
              <span className="clear-button" onClick={clearsearch}>
                Clear
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
