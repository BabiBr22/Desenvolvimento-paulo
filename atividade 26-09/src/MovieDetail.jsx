import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css'; // Certifique-se de importar o arquivo CSS

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=28d0dee8`);
            const data = await response.json();
            setMovie(data);
        };
        fetchMovie();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="container details-container">
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Plot}</p>
        </div>
    );
}

export default MovieDetail;
