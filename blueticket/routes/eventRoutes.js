const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Rota para criar evento
router.post('/events', eventController.createEvent);

// Rota para listar todos os eventos
router.get('/events', eventController.getAllEvents);

// Rota para obter detalhes de um evento por ID
router.get('/events/:id', eventController.getEventById);

module.exports = router;
