// database.js

// Estrutura de dados para armazenar eventos em memória
let events = [
    {
        id: 1,
        nome: "Concerto de Rock",
        local: "Estádio Municipal",
        descricao: "Evento musical com várias bandas.",
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
const addEvent = (event) => {
    const newId = events.length > 0 ? events[events.length - 1].id + 1 : 1; // Gera um novo ID sequencial
    const newEvent = { id: newId, ...event }; // Adiciona o ID ao novo evento
    events.push(newEvent); // Adiciona o novo evento à lista
    return newEvent; // Retorna o evento recém-criado
};

// Função para encontrar um evento por ID
const getEventById = (id) => {
    return events.find(event => event.id === id); // Retorna o evento correspondente ou undefined
};

// Função para excluir um evento por ID
const deleteEventById = (id) => {
    const index = events.findIndex(event => event.id === id); // Procura o índice do evento pelo ID
    if (index !== -1) {
        events.splice(index, 1); // Remove o evento da lista
        return true; // Retorna true se o evento foi removido com sucesso
    }
    return false; // Retorna false se o evento não foi encontrado
};

// Exporta todas as funções necessárias para uso externo
module.exports = { getAllEvents, addEvent, getEventById, deleteEventById };
