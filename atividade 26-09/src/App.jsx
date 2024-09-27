import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Certifique-se de importar o arquivo CSS

function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);

    const searchMovies = async () => {
        // Buscando os filmes da API OMDB
        const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=28d0dee8`);
        const data = await response.json();

        if (data.Search) {
            // Filtrar os filmes para incluir aqueles cujo título contém o termo de busca em qualquer parte do título
            const filtered = data.Search.filter(movie => 
                movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredMovies(filtered);
        } else {
            setFilteredMovies([]); // Caso não haja resultados
        }
    };

    return (
        <div>
            <header>
                <h1>Movie Search</h1>
            </header>
            <div className="container">
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Search for movies..."
                />
                <button onClick={searchMovies}>Search</button>
                <div className="movie-list">
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map(movie => (
                            <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-item">
                                <img src={movie.Poster} alt={movie.Title} />
                                <h3>{movie.Title}</h3>
                            </Link>
                        ))
                    ) : (
                        <p>No movies found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
