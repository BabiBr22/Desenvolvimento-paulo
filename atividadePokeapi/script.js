let offset = 0; // Controla o ponto de início para a próxima busca
const limit = 20; // Define quantos Pokémon serão carregados por vez

document.getElementById('loadPokemon').addEventListener('click', loadPokemon);
document.getElementById('searchPokemon').addEventListener('click', searchPokemon);

function loadPokemon() {
    const pokemonContainer = document.getElementById('pokemon-container');

    // Fetch da lista de Pokémon com paginação
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(pokemon => {
                fetchPokemonDetails(pokemon.url, pokemonContainer);
            });

            offset += limit; // Atualiza o offset para a próxima paginação
        })
        .catch(error => {
            console.error('Erro ao carregar lista de Pokémon:', error);
        });
}

function searchPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = ''; // Limpa o container para a nova busca

    // Fetch da PokeAPI para buscar pelo nome do Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return response.json();
        })
        .then(data => {
            fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, pokemonContainer);
        })
        .catch(error => {
            console.error('Erro ao buscar Pokémon:', error);
            alert('Pokémon não encontrado!');
        });
}

// Função para exibir detalhes de um Pokémon
function fetchPokemonDetails(url, container) {
    fetch(url)
        .then(response => response.json())
        .then(pokemonData => {
            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');

            pokemonCard.innerHTML = `
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <h3>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h3>
                <p>Height: ${pokemonData.height}</p>
                <p>Weight: ${pokemonData.weight}</p>
                <p>Type: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
            `;

            container.appendChild(pokemonCard);
        })
        .catch(error => {
            console.error('Erro ao carregar dados do Pokémon:', error);
        });
}
