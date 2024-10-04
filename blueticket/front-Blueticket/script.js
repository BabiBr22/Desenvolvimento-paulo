const API_URL = 'http://localhost:5000/api/events'; // Certifique-se de que sua API está rodando

// Variável para armazenar o evento atualmente aberto
let currentEvent = null;

// Função para listar todos os eventos
const fetchEvents = async () => {
    console.log('Buscando eventos...');
    try {
        const response = await fetch(API_URL);
        const events = await response.json();
        const eventsList = document.getElementById('events-list');

        // Limpar lista antes de adicionar novos eventos
        eventsList.innerHTML = '';

        events.forEach(event => {
            const li = document.createElement('li');
            li.innerText = `${event.title} - ${new Date(event.date).toLocaleString()} - ${event.location}`;
            li.addEventListener('click', () => toggleEventDetails(event)); // Alterna detalhes ao clicar

            // Cria o botão de excluir
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Excluir';
            deleteButton.addEventListener('click', async (e) => {
                e.stopPropagation(); // Impede a chamada do evento de clique do evento
                await deleteEvent(event.id);
                fetchEvents(); // Atualiza a lista após a exclusão
                hideEventDetails(); // Oculta os detalhes do evento
            });

            li.appendChild(deleteButton); // Adiciona o botão à lista
            eventsList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
    }
};

// Função para adicionar um novo evento
const addEvent = async (event) => {
    event.preventDefault(); // Evitar o comportamento padrão do formulário

    const newEvent = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        category: document.getElementById('category').value,
        imageUrl: document.getElementById('imageUrl').value // Captura a URL da imagem
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Definindo o tipo de conteúdo como JSON
            },
            body: JSON.stringify(newEvent) // Envia os dados como JSON
        });

        if (response.ok) {
            document.getElementById('event-form').reset(); // Limpar o formulário
            fetchEvents(); // Recarregar a lista de eventos
        } else {
            console.error('Erro ao adicionar evento:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao adicionar evento:', error);
    }
};

// Função para mostrar ou ocultar detalhes do evento
const toggleEventDetails = (event) => {
    if (currentEvent === event) {
        hideEventDetails(); // Oculta os detalhes se já estiverem abertos
        currentEvent = null; // Reseta o evento atual
    } else {
        currentEvent = event; // Define o evento atual
        showEventDetails(event); // Mostra os detalhes do novo evento
    }
};

// Função para mostrar detalhes do evento
const showEventDetails = (event) => {
    document.getElementById('detail-title').innerText = event.title;
    document.getElementById('detail-description').innerText = event.description;
    document.getElementById('detail-date').innerText = new Date(event.date).toLocaleString();
    document.getElementById('detail-location').innerText = event.location;

    const detailImage = document.getElementById('detail-image');
    if (event.imageUrl) {
        detailImage.src = event.imageUrl; // Usa a URL da imagem
        detailImage.style.display = 'block'; // Exibe a imagem
    } else {
        detailImage.style.display = 'none'; // Oculta a imagem se não houver
    }

    document.getElementById('event-details').style.display = 'block'; // Exibe os detalhes
};

// Função para ocultar detalhes do evento
const hideEventDetails = () => {
    document.getElementById('event-details').style.display = 'none'; // Oculta os detalhes
};

// Adicionar evento ao enviar o formulário
document.getElementById('event-form').addEventListener('submit', addEvent);

// Função para excluir um evento
const deleteEvent = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            console.error('Erro ao excluir evento:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao excluir evento:', error);
    }
};

// Buscar eventos ao carregar a página
fetchEvents();
