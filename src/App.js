import './App.css';
import { BrowserRouter} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import MovieGrid from './components/MainScreen/MovieGrid';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar onSearch={handleSearch} />
        <MovieGrid searchTerm={searchTerm} />
      </div>
    </BrowserRouter>
  );
}

export default App;

