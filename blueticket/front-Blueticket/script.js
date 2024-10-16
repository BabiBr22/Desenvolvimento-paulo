const API_URL = 'http://localhost:5001/api/events'; // Certifique-se de que sua API está rodando

// Variável para armazenar o evento atualmente aberto
let currentEvent = null;

// Função para listar todos os eventos
const fetchEvents = async () => {
    //console.log('Buscando eventos...');
    try {
        const response = await fetch(API_URL);
        const events = await response.json();
       // console.log('Eventos recebidos:', events); // Verifique a estrutura dos dados

        const eventsList = document.getElementById('events-list');

        // Limpar lista antes de adicionar novos eventos
        eventsList.innerHTML = '';

        events.forEach(event => {
            //console.log('Evento:', event); // Verifique cada evento individualmente
            const li = document.createElement('li');
            li.innerText = `${event.title} - ${event.location} - R$ ${event.price || 'N/A'}`; // Preço padrão se não definido
            li.addEventListener('click', () => toggleEventDetails(event)); // Alterna detalhes ao clicar
            //console.log(price)
            // Cria o botão de excluir
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Excluir';
            deleteButton.addEventListener('click', async (e) => {
                e.stopPropagation(); // Impede a chamada do evento de clique do evento
                await deleteEvent(event.id); // Use o _id se a chave do evento for _id
                console.log(event.id)
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
        location: document.getElementById('location').value,
        imageUrl: document.getElementById('imageUrl').value, // Captura a URL da imagem
        price: parseFloat(document.getElementById('price').value) // Converte o preço para um número
    };

    //console.log('Novo evento:', newEvent); // Verifique o novo evento antes de enviar

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!newEvent.title || !newEvent.description || !newEvent.location || isNaN(newEvent.price)) {
       // console.error('Por favor, preencha todos os campos obrigatórios corretamente!');
        return; // Impede o envio se campos obrigatórios não forem preenchidos
    }

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
            //console.error('Erro ao adicionar evento:', response.statusText);
            console.error('Erro ao adicionar evento:');
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
    document.getElementById('detail-location').innerText = event.location;
    document.getElementById('detail-price').innerText = `R$ ${event.price || 'N/A'}`; // Preço padrão se não definido

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
        console.log(id)
    } catch (error) {
        console.error('Erro ao excluir evento:', error);
    }
};

// Carrega os eventos ao iniciar a página
fetchEvents();
