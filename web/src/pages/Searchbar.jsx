import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import MoviesApi from '../api/MoviesApi';

export const Searchbar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  // Debouncing the input by 2 seconds
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 1000); // 2-second delay

    return () => {
      clearTimeout(handler); // Cleanup timeout
    };
  }, [input]);

  // Memoize fetchData using useCallback to prevent re-creating the function on every render
  const fetchData = useCallback(
    async (value) => {
      try {
        const results = await MoviesApi.getMovieByName(value);
        if (results) {
          setResults(results); // Use the callback to pass results to Breadcrumbs
          // console.log(results)
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setResults([]); // Set an empty result if there's an error
      }
    },
    [setResults] // Dependencies of fetchData (setResults from props)
  );

  // Fetch data when debouncedInput changes
  useEffect(() => {
    if (debouncedInput) {
      fetchData(debouncedInput);
    }
  }, [debouncedInput, fetchData]);

  const handleChange = (value) => {
    setInput(value);
  };

  return (
    <div className='input-wrapper'>
      <FaSearch id='search-icon' />
      <input
        placeholder='Enter movie name here... '
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;