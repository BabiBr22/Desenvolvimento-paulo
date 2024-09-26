// Define o ponto inicial (offset) para carregar a lista de Pokémon, e quantos Pokémon serão carregados por vez (limit).
let offset = 0;
const limite = 20; // Cada vez que carregar, trará 20 Pokémon

// Adiciona um evento de clique no botão "Mostrar mais Pokémon" para carregar mais Pokémon
document.getElementById('carregarPokemon').addEventListener('click', carregarPokemon);
// Adiciona um evento de clique no botão "Pesquisar" para buscar um Pokémon pelo nome
document.getElementById('pesquisarPokemon').addEventListener('click', pesquisarPokemon);

// Função para carregar uma lista de Pokémon com paginação
function carregarPokemon() {
    const containerPokemon = document.getElementById('container-pokemon');

    // Faz uma requisição à API para obter uma lista de Pokémon (usando o offset e limite)
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=${offset}`)
        .then(response => response.json()) // Converte a resposta em JSON
        .then(data => {
            // Para cada Pokémon na lista, pega os detalhes e exibe
            data.results.forEach(pokemon => {
                buscarDetalhesPokemon(pokemon.url, containerPokemon); // Função que busca detalhes de cada Pokémon
            });

            // Atualiza o offset para que na próxima vez carregue os próximos Pokémon
            offset += limite;
        })
        .catch(error => {
            console.error('Erro ao carregar lista de Pokémon:', error); // Exibe um erro caso a requisição falhe
        });
}

// Função para buscar um Pokémon pelo nome
function pesquisarPokemon() {
    const nomePokemon = document.getElementById('nomePokemon').value.toLowerCase(); // Pega o nome digitado e transforma em letras minúsculas
    const containerPokemon = document.getElementById('container-pokemon');
    containerPokemon.innerHTML = ''; // Limpa o container para exibir a nova busca

    // Faz uma requisição à API para obter o Pokémon pelo nome
    fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
        .then(response => {
            if (!response.ok) { // Verifica se o Pokémon existe
                throw new Error('Pokémon não encontrado'); // Se não existir, exibe uma mensagem de erro
            }
            return response.json(); // Converte a resposta em JSON
        })
        .then(data => {
            // Exibe os detalhes do Pokémon encontrado
            buscarDetalhesPokemon(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`, containerPokemon);
        })
        .catch(error => {
            console.error('Erro ao buscar Pokémon:', error); // Exibe um erro caso não encontre o Pokémon
            alert('Pokémon não encontrado!'); // Exibe um alerta para o usuário
        });
}

// Função que busca e exibe os detalhes de um Pokémon específico
function buscarDetalhesPokemon(url, container) {
    // Faz uma requisição à API para obter os detalhes do Pokémon
    fetch(url)
        .then(response => response.json()) // Converte a resposta em JSON
        .then(pokemonData => {
            // Cria um card (div) para exibir as informações do Pokémon
            const cartaoPokemon = document.createElement('div');
            cartaoPokemon.classList.add('cartao-pokemon');

            // Adiciona as informações ao card (imagem, nome, altura, peso e tipos do Pokémon)
            cartaoPokemon.innerHTML = `
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <h3>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h3>
                <p>Altura: ${pokemonData.height}</p>
                <p>Peso: ${pokemonData.weight}</p>
                <p>Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
            `;

            // Adiciona o card ao container na página
            container.appendChild(cartaoPokemon);
        })
        .catch(error => {
            console.error('Erro ao carregar dados do Pokémon:', error); // Exibe um erro caso a requisição falhe
        });
}
