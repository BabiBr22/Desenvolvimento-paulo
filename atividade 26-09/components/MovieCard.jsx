import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div>
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title}</h2>
    </div>
  );
};

export default MovieCard;
