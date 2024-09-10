import React, { useState, useEffect,useMemo } from 'react';
import "./MovieGrid.css";

const MovieGrid = ({ searchTerm }) => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);  // Page starts at 1.
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);  // To check if there are more pages
    // const API_URL = ;
    const Default_Poster_API_URL = "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png";
    const fetchMovies = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            console.log(`Fetching page ${page}...`);
            const response = await fetch(`https://test.create.diagnal.com/data/page${page}.json`);
            if (!response.ok) {
                setHasMore(false);
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();

            console.log(data);
            const newMovies = data.page["content-items"].content;

            if (newMovies.length === 0) {
                setHasMore(false);  // If there are no new movies, stop further requests
            } else {
                setMovies((prevMovies) => [...prevMovies, ...newMovies]);//inseting the new movies to the existing list
            }
        } catch (error) {
            console.error("Error in fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    // Handle scroll event
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 100) {
            // If scrolled to the bottom (within 100px), fetch next page
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        // Fetch more movies when the page number got changes
        if (page > 1) {
            fetchMovies();
        }
    }, [page]);

    useEffect(() => {
        // Attach scroll event listener
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);  // Clean up the event listener on unmount
    }, []);
     // Using useMemo to memoize the filtered movie list based on the search term
     const filteredMovies = useMemo(() => {
        if (!searchTerm) return movies;
        const lowerCaseTerm = searchTerm.toLowerCase();
        return movies.filter(movie => movie.name.toLowerCase().includes(lowerCaseTerm));
    }, [searchTerm, movies]);

    return (
        <div className="movie-grid">
            {filteredMovies.length > 0 ? (
                filteredMovies.map((movie, index) => (
                <div key={index} className="movie-card">
                        <img 
                            src={`https://test.create.diagnal.com/images/${movie["poster-image"]}`} 
                            alt={movie.name} 
                            onError={(e) => e.target.src = Default_Poster_API_URL}
                        />
                        <p>{movie.name}</p>
                </div>
                ))
            ) : (
                <div className="no-movies-found"><p>No movies found....</p></div>
            )}
        </div>
    );
};

export default MovieGrid;

