// database.js

// Estrutura de dados para armazenar eventos em memória
let events = [
    {
        id: 1,
        nome: "Concerto de Rock",
        local: "Estádio Municipal",
        descricao: "Evento musical com várias bandas",
        preco: 500,
        foto: "concerto.jpg"
    },
    {
        id: 2,
        nome: "Campeonato de Futebol",
        local: "Estádio Central",
        descricao: "Partidas emocionantes entre os melhores times.",
        preco: 100,
        foto: "futebol.jpg"
    }
];

// Função para listar todos os eventos
const getAllEvents = () => {
    return events;
};

// Função para adicionar um novo evento
const addEvent = (newEvent) => {
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
