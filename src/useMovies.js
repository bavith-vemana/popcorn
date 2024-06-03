import React, { useState, useEffect } from 'react';

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const KEY = 'f84fc31d';

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await response.json();
                if (!data || !data.Search) {
                    throw new Error('Unexpected response format');
                }
                setMovies(data.Search);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [query]);

    return { movies, isLoading };
}

