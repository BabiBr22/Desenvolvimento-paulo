// Importa as dependências
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAllEvents, addEvent, getEventById, deleteEventById } = require('./database');

// Inicializa o aplicativo Express
const app = express();
const PORT = 5001;

// Configura o cors para permitir todas as origens
app.use(cors());

// Configura o body-parser para lidar com JSON
app.use(bodyParser.json());

// Rota para listar todos os eventos
app.get('/api/events', async (req, res) => {
  try {
    const events = await getAllEvents(); // Certifique-se de que esta função retorna uma Promise
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar eventos', error: error.message });
  }
});

// Rota para cadastrar um novo evento
app.post('/api/events', async (req, res) => {
  try {
    const newEvent = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      imageUrl: req.body.imageUrl,
      price: parseFloat(req.body.price) || 0  // Certifique-se de que o preço está sendo recebido e tratado corretamente
    };

    const createdEvent = await addEvent(newEvent); // Função para adicionar o evento deve retornar uma Promise
    res.status(201).json(createdEvent); // Retorna o evento criado
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar evento', error: error.message });
  }
});

// Rota para obter detalhes de um evento específico pelo ID
app.get('/api/events/:id', async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);
    const event = await getEventById(eventId); // Certifique-se de que esta função retorna uma Promise

    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: 'Evento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar evento', error: error.message });
  }
});

// Rota para excluir um evento pelo ID
app.delete('/api/events/:id', async (req, res) => {
  try {
    const eventId = parseInt(req.params.id, 10);
    const deleted = await deleteEventById(eventId); // Certifique-se de que esta função retorna uma Promise

    if (deleted) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: 'Evento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir evento', error: error.message });
  }
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
