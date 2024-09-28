import React, { useState, useEffect, useMemo } from 'react';
import "./MovieGrid.css";

const MovieGrid = ({ searchTerm, setTitle }) => {
    // State variables
    const [movies, setMovies] = useState([]); // Store the list of movies
    const [page, setPage] = useState(1); // Page starts at 1
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Check if there are more pages
    const [isInitialLoad, setIsInitialLoad] = useState(true); // Track if initial load is happening

    // API URL for fetching movies based on the current page
    const API_URL = `https://test.create.diagnal.com/data/page${page}.json`;
    const Default_Poster_API_URL = "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png";

    // Function to fetch movies from the API
    const fetchMovies = async () => {
        // Prevent fetching if already loading or if there are no more pages
        if (loading || !hasMore) return;

        setLoading(true); // Set loading to true before fetching
        try {
            console.log(`Fetching page ${page}...`); // Log the page being fetched
            const response = await fetch(API_URL); // Fetch data from the API
            if (!response.ok) {
                setHasMore(false); // If response is not OK, set hasMore to false
                throw new Error("Failed to fetch data");
            }
            const data = await response.json(); // Parse JSON response
            const newMovies = data.page["content-items"].content; // Get the list of new movies
            let title = data.page["title"];
            if (title) {
                setTitle(title); // Set the title if it exists
            }

            // Check if there are no new movies and update the hasMore state
            if (newMovies.length === 0) {
                setHasMore(false); // Stop requests if there are no new movies
            } else {
                // Append new movies to the existing list
                setMovies((prevMovies) => [...prevMovies, ...newMovies]);
            }
        } catch (error) {
            console.error("Error in fetching movies:", error); // Log any errors
        } finally {
            setLoading(false); // Set loading to false after fetching
            setIsInitialLoad(false); // Update initial load state
        }
    };

    // Fetch movies when the component mounts or page changes
    useEffect(() => {
        fetchMovies();
    }, [page]);
    // Handle scroll event to fetch more movies when reaching the bottom of the page
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 100) {
            // If scrolled to the bottom (within 100px), fetch the next page
            setPage((prevPage) => prevPage + 1); // Increment page number
        }
    };
    // Attach scroll event listener
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll); // Clean up the event listener on unmount
    }, [hasMore, loading]); // Dependency on hasMore and loading

    // Using useMemo to memoize the filtered movie list based on the search term
    const filteredMovies = useMemo(() => {
        if (!searchTerm) return movies; // If no search term, return all movies
        const lowerCaseTerm = searchTerm.toLowerCase(); // Convert search term to lowercase
        return movies.filter(movie => movie.name.toLowerCase().includes(lowerCaseTerm)); // Filter movies based on search term
    }, [searchTerm, movies]); 

    return (
        <div className="movie-grid">
            {isInitialLoad && loading ? (
                <div className='no-movies-found'><p>Loading...</p></div> // Show loading message during initial load
            ) : filteredMovies.length > 0 ? (
                filteredMovies.map((movie, index) => (
                    <div key={index} className="movie-card">
                        <img 
                            src={`https://test.create.diagnal.com/images/${movie["poster-image"]}`} 
                            alt={movie.name} 
                            onError={(e) => e.target.src = Default_Poster_API_URL} // Set default poster on error
                        />
                        <p>{movie.name}</p> // Display movie name
                    </div>
                ))
            ) : (
                <div className="no-movies-found"><p>No movies found....</p></div> // Show message when no movies are found
            )}
        </div>
    );
};

export default MovieGrid;
