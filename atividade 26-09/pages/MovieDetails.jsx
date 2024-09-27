import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=28d0dee8`);
      setMovie(response.data);
    };
    fetchMovie();
  }, [id]);

  return (
    <div>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
      <p>{movie.Plot}</p>
      <p>Director: {movie.Director}</p>
      <p>Actors: {movie.Actors}</p>
    </div>
  );
};

export default MovieDetails;
