import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavBar = ({ onSearch }) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searching = React.createRef();
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };
// Pass the search term to the parent component (MovieGrid)
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); 
  };
  
  const clearsearch=()=>{
    setSearchTerm("");
    onSearch("");
    searching.current.focus();
  }
  const clickBack=()=>{
    setSearchTerm("");
    onSearch("");
   //remove the search input field when back button
    setSearchVisible(false);
  }


  return (
    <div className="Header">
      <div className="Header-left">
        <Link className="backIcon">
          <img src="https://test.create.diagnal.com/images/Back.png" alt="Back" style={{ width: "20px" }} onClick={clickBack}/>
        </Link>
      </div>
      
      <div className="Header-right">
        <div className="search-icon" onClick={toggleSearch}>
          <img src="https://test.create.diagnal.com/images/search.png" alt="Search" />
        </div>
        {isSearchVisible && (
           <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search.."
              value={searchTerm}
              onChange={handleSearchInput}
              autoFocus
              ref={searching}
            />
            {searchTerm && (
              <span className="clear-button " onClick={clearsearch} >
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




