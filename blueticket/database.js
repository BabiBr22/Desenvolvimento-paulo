// database.js

// Estrutura de dados para armazenar eventos em memória
let events = [
    {
        id: 1,
        title: "Concerto de Rock",
        description: "Evento musical com várias bandas",
        date: "2024-10-10T20:00:00",
        location: "Estádio Municipal",
        category: "artistic"
    },
    {
        id: 2,
        title: "Campeonato de Futebol",
        description: "Partidas emocionantes entre os melhores times.",
        date: "2024-11-15T15:00:00",
        location: "Estádio Central",
        category: "sport"
    }
];

// Função para listar todos os eventos
const getAllEvents = () => {
    return events;
};

// Função para adicionar um novo evento
const addEvent = (newEvent) => {
    // Gera um ID baseado no maior ID existente
    newEvent.id = events.reduce((maxId, event) => Math.max(event.id, maxId), 0) + 1;
    events.push(newEvent);
    return newEvent;
};


// Função para encontrar um evento por ID
const getEventById = (id) => {
    return events.find(event => event.id === id);
};

// Função para excluir um evento por ID
const deleteEventById = (id) => {
    const index = events.findIndex(event => event.id === id);
    if (index !== -1) {
        events.splice(index, 1); // Remove o evento do array
        return true; // Retorna verdadeiro se o evento foi removido
    }
    return false; // Retorna falso se o evento não foi encontrado
};


// Exporta todas as funções necessárias
module.exports = { getAllEvents, addEvent, getEventById, deleteEventById };
