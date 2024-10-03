// server.js

// Importa as dependências
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa o pacote cors
const { getAllEvents, addEvent, getEventById, deleteEventById } = require('./database'); // Adiciona deleteEventById

// Inicializa o aplicativo Express
const app = express();
const PORT = 5000;

// Configura o cors para permitir todas as origens
app.use(cors());

// Configura o body-parser para lidar com JSON
app.use(bodyParser.json());

// Rota para listar todos os eventos
app.get('/api/events', (req, res) => {
    const events = getAllEvents();
    res.json(events);
});

// Rota para cadastrar um novo evento
app.post('/api/events', (req, res) => {
    const newEvent = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        category: req.body.category
    };

    const createdEvent = addEvent(newEvent); // Adiciona ao array
    res.status(201).json(createdEvent); // Retorna o evento criado
});

// Rota para obter detalhes de um evento específico pelo ID
app.get('/api/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id, 10); // Obtém o ID da URL
    const event = getEventById(eventId); // Busca o evento pelo ID

    if (event) {
        res.json(event); // Se encontrar, retorna o evento
    } else {
        res.status(404).json({ message: 'Evento não encontrado' }); // Caso não encontre
    }
});

// Rota para excluir um evento pelo ID
app.delete('/api/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    const deleted = deleteEventById(eventId);

    if (deleted) {
        res.status(204).send(); // Retorna 204 No Content se a exclusão for bem-sucedida
    } else {
        res.status(404).json({ message: 'Evento não encontrado' }); // Caso não encontre
    }
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
