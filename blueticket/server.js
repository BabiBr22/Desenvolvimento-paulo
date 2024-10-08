// Importa as dependências
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAllEvents, addEvent, getEventById, deleteEventById } = require('./database');

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
    category: req.body.category,
    imageUrl: req.body.imageUrl // Altera para usar URL da imagem
  };

  const createdEvent = addEvent(newEvent); // Adiciona ao array
  res.status(201).json(createdEvent); // Retorna o evento criado
});

// Rota para obter detalhes de um evento específico pelo ID
app.get('/api/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const event = getEventById(eventId);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: 'Evento não encontrado' });
  }
});

// Rota para excluir um evento pelo ID
app.delete('/api/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const deleted = deleteEventById(eventId);

  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Evento não encontrado' });
  }
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
