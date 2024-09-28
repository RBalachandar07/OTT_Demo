import './App.css';
import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import MovieGrid from './components/MainScreen/MovieGrid';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('');  // New state to store the title

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);  // Update the title state when MovieGrid provides the title
  };

  return (
    <BrowserRouter>
      <div className="App">
        {/* Pass the title to NavBar */}
        <NavBar onSearch={handleSearch} title={title} />
        {/* Pass setTitle to MovieGrid to allow it to update the title */}
        <MovieGrid searchTerm={searchTerm} setTitle={handleTitleChange} />
      </div>
    </BrowserRouter>
  );
}

export default App;
