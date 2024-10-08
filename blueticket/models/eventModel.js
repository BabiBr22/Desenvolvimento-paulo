const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true } // Adiciona o campo 'price' com tipo Number e obrigatório
});

module.exports = mongoose.model('Event', eventSchema);
