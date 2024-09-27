import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=28d0dee8`);
    setMovies(response.data.Search || []);
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {movies.map((movie) => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
